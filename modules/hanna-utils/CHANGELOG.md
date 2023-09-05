# Change Log for `@reykjavik/hanna-utils`

## Upcoming...

- ... <!-- Add new lines here. -->

## 0.2.9

_2023-09-04_

- feat: Add `getRvkLogoUrl()` asset helper
- feat: Add optional parameter `variant` to `getIllustrationUrl`
- feat: Add utility types `OmitDistributive`, `PickDistributive`,
  `RequireExplicitUndefined`

## 0.2.8

_2023-07-25_

- feat: Add optional `altText` parameter to `getSVGtext()`
- fix: List `tslib` as dependency

## 0.2.7

_2023-07-06_

- feat: Deprecate `getPageScrollElm`, as it's no longer needed

## 0.2.6

_2023-06-01_

- fix: ESM version of `styleServerUrl` points to localhost in dev mode

## 0.2.5

_2023-05-24_

- fix: Update dependencies to fix import resolution errors in node@>=18

## 0.2.4

_2023-05-23_

- feat: Re-enable ESM exports in published build

## 0.2.3

_2023-02-16_

- feat: Add `getFavicon()` asset helper

## 0.2.2

_2023-02-15_

- feat: Default `styleServerUrl` to <https://styles.test.thon.is> in dev mode

## 0.2.1

_2023-01-16_

- feat: Make `setStyleServerURL()`s stack, add `setStyleServerURL.pop()` —
  deprecate `setStyleServerURL.reset()`

## 0.2.0

_2022-12-15_

- **BREAKING** feat: Replace `formatMonitor` with `getFormatMonitor` getter —
  for side-effect-less `import`s

## 0.1.18

_2022-12-15_

- feat: `formatMonitor` export is now defined in server-side environments —
  but permanently dormant

## 0.1.17

_2022-11-23_

- fix: Make `ObjectFromEntries` accept readonly arrays
- fix: `EitherObj` with 3-4 params

## 0.1.16

_2022-11-03_

- docs: Improve JSDocs and add missing chapters to README
- fix: `printDate` should default to DEFAULT_LANGUAGE, not English
- `shareButtonUtils`:
  - fix: Add support for Polish
  - fix: Make Icelandic the default/fallback locale
  - fix: Swap in Icelandic and English `emailSubject`s

## 0.1.15

_2022-10-25_

- feat: Add `styleServerUrl` and `setStyleServerUrl()`
- feat: Add `ensurePosInt` and branded `PositiveInteger` type
- feat: Add `notFalsy` type guarding filter function
- feat: Add illustration token `vegvisir`
- feat(ts): Add testing types `Expect`, `Equals`, `Extends`, `NotExtends`

## 0.1.14

_2022-09-27_

- feat(ts): Rename `Cleanup<T>` helper, deprecate `Resolve<T>`

## 0.1.13

_2022-09-14_

- chore(ts): Add reference paths for better Intellisense sub module discovery

## 0.1.12

_2022-09-01_

- feat: Add string helper `capitalize`

## 0.1.11

_2022-08-29_

- feat(ts): Add utility types `AllowKeys`, `EitherObj`

## 0.1.10

_2022-07-07_

- fix: Change build to only export CommonJS

## 0.1.7 – 0.1.9

_2022-06-13_

- fix: Problems in CJS and ESM, dual module file-structure

## 0.1.5 – 0.1.6

_2022-06-07_

- fix: Mangled pkg.exports tokens

## 0.1.4

_2022-06-03_

- fix: Correct code-example in README, and update `*.d.ts` files

## 0.1.0 – 0.1.3

_2022-05-30_

- target: **Hanna 0.8** markup patterns
- feat: Initial release with helpers refactored out of the React library
