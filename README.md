# Game Dev & Design

A practical guide and reference for students, covering my daily game development and design workflow and linking to resources for further exploration.

**[Browse the guide](https://aefreedman.github.io/process/)** · [Read the Markdown](content/index.md)

## Writing in Obsidian

The canonical notes and their attachments live in `content/`. Open that folder as an Obsidian vault, or continue opening the repository and edit the notes inside `content/`. No export or duplicate copy is needed.

The repository and guide are public. Quartz builds the contents of `content/`; repository documentation and website source files are outside that directory. Obsidian configuration and trash are not versioned.

`content/index.md` is the website landing page, linking to four substantial notes:

- [Principles](content/principles.md)
- [Development workflow](content/development-workflow.md)
- [Tools and setup](content/tools-and-setup.md)
- [Unity](content/unity.md)

Keep filenames lowercase and hyphenated, with readable titles in frontmatter. Notes have one canonical home and link to related topics rather than duplicating explanations. Wikilinks, heading links, callouts, and standard Markdown are supported.

## Local preview

Use Node.js 24 (see `.node-version`) and npm 10.9.2 or later. From the repository root:

```sh
npm ci
npm run dev
```

Open http://localhost:8080. Changes to notes reload automatically; stop with Ctrl+C.

To check the production build, including internal links and search data:

```sh
npm run build
npm run test:site
```

## Publishing

Use normal Git branches, commits, and pull requests. Pull requests build and validate the site without publishing. Merging into `main` builds and deploys to GitHub Pages.

One-time setup: in **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**. The site will publish at https://aefreedman.github.io/process/ after the deployment workflow succeeds.

Do not use `quartz sync` for this repository: its upstream branch assumptions differ from our `main`/feature-branch workflow.

## Website configuration

- `quartz.config.yaml`: site title, URL, theme, plugins, and layout.
- Search, page contents, backlinks, link previews, and light/dark modes are enabled.
- The graph and analytics are disabled.
- `.github/workflows/site.yml`: validation and Pages deployment.

## Licensing

Unless otherwise noted, the original guide content in `content/` and its published form is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/): attribution, noncommercial use, and ShareAlike. See [LICENSE.txt](LICENSE.txt) for the full legal terms and [the guide's licensing page](content/license.md) for scope and suggested attribution.

Quartz software remains MIT-licensed under [QUARTZ-LICENSE.txt](QUARTZ-LICENSE.txt). Third-party material and linked resources retain their respective licenses; the content license does not apply to them.

## Quartz source

The website engine is [Quartz 5](https://quartz.jzhao.xyz/), vendored from [jackyzha0/quartz](https://github.com/jackyzha0/quartz) at commit `97a2d05f80c4c50534959b1d0d41cc4b3895625e`.

Its MIT license is preserved in `QUARTZ-LICENSE.txt`; that license covers the upstream software, not the guide content.

Local engine patch: the inline script loader resolves imports from the actual source path so builds also work when the Obsidian vault is accessed through a Windows junction.

For engine upgrades, compare a newer upstream revision on a feature branch and retain our content, configuration, README, scripts, and deployment workflow. Then run the build and validation commands above before merging.
