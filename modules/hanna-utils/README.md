# @reykjavik/hanna-utils

A collection of vanilla JavaScript functions and constants, that tend to be
helpful when working with (or within) the Hanna design system.

This library is also a core dependency of most other packages in this repo,
including [hanna-react](../hanna-react), [hanna-css](../hanna-css), and more.

```sh
yarn add @reykjavik/hanna-utils
```

**Table of Contents:**

<!-- prettier-ignore-start -->

- [Misc Utilities](#misc-utilities)
  - [`getSVGtext`](#getsvgtext)
  - [`getFormatMonitor`](#getformatmonitor)
  - [`printDate`](#printdate)
  - [`getPageScrollElm`](#getpagescrollelm)
  - [`getStableRandomItem`](#getstablerandomitem)
  - [`capitalize`](#capitalize)
- [Asset helpers](#asset-helpers)
  - [Favicons](#favicons)
  - [Illustrations](#illustrations)
  - [Efnistákn Icons](#efnistákn-icons)
  - [Formheimur Shapes](#formheimur-shapes)
  - [Bling Shapes](#bling-shapes)
  - [Misc. Style Server Assets](#misc-style-server-assets)
  - [Style-Server Info](#style-server-info)
    - [`styleServerUrl`](#styleserverurl)
    - [`setStyleServerUrl`](#setstyleserverurl)
- [I18N helpers](#i18n-helpers)
  - [`getTexts`](#gettexts)
- [Social Media Sharing](#social-media-sharing)
- [Polyfills / A11y](#polyfills--a11y)
  - [`focus-visible` polyfill](#focus-visible-polyfill)
- [Branded types](#branded-types)
  - [`ensurePosInt`](#ensureposint)
- [TypeScript helpers](#typescript-helpers)
  - [`notNully`](#notnully)
  - [`notFalsy`](#notfalsy)
  - [`ObjectKeys`, `ObjectEntries`, `ObjectFromEntries`](#objectkeys-objectentries-objectfromentries)
  - [Type `OpenRecord`](#type-openrecord)
  - [Type `OpenStringMap`](#type-openstringmap)
  - [Type `AllowKeys`](#type-allowkeys)
  - [Type `EitherObj`](#type-eitherobj)
  - [Type Testing Helpers](#type-testing-helpers)
    - [Type `Expect<T>`](#type-expectt)
    - [Type `Equals<A, B>`](#type-equalsa-b)
    - [Type `Extends<A, B>`](#type-extendsa-b)
    - [Type `NotExtends<A, B>`](#type-notextendsa-b)
- [Changelog](#changelog)

<!-- prettier-ignore-end -->

## Misc Utilities

### `getSVGtext`

**Syntax:**
`getSVGtext(url: string | undefined, altText?: string): Promise<string>`

Fetches a remote SVG file and returns its markup contents — excluding any
leading `<?xml />` directives or "Generator" comments.

If you pass the optional `altText` parameter, it will attempt to inject a
`<title/>` element into the SVG string. (First removing existing `<title/>`.)

```ts
import { getSVGtext } from '@reykjavik/hanna-utils';

const svgUrl = 'https://styles.reykjavik.is/assets/reykjavik-logo.svg';

getSVGtext(svgUrl).then((svgMarkup) => {
  document.body.insertAdjacentHTML('beforeend', svgMarkup);
});
```

To check if file is svg:

```ts
import { getSVGtext } from '@reykjavik/hanna-utils';

const isSVG: true = getSVGtext.isSvgUrl(
  'https://styles.reykjavik.is/assets/reykjavik-logo.svg'
);
```

### `getFormatMonitor`

Returns an object that contains info about the currently active screen media
format and a way to subscribe/unsubscribe callbacks to whenever the window
switches over to another "media-format"

The Hanna CSS module/token `-basics` configures certain media-query
breakpoints with human-friendly names (i.e. "phone", "phablet", "tablet",
"netbook", "wide")

NOTE: In server-side environments (without `window` and `document` objects)
the exported "formatMonitor" object will not "start" and remains completely
inactive.

```ts
import { getFormatMonitor } from '@reykjavik/hanna-utils';
import type { MediaFormat } from '@reykjavik/hanna-utils';

formatMonitor = getFormatMonitor();

formatMonitor.media.is; // e.g. 'wide';

formatMonitor.subscribe((media: MediaFormat) => {
  media === formatMonitor.media; // true;
  // Do something because `media.is` has changed,
});
```

See
https://github.com/maranomynet/formatchange#3-getting-the-current-media-format
for more info.

(This utility is, for example, utilized by the
[`@reykjavik/hanna-react`](https://www.npmjs.com/package/@reykjavik/hanna-react)
package to implement its `useFormatMonitor` hook.)

### `printDate`

**Syntax:** `printDate(date: string | Date, lang?: string): string`

Very simple, very stupid, standalone date formatter for Icelandic (default),
English and Polish.

Just prints the full date (day, month, year). No bells. No whistles. No
options.

```ts
import { printDate } from '@reykjavik/hanna-utils';

printDate('2022-04-30', 'is'); // 30. apríl 2022
printDate(new Date('2022-04-30'), 'en'); // April 30, 2022
printDate('2022-04-30', 'pl'); // 30. kwietnia 2022
```

### `getPageScrollElm`

**Syntax:** `getPageScrollElm(customWindow?: Window): HTMLElement`

Returns the outermost scrollable element (as defined by the active CSS) —
either `<html/>` or `<body/>`.

Prefers `<body />` if both are scrollable.

Use this helper when you want to reliably scroll the whole page.

```ts
import { getPageScrollElm } from '@reykjavik/hanna-utils';

getPageScrollElm().scrollTo(0, 1200);
```

### `getStableRandomItem`

**Syntax:**
`getStableRandomItem<T>(items: ReadonlyArray<T> | Record<string, T>, seed: string): T`

Returns a pseudo random item from a collection of `items` (array or record),
based on a given `seed` key/id. The function always returns the same item for
a given collection and `seed`.

You might want to use this helper inside React components to get a stable
randomness, without having to resort to hooks.

```ts
import { getStableRandomItem } from '@reykjavik/hanna-utils';
import { blingTypes } from '@reykjavik/hanna-utils/assets';

// ...inside a component

const randomBling = getStableRandomItem(blingTypes, props.newsHeadline);
```

### `capitalize`

**Syntax:**
`capitalize<Str extends string>(str: Str, locale?: string): Capitalize<Str>`

Simple 'foo bar' --> 'Foo bar' mapper.

Default locale: `"IS"` (effectively same as `"EN"` and vanilla
`toUpperCase()`)

```ts
import { capitalize } from '@reykjavik/hanna-utils';

capitalize('hello world'); // "Hello world"
capitalize('istanbul', 'TR'); // "İstanbul"
```

<!--
### `focusElement`

**Syntax:** `focusElement(target: string | HTMLElement): ReturnType<typeof setTimeout>`

Simplistic helper to move keyboard `.focus()` to a given element.

If the element is not focusable (i.e. a `<div/>` without a `tabindex` attribute)
then this function has no effect.

```ts
import { focusElement } from '@reykjavik/hanna-utils';

focusElement('.TextBlock a');
// same as:
// focusElement(document.querySelector('.TextBlock a'));
```
-->

## Asset helpers

### Favicons

Helper to generate URLs for various types of "favicons" or "webmanifest
icons", etc...

```ts
import { getFavicon } from '@reykjavik/hanna-utils/assets';

const url = getFavicon('favicon.svg');
```

The function is typed to provide auto-completion of all the available icon
types.

### Illustrations

Utilities to work with the
[Illustrations](https://styles.reykjavik.is/assets/illustrations) on the asset
server.

```ts
import {
  illustrations,
  Illustration,
  getIllustrationUrl,
} from '@reykjavik/hanna-utils/assets';

const assetName: Illustration = illustrations[0];

const url = getIllustrationUrl(assetName);
```

### Efnistákn Icons

Utilities to work with the
[Efnistákn icons](https://styles.reykjavik.is/assets/efnistakn) on the asset
server.

```ts
import {
  efnistakn,
  Efnistakn,
  getEfnistaknUrl,
} from '@reykjavik/hanna-utils/assets';

const assetName: Efnistakn = efnistakn[0];

const url = getEfnistaknUrl(assetName);
```

### Formheimur Shapes

Utilities to work with the
[Formheimur shapes](https://styles.reykjavik.is/assets/formheimur) on the
asset server.

```ts
import {
  formheimur,
  Formheimur,
  getFormheimurUrl,
} from '@reykjavik/hanna-utils/assets';

const assetName: Formheimur = formheimur[0];

const url = getFormheimurUrl(assetName);
```

### Bling Shapes

Utilities to work with the
[Bling shapes](https://styles.reykjavik.is/assets/bling) on the asset server.

```ts
import {
  blingTypes,
  BlingType,
  getBlingUrl,
} from '@reykjavik/hanna-utils/assets';

const blingName: BlingType = blingTypes[0];

const url = getBlingUrl(blingName);
```

### Misc. Style Server Assets

Helper to generate a URL to arbitrary asset on on the style server.

```ts
import { getAssetUrl } from '@reykjavik/hanna-utils/assets';

const url = getAssetUrl('reykjavik-logo.svg');
```

### Style-Server Info

#### `styleServerUrl`

**Syntax:** `styleServerUrl: string`

This URL is used when building links to graphic/styling assets, etc. It is
used internally by all of the above asset getter functions
(`getIllustrationUrl`, `getIllustrationUrl`).

The default value depends on `NODE_ENV`:

- Production mode:
  [`https://styles.reykjavik.is`](https://styles.reykjavik.is)
- Dev mode: [`https://styles.test.thon.is`](https://styles.test.thon.is)

#### `setStyleServerUrl`

**Syntax:** `setStyleServerUrl(url: string | URL | undefined): void`

This updates the value of `styleServerUrl` globally. Use it at the top of your
application if you want to load assets and CSS bundles from a custom
style-server instance, e.g. during testing/staging/etc.

The URLs are pushed to a simple stack, and if you want to unset a custom URL,
use the `setLinkRenderer.pop()` method to revert back to the previous one.
Example:

```js
import {
  setStyleServerUrl,
  styleServerURL,
} from '@reykjavik/hanna-utils/assets';

setStyleServerUrl('https://styles.test.thon.is/');

console.log(styleServerURL); // 'https://styles.test.thon.is'
const illustrationUrl1 = getIllustrationUrl('esjan');
// 'https://styles.test.thon.is/assets/illustrations/esjan.png'

setStyleServerUrl.pop(); // reset `styleServerUrl` to previous value

console.log(styleServerURL); // 'https://styles.reykjavik.is'
const illustrationUrl = getIllustrationUrl('esjan');
// 'https://styles.reykjavik.is/assets/illustrations/esjan.png'
```

You can explicitly switch to using the library's default `styleServerURL` by
passing `undefined` as an argument — like so:

```js
setStyleServerUrl(undefined); // pushes the default URL to the stack
```

## I18N helpers

### `getTexts`

**Syntax:**
`<Texts extends Record<string, unknown>, Lang extends string>( props: { texts?: Texts; lang?: Lang }, defaultTexts: DefaultTexts<Texts, Lang>) => Texts | Record<keyof Texts, string>`

Helper for components that expose (optional) `texts` and `lang` props for
customizing their UI texts,

Returns `texts` when available, but otherwise it resolves the correct texts
object from within `defaultTexts` to use based on `lang` (falling back on
default language texts when all else fails).

In dev-mode it emits an error to the console if an unsupported `lang` is
passed.

```tsx
import { getTexts } from '@reykjavik/hanna-utils/i18n';

type Props = {
  isOpen: boolean;
  onToggle: () => void;
  // I18n props:
  texts?: { open: string; close: string };
  lang?: string;
};

const defaultTexts: Record<Props['lang'], Props['texts']> = {
  is: { open: 'Opna', close: 'Loka' },
  en: { open: 'Open', close: 'Close' },
  pl: { open: 'Otworzyć', close: 'Zamknąć' },
};

export const SillyToggler = (props: Props) => {
  const texts = getTexts(props, defaultTexts);

  return (
    <button onClick={props.onToggle}>
      {props.isOpen ? texts.open : texts.close}
    </button>
  );
};
```

## Social Media Sharing

Hanna-utils provides a small, easy to use suite of utilities to generate, GDPR
and privacy-friendly social-media sharing links.

```ts
import * from '@reykjavik/hanna-utils/shareButtonsUtils';
```

Until proper documentation is ready, see
[shareButtonsUtils.ts](https://github.com/rvk-utd/hanna/blob/main/modules/hanna-utils/src/shareButtonsUtils.ts)
(and
[ShareButtons.tsx](https://github.com/rvk-utd/hanna/blob/main/modules/hanna-react/src/ShareButtons.tsx)
for an example of how it's used in `hanna-react`).

## Polyfills / A11y

### `focus-visible` polyfill

Exposes [`focus-visible`](https://www.npmjs.com/package/focus-visible) as an
optionally importable module to consumers of `hanna-utils`, without requiring
them to install it as a standalone dependency in their project.

At/near the top of your App do:

```ts
import '@reykjavik/hanna-utils/focus-visible';
```

## Branded types

### `ensurePosInt`

**Syntax:** `ensurePosInt(cand: unknown): PositiveInteger | undefined`

Checks if `cand` evaluates to a positive integer and, if so, returns a branded
`PositiveInteger` of equal value.

Returns `undefined` otherwise.

Examples:

- `1` → `1`
- `"1"` → `1`
- `0` → `undefined`
- `-1` → `undefined`
- `1.5` → `undefined`
- `"Infinity"` → `undefined`
- `"foo"` → `undefined`

## TypeScript helpers

### `notNully`

**Syntax:** `notNully(value: unknown): value is NonNullable<V>`

Simple type-guarding filter function that filters out `null`y values (`null`
and `undefined`) in a type-aware way.

```ts
import { notNully } from '@reykjavik/hanna-utils';

const mixed = ['hi', null, undefined, ''];
const strings: Array<string> = mixed.filter(notNully);
// ['hi', '']
```

### `notFalsy`

**Syntax:** `notFalsy(value: unknown): value is NonNullable<V>`

Simple type-guarding filter function that filters out "falsy" values (`""`,
`0`, `NaN`, false, `null` and `undefined`) in a type-aware way.

```ts
import { notFalsy } from '@reykjavik/hanna-utils';

const mixed = ['hi', null, undefined, '', 0, false, 'ho'] as const;
const strings: Array<'hi' | 'ho'> = mixed.filter(notFalsy);
// ['hi', 'ho']
```

### `ObjectKeys`, `ObjectEntries`, `ObjectFromEntries`

Nicer, more type-aware aliases for the native `Object.keys`, `Object.entries`
and `Object.fromEntries`.

```ts
import {
  ObjectKeys,
  ObjectEntries,
  ObjectFromEntries,
} from '@reykjavik/hanna-utils';
```

### Type `OpenRecord`

**Syntax:** `OpenRecord<Keys extends string, Values>`

A variant of `Record<string, T>` that warns if any `Keys` are missing when
it's declared.

It is useful for building enum objects to quickly validate JavaScript run-time
user inputs and applying default values and "alias" outdated keys.

```ts
import type { OpenRecord } from '@reykjavik/hanna-utils';

type SizeVariant = 'small' | 'large';
const sizes: OpenRecord<SizeVariant, number> = {
  // Required keys
  small: 12,
  large: 20,
  // Extra key
  normal: 16,
};

// ...

const sizeValue = sizes[props.size || 'normal'] || sizes.normal;
```

### Type `OpenStringMap`

**Syntax:** `OpenStringMap<Keys extends string, Values = Keys>`

A variant of `OpenRecord` for cases where you're mapping `Keys` to themselves.
It allows for shorter/simpler type signature. The second `Value` parameter is
unioned to `Keys`

```ts
import type { OpenStringMap } from '@reykjavik/hanna-utils';

type AlignVariant = 'left' | 'right';

const aligns: OpenStringMap<AlignVariant> = {
  // Required keys
  left: 'left',
  right: 'right',
  // Extra key
  default: 'left', // value must be of type AlignVariant
};

const aligns2: OpenStringMap<AlignVariant, ''> = {
  // Required keys
  left: 'left',
  right: 'right',
  // Extra key
  default: '', // '' is explicitly allowed by the type signature
};

// ...

const alignValue = aligns[props.align || 'default'] || aligns.default;
```

### Type `AllowKeys`

Return `A` with the unique keys of `B` as optionally `undefined`.

Example:

```ts
type A = { type: 'profit'; gain: number };
type B = { type: 'loss'; loss: number; panic: boolean };

type MyProps = AllowKeys<A, B>;
```

is equivalent to:

```ts
type MyProps = { type: 'profit'; gain: number; loss?: never; panic?: never };
```

The second type parameter can also be a union of strings. Thus, the above
example could be rewritten so:

```ts
type MyProps = AllowKeys<A, 'type' | 'loss' | 'panic'>;
```

NOTE: This type helper is used by `EitherObj<A,B,…>` type.

### Type `EitherObj`

Allow any one of its input types, but accept the keys from the other type(s)
as optionally `undefined`.

The `EitherObj` accepts between 2 and 4 type parameters.

Example with three inputs: `A`, `B` and `C`:

```ts
type A = { type: 'profit'; gain: number };
type B = { type: 'loss'; loss: number };
type C = { type: 'even'; panic: boolean };

type MyProps = EitherObj<A, B, C>;
```

is equivalent to:

```ts
type MyProps =
  | { type: 'profit'; gain: number; loss?: never; panic?: never };
  | { type: 'loss'; gain?: never; loss: number; panic?: never };
  | { type: 'even'; gain?: never; loss?: never; panic: boolean };
```

### Type Testing Helpers

#### Type `Expect<T>`

Expects `T` to be `true`

#### Type `Equals<A, B>`

Returns true if types `A` and `B` are equal (and neither is `any`)

#### Type `Extends<A, B>`

Returns true if type `A` extends type `B` (and neither is `any`)

#### Type `NotExtends<A, B>`

Returns true if type `A` does **NOT** extend type `B` (and neither is `any`)

## Changelog

See
[CHANGELOG.md](https://github.com/rvk-utd/hanna/blob/main/modules/hanna-utils/CHANGELOG.md)
