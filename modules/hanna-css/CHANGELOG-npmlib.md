# Change Log for `@reykjavik/hanna-css`

## Upcoming...

- ... <!-- Add new lines here. -->
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
