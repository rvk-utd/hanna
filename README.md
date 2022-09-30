# Hanna for Developers

Here are all the main developer resources (libraries/tools/documentation) for
Hanna design system, together in one happy monorepo.

This repo only contains source code, tests, and documentation sources.

The code in this repo **manages** a couple of production servers. One
([styles.reykjavik.is](https://styles.reykjavik.is)) for centralized hosting
of CSS files, and various Hanna-related assets, and another
([hanna-docs.reykjavik.is](https://hanna-docs.reykjavik.is)) serving published
code documentation.

The contents of the servers are stored in their own git repositories
([hanna-styles](https://github.com/rvk-utd/hanna-styles) and
[hanna-server-docs](https://github.com/rvk-utd/hanna-server-docs)). Both of
these repos are set up as git submodules in this monorepo, and build scripts
push static build-results into them.

**Chapters below:**

<!-- prettier-ignore-start -->

- [Modules in This Repo](#modules-in-this-repo)
- [Overall Design Principles](#overall-design-principles)
- [Setup / Contribution](#setup--contribution)
  - [System requirements](#system-requirements)
  - [Installation](#installation)
  <!-- prettier-ignore-end -->

## Modules in This Repo

**Code Libraries:**

- **[`hanna-css`](modules/hanna-css/)**

  - CSS styles and related assets for all Hanna components.
  - Publishes a TypeScript helper library as the npm package
    [@reykjavik/hanna-css](https://www.npmjs.com/package/@reykjavik/hanna-css)
  - Publishes CSS files and related (typo)graphic assets to
    [styles.reykjavik.is](https://styles.reykjavik.is).  
    (Builds into `/style-server/public/css/v${version}`, a part of the
    submodule repo [hanna-styles](https://github.com/rvk-utd/hanna-styles).)

- **[`hanna-react`](modules/hanna-react/)**

  - React component library for developers implementing Hanna-themned UIs.
  - The reference implementation of the Hanna HTML patterns.
  - Published as the npm package
    [@reykjavik/hanna-react](https://www.npmjs.com/package/@reykjavik/hanna-react).

- **[`hanna-utils`](modules/hanna-utils/)**
  - A collection of vanilla JavaScript functions and constants that are
    helpful when using the Hanna design system.
  - Published as the npm package
    [@reykjavik/hanna-utils](https://www.npmjs.com/package/@reykjavik/hanna-utils).

**WIP Code Libraries:**

- **[`hanna-sprinkles`](modules/hanna-sprinkles/)**

  - Vanilla JavaScript "sprinkles" that progressively enhance server-rendered
    HTML components.
  - **TODO:**
    - Publishes JavaScript module files to
      [styles.reykjavik.is](https://styles.reykjavik.is).  
      (Builds into `/style-server/public/sprinkles/v${version}`, a part of the
      submodule repo [hanna-styles](https://github.com/rvk-utd/hanna-styles).)
    - Published as the npm package
      [@reykjavik/hanna-sprinkles](https://www.npmjs.com/package/@reykjavik/hanna-sprinkles).

- **[`hanna-twig`](modules/hanna-twig/)**

  - [Twig](https://twig.symfony.com/) templates used by the Drupal CMS driving
    the site www.reykjavik.is.
  - **TODO:**
    - Make the templates completely CMS-agnostic and pure/presentational, to
      allow use with WordPress, etc.
    - Published as the **????** package **?????**.

**Documentation:**

- **[`html-storybook`](modules/html-storybook/)**

  - Documents the framework-/tech-agnostic HTML patterns (class-names, etc.)
    behind every Hanna component. (Uses the [hanna-react](modules/hanna-react)
    components to render the HTML exmaples.)
  - Publishes to
    [hanna-docs.reykjavik.is](https://hanna-docs.reykjavik.is/html).  
     (Builds into `/servers/docs/html/${version}`, a part of the submodule repo
    [hanna-server-docs](https://github.com/rvk-utd/hanna-server-docs).)

- **More coming…**
  - …including storybook for `hanna-react`.

**Oh, So Meta:**

- **[`visual-tests`](modules/visual-tests/)**

  - Visual Regression Testing module to capture unexpected changes in how the
    current CSS renders the HTML.
  - Automatically run before publishing new versions of
    [hanna-react](modules/hanna-react/) and the CSS from
    [hanna-css](modules/hanna-css/)

- **[`test-helpers`](modules/test-helpers/)**
  - Some resuable helper functions for various testing situations across
    project modules.

## Overall Design Principles

- Be accessibile and robust
  - All components should be as accessibility friendly by default.
  - Components should strive to work even when JavaScript fails. (Google:
    "Progressive enhancement")
  - Components/tools must support translations/localization, but Icelandic is
    the default UI language.
- Support the stupid simple cases
  - Old-school Server-side rendering and progressive enhancement will remain
    valid use-cases for many years.
  - Be build-stack agnostic. Allow for hand-rolled pages, as well as
    "deep-magic" bundlers.
- Scale gracefully over time.
  - Version everything, religiously.
  - Tech-specific libraries have their own independant version numbers, but
    must clearly state which Hanna (HTML) version they target.
  - CSS styles and other centrally + continuously deployed/served tools lead
    the versioning train and must be as (minor-version) backwards compatible
    as possible.
  - Be library agnostic. We like React, but if you need and like
    Vue/Svelte/etc. we welcome your PR. (Just imagine,
    `yarn add @reykjavik/hanna-svelte` would be **so** cool.)
  - Be framework agnostic. Today we may like Next.js, but tomorrow always
    brings new things.
- Scale gracefully in size.
  - Payloads for tiny pages should be tiny. The "kitchen sink" should always
    be optional **and opt-in**.
  - Make it cheap to add new components.
  - Make it easy to silently (and unceremoniously!) drop use of certain
    components, while maintaining legacy support (until next major version
    bump).
- Prefer opionionated, prescriptive components
  - Flexible low-level styling components are nice and should be on offer too,
    but on a tight leash.
  - Prefer tightly controlled vocabularies over open-ended values.
  - CSS custom properties (a.k.a. CSS variables) are our primary medium for
    design-tokens

## Setup / Contribution

### System requirements

Before you start (or even clone this repo) make sure you have the following
software installed:

- `node >= 16`
- `yarn >= 1.22`
- `git >= 2.30`
- `git-lfs >= 3.2` ([Git Large File Storage](https://git-lfs.github.com/) for
  VRT screenshots, and graphic asset sources)

NOTE: The visual regression test suite has some
[additional system requirements](modules/visual-tests/README.md#system-requirements).

### Installation

Once the above software is installed, clone this repo and run:

```sh
yarn install
```

This sets up all the neccessary githooks, configures git and git-lfs, and logs
notifications explaining the presence of the git submodules, into a file
called WARNING--SUB-MODULES.txt.

If you plan on running the CSS dev server, or work on the documentation
servers, you probably want to run `sh scripts/submodule-install.sh` straight
away.
