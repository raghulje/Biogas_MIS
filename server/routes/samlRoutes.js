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

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function htmlError(res, message, status = 400, options = {}) {
    const home = `${publicBase()}/login?local=1`;
    const title = options.title || 'Sign-in could not be completed';
    const email = options.email ? escapeHtml(options.email) : '';
    res.status(status).type('html').send(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${escapeHtml(title)}</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 24px 16px;
    font-family: Inter, system-ui, sans-serif;
    color: #25313c;
    background:
      radial-gradient(circle at 0% 0%, rgba(40,121,182,0.16), transparent 32%),
      radial-gradient(circle at 100% 100%, rgba(125,194,68,0.16), transparent 28%),
      linear-gradient(135deg, #f8fafc 0%, #e8eef5 100%);
  }
  .card {
    width: min(440px, 100%);
    background: #fff;
    border: 1px solid rgba(40,121,182,0.14);
    border-radius: 20px;
    box-shadow: 0 16px 40px rgba(30,75,110,0.12);
    padding: 32px 28px;
    text-align: center;
  }
  .mark {
    width: 64px;
    height: 64px;
    margin: 0 auto 16px;
    border-radius: 18px;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, rgba(40,121,182,0.12), rgba(238,106,49,0.12));
    color: #ee6a31;
  }
  h1 { margin: 0 0 10px; font-size: 1.45rem; line-height: 1.25; }
  p { margin: 0; color: #5c6770; line-height: 1.55; font-size: 0.98rem; }
  .email {
    display: inline-block;
    margin-top: 16px;
    padding: 8px 12px;
    border-radius: 999px;
    background: rgba(40,121,182,0.08);
    color: #2879b6;
    font-weight: 700;
    font-size: 0.92rem;
    word-break: break-all;
  }
  a.button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    margin-top: 22px;
    padding: 0 18px;
    border-radius: 12px;
    background: #2879b6;
    color: #fff;
    text-decoration: none;
    font-weight: 700;
  }
  a.button:hover { background: #235eac; }
</style></head>
<body>
  <main class="card">
    <div class="mark" aria-hidden="true">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="8" r="3.2"/>
        <path d="M5 19.2c1.2-3 3.5-4.5 7-4.5s5.8 1.5 7 4.5"/>
        <path d="M17.2 7.2l3.2 3.2M20.4 7.2l-3.2 3.2"/>
      </svg>
    </div>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(message)}</p>
    ${email ? `<div class="email">${email}</div>` : ''}
    <a class="button" href="${escapeHtml(home)}">Back to login</a>
  </main>
</body></html>`);
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
        if (!samlEnabled()) return htmlError(res, 'Single sign-on is turned off for this application. Use email and password, or ask an administrator to enable it.', 503, { title: 'Sign-in is unavailable' });
        if (!idpConfigured()) {
            return htmlError(res, 'Single sign-on is not ready yet. Use email and password, or ask an administrator to finish the setup.', 503, { title: 'Sign-in is unavailable' });
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
        return htmlError(res, 'RefexOne could not be opened. Try again, or sign in with email and password.', 500, { title: 'Sign-in could not start' });
    }
});

router.post('/acs', async (req, res) => {
    try {
        if (!samlEnabled()) return htmlError(res, 'Single sign-on is turned off for this application. Use email and password, or ask an administrator to enable it.', 503, { title: 'Sign-in is unavailable' });
        const body = req.body || {};
        const { profile, loggedOut } = await createSaml().validatePostResponseAsync(body);
        if (loggedOut) return res.redirect(`${publicBase()}/logout`);
        if (!profile) return htmlError(res, 'RefexOne did not send an account profile. Try signing in again.', 400, { title: 'Sign-in was incomplete' });

        const email = profileEmail(profile);
        if (!email) return htmlError(res, 'RefexOne did not send an email address, so Biogas MIS cannot match an account.', 400, { title: 'Email address missing' });

        let user = await User.findOne({
            where: where(fn('LOWER', col('email')), email),
            include: [{ model: Role, as: 'role' }],
        });

        if (!user && String(process.env.SAML_AUTO_PROVISION || '').toLowerCase() === 'true') {
            const role = await Role.findOne({ order: [['id', 'ASC']] });
            if (!role) return htmlError(res, 'A new account could not be created because no role is available. Ask an administrator to add you.', 500, { title: 'Account could not be created', email });
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

        if (!user) {
            return htmlError(
                res,
                `No User Found for this '${email}'`,
                403,
                { title: 'No User Found' },
            );
        }
        if (!user.is_active) {
            return htmlError(
                res,
                'This email is registered in Biogas MIS, but the account is turned off. Ask an administrator to activate it, then try again.',
                403,
                { title: 'Account is inactive', email },
            );
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
        return htmlError(res, 'The sign-in response from RefexOne could not be verified. Start again from the login page.', 400, { title: 'Sign-in could not be verified' });
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
