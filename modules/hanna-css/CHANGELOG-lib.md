# Change Log for `@reykjavik/hanna-css`

## Upcoming...

- ... <!-- Add new lines here. -->

## 0.3.5

_2022-06-21_

- fix: Localhost styleServerUrl in dev mode

## 0.3.4

_2022-06-20_

- fix: Export `targetCssVersion`, deprecate older `cssVersion`

## 0.3.2 – 0.3.3

_2022-06-03_

- fix: Correct broken `*.d.ts` files

## 0.3.0 – 0.3.1

_2022-06-01_

- **BREAKING** feat: Ugrade to `es-in-css@0.5` which changes how
  `VariablePrinter`s work

## 0.2.0

_2022-05-30_

- **BREAKING** feat: Change `colorThemes` constant to a
  `Record<string, string>`
- feat: Add constant `colorFamilies`, and type `ColorFamily`

## 0.1.1

_2022-05-13_

- feat: Add method `getCssBundleUrl`
- feat: Add constants `styleServerUrl` and `hannaCssVersion`

## 0.1.0

_2022-05-13_

- feat: Initial release with basic features
  - CSS variable helper: `cssVars` object, and a `cssVarOverride` method and a
  - Lower-level variable builder `buildVarialbes`
  - Env variable: `isDevMode`
  - Helper constants: `colorThemes`, `mq` (media queries) and `characters`
  - Iconfont styling mixin: `iconStyle` (undocumented, for now)
  - Markup warning mixins: `WARNING__`, `WARNING_soft__`, `WARNING_message__`
  - Raw design constants: `colors_raw`, `font_raw`, `grid_raw`,
    `iconfont_raw`, `breakpoints_raw`
