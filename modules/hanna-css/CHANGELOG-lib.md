# Change Log for `@reykjavik/hanna-css`

## Upcoming...

- ... <!-- Add new lines here. -->
- feat: Make `setStyleServerURL()`s stack. Add `setStyleServerURL.pop()`

## 0.3.10

_2022-11-23_

- feat: Trim whitespace from the tokens passed to `getCssBundleUrl`
- feat(ts): Add type restrictions to `getCssBundleUrl`'s `version` option

## 0.3.8 – 0.3.9

_2022-11-03_

- feat: Support passing custom `namespace` prefix to `buildVariables()`
- feat: Add constant `icons`, and type `IconName`
- feat: Add `font_raw.sizes`
- feat: `getCssBundleUrl` tolerates trailing slashes on `testingServer` URLs
- feat: Re-export `setStyleServerUrl` from `@reykjavik/hanna-utils`
- feat: Deprecate `getCssBundleUrl`'s `testingServer` option in favour of
  `setStyleServerUrl`
- feat: Upgrade `es-in-css` for bugfixes and new features.
- feat: Add new dev mixins `WARNING_border__`, `WARNING_border_soft__`
- feat: Convert relevant `_raw` values to `PxValue`
- fix(ts): Tighten signature of between helpers to use `PlainNumber` type
- fix(ts): Make most constant objects readonly (`as const`)

## 0.3.7

_2022-07-07_

- fix: Change build to only export CommonJS

## 0.3.5 – 0.3.6

_2022-06-21_

- fix: Invalid `cssCurrentVersionFolder` and `styleServerUrl` in dev mode

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
  - CSS variable helper: `hannaVars` object, and a `hannaVarOverride` method
    and a
  - Lower-level variable builder `buildVarialbes`
  - Env variable: `isDevMode`
  - Helper constants: `colorThemes`, `mq` (media queries) and `characters`
  - Iconfont styling mixin: `iconStyle` (undocumented, for now)
  - Markup warning mixins: `WARNING__`, `WARNING_soft__`, `WARNING_message__`,
    `suppress_WARNING__`, `suppress_WARNING_soft__`
  - Raw design constants: `colors_raw`, `font_raw`, `grid_raw`,
    `iconfont_raw`, `breakpoints_raw`
