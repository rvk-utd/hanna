# @reykjavik/hanna-utils

A collection of helpful functions and constants when using the Hanna design
system.

<!-- prettier-ignore-start -->

- [Utilities](#utilities)

<!-- prettier-ignore-end -->

## Utilities

## `printDate`

**Syntax:** `(date: string | Date, lang?: string): string`

Very simple, very stupid, standalone date formatter for Icelandic, English and
Polish.

Just prints the full date (day, month, year).

## TypeScript helpers

### `notNully`

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
