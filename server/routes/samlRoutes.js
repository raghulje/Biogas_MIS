const express = require('express');
const crypto = require('crypto');
const { fn, col, where } = require('sequelize');
const { User, Role, UserActivityLog } = require('../models');
const authController = require('../controllers/authController');
const {
    createSaml,
    idpConfigured,
    isRefexOnePortalIdp,
    profileEmail,
    publicBase,
    refexOnePortalSsoUrl,
    refexOneWebBase,
    samlEnabled,
    samlPortalFields,
    samlSpConfig,
    safeAppPath,
} = require('../services/saml');

const router = express.Router();

function htmlError(res, message, status = 400) {
    const home = `${publicBase()}/login`;
    res.status(status).type('html').send(`<!doctype html>
<html><head><meta charset="utf-8"/><title>SSO error</title>
<style>body{font-family:system-ui,sans-serif;max-width:520px;margin:48px auto;padding:0 16px;color:#0f172a}a{color:#2879b6}</style></head>
<body><h1>SSO sign-in failed</h1><p>${String(message).replace(/</g, '&lt;')}</p>
<p><a href="${home}">Back to login</a></p></body></html>`);
}

function callbackUrl(relay) {
    const base = `${publicBase()}/login/sso/callback`;
    const path = safeAppPath(relay);
    return path ? `${base}?next=${encodeURIComponent(path)}` : base;
}

router.get('/status', (_req, res) => {
    const sp = samlSpConfig();
    res.json({
        enabled: samlEnabled(),
        idp_configured: idpConfigured(),
        label: process.env.SAML_BUTTON_LABEL || 'Continue with RefexOne',
        login_path: '/api/auth/saml/login',
        logout_url: refexOneWebBase(),
        home_url: sp.home_url,
    });
});

router.get('/metadata', (_req, res) => {
    try {
        const sp = samlSpConfig();
        if (!idpConfigured()) {
            const xml = `<?xml version="1.0"?>
<EntityDescriptor xmlns="urn:oasis:names:tc:SAML:2.0:metadata" entityID="${sp.entity_id}">
  <SPSSODescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol" AuthnRequestsSigned="false" WantAssertionsSigned="${sp.sign_assertions}">
    <NameIDFormat>${sp.name_id_format}</NameIDFormat>
    <AssertionConsumerService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="${sp.acs_url}" index="0" isDefault="true"/>
    <SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="${sp.slo_url}"/>
    <SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="${sp.slo_url}"/>
  </SPSSODescriptor>
</EntityDescriptor>`;
            res.type('application/samlmetadata+xml').send(xml);
            return;
        }
        const xml = createSaml().generateServiceProviderMetadata(null, null);
        res.type('application/samlmetadata+xml').send(xml);
    } catch (error) {
        res.status(500).type('text').send(error.message || 'Metadata error');
    }
});

router.get('/login', async (req, res) => {
    try {
        if (!samlEnabled()) return htmlError(res, 'SAML SSO is disabled (set SAML_ENABLED=true).', 503);
        if (!idpConfigured()) {
            return htmlError(res, 'SAML IdP is not configured yet. Set SAML_IDP_ENTRY_POINT and SAML_IDP_CERT.', 503);
        }
        const requested = String(req.query.RelayState || req.query.returnTo || '');
        const dest = callbackUrl(requested);
        if (isRefexOnePortalIdp()) {
            const portal = refexOnePortalSsoUrl(dest);
            if (portal) return res.redirect(portal);
        }
        const url = await createSaml().getAuthorizeUrlAsync(dest, undefined, {});
        return res.redirect(url);
    } catch (error) {
        console.error('[saml/login]', error);
        return htmlError(res, error.message || 'Could not start SSO', 500);
    }
});

router.post('/acs', async (req, res) => {
    try {
        if (!samlEnabled()) return htmlError(res, 'SAML SSO is disabled.', 503);
        const body = req.body || {};
        const { profile, loggedOut } = await createSaml().validatePostResponseAsync(body);
        if (loggedOut) return res.redirect(`${publicBase()}/login`);
        if (!profile) return htmlError(res, 'Empty SAML profile from IdP.');

        const email = profileEmail(profile);
        if (!email) return htmlError(res, 'SAML assertion did not include an email NameID.');

        let user = await User.findOne({
            where: where(fn('LOWER', col('email')), email),
            include: [{ model: Role, as: 'role' }],
        });

        if (!user && String(process.env.SAML_AUTO_PROVISION || '').toLowerCase() === 'true') {
            const role = await Role.findOne({ order: [['id', 'ASC']] });
            if (!role) return htmlError(res, 'No role is available to provision the SSO user.');
            const local = email.split('@')[0].replace(/[^a-zA-Z0-9._-]/g, ' ').trim() || 'SSO User';
            user = await User.create({
                name: local,
                email,
                password: crypto.randomBytes(24).toString('hex'),
                role_id: role.id,
                is_active: true,
            });
            user = await User.findByPk(user.id, { include: [{ model: Role, as: 'role' }] });
        }

        if (!user || !user.is_active) {
            return htmlError(res, `No active Biogas MIS user for ${email}. Create the user first, or enable SAML_AUTO_PROVISION.`);
        }

        const tokens = authController.generateTokens(user);
        try {
            await UserActivityLog.create({
                user_id: user.id,
                activity_type: 'LOGIN',
                description: 'User logged in with SAML SSO',
                ip_address: req.ip,
            });
        } catch (logError) {
            console.warn('SSO activity log failed:', logError.message);
        }

        const dest = callbackUrl(String(body.RelayState || ''));
        const sep = dest.includes('?') ? '&' : '?';
        return res.redirect(`${dest}${sep}token=${encodeURIComponent(tokens.accessToken)}`);
    } catch (error) {
        console.error('[saml/acs]', error);
        return htmlError(res, error.message || 'SAML assertion validation failed', 400);
    }
});

async function finishLogout(req, res) {
    try {
        if (samlEnabled() && idpConfigured()) {
            const saml = createSaml();
            try {
                await saml.validatePostResponseAsync(req.body || {});
            } catch {
                try {
                    await saml.validatePostRequestAsync(req.body || {});
                } catch (error) {
                    console.warn('[saml/slo]', error.message || error);
                }
            }
        }
    } catch (error) {
        console.warn('[saml/slo]', error.message || error);
    }
    return res.redirect(`${publicBase()}/logout`);
}

router.post('/slo', finishLogout);
router.get('/slo', (_req, res) => res.redirect(`${publicBase()}/logout`));

router.get('/config', (_req, res) => {
    res.json({
        enabled: samlEnabled(),
        idp_configured: idpConfigured(),
        ...samlSpConfig(),
        portal_fields: samlPortalFields(),
        logout_url: refexOneWebBase(),
    });
});

module.exports = router;
