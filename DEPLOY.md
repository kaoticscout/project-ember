# Deploy to GitHub Pages

The app is built for **project sites** like `https://<user>.github.io/project-ember/`.

## Why you might see a 404

1. **Base path not set at build time**  
   The workflow sets `NEXT_PUBLIC_BASE_PATH=/${{ repo name }}` so assets and routes use `/project-ember/`. If you build without this (e.g. locally or in an old workflow), the export expects the site at `/` and breaks when served at `/project-ember/`.

2. **Pages not using the GitHub Actions deployment**  
   The site must be deployed from the **GitHub Actions** workflow, not from a branch.

## Setup (one-time)

1. In the repo: **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Push to `main` (or run the workflow manually). The “Deploy to GitHub Pages” workflow will build and deploy.

## What the workflow does

- Builds from `ember-toolkit` with `NEXT_PUBLIC_BASE_PATH=/project-ember` (and `GITHUB_REPOSITORY` for Next.js `basePath`).
- Runs the postbuild script (adds `.nojekyll` in `out/`).
- Uploads `ember-toolkit/out` as the Pages artifact so the site is served at `https://<user>.github.io/project-ember/`.

After the first successful run, the site should load at that URL. If you still see a 404, confirm in **Settings → Pages** that the source is **GitHub Actions** and that the latest workflow run completed successfully.
