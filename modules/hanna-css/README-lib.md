# @reykjavik/hanna-css

TypeScript helpers for developers writing custom CSS additions for Hanna-based
designs.

It provides a convenient helper objects for using hanna's CSS variables design
tokens, and several useful functions (a.k.a. mixins) to boot.

Developers using CSS-in-JS libraries, such as
[styled-components](https://styled-components.com/) or
[emotion](https://emotion.sh/docs/introduction), will find this library quite
useful.

```sh
yarn add @reykjavik/hanna-css
```

**Table of Contents:**

<!-- prettier-ignore-start -->

- [Why TypeScript Instead of SASS?](#why-typescript-instead-of-sass)
- [Generic CSS helpers](#generic-css-helpers)
- [Hanna CSS Variables](#hanna-css-variables)
  - [`hannaVars`](#hannavars)
  - [`hannaVarOverride`](#hannavaroverride)
  - [`formFieldVars`](#formfieldvars)
  - [`buildVariables`](#buildvariables)
- [Class-Name constants](#class-name-constants)
  - [`htmlCl`](#htmlcl)
- [Helpful Constants](#helpful-constants)
  - [`colorThemes`](#colorthemes)
  - [`colorFamilies`](#colorfamilies)
  - [`characters`](#characters)
  - [`icons`](#icons)
  - [`mq`](#mq)
- [Hanna CSS Env](#hanna-css-env)
  - [`getCssBundleUrl`](#getcssbundleurl)
    - [Type `CssBundleOpts`](#type-cssbundleopts)
    - [Type `CssModuleToken`](#type-cssmoduletoken)
  - [`getEssentialHannaScripts`](#getessentialhannascripts)
  - [`styleServerUrl`](#styleserverurl)
  - [`setStyleServerUrl`](#setstyleserverurl)
  - [`targetCssVersion`](#targetcssversion)
  - [`isDevMode`](#isdevmode)
- [Accessibility Helpers](#accessibility-helpers)
  - [`srOnly` mixin](#sronly-mixin)
  - [`srOnly_focusable` mixin](#sronly_focusable-mixin)
  - [`srOnly_focusableContent` mixin](#sronly_focusablecontent-mixin)
  - [`keyboardFocusStyling` mixin](#keyboardfocusstyling-mixin)
  - [`hoverKeyboardFocusAndActiveStyling` mixin](#hoverkeyboardfocusandactivestyling-mixin)
- [Markup Warning Helpers](#markup-warning-helpers)
  - [`WARNING__`](#warning__)
  - [`WARNING_soft__`](#warning_soft__)
  - [`WARNING_message__`](#warning_message__)
  - [`WARNING_border__`](#warning_border__)
  - [`WARNING_border_soft__`](#warning_border_soft__)
  - [`suppress_WARNING__`](#suppress_warning__)
  - [`suppress_WARNING_soft__`](#suppress_warning_soft__)
  - [Type `WarningOpts`](#type-warningopts)
- [Scaling Helpers](#scaling-helpers)
  - [Generic Scaler](#generic-scaler)
    - [`scale`](#scale)
  - [Media Bracket Scalers](#media-bracket-scalers)
  - [Container Relative Scalers](#container-relative-scalers)
    - [`scale_container`](#scale_container)
    - [`scale_cols`](#scale_cols)
- [Raw Design Constants](#raw-design-constants)
- [Helpful VSCode Snippets](#helpful-vscode-snippets)
- [Changelog](#changelog)

<!-- prettier-ignore-end -->

## Why TypeScript Instead of SASS?

**TL;DR:** TypeScript provides better developer ergonomics – both internally
in this monorepo and outside of it, and is a more future-proof technology than
SASS.

SASS has been almost an industry standard tool for templating CSS code for
well over a decade now. Yet it provides poor developer experience with
lackluster editor integrations, idiosyncratic syntax, extremely limited
feature set, it's hard to publish and consume libraries, etc…

The web development community has been steadily moving on to other, more
nimble technologies — either more vanilla "text/css" authoring, or
class-name-based reverse compilers like Tailwind, or various JavaScript-based
solutions (including literal CSS-in-JS).

This package provides supportive tooling for this last group, but offers also
a new lightweight alternative: To author CSS using JavaScript as a templating
engine, but then output it via one of the following methods:

- Simple `writeFile`ing the string result to static file
- Use something like the
  [es-to-css compiler](https://github.com/maranomynet/es-in-css#compilation-api),
- Or stream it directly to the browser.

However, if SASS remains your thing you could still use this library to
programmatically generate some key \*.scss files with SASS variables, etc. and
then `@use` those in the SASS files you write. You do you. ❤️

## Generic CSS helpers

For convenience, `@reykjavik/hanna-css` re-exports **all** types and helper
methods from the
[`es-in-css` library](https://www.npmjs.com/package/es-in-css) (excluding the
JS-to-CSS "compiler").

**Please refer to the
[`es-in-css` documentation](https://www.npmjs.com/package/es-in-css) for more
info.**

For the best developer experience, use VSCode and install the official
[**vscode-styled-components** extension](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components).
That gives you instant syntax highlighting and IntelliSense autocompletion
inside ` css`` ` template literals.

You might also want to add a couple of
[hanna-css VSCode "snippets"](#helpful-vscode-snippets).

## Hanna CSS Variables

The Hanna design system's CSS relies heavily on CSS custom properties (a.k.a.
"CSS variables") for storing its most low-level design token values, and this
package provides easy access to those variables, and helpers for generating
your own.

The values of those variables are declared as part of the
[Hanna `-basics` CSS](https://styles.reykjavik.is/bundle/v0.8?m=-basics).

### `hannaVars`

**Syntax:** `hannaVars: Record<HannaCssVarToken, VariablePrinter>`

Type-safe collection of CSS variables for use in your CSS code.

```js
import { hannaVars, css } from '@reykjavik/hanna-css';

const myCss = css`
  .SomeComponent {
    background-color: ${hannaVars.theme_color_primary};
    font: ${hannaVars.font_hd_s};
    max-width: ${hannaVars.grid_6};
  }
`;
/*`
  .SomeComponent {
    background-color: var(--theme-color-primary);
    font: var(--font-hd-s);
    max-width: var(--grid-4);
  }
`*/
```

### `hannaVarOverride`

**Syntax:** See
[`es-in-css` — `VariableStyles.override`](https://www.npmjs.com/package/es-in-css#variablestylesoverride)

This function provides a type-safe way to write local overrides for the Hanna
CSS variables. _Use sparingly, with caution!_

```js
import { hannaVarOverride, css } from '@reykjavik/hanna-css';

const myCss = css`
  .SomeComponent {
    ${hannaVarOverride({
      color_faxafloi_100: `red`,
    })}
  }
`;
/*`
  .SomeComponent {
    --color-faxafloi-100: red;
  }
`*/
```

### `formFieldVars`

**Syntax:** `formFieldVars: Record<string, VariablePrinter>`

Type-safe collection of CSS variables for styling `FormField`-derived
components.

```js
import { formFieldVars, css } from '@reykjavik/hanna-css';

const myCss = css`
  .MyFormField__input__dohicky {
    background-color: ${formFieldVars.input__background_color};
    ...other dohicky styling..
  }
`;
/*`
  .MyFormField__input__dohicky {
    background-color: var(--FormField-input--background-color);
    ...other dohicky styling...
  }
`*/
```

### `buildVariables`

**Syntax:**
`buildVariables<T extends string>(vars: Array<T>, namespace?: string): VariableStyles<T>`

A limited, pre-configured version of the
[`makeVariables` helper](https://www.npmjs.com/package/es-in-css#makevariables-helper)
from `es-in-css`.

You can use this helper to generate custom CSS variables for your one-off
component styling, using the same naming pattern as the Hanna CSS varibles,
and the same type-safety as `hannaVars`.

```js
import { buildVariables, rem, css } from '@reykjavik/hanna-css';

const myVars = buildVariables(['Component$$title__fontSize']);

const myCss = css`
  .Component {
    ${myVars.declare({ Component$$title__fontSize: rem(2) })}
  }
  .Component__title {
    font-size: ${myVars.vars.Component$$title__fontSize};
  }
`;
/*`
  .Component {
    --Component__title--fontSize: 2rem;
  }
  .Component__title {
    font-size: var(--Component__title--fontSize);
  }
`*/
```

The optional `namespace` parameter gets prepended to the generated CSS
variable names. (NOTE: Namespaces are internally normalized to end with either
`--` or `__`.)

Thus the code example above could be rewritten like this:

```js
const namespace = 'Component__';
const myVars = buildVariables(['title__fontSize'], namespace);

const myCss = css`
  .Component {
    ${myVars.declare({ title__fontSize: rem(2) })}
  }
  .Component__title {
    font-size: ${myVars.vars.title__fontSize};
  }
`;
/*`
  .Component {
    --Component__title--fontSize: 2rem;
  }
  .Component__title {
    font-size: var(--Component__title--fontSize);
  }
`*/
```

## Class-Name constants

### `htmlCl`

Collection of selectors with class-name-states that the `<html/>` element can
take.

Here's how you'd use the `beforeSprinkling` selector to suppress flicker of
unstyled/unscripted content in your server-rendered HTML, while you
"progressively enhance" them after useEffect.

```js
import { htmlCl, css } from '@reykjavik/hanna-css';

const myCss = css`
  ${htmlCl.beforeSprinkling} .MyComponent__details:not([data-sprinkled]) {
    display: none;
  }
  .MyComponent__details[data-sprinkled] {
    opacity: 0;
    height: 0;
  }
`;
/*`
  .before-sprinkling .MyComponent__details:not([data-sprinkled]) {
    display: none;
  }
  .MyComponent__details[data-sprinkled] {
    opacity: 0;
    height: 0;
  }
`*/
```

Other selectors: `menuIsActive`, `menuIsOpen`, `menuIsClosed`

Each of these properties has JSDoc comments associated with them. Refer to
those for more info.

## Helpful Constants

### `colorThemes`

Object containing the names of the Hanna color themes.

```ts
import { colorThemes } from '@reykjavik/hanna-css';
import type { HannaColorTheme } from '@reykjavik/hanna-css';

const themeName: HannaColorTheme = colorThemes.trustworthy;

console.log(themeName);
// "trustworthy"
```

### `colorFamilies`

Object containing the names of the Hanna base color families.

```ts
import { colorFamilies } from '@reykjavik/hanna-css';
import type { ColorFamily } from '@reykjavik/hanna-css';

const familyName: ColorFamily = colorFamilies.esja;

console.log(familyName);
// "esja"
```

### `characters`

Object with several named unicode symbols for use in generated content
(`::marker`s, `::before` texts, etc.). Includes `bullets`, `spaces`, `quotes`

```js
import { characters } from '@reykjavik/hanna-css';

const { bullets, spaces, quotes } = characters;

console.log(quotes.IS.open + 'Hæ!' + quotes.IS.close);
// "„Hæ!“"
```

### `icons`

Object with the names of the "decorative" icons available for general use with
`data-icon=""` and `data-icon-after=""` attributes, and for React component
icon props.

```js
import { icons } from '@reykjavik/hanna-css';
import type { IconName } from '@reykjavik/hanna-css';

const iconName: IconName = icons.close;

console.log(iconName);
// "close"
```

### `mq`

Object with pre-fabricated media queries.

```js
import { mq, css } from '@reykjavik/hanna-css';

const myCss = css`
  @media ${mq.tablet_up} {
    .SomeComponent {
      width: 100%;
    }
  }
`;
/*`
@media (min-width: 760px) {
  .SomeComponent {
    width: 100%;
  }
}
`*/
```

## Hanna CSS Env

### `getCssBundleUrl`

**Syntax:**
`getCssBundleUrl(cssTokens: string | Array<CssModuleToken>, options?: CssBundleOpts): string`

This methods generates a URL to load a correctly versioned CSS bundle from the
[Hanna Style Server](https://github.com/reykjavikcity/hanna-server-styles).

You must pass a list of `cssTokens` corresponding to the Hanna design
components you use on your page(s).

```js
import { getCssBundleUrl } from '@reykjavik/hanna-css';

const cssTokens = [
  '-basics', // The required base style reset
  'Layout',
  'HeroBlock',
  'TextInput',
  'Selectbox',
  'ButtonPrimary',
  // etc…
];

const cssUrl = getCssBundleUrl(cssTokens);
```

NOTE: You need to remember to explicitly include the `-basics` token — unless
you're incrementally adding single CSS tokens after the fact.

However, because of how CSS cascade works, it's **strongly recommended** to
try and maintain (and update in-place) a single CSS
`<link rel="stylesheet" href="..." />` URL, instead of requesting multiple CSS
bundles.

Multiple bundles usuallly work, but may occasionally fail in unpredictable
ways.

#### Type `CssBundleOpts`

**`CssBundleOpts.version?: CssVersionToken`**

The default is always the most recent major version of the Hanna CSS files.

Use this option if you, for some reason, wish/need to pin your CSS files to an
older, or more specific version folder.

```js
const cssUrl = getCssBundleUrl(cssTokens, { version: 'v1.0.3' });
```

**TypeScript Note:** The `version` option is by default type-restricted to the
CSS versions known at the time when the library was published. If you need to
set a newer (minor/patch) CSS version, you should ideally update `hanna-css`
for an updated version list. If that's not possible, you can pass a type-level
generics paramter of `true` which relaxes the type restrictions a bit.

```ts
getCssBundleUrl<true>(cssTokens, { version: 'v1.13' });
/* Like this ———^^^^  */
```

#### Type `CssModuleToken`

All the currently known CSS module tokens that are available on the
[Hanna Style Server](https://github.com/reykjavikcity/hanna-server-styles) at
the time when the library was published. If you need to load newer tokens, you
should ideally update `hanna-css` for an updated token list. If that's not
possible, you can convert your token Array to comma-delimited string.

### `getEssentialHannaScripts`

**Syntax:** `getEssentialHannaScripts: () => string`

Essential Hanna styling assisting scripts. These provide flicker-free
progressive enhancement for server-rendered dynamic Hanna UI compoennts, and
fix some Safari-related styling issues.

Inline this script snippet as close to the top of your page's `<head/>`
element as you can.

**NOTE:** In full-page-reload multi-page applications, you should use
`getEssentialHannaScripts_MultiPage` instead of this.

### `styleServerUrl`

**Syntax:** `styleServerUrl: string`

Re-export from
[`@reykjavik/hanna-utils/assets` ](https://github.com/rvk-utd/hanna/tree/main/modules/hanna-utils#styleserverurl).

This URL is useful when building links linking to assets, etc, and is used
internally by [`getCssBundleUrl()`](#getcssbundleurl)

### `setStyleServerUrl`

**Syntax:** `setStyleServerUrl: (url: string | URL) => void`

Re-export from
[`@reykjavik/hanna-utils/assets`](<[../hanna-utils](https://github.com/rvk-utd/hanna/tree/main/modules/hanna-utils#setstyleserverurl)>).

This updates the value of `styleServerUrl` globally. Use it at the top of your
application if you want to load assets and CSS bundles from a custom
style-server instance, e.g. during testing/staging/etc.

### `targetCssVersion`

**Syntax:** `targetCssVersion: string`

The current MAJOR version of the Hanna style-server CSS files this version of
`@reyjkjavik/hanna-css` package targets.

Primary use is for debugging/informational purposes.

### `isDevMode`

**Syntax:** `isDevMode: boolean`

Convenience shorthand for `process.env.NODE_ENV !== 'production'`, used
internally in some of the exported mixins, etc.

```js
import { isDevMode } from '@reykjavik/hanna-css';

const myCss = css`
  .SomeComponent {
    color: ${isDevMode ? 'red' : 'blue'};
  }
`;
```

## Accessibility Helpers

### `srOnly` mixin

**Syntax** `srOnly: () => RawCssString`

Mixin that hides an element visually, but still makes it accessible to screen
readers.

```js
import { css, srOnly } from '@reykjavik/hanna-css';

const myCss = css`
  .MyComponent__label {
    ${srOnly};
  }
`;
```

In the rare cases where you might need to make a sr-only element visible
again, there's `srOnly__undo` that you can import and apply. (This can usually
be avoided by using more precise selectors for the `srOnly` mixin.)

### `srOnly_focusable` mixin

**Syntax** `srOnly_focusable: () => RawCssString`

Similar to the `srOnly` mixin, but intended for links/buttons that should
become visible on keyboard focus (`:focus-visible`).

```js
import { css, srOnly_focusable } from '@reykjavik/hanna-css';

const myCss = css`
  .MyComponent__skipLink {
    ${srOnly_focusable};
  }
`;
```

### `srOnly_focusableContent` mixin

**Syntax** `srOnly_focusableContent: () => RawCssString`

Similar to the `srOnly_focusable` mixin above, but for non-interactive
elements that **contain** buttons/links that should become visible on keyboard
focus.

```js
import { css, srOnly_focusableContent } from '@reykjavik/hanna-css';

const myCss = css`
  .MyComponent__dragdrop-controls {
    ${srOnly_focusableContent};
  }
`;
```

### `keyboardFocusStyling` mixin

**Syntax:** `keyboardFocusStyling: (css: string) => RawCssString`

Generates backwards compatible selectors for `:focus-visible` — and also
targets the class-names injected by the
[`focus-visible` polyfill](https://www.npmjs.com/package/@reykjavik/hanna-utils#focus-visible-polyfill)

```js
import { css, keyboardFocusStyling } from '@reykjavik/hanna-css';

const myCss = css`
  .MyComponent__cardlink {
    /* Card link styles ... */
    /* :hover styles ... */

    ${keyboardFocusStyling(css`
      outline: 2px solid currentColor;
      outline-offset: 2px;
    `)};
  }
`;
```

### `hoverKeyboardFocusAndActiveStyling` mixin

**Syntax:**
`hoverKeyboardFocusAndActiveStyling: (css: string, options?: { notActive?: stirng }) => RawCssString`

Generates `:hover`, `:active` and `:focus-visible` selectors in a backwards
compatible manner. (It also targets the class-names injected by the
[`focus-visible` polyfill](https://www.npmjs.com/package/@reykjavik/hanna-utils#focus-visible-polyfill))

```js
import {
  css,
  hoverKeyboardFocusAndActiveStyling,
} from '@reykjavik/hanna-css';

const myCss = css`
  .MyComponent__cardlink {
    /* Card link styles ... */

    ${hoverKeyboardFocusAndActiveStyling(css`
      border: 2px solid currentColor;
    `)};
  }
`;
```

By passing a second `options` parameter, the `:active` selector can be
skipped.

## Markup Warning Helpers

Sometimes you need to discourage certain HTML markup patterns, and **Hanna**
provides some helpful mixin methods to that purpose.

They render a "hi-vis" outline around the current element and display a
message in either `::before` or `::after` content.

By default, these messages are only visible in CSS rendered when
`isDevMode === true`.

Example usage:

```js
import { WARNING__, WARNING_message__ } from '@reykjavik/hanna-css';

export default css`
  :not(ul):not(ol) > li {
    ${WARNING__('<li/> must be inside <ol/> or <ul/>')};
  }
  ul > :not(li),
  ol > :not(li) {
    ${WARNING__('<ul/> only accepts <li/> as its children')};
  }
  /* Override the message only (emits less code) */
  ol > :not(li) {
    ${WARNING_message__('<ol/> only accepts <li/> as its children')};
  }
`;
```

### `WARNING__`

**Syntax:** `WARNING__(message: string, opts?: WarningOpts): string`

Renders a high-priority (red) warning and message.

### `WARNING_soft__`

**Syntax:** `WARNING_soft__(message: string, opts?: WarningOpts): string`

Renders a lower-priority (orange) warning and message that are only visible
then the HTML element is `:hover`ed.

### `WARNING_message__`

**Syntax:**
`WARNING_soft__(message: string, ops?: Omit<WarningOpts, 'pos'>): string`

Only sets (overrides) the warning message on an element that already has a
warning style applied.

### `WARNING_border__`

**Syntax:** `WARNING_border__(ops?: Omit<WarningOpts, 'pos'>): string`

Sets a high-priority (red) warning border around an element.

### `WARNING_border_soft__`

**Syntax:** `WARNING_border_soft__(ops?: Omit<WarningOpts, 'pos'>): string`

Renders a lower-priority (orange) warning warning that is only visible then
the HTML element is `:hover`ed.

### `suppress_WARNING__`

**Syntax:** `suppress_WARNING__(ops?: WarningOpts): string`

Attempts to remove warning border and message.

### `suppress_WARNING_soft__`

**Syntax:** `suppress_WARNING_soft__(ops?: WarningOpts): string`

Attempts to remove lower-priority (`:hover`) warning border and message.

### Type `WarningOpts`

The `WARNING_*` mixins accept an options object as their second argument.

**`WarningOpts.pos?: 'before' | 'after'`**

Default: `'before'`

Controls into which ::pseudo-element the `message` content is rendered.

**`WarningOpts.always?: boolean`**

Default: `false`

Optionally make the warning messages visible in production builds also. A
drastic measure reserved for highly unusual situations.

## Scaling Helpers

Sometimes CSS lengths/sizes should scale lineraly with their viewport or
container width. For this Hanna pprovides series of `scale*` and `clamp*`
helper functions.

The `clamp_` methods return a `clamp(A, calc(…), B)` value, while the
lower-level `scale*` methods return a bare `calc(…)` value.

All of these helpers accept `from` and `to` of
`type ScaleEdge = PxValue | PctValue | number` as their first two parameters.

### Generic Scaler

#### `scale`

**Syntax:**
`scale(from: ScaleEdge, to: ScaleEdge, min: number | PxValue, max: number | PxValue, unit: '%' | 'vw' | 'vh'): string`

This generic, low-level `scale` function lies at the heart of all of the other
`scale*` and `clamp*` helpers.

It returns a CSS `calc(…)` function with slope+intercept values, that scales
from `from` at a container/viewport size of `min`, up to `to` at a
container/viewport size of `max`.

If the unit parameter is set to either `vw`/`vh`, then the `min` and `max`
values refer to the viewport size.

```js
import { css, px, pct } from `@reykjavik/hanna-css`
import { scale } from `@reykjavik/hanna-css/scale`

const myCSS = css`
  div {
    /* Supports "%" */
    height: ${scale(16, 24, 320, 1368, '%')};
    /* Supports "vw" (and "vh") */
    width: ${scale(16, 24, 320, 1368, 'vw')};

    /* Returns bare intercept when slopeFactor is 0 */
    margin-top: ${scale(16, 16, 320, 1368, '%')};
    /* Returns bare slope when intercept is 0 */
    margin-bottom: ${scale(16, 64, 320, 1280, 'vh')};
  }
`
/*
  div {
    /* Supports "%" *​/
    height: calc(0.7633587786259541% + 13.557251908396948px);
    /* Supports "vw" (and "vh") *​/
    width: calc(0.7633587786259541vw + 13.557251908396948px);

    /* Returns bare intercept when slopeFactor is zero *​/
    margin-top: 16px;
    /* Returns bare slope when intercept is zero *​/
    margin-bottom: 5vh;
  }
*/
```

### Media Bracket Scalers

These generate `vw`-based responsive sizes, that scale linearly between two
end-point sizes (`number`, `PxValue` or `PctValue`), within certain named
media-query boundries.

`clamp_phone`, `clamp_phablet`, `clamp_tablet`, `clamp_netbook`,
`clamp_phone_netbook`, `clamp_phablet_netbook`, `clamp_tablet_netbook`,
`clamp_phone_tablet`, `clamp_phablet_tablet`, `clamp_phone_phablet`,
`clamp_Hamburger`, `clamp_Topmenu`.

`scale_phone`, `scale_phablet`, `scale_tablet`, `scale_netbook`,
`scale_phone_netbook`, `scale_phablet_netbook`, `scale_tablet_netbook`,
`scale_phone_tablet`, `scale_phablet_tablet`, `scale_phone_phablet`,
`scale_Hamburger`, `scale_Topmenu`.

Example:

```js
import { css } from '@reykjavik/hanna-css';
import { clamp_tablet_netbook } from '@reykjavik/hanna-css/scale';

const myCSS = css`
  .CustomHeader {
    height: ${clamp_tablet_netbook(60, 120)};
  }
`;
/*
  .CustomHeader {
    height: clamp(60px, calc(9.868421052631579vw + -15px), 120px)
  }
*/
```

Which is effectively the same as this using the corresponding `scale_*`
function:

```js
import { css, mq, px } from '@reykjavik/hanna-css';
import { scale_tablet_netbook } from '@reykjavik/hanna-css/scale';

const from = px(60);
const to = px(120);

const myCSS = css`
  @media screen {
    .CustomHeader {
      height: ${from};
    }
  }
  @media screen and ${mq.tablet_netbook} {
    .CustomHeader {
      height: ${scale_tablet_netbook(from, to)};
    }
  }
  @media screen and ${mq.wide} {
    .CustomHeader {
      height: ${to};
    }
  }
`;
```

### Container Relative Scalers

#### `scale_container`

**Syntax:** `scale_container(from: ScaleEdge, to: ScaleEdge): string`

This `%`-based scaler works for elements directly within a full-grid wide
container. (As defined by Hanna's `grid_raw.contentMinWidth` and
`grid_raw.contentMaxWidth`).

#### `scale_cols`

**Syntax:**
`scale_cols(from: ScaleEdge, to: ScaleEdge, cols: number, gutters?: number): string`

Generates a `%`-based `calc()` value that scales linearly between `from` and
`to` inside a container whos width is certain nubmer of grid columns and
gutters.

## Raw Design Constants

Using the [Hanna CSS variables](#hannavars) is **highly** preferable, whenever
possible. However, there are always edge cases where you need access to the
raw values the CSS variables build on.

For that this library exports some helpful objects.

```js
import {
  breakpoints_raw,
  colors_raw,
  font_raw,
  grid_raw,
  iconfont_raw,
} from '@reykjavik/hanna-css';
```

Again use these sparingly, and deliberately.

## Helpful VSCode Snippets

Here are a few code "snippets" you can
[add to your global snippets file](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_create-your-own-snippets)
to help you use hanna-css a bit faster:

```jsonc
  "Insert ${} variable print block": {
    "scope": "javascript,javascriptreact,typescript,typescriptreact,css",
    "prefix": "v",
    "body": "\\${$0}",
  },
  "Insert Hanna CSS variable": {
    "scope": "css",
    "prefix": "h",
    "body": "\\${hannaVars.$1};",
  },
  "Insert CSS property with Hanna varible": {
    "scope": "css",
    "prefix": "hannaprop",
    "body": "${1:css-property}: \\${hannaVars.$2};",
  },
  "css`` tagged template literal": {
    "scope": "javascript,javascriptreact,typescript,typescriptreact",
    "prefix": "css",
    "body": "css`\n\t$0\n`",
  },
  "cssVal`` tagged template literal": {
    "scope": "javascript,javascriptreact,typescript,typescriptreact",
    "prefix": "cssVal",
    "body": "cssVal`\n\t$0\n`",
  },
```

## Changelog

See
[CHANGELOG.md](https://github.com/rvk-utd/hanna/blob/main/modules/hanna-css/CHANGELOG-lib.md)
