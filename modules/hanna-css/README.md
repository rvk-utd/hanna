# Hanna CSS Styles module

This module builds (publishes) two separate, yet related assets:

1. The npm package `@reykjavik/hanna-css`
2. Git [submodule `hanna-styles`](https://github.com/rvk-utd/hanna-styles)
   which contains the setup for the server
   [styles.reykjavik.is](https://styles.reykjavik.is)

## Development

Start the SCSS build and image compression task, alongside a dev server (port
`4000` by default):

```sh
yarn install
yarn run dev
```

The dev style-server has both HTTP and bundler caching turned off, which
allows you to instantly see the latest SASS build results from the
`../../style-sever/public/css/dev` folder, like so:

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

The `*.scss` and `*.css.ts` files directly inside this folder are treated as
entry points for building to `../../style-server/public/css/dev/*.css`

Placing files into this folder allows stable (`<img src="..." />`) links to
https://styles.reykjavik.is/assets/reykjavik-logo.svg, etc. – links that don't
involve the path token "CSS" or a css-version number.

If certain perennial assets need versioning, then embed their version number
in their filename.

### src/iconfont/

Any SVGs inside this folder are automatically bundled up into a "digbat" font
then used by the CSS for adding quick icons to buttons, etc.

The iconfont files are built to `../../style-server/public/css/dev/i/icons.*`.

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
`../../style-server/public/assets`

Placing files into this folder allows stable (`<img src="..." />`) links to
https://styles.reykjavik.is/assets/reykjavik-logo.svg, etc. – links that don't
involve the path token "CSS" or a css-version number.

If certain perennial assets need versioning, then embed their version number
in their filename.
