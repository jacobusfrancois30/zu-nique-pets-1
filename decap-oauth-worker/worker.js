/* =====================================================================
   Decap CMS to GitHub OAuth broker, as a Cloudflare Worker
   ---------------------------------------------------------------------
   NOT REQUIRED if the worker at
   https://divine-math-b409.jacobusfrancois30.workers.dev is already
   working. This is a spare, in case that one is ever lost or you want to
   run your own: about 80 lines, free on the Workers plan, no dependencies.

   Cloudflare Pages has no built-in identity service, which is why the
   broker exists at all: it completes GitHub's OAuth handshake so /admin/
   and the Publish button can sign you in.

   SETUP
   1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
        Homepage URL:              https://zuniquepets.co.za
        Authorization callback URL: https://<your-worker>.workers.dev/callback
      Copy the Client ID and generate a Client Secret.

   2. Deploy this worker:
        npm install -g wrangler
        wrangler login
        wrangler deploy
        wrangler secret put GITHUB_CLIENT_ID
        wrangler secret put GITHUB_CLIENT_SECRET

   3. Put the worker's URL into admin/config.yml as `base_url`, and into
      the CONFIG block at the top of assets/editor.js as `oauth`.
   ===================================================================== */

const GITHUB_AUTHORIZE = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN = 'https://github.com/login/oauth/access_token';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth') return handleAuth(url, env);
    if (url.pathname === '/callback') return handleCallback(url, env);

    return new Response(
      'Decap CMS OAuth broker is running.\n\nEndpoints: /auth and /callback',
      { headers: { 'content-type': 'text/plain; charset=utf-8' } }
    );
  }
};

function handleAuth(url, env) {
  if (!env.GITHUB_CLIENT_ID) return err('GITHUB_CLIENT_ID is not set on this worker.');

  const redirectUri = `${url.origin}/callback`;
  const state = crypto.randomUUID();

  const target = new URL(GITHUB_AUTHORIZE);
  target.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  target.searchParams.set('redirect_uri', redirectUri);
  target.searchParams.set('scope', url.searchParams.get('scope') || 'repo,user');
  target.searchParams.set('state', state);

  return Response.redirect(target.toString(), 302);
}

async function handleCallback(url, env) {
  const code = url.searchParams.get('code');
  if (!code) return err('GitHub did not return an authorisation code.');
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return err('GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET are not set on this worker.');
  }

  const res = await fetch(GITHUB_TOKEN, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json', 'user-agent': 'decap-oauth-worker' },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/callback`
    })
  });

  const data = await res.json().catch(() => ({}));
  if (!data.access_token) return err(data.error_description || 'GitHub refused the token exchange.');

  return popup('success', { token: data.access_token, provider: 'github' });
}

function err(message) {
  return popup('error', { message });
}

/* Decap listens for two messages on the popup: a handshake, then the result. */
function popup(status, payload) {
  const body = status === 'success' ? JSON.stringify(payload) : JSON.stringify(payload);
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Signing you in…</title>
<style>body{font:600 15px/1.5 system-ui,sans-serif;background:#00272E;color:#F4FAF8;display:grid;place-items:center;height:100vh;margin:0;text-align:center;padding:1.5rem}</style>
</head><body>
<p>${status === 'success' ? 'Signed in — you can close this window.' : 'Sign-in failed: ' + escapeHtml(payload.message || '')}</p>
<script>
(function () {
  function send(win) {
    win.postMessage('authorization:github:${status}:${escapeJs(body)}', '*');
  }
  window.addEventListener('message', function (e) {
    if (e.data === 'authorizing:github') send(window.opener);
  }, false);
  if (window.opener) {
    window.opener.postMessage('authorizing:github', '*');
    setTimeout(function () { send(window.opener); }, 400);
  }
})();
</script>
</body></html>`;
  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function escapeJs(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/</g, '\\u003c');
}
