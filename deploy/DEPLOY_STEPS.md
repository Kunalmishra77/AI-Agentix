# AI Agentix — Go-live steps (Google Sheet, Google Analytics, VPS deploy)

Order: **A → B → C**. A and B take ~10 minutes each in the browser. C is on the VPS (SSH).
Never paste passwords or tokens into GitHub, chat groups or this file — only into `server/.env` on the VPS
and the Apps Script "Script properties".

---

## A. Google Sheet for leads (browser, ~10 min)

1. Log in to the Google account that should own the leads sheet (currently **kunal.mishra.50999@gmail.com**) → open <https://sheets.new> → name it **AI Agentix Website Leads**.
2. Menu **Extensions → Apps Script**. A new tab opens with a file `Code.gs`.
3. Delete everything in `Code.gs`, paste the full content of
   [`server/docs/google-sheet-apps-script.gs`](../server/docs/google-sheet-apps-script.gs), click **Save** (disk icon).
4. Left sidebar **⚙ Project Settings** → scroll to **Script properties** → **Add script property**:
   - Property: `LEADS_TOKEN`
   - Value: the secret token you were given (one long line, no spaces) → **Save script properties**.
4b. In the editor toolbar choose the function **setupSheet** → **Run** → **Review permissions** → pick
   the same account that owns the sheet → Advanced → Go to … → **Allow**. The sheet now has a **Leads** tab with headers.
   *If you see "Error 401: invalid_client — The OAuth client is not fully created yet": the new project is still
   being set up by Google. Wait 10–15 minutes, reload the Apps Script page and Run again. Make sure the popup shows the
   account that owns the sheet.*
5. Top right **Deploy → New deployment** → gear icon next to "Select type" → **Web app**:
   - Description: `Website leads`
   - Execute as: **Me** (the sheet owner)
   - Who has access: **Anyone**  (safe — every request without the token is rejected)
   - **Deploy** → Google asks for permission → **Authorize access** → choose the account →
     "Google hasn't verified this app" → **Advanced → Go to … (unsafe)** → **Allow**
     (it is your own script; it only writes to this sheet).
6. Copy the **Web app URL** (ends with `/exec`). Keep it for step C4.
7. Quick test (optional): open the `/exec` URL in the browser — you will see an error page; that's fine
   (the script only accepts POST). The first real lead will create the **Leads** tab with headers.

If you change the script later: **Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy**
(the URL stays the same).

---

## B. Google Analytics 4 (browser, ~10 min)

1. Open <https://analytics.google.com> with myai@ai-agentix.com → **Admin (⚙) → Create → Property**.
2. Property name `AI Agentix Website`, time zone **India**, currency **INR** → Next → business details → Create.
3. Choose platform **Web** → Website URL `https://ai-agentix.com`, stream name `Website` →
   keep **Enhanced measurement ON** → **Create stream**.
4. Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`) and send it to the developer
   (it is public, not a secret). It goes into `frontend/src/data/site.js` → `analytics.ga4Id`.
   Once it's in, the cookie banner appears and tracking starts only for visitors who click **Accept**.
5. After go-live: **Admin → Events** → mark `generate_lead` as a **Key event** (conversion).
   For Google Ads, link GA4 to Ads and import `generate_lead`, or use the URL rule "page contains `/thank-you`".

---

## C. Deploy on the VPS (SSH, ~20–30 min)

You need: SSH login to the VPS (`76.13.250.173`), and `sudo` rights.

### C1. Log in and find the current setup

```bash
ssh root@76.13.250.173            # or your usual user@76.13.250.173
pm2 ls                            # note the NAME of the API process (e.g. ai-agentix-backend)
pm2 describe <NAME> | grep -E "script path|exec cwd|interpreter"
node -v                           # must be v20 or newer
```

From `exec cwd` you get the repository folder. Example: if exec cwd is `/var/www/ai-agentix/server`
then the repo folder (**APP_DIR**) is `/var/www/ai-agentix`.

```bash
cd /var/www/ai-agentix            # ← your APP_DIR
git remote -v                     # must show github.com/Kunalmishra77/AI-Agentix
git branch --show-current         # the branch the VPS uses (probably master)
git status --short                # should be empty (no local edits)
ls server frontend                # both folders must exist
```

**Stop and ask the developer** (send the output of the commands above) if:
- `pm2 describe` shows a script other than `server/src/server.mjs` (e.g. an old `backend/server.js`),
- `git status --short` lists files, or `node -v` is lower than v20.

### C2. Back up (takes seconds)

```bash
cd /var/www/ai-agentix
cp server/.env ~/server.env.backup-$(date +%F)
tar czf ~/dist-backup-$(date +%F).tgz frontend/dist
```

### C3. Folder for leads

```bash
sudo mkdir -p /var/lib/ai-agentix/leads
sudo chown -R $(whoami) /var/lib/ai-agentix      # run as the same user that runs pm2
chmod 700 /var/lib/ai-agentix/leads
```

### C4. Settings in `server/.env`

```bash
nano server/.env
```

Keep the existing lines, and make sure these lines exist (edit or add; one setting per line):

```
NODE_ENV=production
PORT=5000
ALLOWED_ORIGINS=https://ai-agentix.com,https://www.ai-agentix.com
TRUST_PROXY_HOPS=1
LEADS_DIR=/var/lib/ai-agentix/leads

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=myai@ai-agentix.com
SMTP_PASS=<Gmail app password, 16 letters, no spaces>
LEAD_FROM=myai@ai-agentix.com
LEAD_NOTIFY_TO=myai@ai-agentix.com

GOOGLE_SHEET_WEBHOOK_URL=<the /exec URL from step A6>
GOOGLE_SHEET_WEBHOOK_TOKEN=<same token as LEADS_TOKEN in step A4>

OPENAI_API_KEY=<new OpenAI key, or leave empty for the free assistant>
LLM_DAILY_LIMIT=300
```

Save: `Ctrl+O`, `Enter`, `Ctrl+X`.

> If the site is behind **two** proxies (Caddy → nginx → Node), set `TRUST_PROXY_HOPS=2`.
> Check with `systemctl is-active caddy` — if it prints `active`, use 2.

If you set an OpenAI key: in <https://platform.openai.com> → **Settings → Limits**, set a monthly budget
(e.g. $10) so the bill can never exceed it.

### C5. Get the new code

The new code is on GitHub in the branch `fix/website-audit-2026-10`. On GitHub:
**Pull requests → New pull request → base: `master` ← compare: `fix/website-audit-2026-10` → Create → Merge**.

(If the VPS uses a branch other than `master`, merge into that branch instead.)

### C6. Deploy (no downtime)

```bash
cd /var/www/ai-agentix
APP_DIR=/var/www/ai-agentix BRANCH=master PM2_APP=<NAME from C1> bash deploy/deploy.sh
```

It pulls the code, installs packages, runs the 18 server tests, rebuilds the assistant knowledge, builds the
website into `dist-next`, swaps it in (old site kept in `dist-prev`), restarts the API and checks it.
It stops at the first error without touching the live site. It takes 3–6 minutes.

Expected at the end: `{"ok":true}`, `home 200`, `thank-you 200`, the start of `sitemap.xml`, and pm2 `online`.

Confirm the API picked up the settings:

```bash
pm2 logs <NAME> --lines 20 --nostream
# look for:  [leads] storing in /var/lib/ai-agentix/leads · email: on · sheet: on
```

### C7. nginx (security headers, compression, real 404)

```bash
sudo nginx -T > ~/nginx-before.txt          # full current config, for backup/comparison
grep -n "server_name\|root\|try_files\|proxy_pass" ~/nginx-before.txt
```

Then:
1. `sudo cp deploy/nginx-agx-security-headers.conf /etc/nginx/snippets/`
2. Open the site's config (the file that contains `server_name ai-agentix.com`, usually in
   `/etc/nginx/sites-available/`) and, inside that `server { … }` block, apply the changes shown in
   `deploy/nginx-recommended.conf`: `server_tokens off;`, the `include snippets/…` lines, `gzip_static on;`,
   the cache `location` blocks, and replace `try_files $uri $uri/ /index.html;` with
   `try_files $uri $uri/index.html =404;` plus `error_page 404 /404.html;`.
   Keep your existing `listen`, SSL and `root` lines.
3. `sudo nginx -t` → must say *syntax is ok / test is successful*. Only then: `sudo systemctl reload nginx`.
4. If anything breaks: restore the file you edited from `~/nginx-before.txt` and reload again.

Not sure about step C7? Send `~/nginx-before.txt` (it contains no passwords) to the developer — it can be done later;
the website works without it.

### C8. Check the live site (5 minutes)

1. Open https://ai-agentix.com in a private window → the page loads; WhatsApp button bottom-left opens
   **+91 92171 67347**; lead-form icon bottom-right; "Ask AI" above it.
2. `/contact` → fill the Free AI Audit form with name **AUDIT TEST**, your phone, `test@example.invalid`,
   tick the consent box → Submit → **Thank-you page in the same tab**.
3. Within a minute: email "New lead: …" in myai@ai-agentix.com (check Spam the first time and mark *Not spam*),
   and a new row in the Google Sheet.
4. Ask the assistant "What services do you offer?" → it answers.
5. On the VPS: `cd server && npm run leads -- --pending` → `email: 0 not delivered`, `sheet: 0 not delivered`.
6. https://ai-agentix.com/sitemap.xml and https://ai-agentix.com/robots.txt show ai-agentix.com URLs.

Delete the test rows from the Sheet afterwards if you like.

### Rollback (if something is wrong)

```bash
cd /var/www/ai-agentix/frontend && mv dist dist-bad && mv dist-prev dist      # previous website back
cd /var/www/ai-agentix && git log --oneline -3                                  # note the previous commit
git checkout <previous commit> -- server && cd server && npm ci && pm2 reload <NAME>   # previous API
```

### Day-to-day

- Leads list: `cd /var/www/ai-agentix/server && npm run leads` · export: `npm run leads -- --csv > leads.csv`
- Future updates: merge to `master` on GitHub, then run the C6 command again.
