# Change Log for `@reykjavik/hanna-css`

## Upcoming...

- ... <!-- Add new lines here. -->
- feat: Add token `AutosuggestSearch` to `CssModuleToken`

## 0.4.7

_2023-09-04_

- feat: Add `formFieldVars` for custom styling `FormField`'s
- feat: Add tokens `Pagination`, `-legacy-AutoSeenEffects` to
  `CssModuleToken`s

## 0.4.6

_2023-08-15_

- feat: Add `boxShadow_*` props to `hannaVars`
- feat: Add vars `space_10` and `space_10__neg` to `hannaVars`
- fix: `clamp*` methods inversed min–max values for negative slopes

## 0.4.5

_2023-07-31_

- feat: Add `keyboardFocusStyling` and `hoverKeyboardFocusAndActiveStyling`
- fix: Don't require `srOnly_focusable` and `srOnly_focusableContent` options

## 0.4.4

_2023-07-26_

- feat: Add `@reykjavik/hanna-css/scale` with `clamp*` and `scale*` helpers
- feat: Add tokens `Multiselect`, `ReadSpeakerPlayer` to `CssModuleToken`s
- fix: List `tslib` as dependency

## 0.4.3

_2023-07-06_

- fix: Make `htmlCl.*` selectors less specific (remove the `html` prefix)

## 0.4.2

_2023-05-24_

- fix: Update dependencies to fix import resolution errors in node@>=18

## 0.4.1

_2023-04-25_

- feat: Add various `srOnly_*` accessibility mixins

## 0.4.0

_2023-04-24_

- **BREAKING** feat: `colors_raw` contains hex-color strings not `ColorValue`
- feat: Add `/*#__PURE__*/` markers to help down-stream bundle tree-shaking

## 0.3.18

_2023-04-24_

- fix: Regression in ` css``  ` array inlining

## 0.3.16 – 0.3.17

_2023-04-04_

- feat: Add `htmlCl` object, with global-state selectors for `<html/>`
- feat: Add `Layout$$header_logo_color`, `Layout$$header_color` to `hannaVars`
- feat: Re-enable ESM exports in published build
- feat: Shorten `noFlickerSnippet_multiPage` timeout to 6 seconds

## 0.3.15

_2023-03-20_

- feat: Add `hannaVars.Layout$$main__paddingTop`
- feat: Add token `Tooltip` to `CssModuleToken`s

## 0.3.14

_2023-02-27_

- feat: Add type `CssModuleToken` and use it in `getCssBundleUrl([...tokens])`
- feat: Change dev css folder to `dev-v0.8`
- fix: Limit `getCssBundleUrl`'s `CssVersionToken`s to supported versions

## 0.3.12 – 0.3.13

_2023-01-27_

- feat: Add `getEssentialHannaScripts` styling assist helper
- feat: Add `hannaVars.link_underline__hairline`

## 0.3.11

_2023-01-16_

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
