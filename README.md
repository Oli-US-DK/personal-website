# Personal website — run & maintain guide

A fast, SEO-friendly personal site built with [Astro](https://astro.build): a homepage, an
About page, a Projects page, and a blog (your "Writing" section). Posts and projects are plain
Markdown files. A browser-based editor (Decap CMS) is wired up so you don't have to touch the
command line to publish once it's deployed.

This README is both your setup manual and your operating manual. Work through Part 1 once;
Part 2 is the day-to-day; Part 3 is the upkeep rhythm.

---

## What's in here

```
personal-website/
  astro.config.mjs        Site config — set your real domain here
  package.json            Dependencies and scripts
  src/
    consts.ts             Your name, tagline, social links (edit these first)
    content.config.ts     Defines the "blog" and "projects" content types
    content/
      blog/               One Markdown file per post
      projects/           One Markdown file per project
    pages/                The actual routes (home, about, projects, blog)
    layouts/ components/   Shared page shell and header/footer
    styles/global.css     All styling (light + dark mode already handled)
  public/
    admin/                Decap CMS — the browser-based editor
    favicon.svg
```

You mostly live in two places: `src/content/` (your writing) and `src/consts.ts` /
`src/pages/about.astro` (who you are).

---

## Part 1 — One-time setup

### 1. Install the tools (once on your machine)

Install [Node.js](https://nodejs.org) (the LTS version). That gives you `node` and `npm`.

### 2. Install the project's dependencies

Open a terminal in this folder and run:

```bash
npm install
```

This reads `package.json` and downloads Astro into a `node_modules/` folder. You only re-run
this when dependencies change.

### 3. Run it locally

```bash
npm run dev
```

Open the URL it prints (usually `http://localhost:4321`). The site reloads automatically as you
edit files. Press `Ctrl+C` to stop.

### 4. Make it yours

- `src/consts.ts` — your name, the site tagline, your LinkedIn URL and email.
- `astro.config.mjs` — change `site:` to your real domain (powers canonical URLs, the sitemap,
  and link previews). Do this once you've bought the domain (step 6).
- `src/pages/about.astro` — write your real bio.
- Delete the two sample posts in `src/content/blog/` and the sample projects in
  `src/content/projects/` when you're ready.

### 5. Put it on GitHub

Create a free [GitHub](https://github.com) account if you don't have one, make a new **private**
(or public) repository, and push this folder to it. GitHub is both your backup and the thing your
host and your CMS connect to. From this folder:

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/personal-website.git
git push -u origin main
```

### 6. Buy your domain

Buy `yourname.com` from any registrar (Cloudflare Registrar is near-cost; Namecheap and Porkbun
are also fine). ~$10–20/year. You own this regardless of where the site is hosted — it's the one
asset that makes you portable.

### 7. Deploy (free hosting)

Use **Cloudflare Pages**, **Netlify**, or **Vercel** — all have free tiers that are more than
enough. The flow is the same for each:

1. Sign up and click "connect a Git repository," then pick your repo.
2. When asked for build settings, use: **build command** `npm run build`, **output directory**
   `dist`. (These hosts usually auto-detect Astro and fill this in.)
3. Deploy. You get a live URL in ~1 minute.
4. In the host's dashboard, add your custom domain and follow its DNS instructions.

From now on, **every push to GitHub auto-deploys.** You never manually upload files.

### 8. Turn on the browser-based editor (Decap CMS) — optional but recommended

This is what lets you write posts from a clean web editor instead of editing Markdown by hand.

1. Open `public/admin/config.yml` and set `repo:` to `YOUR-USERNAME/personal-website`.
2. Decap needs a way to log you into GitHub. The simplest path is to add Decap's OAuth via your
   host. On Netlify this is built in (enable Identity + Git Gateway). On Cloudflare/Vercel you
   deploy a tiny free OAuth helper — search "Decap CMS <your host> OAuth" for the current
   one-click options.
3. Once connected, go to `https://yourdomain.com/admin/` to write. It commits to GitHub for you,
   which auto-deploys. (You can skip this entirely and just edit Markdown files + push — the CMS
   is a convenience, not a requirement.)

---

## Part 2 — Day-to-day: publishing a post

### The simple way (Markdown)

Create a new file in `src/content/blog/`, e.g. `the-real-cost-of-rag.md`:

```markdown
---
title: "The real cost of RAG"
description: "A one-line summary used in lists and link previews."
pubDate: 2026-06-15
tags: ["ai", "architecture"]
draft: false
---

Write the post here in Markdown. Headings with ##, **bold**, lists, > quotes, and code blocks
all work.
```

The block at the top (the "frontmatter") is required. `draft: true` keeps a post off the live
site so you can work on it safely. Set it to `false` to publish.

The filename becomes the URL: `the-real-cost-of-rag.md` → `/blog/the-real-cost-of-rag/`. Keep
filenames lowercase-with-hyphens and don't rename them after publishing (it would break the link
and lose SEO).

To publish: commit and push (or just use the `/admin/` editor). The site rebuilds itself.

### Adding a project

Same idea, in `src/content/projects/`. Use the `order` field to control sort (higher shows
first).

### Images

Drop images in `public/uploads/` and reference them as `/uploads/filename.jpg`. Compress large
photos first (aim for under ~300 KB) so pages stay fast.

---

## The LinkedIn workflow (your main reason for this)

Your engine is: **write on your site → share on LinkedIn → link back.** Two reliable patterns:

1. **Teaser + link.** Write a strong standalone LinkedIn post (the hook and key idea), then point
   people to the full piece. LinkedIn slightly suppresses posts with an external link in the body,
   so put the link in the **first comment** and say "full piece linked below 👇".
2. **Full repost with canonical.** If you paste the entire essay into a LinkedIn Article, your own
   site should remain the original. Publish on your site *first* so Google indexes you as the
   source. Don't republish the full text on other platforms (Medium etc.) without pointing their
   canonical setting back to your URL — otherwise the copy can outrank you.

Your site already outputs proper link previews (title, description, image) and canonical tags, so
shared links look clean and SEO credit flows to you.

---

## Part 3 — Running & maintaining it: the operating model

Think of this in three layers.

### Technical maintenance (low, but not zero)

- **Dependency updates.** Every month or two, run `npm update`, then `npm run build` to confirm it
  still compiles, then push. Occasionally a major Astro version needs a small change — their
  upgrade guide is good, and this is exactly the kind of fix to bring to me.
- **When a build breaks**, the host shows you the error log. Copy it to me and I'll tell you the
  fix. Because deploys are atomic, a failed build never takes your live site down — the previous
  version stays up.
- **Backups** are automatic: your content lives in GitHub, and every deploy is a snapshot. Nothing
  to manage.
- **Cost** stays at ~$10–20/year (domain only) unless you outgrow the free hosting tier, which for
  a personal blog is very unlikely.

A realistic time budget: ~30 min of setup attention up front, then ~15–20 min every month or two.
That's the price of owning it instead of renting a Squarespace.

### Operational / editorial (where the real value is)

The site is a tool; the habit is what builds your profile. A sustainable cadence:

- **Cadence over volume.** One thoughtful post every 2–4 weeks beats sporadic bursts. Pick a slot
  (e.g. "first draft Friday, publish Tuesday") and protect it.
- **Keep an idea list.** A running note of post ideas — usually the question a customer asked you
  that week, or the thing you just had to learn. Your job hands you material constantly.
- **Repurpose, don't reinvent.** Each post → one LinkedIn post. A few related posts → a talk or a
  longer piece later.
- **Review quarterly.** Once a quarter, update the About and Projects pages, retire anything stale,
  and skim which posts got traction (your host or a free analytics tool like Plausible/Cloudflare
  Web Analytics shows this) to steer what you write next.

### A suggested first month

1. Week 1: finish setup (Parts 1), customize About, deploy, connect domain.
2. Week 2: publish your first real reflection; share on LinkedIn with the teaser pattern.
3. Weeks 3–4: publish a second; note what felt hard and tune the workflow.

---

## Quick command reference

| Command | What it does |
|---|---|
| `npm install` | Install/refresh dependencies (after pulling changes or updating) |
| `npm run dev` | Run locally with live reload at `localhost:4321` |
| `npm run build` | Build the production site into `dist/` (also your "does it still compile?" check) |
| `npm run preview` | Preview the built site locally |
| `git add . && git commit -m "..." && git push` | Publish — triggers an auto-deploy |

---

## When to ask me for help

Bring me: a build error log, "I want to add a newsletter signup / dark-mode toggle / tags page,"
"redesign the homepage," "this Astro upgrade broke something," or "draft/edit a post." Setup
steps that involve your own accounts (GitHub login, host signup, DNS) are yours to click through,
but I can walk you through any of them step by step.
