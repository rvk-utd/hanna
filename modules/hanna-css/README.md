# Hanna CSS Styles module

This module publishes two separate, yet tightly related assets:

1. CSS files and related (typo)graphic assets to
   [styles.reykjavik.is](https://styles.reykjavik.is).  
   (Builds into `/servers/styles/public/css/v${version}`, a part of the
   submodule repo
   [hanna-server-styles](https://github.com/reykjavikcity/hanna-server-styles).)
2. The npm package `@reykjavik/hanna-css` — a CSS authoring helper library
   written in TypeScript

For more information on either of these, refer to

- [README-server.md](./README-server.md) – for the CSS files and asset server
- [README-lib.md](./README-lib.md) - for `@reykjavik/hanna-css`

## Development

Start the SCSS build and image compression task, alongside a dev server (port
`4000` by default):

```sh
yarn install
yarn run dev
```

The dev style-server has both HTTP and bundler caching turned off, which
allows you to instantly see the latest SASS build results from the
`../../severs/styles/public/css/dev` folder, like so:

```
https://localhost:4000/bundle/dev?m=-basics,Layout-full,HeroBlock
```

## NPM library sources

The file `src/lib/index.ts` is built and published to npm as
`@reykjavik/hanna-css` with this command:

```
yarn run publish:npmlib
```

## Style server sources

### src/css/

The `*.css.ts` files directly inside this folder are treated as entry points
for building to `../../servers/styles/public/css/dev/*.css`

Placing files into this folder allows stable (`<img src="..." />`) links to
https://styles.reykjavik.is/assets/reykjavik-logo.svg, etc. – links that don't
involve the path token "CSS" or a css-version number.

If certain perennial assets need versioning, then embed their version number
in their filename.

### src/iconfont/

Any SVGs inside this folder are automatically bundled up into a "digbat" font
then used by the CSS for adding quick icons to buttons, etc.

The iconfont files are built to
`../../servers/styles/public/css/dev/i/icons.*`.

Meanwhile the iconfont build task emits a single file `src/lib/iconfont.ts`
with the token–utf-symbol mapping for easy comsumption by the CSS.

### src/i/

This folder contains all CSS styling specific images, that don't classify as
content assets. Examples of such images would be component-specific icons, or
backgrounds vignettes.

### src/assets/

Contains all sorts of static assets (images, fonts, etc.) that aren't exactly
tied to the CSS styling/design of an individual component.

This folder is built (copied, compressed, etc.) into
`../../server/styles/public/assets`

Placing files into this folder allows stable (`<img src="..." />`) links to
https://styles.reykjavik.is/assets/reykjavik-logo.svg, etc. – links that don't
involve the path token "CSS" or a css-version number.

If certain perennial assets need versioning, then embed their version number
in their filename or folder structure.
