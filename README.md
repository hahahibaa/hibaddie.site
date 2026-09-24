# hibaddie.co

Personal site built with [Astro](https://astro.build). It's fully static: no backend, no tracking, no client-side JavaScript. Everything you'd want to edit is a Markdown file.

Search the project for `TODO` to find every placeholder.

---

## Run locally

You need [Node.js](https://nodejs.org) 22 or newer.

```bash
npm install
npm run dev        # http://localhost:4321, reloads as you edit
npm run build      # outputs the finished site to dist/
npm run preview    # serves dist/ to check the production build
```

---

## Where things live

| What you want to change              | File                                   |
| ------------------------------------ | -------------------------------------- |
| Name, tagline, photo, social links   | `src/content/home/intro.md`            |
| About paragraphs                     | `src/content/home/about.md`            |
| Work / experience rows               | `src/content/home/experience.md`       |
| Achievements                         | `src/content/home/achievements.md`     |
| Projects (one file each)             | `src/content/projects/*.md`            |
| Test Bench experiments (one file each) | `src/content/bench/*.md`             |
| Test Bench title + 2-line intro      | `src/lib/bench.ts`                     |
| SEO title/description defaults       | `src/lib/site.ts`                      |
| Colors, fonts, spacing               | `src/styles/global.css` (top of file)  |
| Favicon / social preview image       | `public/favicon.svg`, `public/og-default.png` |

**Your photo:** put it in `public/` (e.g. `public/me.jpg`, square, about 300×300 px) and set `photo: /me.jpg` in `intro.md`.

**Images in projects or experiments:** put them in `public/images/` and reference them as `![description](/images/file.jpg)`.

---

## Add a new project

1. Create `src/content/projects/my-project.md`. The filename becomes the URL: `/projects/my-project/`.
2. Start it with this frontmatter:

   ```markdown
   ---
   title: Line-following robot
   description: One sentence shown in the list and in link previews.
   date: 2026-05-01          # only the year is displayed; used for sorting
   tools: [Arduino, PID]     # optional
   repo: https://github.com/hahahibaa/line-follower   # optional
   link: https://example.com # optional (demo, paper, video)
   featured: true            # true = also shown on the home page
   draft: false              # true = hidden everywhere
   ---

   Write the project page here in Markdown.
   ```

3. Save it. It shows up in the projects list, on the home page (if `featured`), and in the sitemap.

## Add something to The Test Bench

The Test Bench (`/bench/`) is for work in progress, quick experiments and things that may never be finished.

1. Copy `src/content/bench/_example-experiment.md` to `src/content/bench/my-experiment.md`. Removing the leading `_` is what makes it visible.
2. Edit `title`, `description`, `date`, `status` (free text such as `in progress`, `works-ish` or `abandoned`) and the body.
3. It appears on `/bench/` and in the 3 latest entries on the home page. The list shows the status, or the date if you leave `status` out.

Set `draft: true` to hide an entry. When an experiment grows up, move the file into `src/content/projects/` and add the project fields.

---

## Deploy to Cloudflare Pages

### 1. Push to GitHub

Create an **empty** repository on GitHub (e.g. `hahahibaa/hibaddie-site`, with no README or license), then run this in the project folder:

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/hahahibaa/hibaddie-site.git
git push -u origin main
```

### 2. Connect Cloudflare Pages

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and go to **Workers & Pages → Create → Pages → Connect to Git**.
2. Authorize GitHub and select the `hibaddie-site` repo.
3. Use these build settings:

   | Setting                | Value           |
   | ---------------------- | --------------- |
   | Framework preset       | Astro           |
   | Build command          | `npm run build` |
   | Build output directory | `dist`          |
   | Root directory         | *(leave empty)* |

   The `.node-version` file tells Cloudflare to use Node 22. If a build complains about the Node version, add an environment variable `NODE_VERSION` = `22`.
4. Click **Save and Deploy**. You'll get a `*.pages.dev` URL in a minute or two.

After that, every `git push` to `main` redeploys automatically. Pushes to other branches get their own preview URLs.

### 3. Add the custom domain (hibaddie.co + www)

For the root domain (`hibaddie.co`) to work on Pages, the domain's DNS must be managed by Cloudflare.

1. **Add the domain to Cloudflare** (skip if it's already there): go to **Account home → Add a domain**, enter `hibaddie.co`, pick the Free plan, then replace the nameservers at your domain registrar with the two Cloudflare gives you. This can take from a few minutes to a few hours.
2. **Attach both hostnames to the Pages project:** open the Pages project, go to **Custom domains → Set up a custom domain**, add `hibaddie.co`, and confirm. Repeat for `www.hibaddie.co`. Cloudflare creates the DNS records and the SSL certificates automatically.
3. **Redirect www to the root domain** so there's only one canonical URL. Go to the `hibaddie.co` zone and open **Rules → Redirect Rules → Create rule**, then:
   - Choose the **"Redirect from WWW to root"** template, or set it up manually:
   - When: *Hostname equals* `www.hibaddie.co`
   - Then: *Dynamic* redirect to `concat("https://hibaddie.co", http.request.uri.path)`, status **301**, **preserve query string** on
4. Check that `https://hibaddie.co` loads and that `https://www.hibaddie.co/projects/` redirects to `https://hibaddie.co/projects/`.

### 4. After launch (optional)

- Submit `https://hibaddie.co/sitemap-index.xml` in [Google Search Console](https://search.google.com/search-console).
- Replace `public/og-default.png` (1200×630) with your own image for nicer link previews.
