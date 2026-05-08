// ─── Google OAuth Routes (one-time admin setup) ────────────────────────────
//
// STEP 1: Visit http://localhost:5000/api/v1/voice-agent/oauth/init
//         → Opens Google consent screen in your browser
//         → Log in with the AGENTiX Google account
//         → Grant access to Google Calendar
//
// STEP 2: Google redirects to /oauth/callback with a code
//         → Backend exchanges code for tokens
//         → Prints GOOGLE_REFRESH_TOKEN to terminal
//         → Copy that token into backend/.env as GOOGLE_REFRESH_TOKEN=...
//         → Restart backend — done forever.
//
// You only need to do this ONCE. The refresh token never expires unless revoked.

import { Router } from 'express';
import { google } from 'googleapis';

const router = Router();

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/gmail.send',   // for future email features
];

function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

// GET /api/v1/voice-agent/oauth/init
// → Redirects browser to Google's consent page
router.get('/init', (req, res) => {
  const oauth2Client = getOAuthClient();
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',           // always show consent screen to get refresh_token
  });
  console.log('\n[OAuth] Redirecting to Google consent screen...\n');
  res.redirect(url);
});

// GET /api/v1/voice-agent/oauth/callback
// → Google sends ?code=... here after user grants access
router.get('/callback', async (req, res) => {
  const { code, error } = req.query;

  if (error) {
    return res.status(400).send(`
      <h2>OAuth Error</h2>
      <p>${error}</p>
      <p>Go back and try again.</p>
    `);
  }

  if (!code) {
    return res.status(400).send('<h2>No code received from Google.</h2>');
  }

  try {
    const oauth2Client = getOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.refresh_token) {
      return res.status(400).send(`
        <h2>No refresh token received.</h2>
        <p>This usually means you've already granted access before.</p>
        <p>Go to <a href="https://myaccount.google.com/permissions">Google Account Permissions</a>,
        remove AGENTiX app access, then try <a href="/api/v1/voice-agent/oauth/init">again</a>.</p>
      `);
    }

    // Print to terminal so developer can copy into .env
    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║         ✅  GOOGLE OAUTH SUCCESS — COPY THIS           ║');
    console.log('╠════════════════════════════════════════════════════════╣');
    console.log(`║  GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log('╚════════════════════════════════════════════════════════╝\n');
    console.log('→ Add the above line to backend/.env and restart the server.\n');

    return res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>AGENTiX — OAuth Success</title></head>
        <body style="font-family:monospace;padding:40px;background:#0d1b1f;color:#00c8a0;">
          <h2>✅ Google Calendar Connected!</h2>
          <p style="color:#fff;">Your refresh token has been printed to the backend terminal.</p>
          <p style="color:#aaa;">Copy the <code>GOOGLE_REFRESH_TOKEN=...</code> line into <code>backend/.env</code> and restart.</p>
          <p><a href="http://localhost:5173" style="color:#00c8a0;">← Go back to the website</a></p>
        </body>
      </html>
    `);
  } catch (err) {
    console.error('[OAuth callback error]', err.message);
    return res.status(500).send(`<h2>Token exchange failed: ${err.message}</h2>`);
  }
});

export default router;
