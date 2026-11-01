# Personal website: project & accounts

Last updated: 2026-11-01

This is a **personal** project. It is built and run entirely from personal accounts and a personal laptop, kept separate from any employer systems, accounts, devices or data. Do not reuse work logins, work email or work devices for anything listed here.

## What this is

A personal site for `oliversoee.com`: homepage, About, Projects, and a blog ("Writing"). The main purpose is to publish reflections on the site first, then share them on LinkedIn with a link back.

- **Framework:** [Astro](https://astro.build) (v7), fully static output (no server-side rendering)
- **Content:** Markdown files in `src/content/blog/` and `src/content/projects/`
- **Editor (optional, not yet connected):** Decap CMS at `/admin/`, configured in `public/admin/config.yml`
- **Hosting:** Cloudflare Workers (static assets), deployed automatically from GitHub on every push to `main`
- **Source of truth:** the GitHub repo. The laptop is only a working copy.

For the day-to-day how-to (publishing a post, adding a project, LinkedIn workflow) see `README.md`. For the original launch walkthrough see `LAUNCH-GUIDE-cloudflare.md`. Where those two documents disagree with this one, this one is current (see "Things that differ from the older guides").

## Current status

| Item | Status |
|---|---|
| Astro site scaffolded and building | Done |
| Code on GitHub (`main`) | Done |
| Cloudflare auto-deploy from GitHub | Done and working |
| Preview URL gated behind a login (Cloudflare Access) | Done |
| Custom domain `oliversoee.com` attached | **Not done** |
| Real content (name, tagline, bio, links) | **Not done**, placeholders still in `src/consts.ts` and `src/pages/about.astro` |
| Sample posts/projects deleted | **Not done** |
| `site:` in `astro.config.mjs` set to the real domain | **Not done** (still `https://example.com`) |
| Decap CMS login (OAuth worker) | **Not done**, optional |

## Accounts and logins

Everything below should be a **personal** account. No passwords or tokens belong in this file or in the repo.

| Service | Used for | Identity | Notes |
|---|---|---|---|
| GitHub | Hosts the code; Cloudflare builds from it | Username `Oli-US-DK`, repo `Oli-US-DK/personal-website` | Sign in with the personal GitHub account only. Check the repo visibility setting (see "Open items"). |
| Cloudflare | Hosting, builds, Access login wall, DNS (once the domain is attached) | Personal email (`Oliver_soe@hotmail...` as shown in the dashboard) | The Worker is `personal-website`; the account's workers.dev subdomain is `oliver-soe`. |
| Cloudflare Zero Trust (Access) | Keeps the preview URL private | Same Cloudflare account; team name `morning-night-6529` (Free plan) | Application protects `personal-website.oliver-soe.workers.dev`; policy "Just me"; login method is "Sign in with Cloudflare". |
| Domain registrar | Owns `oliversoee.com` | _TODO: record which registrar and which personal email it is registered to_ | The domain is the portable asset; it stays yours wherever the site is hosted. |
| Claude (AI assistant) | Helps write and maintain the site code | _TODO: record the personal Claude account/email_ | Use the personal subscription, not an employer-provided one. |
| Git commit identity | Author shown on commits | `Oliver Soee <oliver_soe@hotmail.com>` | Set per repo (`git config user.name` / `user.email` without `--global`), so it does not leak into other git work on a shared machine. |

### Where each login happens

- **GitHub:** browser sign-in; Git Credential Manager on the laptop opens a browser window the first time you push.
- **Cloudflare dashboard:** `dash.cloudflare.com`. Zero Trust lives under the "Cloudflare One" / Zero Trust section of the same dashboard.
- **Cloudflare ↔ GitHub:** Cloudflare has an authorized GitHub app connection to the repo. Revoke or change it under GitHub → Settings → Applications.

## Personal laptop setup (from scratch)

Install, in this order:

1. **Node.js** (current LTS or newer; this project needs Node 22.12 or later). Gives you `node` and `npm`.
2. **Git for Windows** (includes Git Credential Manager).
3. **Claude Code** (or whichever Claude interface you use), signed in to the **personal** Claude account.
4. Optional: VS Code or another editor.

Then:

```bash
# pick a normal local folder, NOT a cloud-synced one (see "Gotchas")
mkdir C:\dev
cd C:\dev
git clone https://github.com/Oli-US-DK/personal-website.git
cd personal-website

# per-repo identity (do not use --global on a shared machine)
git config user.name "Oliver Soee"
git config user.email "oliver_soe@hotmail.com"

npm install
npm run dev        # http://localhost:4321, private to this machine
npm run build      # the "does it still compile?" check
```

If GitHub rejects the push with a 403 and names a different account, Windows has cached another GitHub login. Clear it and retry so it prompts for the personal account:

```bash
printf 'protocol=https\nhost=github.com\n\n' | git credential reject
```

## Day-to-day workflow

1. Edit or add Markdown in `src/content/` (or ask Claude to change code).
2. `npm run dev` to check it locally.
3. `npm run build` to confirm it compiles.
4. `git add . && git commit -m "..." && git push`
5. Cloudflare rebuilds and redeploys automatically within a couple of minutes. A failed build never takes the live site down; the previous version stays up.

## Deployment configuration

Cloudflare project settings:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

`wrangler.jsonc` in the repo tells Wrangler to serve the `dist/` folder as static assets:

```jsonc
{
  "name": "personal-website",
  "compatibility_date": "2024-09-23",
  "assets": { "directory": "./dist" }
}
```

## Things that differ from the older guides

The README and launch guide were written assuming classic Cloudflare Pages. In practice:

- "Connect to Git" in Cloudflare now creates a **Worker** project that deploys with `npx wrangler deploy`, not a classic Pages project.
- Without a `wrangler.jsonc`, Wrangler tried to auto-install Astro's Cloudflare SSR adapter, which is not compatible with Astro 7.2.x and broke the build (`renderForPrerender` missing export). The site is static and needs no adapter, so `wrangler.jsonc` is what prevents that. **Do not add `@astrojs/cloudflare`** unless the site gains server-side features and the adapter supports the installed Astro version.
- The default `*.workers.dev` URL is **public** unless gated. It is currently gated with Cloudflare Access. If the Access application is ever deleted or its hostname edited, the preview becomes public immediately.
- In the Access application, the **Subdomain** field must read `personal-website`. Left blank, it protects only the bare `oliver-soe.workers.dev` and the site is not gated.

## Gotchas

- **Do not keep the project in a cloud-synced folder** (Google Drive, OneDrive, Dropbox). `node_modules/` has thousands of small nested files and sync clients lock them, which broke deletes and installs. Keep the working copy in a plain local folder such as `C:\dev\personal-website`. GitHub is the backup.
- `dist/`, `node_modules/`, `.astro/` and `.wrangler/` are git-ignored and should stay that way.
- Keep post filenames lowercase-with-hyphens and do not rename them after publishing; the filename is the URL.

## Open items / next steps

1. **Repo visibility:** the GitHub repo page showed as **Public** when checked, although it was meant to be private. Everything in it, including this file, is world-readable if so. Decide and set it under GitHub → repo Settings → Danger Zone → Change visibility. Cloudflare can build from either.
2. Attach `oliversoee.com` to the Worker (Cloudflare → the `personal-website` Worker → Settings → Domains & Routes). Decide whether to keep Access in front of the new hostname during a soft launch, and whether to turn off the public `workers.dev` URL afterwards (`"workers_dev": false` in `wrangler.jsonc`).
3. Set `site: 'https://oliversoee.com'` in `astro.config.mjs` once the domain works.
4. Replace the placeholders: `src/consts.ts` (name, tagline, LinkedIn, email), `src/pages/about.astro` (bio); delete the sample posts and projects.
5. Optional: Decap CMS OAuth worker so `/admin/` can log in to GitHub.
6. Optional: add "One-time PIN" as a login method in the Access application if the preview should be shareable with someone who has no Cloudflare account.
7. Fill in the two TODO rows in the accounts table (registrar, personal Claude account).

## Keeping personal and work separate

- Personal laptop, personal GitHub, personal Cloudflare, personal Claude account only.
- Do not paste work content, client names or internal material into posts, commits, or AI chats for this project.
- Do not sign in to any of these services from a work-managed browser profile or device.
- The original README and launch guide were drafted in a work-linked Google Drive folder (`04. Learning plan/personal-website/`). The copies in this repo are the working ones; once you are happy with them, remove the copies from the work Drive.
