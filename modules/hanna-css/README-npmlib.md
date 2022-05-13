# @reykjavik/hanna-css

TypeScript helpers for developers writing custom CSS additions for Hanna-based
designs.

It provides a convenient helper for using hanna's CSS custom properties
(a.k.a. "CSS variables"), and a few useful functions (a.k.a. mixins) to boot.

```sh
yarn add --dev @reykjavik/hanna-css
```

<!-- prettier-ignore-start -->

- [Generic CSS helpers](#generic-css-helpers)
- [Hanna CSS Variables](#hanna-css-variables)
  - [`cssVars`](#cssvars)
  - [`cssVarOverride`](#cssvaroverride)
  - [`buildVariables`](#buildvariables)
- [Helpful Constants](#helpful-constants)
  - [`colorThemes`](#colorthemes)
  - [`characters`](#characters)
  - [`mq`](#mq)
- [Hanna CSS Env](#hanna-css-env)
  - [`isDevMode`](#isdevmode)
  - [`getCssBundleUrl`](#getcssbundleurl)
    - [Type `CssBundleOpts`](#type-cssbundleopts)
  - [`styleServerUrl`](#styleserverurl)
  - [`cssVersion`](#cssversion)
- [Markup Warning Helpers](#markup-warning-helpers)
  - [`WARNING__`](#warning__)
  - [`WARNING_soft__`](#warning_soft__)
  - [`WARNING_message__`](#warning_message__)
  - [Type `WarningOpts`](#type-warningopts)
- [Raw Design Constants](#raw-design-constants)
- [Changelog](#changelog)

<!-- prettier-ignore-end -->

## Generic CSS helpers

For convenience, `@reykjavik/hanna-css` re-exports all types and helper
methods (excluding the CSS "compiler") from the
[`es-in-css` library](https://www.npmjs.com/package/es-in-css).

Please refer to the
[`es-in-css` documentation](https://www.npmjs.com/package/es-in-css) for more
info.

## Hanna CSS Variables

The Hanna design system's CSS relies heavily on CSS custom properties (a.k.a.
"CSS variables") for storing its most low-level design token values, and this
package provides easy access to those variables, and helpers for generating
your own.

The values of those variables are declared as part of the
[Hanna `-basics` CSS](https://styles.reykjavik.is/bundle/v0.8?m=-basics).

### `cssVars`

**Syntax:** `cssVars: Record<HannaCssVarToken, VariablePrinter>`

Type-safe collection of CSS variables for use in your CSS code.

```js
import { cssVars, css } from '@reykjavik/hanna-css';

css`
  .SomeComponent {
    background-color: ${cssVars.theme_color_primary};
    font: ${cssVars.font_hd_s};
    max-width: ${cssVars.grid_6};
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

### `cssVarOverride`

**Syntax:** See
[`es-in-css` — `VariableStyles.override`](https://www.npmjs.com/package/es-in-css#variablestylesoverride)

This function provides a type-safe way to write local overrides for the Hanna
CSS variables. _Use sparingly, with caution!_

```js
import { cssVarOverride, css } from '@reykjavik/hanna-css';

css`
  .SomeComponent {
    ${cssVarOverride({
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

### `buildVariables`

**Syntax:**
`buildVariables<T extends string>(vars: Record<T, VariableValue>): VariableStyles<T>`

A limited, pre-configured version of the
[`makeVariables` helper](https://www.npmjs.com/package/es-in-css#makevariables-helper)
from `es-in-css`.

You can use this helper to generate custom CSS variables for your one-off
component styling, using the same naming pattern as the Hanna CSS varibles,
and the same type-safety as `cssVars`.

```js
import { buildVariables, rem } from '@reykjavik/hanna-css';

const myVars = buildVariables(['Component$$title__fontSize']);

css`
  .Component {
    ${myVars.declare({
      Component$$title__fontSize: rem(2),
    })}
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

## Helpful Constants

### `colorThemes`

Array containing the names of the Hanna color themes.

```js
import { colorThemes } from '@reykjavik/hanna-css';

coknsole.log(colorThemes[0]);
// "trustworthy"
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

### `mq`

Object with pre-fabricated media queries.

```js
import { mq, css } from '@reykjavik/hanna-css';

css`
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

### `isDevMode`

**Syntax:** `isDevMode: boolean`

Convenience shorthand for `process.env.NODE_ENV !== 'production'`, used
internally in some of the exported mixins, etc.

```js
import { isDevMode } from '@reykjavik/hanna-css';

css`
  .SomeComponent {
    color: ${isDevMode ? 'red' : 'blue'};
  }
`;
```

### `getCssBundleUrl`

**Syntax:**
`getCssBundleUrl(cssTokens: string | Array<string>, options?: CssBundleOpts): string`

This methods generates a URL to load a correctly versioned CSS bundle from the
[Hanna Style Server](https://github.com/rvk-utd/hanna-styles).

You must pass a list of `cssTokens` corresponding to the Hanna design
components you use on your page(s).

```js
import { isDevMode } from '@reykjavik/hanna-css';

const componentsUsed = [
  '-basics', // The required base style reset
  'Layout--full',
  'HeroBlock',
  // etc…
];

getCssBundleUrl(componentsUsed);
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

**`CssBundleOpts.version?: string`**

The default is always the most recent major version of the Hanna CSS files.

Use this option if you, for some reason, wish/need to pin your CSS files to a
specific version folder.

```js
getCssBundleUrl('-basics,Layout,HeroBlock', { version: 'v0.8.20' });
```

**`CssBundleOpts.testingServer?: string`**

Default: [`styleServerUrl`](#styleserverurl)

Use this option if you need to load the CSS bundles from a custom style-server
instance, during testing/staging/etc.

### `styleServerUrl`

**Syntax:** `styleServerUrl: "https://styles.reykjavik.is"`

The root URL of the Hanna Style Server. This URL is useful when building links
linking to assets, etc, and is used internally by
[`getCssBundleUrl()`](#getcssbundleurl)

### `cssVersion`

**Syntax:** `cssVersion: string`

The current version of the Hanna style-server CSS files this version of
`@reyjkjavik/hanna-css` package targets.

Primary use is for debugging/informational purposes.

## Markup Warning Helpers

Sometimes you need to discourage certain HTML markup patterns, and Hanna
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

**Syntax:** `WARNING_soft__(message: string, opts?: WarningOpts): string`

Only sets (overrides) the warning message on an element that already has a
warning style applied.

### Type `WarningOpts`

The `WARNING_*` misins accept an options object a their second argument.

**`WarningOpts.pos?: 'before' | 'after'`**

Default: `'before'`

Controls into which pseudo-element the `message` content is rendered.

**`WarningOpts.always?: boolean`**

Default: `false`

Optionally make the warning messages visible in production builds also. A
drastic measure reserved for highly unusual situations.

## Raw Design Constants

Using the [Hanna CSS variables](#cssVars) is **highly** preferrable, whenever
possible. However, there are always edge cases where you need access to the
raw values the CSS variables build on.

For that this library exports some helpful objects.

```js
import {
  breakpoints_raw,
  colors_raw,
  fonts_raw,
  grid_raw,
  iconfont_raw,
} from '@reykjavik/hanna-css';
```

Again use these sparingly, and deliberately.

## Changelog

See [CHANGELOG.md](CHANGELOG.md)
