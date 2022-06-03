# @reykjavik/hanna-utils

A collection of helpful functions and constants when using the Hanna design
system.

<!-- prettier-ignore-start -->

- [Misc Utilities](#misc-utilities)
  - [`getSVGtext`](#getsvgtext)
  - [`formatMonitor`](#formatmonitor)
  - [`printDate`](#printdate)
  - [`getPageScrollElm`](#getpagescrollelm)
  - [`getStableRandomItem`](#getstablerandomitem)
- [Asset helpers](#asset-helpers)
  - [Illustrations](#illustrations)
  - [Efnistákn Icons](#efnistákn-icons)
  - [Formheimur Shapes](#formheimur-shapes)
  - [Bling Shapes](#bling-shapes)
  - [Misc. Style Server Assets](#misc-style-server-assets)
- [Social Media Sharing](#social-media-sharing)
- [Polyfills / A11y](#polyfills--a11y)
  - [`focus-visible` polyfill](#focus-visible-polyfill)
- [TypeScript helpers](#typescript-helpers)
  - [`notNully`](#notnully)
  - [`ObjectKeys(object)`, `ObjectEntries(object)`, `ObjectFromEntries()`](#objectkeysobject-objectentriesobject-objectfromentries)
  - [Type `OpenRecord`](#type-openrecord)
  - [Type `OpenStringMap`](#type-openstringmap)

<!-- prettier-ignore-end -->

## Misc Utilities

### `getSVGtext`

**Syntax:** `getSVGtext(url: string | undefined): Promise<string>`

Fetches a remote SVG file and returns its markup contents — exlcuding any
leading `<?xml />` directives or "Generator" comments.

```ts
import { getSVGtext } from '@reykjavik/hanna-utils';

const svgUrl = 'https://styles.reykjavik.is/assets/reykjavik-logo.svg';

getSVGtext(svgUrl).then((svgMarkup) => {
  document.body.insertAdjacentHTML('beforeend', svgMarkup);
});
```

### `formatMonitor`

A module that contains info about the currently active screen media format and
a way to subscribe/unsubscribe callbacks to whenever the window switches over
to another "media-format"

The Hanna CSS module/token `-basics` configures certain media-query
breakpoints with human-friendly names (i.e. "phone", "phablet", "tablet",
"netbook", "wide")

NOTE: In server-side environments (without `window` and `document` objects)
the exported `formatMonitor` object is always `undefined`.

```ts
import { formatMonitor } from '@reykjavik/hanna-utils';
import type { MediaFormat } from '@reykjavik/hanna-utils';

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

Very simple, very stupid, standalone date formatter for Icelandic, English and
Polish.

Just prints the full date (day, month, year). No bells. No whistles. No
options.

```ts
import { printDate } from '@reykjavik/hanna-utils';

printDate('2022-04-30', 'is'); // 31. apríl 2022
printDate('2022-04-30', 'en'); // April 31, 2022
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
for an usage example in `hanna-react`).

## Polyfills / A11y

### `focus-visible` polyfill

Exposes [`focus-visible`](https://www.npmjs.com/package/focus-visible) as an
optionally importable module to consumers of `hanna-utils`, without requiring
them to install it as a standalone dependency in their project.

At/near the top of your App do:

```ts
import '@reykjavik/hanna-utils/focus-visible';
```

## TypeScript helpers

### `notNully`

```ts
import { notNully } from '@reykjavik/hanna-utils';

notNully('hi'); // false
```

**Syntax:** `notNully(value: unknown): value is NonNullable<V>`

Simple type-guarding filter function to weed out `null`y values from an array.

### `ObjectKeys(object)`, `ObjectEntries(object)`, `ObjectFromEntries()`

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

###
