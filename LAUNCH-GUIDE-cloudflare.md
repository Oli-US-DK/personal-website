# Launch guide — getting oliversoee.com live on Cloudflare

This is the concrete, click-by-click version of the README, specific to Cloudflare. Work top
to bottom. Total hands-on time is roughly 30–45 minutes the first time, most of it waiting for
things to verify.

The order matters: **buy the domain → get the code on GitHub → connect Cloudflare Pages →
attach the domain → turn on the editor.** Don't skip ahead; each step depends on the one before.

---

## Phase 1 — Buy the domain (~10 min)

You can register directly with Cloudflare, which is the cheapest route (they sell at cost, no
markup, free WHOIS privacy).

1. Go to **dash.cloudflare.com** and create a free account (email + password). Verify the email.
2. In the left sidebar: **Domain Registration → Register Domains**.
3. Search **oliversoee** and pick **.com** (~$10–11/yr). If you also want the on-theme one,
   add **oliversoee.ai** (~$60–70/yr) — optional; you can always add it later.
4. Complete checkout with your card. Leave auto-renew **on** (a lapsed domain is painful to
   recover). Registration confirms in a minute or two.

> If Cloudflare's new-domain registration isn't available in your region at checkout, buy
> oliversoee.com at **Porkbun** or **Namecheap** instead (similar price). Everything downstream
> still works — you'll just point the domain's nameservers at Cloudflare later, and I'll walk you
> through that when we get there.

**What you now own:** the domain. That's the one portable asset here — it stays yours no matter
where the site is hosted.

---

## Phase 2 — Put the site's code on GitHub (~10 min)

Cloudflare Pages builds your site from a GitHub repo and redeploys automatically every time the
code changes. So the code needs to live on GitHub first.

1. Install **Node.js** (LTS) from nodejs.org and **Git** from git-scm.com. Accept defaults.
2. Create a free account at **github.com**.
3. Create a new repository — name it `personal-website`, set it **Private**, and don't add any
   files (no README/gitignore — the scaffold already has them).
4. Open a terminal **in this `personal-website` folder** and run, one line at a time:

```bash
npm install          # downloads Astro; do this once
npm run dev          # optional: preview locally at http://localhost:4321, Ctrl+C to stop
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/personal-website.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. After the push, refresh the GitHub page — you
should see all the files.

> Don't want to touch a terminal at all? Install **GitHub Desktop** (a free app), and use it to
> publish this folder to the repo with a couple of clicks instead of the `git` commands above.
> `npm install` / `npm run dev` still need a terminal, but you can skip those and let Cloudflare
> do the building.

---

## Phase 3 — Deploy on Cloudflare Pages (~5 min)

1. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
2. Authorize GitHub, then select your `personal-website` repo.
3. Build settings (Cloudflare usually auto-detects Astro; confirm these):
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Click **Save and Deploy**. In ~1 minute you get a live URL like
   `personal-website-xxx.pages.dev`. Open it — your site is live on the internet.

From here on, **every push to GitHub auto-rebuilds and redeploys.** You never upload files by hand.

---

## Phase 4 — Attach your domain (~5 min + waiting)

1. In your Pages project: **Custom domains → Set up a custom domain**.
2. Enter `oliversoee.com`. Because the domain is already in your Cloudflare account, it wires up
   the DNS automatically — just confirm. (Add `www.oliversoee.com` too if you want both to work.)
3. SSL (the padlock / https) provisions on its own, usually within minutes, occasionally up to a
   few hours. Once done, **https://oliversoee.com** shows your site.
4. Edit `astro.config.mjs` in the scaffold and set `site: 'https://oliversoee.com'`, then commit
   and push. This fixes canonical URLs, the sitemap, and LinkedIn link previews.

> If you bought the domain elsewhere (Porkbun/Namecheap): in Cloudflare add the site first
> (**Add a site**), then copy the two nameservers Cloudflare gives you into your registrar's
> nameserver settings. Propagation takes anywhere from minutes to a day. Then do steps 1–4 above.

**At this point you have a real, free, HTTPS website at your own domain.** Everything below is
about making it *yours* and publishing.

---

## Phase 5 — Make it yours (~30 min, do once)

Edit these files (I can do any of this for you — just ask):

- `src/consts.ts` — your name, tagline, LinkedIn URL, email.
- `src/pages/about.astro` — your real bio. Lead with the VP-of-Enterprise / AI angle for your
  PE and FS audience.
- Delete the two sample posts in `src/content/blog/` and the sample projects in
  `src/content/projects/` once you've seen how they work.

Commit and push each change; the live site updates within a minute.

---

## Phase 6 — Turn on the browser editor, so you never touch code to publish (~15 min)

The scaffold includes **Decap CMS** — a clean web editor at `oliversoee.com/admin/` that writes
and publishes posts for you (it commits to GitHub behind the scenes, which auto-deploys).

1. Open `public/admin/config.yml` and set `repo:` to `YOUR-USERNAME/personal-website`.
2. Decap needs permission to log you into GitHub. On Cloudflare this means deploying a tiny free
   OAuth helper (a Cloudflare Worker). This is the one genuinely fiddly step — **bring it to me
   and I'll set it up with you**; it's a 10-minute job the first time.
3. Once connected, go to `https://oliversoee.com/admin/`, log in with GitHub, and write posts in
   a normal editor. No terminal, no Markdown, no git.

You can skip this entirely and just write Markdown files if you prefer — the CMS is a convenience,
not a requirement.

---

## What "creating the website" actually looks like from here

The site itself is built — the scaffold is a complete, working Astro site (homepage, About,
Projects, and a blog). "Creating the website" from your side is really three ongoing things, not
a one-time build:

1. **Personalize it once** (Phase 5): your name, bio, links. Optionally ask me to restyle the
   homepage or adjust the layout to match how you want to present to PE/FS buyers.
2. **Publish reflections** (the actual point): each post is one Markdown file or one entry in the
   `/admin/` editor. Write → publish → it's live in a minute.
3. **Feed LinkedIn from it:** write on your site first (so Google credits you as the source),
   then share the idea on LinkedIn with the link in the first comment. See the README's "LinkedIn
   workflow" section — that loop is the whole reason for owning this.

## Your first-week checklist

- [ ] Phase 1–4 done: oliversoee.com resolves over https to your site.
- [ ] Phase 5: About page and `consts.ts` reflect the real you.
- [ ] Write and publish your **first reflection** (bring me a draft or an idea and I'll help shape it).
- [ ] Share it on LinkedIn using the teaser + first-comment-link pattern.
- [ ] Decide whether you want the `/admin/` editor now or later.

## Where I come in

Anything that touches *your* accounts — buying the domain, GitHub login, Cloudflare signup, entering
payment or DNS — is yours to click through (I can't and shouldn't enter your credentials). But
bring me: the OAuth/CMS setup, any build-error log, "restyle the homepage," "add a tags page or
newsletter signup," or "help me draft/edit a post," and I'll handle those with you.
