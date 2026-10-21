const fs = require('fs');
const path = require('path');
const { SAML, ValidateInResponseTo } = require('@node-saml/node-saml');

const DEFAULT_APP_URL = 'https://srel.refex.group';
const DEFAULT_IDP_ISSUER = 'https://refexone.com/api/saml/cb334d06-b942-4089-887b-919a228ceacc';
const DEFAULT_CERT_PATH = path.join(__dirname, '../certs/refexone-idp.crt');

const NAME_ID_FORMAT = 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress';

function trimBase(value, fallback) {
    const raw = String(value || fallback || '').trim();
    return raw.replace(/\/$/, '') || fallback;
}

function samlEnabled() {
    return String(process.env.SAML_ENABLED || '').toLowerCase() === 'true';
}

function publicBase() {
    return trimBase(process.env.PUBLIC_APP_URL || process.env.CLIENT_ORIGIN, DEFAULT_APP_URL);
}

function apiBase() {
    return trimBase(process.env.API_PUBLIC_URL || process.env.PUBLIC_APP_URL || process.env.FRONTEND_URL, publicBase());
}

function samlSpConfig() {
    const app = publicBase();
    const api = apiBase();
    const entityId = trimBase(process.env.SAML_SP_ENTITY_ID, `${app}/saml/sp`);
    const acsUrl = trimBase(process.env.SAML_ACS_URL, `${api}/api/auth/saml/acs`);
    const sloUrl = trimBase(process.env.SAML_SLO_URL, `${api}/api/auth/saml/slo`);
    const homeUrl = `${trimBase(process.env.SAML_HOME_URL, `${app}/dashboard`)}`;
    const signAssertions = process.env.SAML_WANT_ASSERTIONS_SIGNED !== 'false';
    const signResponse = process.env.SAML_WANT_RESPONSE_SIGNED === 'true';
    return {
        entity_id: entityId,
        audience: entityId,
        acs_url: acsUrl,
        slo_url: sloUrl,
        home_url: homeUrl.endsWith('/') ? homeUrl : homeUrl,
        metadata_url: `${api}/api/auth/saml/metadata`,
        name_id_format: NAME_ID_FORMAT,
        name_id_format_label: 'Email Address',
        sign_assertions: signAssertions,
        sign_response: signResponse,
    };
}

function samlLaunchUrl() {
    return `${apiBase()}/api/auth/saml/login`;
}

function samlPortalFields() {
    const sp = samlSpConfig();
    return {
        'Entity ID / Audience': sp.entity_id,
        'ACS URL (Assertion Consumer Service)': sp.acs_url,
        'Home URL': samlLaunchUrl(),
        'SLO URL': sp.slo_url,
        'Name ID Format': sp.name_id_format_label,
        'Sign Assertions': sp.sign_assertions ? 'Yes' : 'No',
        'Sign Response': sp.sign_response ? 'Yes' : 'No',
    };
}

function normalizeCert(raw) {
    let cert = String(raw || '').trim().replace(/\\n/g, '\n');
    if (!cert) return '';
    if (!cert.includes('BEGIN CERTIFICATE')) {
        cert = `-----BEGIN CERTIFICATE-----\n${cert.replace(/\s+/g, '\n')}\n-----END CERTIFICATE-----`;
    }
    return cert;
}

function idpCert() {
    const fromEnv = normalizeCert(process.env.SAML_IDP_CERT || '');
    if (fromEnv) return fromEnv;
    const certPath = String(process.env.SAML_IDP_CERT_PATH || DEFAULT_CERT_PATH).trim();
    try {
        return normalizeCert(fs.readFileSync(certPath, 'utf8'));
    } catch {
        return '';
    }
}

function idpIssuer() {
    return String(process.env.SAML_IDP_ISSUER || process.env.SAML_IDP_ENTRY_POINT || DEFAULT_IDP_ISSUER).trim();
}

function idpConfigured() {
    return Boolean(idpIssuer() && idpCert());
}

function refexOneWebBase() {
    const raw = String(process.env.REFEXONE_WEB_URL || 'https://refexone.com').trim();
    return raw.replace(/\/api\/?$/i, '').replace(/\/$/, '') || 'https://refexone.com';
}

function refexOneSamlAppId() {
    const explicit = String(process.env.REFEXONE_SAML_APP_ID || process.env.SAML_APP_ID || '').trim();
    if (explicit) return explicit;
    const from = [process.env.SAML_IDP_ENTRY_POINT, process.env.SAML_IDP_ISSUER, idpIssuer()]
        .map((value) => String(value || '').trim())
        .find(Boolean) || '';
    const match = from.match(/\/saml\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
    return match ? match[1] : '';
}

function isRefexOnePortalIdp() {
    const entry = String(process.env.SAML_IDP_ENTRY_POINT || idpIssuer()).trim();
    if (!entry) return Boolean(refexOneSamlAppId());
    try {
        const url = new URL(entry);
        return /refexone\.com$/i.test(url.hostname) && /\/api\/saml\/[^/]+/i.test(url.pathname);
    } catch {
        return /refexone\.com\/api\/saml\//i.test(entry);
    }
}

function refexOnePortalSsoUrl(relayAbsolute) {
    const appId = refexOneSamlAppId();
    const dest = String(relayAbsolute || '').trim();
    if (!appId || !dest) return '';
    const url = new URL(`${refexOneWebBase()}/api/saml/${encodeURIComponent(appId)}/sso`);
    url.searchParams.set('RelayState', dest);
    return url.toString();
}

function createSaml() {
    const sp = samlSpConfig();
    const issuer = idpIssuer();
    const cert = idpCert();
    const entryPoint = String(process.env.SAML_IDP_ENTRY_POINT || issuer).trim();
    if (!entryPoint || !cert) {
        throw new Error('SAML IdP is not configured (set SAML_IDP_ENTRY_POINT and SAML_IDP_CERT)');
    }
    return new SAML({
        callbackUrl: sp.acs_url,
        entryPoint,
        logoutUrl: String(process.env.SAML_IDP_SLO_URL || '').trim() || undefined,
        issuer: sp.entity_id,
        idpIssuer: issuer,
        idpCert: cert,
        audience: sp.entity_id,
        identifierFormat: NAME_ID_FORMAT,
        disableRequestedAuthnContext: true,
        wantAssertionsSigned: sp.sign_assertions,
        wantAuthnResponseSigned: sp.sign_response,
        acceptedClockSkewMs: Number(process.env.SAML_CLOCK_SKEW_MS || 120000),
        validateInResponseTo: ValidateInResponseTo.never,
    });
}

function profileEmail(profile) {
    const candidates = [
        profile.email,
        profile.mail,
        profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        profile.nameID,
    ];
    for (const candidate of candidates) {
        const value = String(candidate || '').trim().toLowerCase();
        if (value.includes('@')) return value;
    }
    return '';
}

function safeAppPath(value) {
    const raw = String(value || '').trim();
    if (!raw.startsWith('/') || raw.startsWith('//') || raw.includes('..')) return '';
    if (raw.startsWith('/login') || raw.startsWith('/logout') || raw.startsWith('/api')) return '';
    return raw;
}

module.exports = {
    samlEnabled,
    samlSpConfig,
    samlLaunchUrl,
    samlPortalFields,
    idpConfigured,
    publicBase,
    refexOneWebBase,
    isRefexOnePortalIdp,
    refexOnePortalSsoUrl,
    createSaml,
    profileEmail,
    safeAppPath,
};
