# Change Log for `@reykjavik/hanna-react`

## Upcoming...

- ... <!-- Add new lines here. -->
- feat: Add `useLaggedState` to `utils` for advanced delayed state updates

## 0.10.162

_2026-01-16_

- feat: Add component `ContextMenu` (previously `DropdownButton`)
- feat: Deprecate component `DropdownButton` (in favor of `ContextMenu`)

## 0.10.161

_2026-01-15_

- feat: Add component `Icon`
- feat: Add component `ReykjavikWaves`
- `DropdownButton`:
  - feat: Add prop `Toggler` for custom toggler content
  - feat: Add "customitem" object with `Content`, `modifier` and `current`
- `MainMenu2`:
  - feat: Add prop `redhot` to `MainMenu2Props.items.hot` items to always show
    them on mobile
  - feat: Add "customitem" object with `Content`, `modifier` and `current`
  - docs: Minor JSDoc corrections for on-click handlers
- fix: Clicking `.SearchInput__button` always passed empty string as value

## 0.10.160

_2025-10-13_

- `ReadSpeakerPlayer`:
  - fix: Default `lang` to Hanna's `DEFAULT_LANG` value, like other components

## 0.10.159

_2025-10-09_

- `FileUpload`:
  - feat: Add prop `unstable_confirmReplace` for multi-upload name-conflicts

## 0.10.157 – 0.10.158

_2025-09-16_

- `Multiselect`
  - feat: Add prop `onDropdown` prop
  - fix: Sync `.checked` prop of keyboard-toggled `input`s with visual state
  - fix: Scope "global" keyboard event listener to the component's element
- `Selectbox`:
  - fix: Remove stray `modifier` prop from `SelectboxProps`
- docs: Add JSDoc comments for `FormfieldProps.renderInput` parameters

## 0.10.155 – 0.10.156

_2025-06-23_

- feat: Allow `MainMenu2` items to be `undefined`, `null` or `false` for
  easier conditional item array population

## 0.10.154

_2025-06-20_

- feat: Add optional `inline` prop to `LayoutProps.customLogo`
- fix: `ImageProps.inline` should not fail to replace with an empty result

## 0.10.153

_2025-06-19_

- `Layout`:
  - feat: Add prop `customLogo`
  - fix: Change `__header__navlink`'s redundant `aria-label=` to `title=`

## 0.10.152

_2025-05-23_

- `Datepicker`:
  - fix: set `autoComplete="off"` on the input element

## 0.10.151

_2025-05-22_

- `Heading`:
  - fix: Apply `wrapperProps.className` standalone, not as a modifier
- `Layout`:
  - fix: Suppress rendering of empty `.Layout__footer`

## 0.10.150

_2025-05-08_

- `InfoBlock`:
  - feat: Suppress rendering empty `div.InfoBlock__items` list element

## 0.10.149

_2025-04-02_

- `Modal`:
  - perf: Don't render `Modal`s (and their contents) unless "visible"

## 0.10.148

_2025-03-26_

- `BreadCrumbs`:
  - fix: Drop `aria-lebel=""` for `role="none"` on `BreadCrumbs__separator`

## 0.10.147

_2025-02-25_

- `AutosuggestSearch`:
  - feat: Add props `errorMessage`, `invalid`, `assistText`
  - feat: Add props `onInputFocus` and `onInputBlur`
  - fix: `wrapperProps.className` overrides wrapper's default class
  - fix: Make `onClearOptions` prop optional

## 0.10.146

_2025-02-10_

- fix: Avoid conrolled–uncontrolled warning for `Datepicker` in `isoMode`

## 0.10.145

_2025-01-14_

- feat: Add prop `wrapperProps` to `FooterInfo` and `FooterBadges`

## 0.10.144

_2024-12-18_

- `Alert`:
  - feat: (TS) Change `alertTypes` into `Record<string, 1>` for easier use

## 0.10.143

_2024-12-06_

- `Datepicker:`
  - fix: Timezone mismatch in `isoMode` (emitted UTC-based dates, not local)

## 0.10.142

_2024-11-28_

- feat: Deprecate `focus-visible` polyfill module; browser support is now good
- `Datepicker`:
  - fix: Set `minDate` prop values to `T00:00` to allow manual min date input

## 0.10.141

_2024-11-25_

- `DropdownButton`:
  - feat: Support rendering `current` status of menu items
  - feat: Add prop `onItemClick`

## 0.10.140

_2024-11-21_

- `Layout`:
  - fix: Clicking "Skip to navigation" focuses the first focusable element

## 0.10.139

_2024-11-20_

- feat: Add component `DropdownButton`
- `Multiselect`:
  - fix: Incorrect `aria-controls` attribute value on input/toggler elements
- `MainMenu2`:
  - fix: Skip rendering pointless `<button/>`s when `onItemClick` is undefined
- `FocusTrap:`
  - fix: Add `iframe` and `summary` to the list of focusable elements
  - docs: Add short JSDoc on why/how the `depth` prop is useful
- `FormField`:
  - fix: Indicate that `renderInput`'s `inputProps.id` value is always set
- `utils`:
  - feat: Add low-level `domid` helper function

## 0.10.138

_2024-10-31_

- `ActionCards`, `ExtraCards`, `ImageCards`, `ArticleCards`:
  - feat: Add per-card prop `onClick`, and make `href` optional

## 0.10.137

_2024-10-29_

- fix: Optimize `useScrollEdgeDetect` to only assign the ref element once

## 0.10.136

_2024-09-10_

- feat: Add prop `instantShow` to `Alert`, to skip opening transitions

## 0.10.135

_2024-09-03_

- feat: Add prop `variant="light"` to `MainMenu2`

## 0.10.134

_2024-08-19_

- `MainÞMenu2`:
  - feat: Pass `openMenu()` prop to `MainMenu2CustomItem` callbacks
  - feat: Allow rich-text (JSX) `label`s for menu items
  - feat: Allow `icon` prop on related items
  - fix: links with empty-string `href` not rendered server-side
- `MainMenu`:
  - fix: Unnecessary scroll-reset when resizing window to enter hamburger-mode

## 0.10.133

_2024-08-08_

- feat: `MainMenu`: Pass `closeMenu` function prop to custom item callbacks

## 0.10.132

_2024-07-29_

- fix: `Modal`'s `open` prop not defaulting to `true`

## 0.10.130 – 0.10.131

_2024-07-23_

- `FocusTrap`:
  - fix: Account for hidden and disabled elements not being focusable

## 0.10.129

_2024-07-16_

- feat: Add prop `childrenHTML` to `Carousel` for Real Nasty Dirty Work™ —
  primary use case is progressive enhancement of static HTML.
- feat: Gracefully catch (and log) errors in Sprinkles' lifecycle methods

## 0.10.128

_2024-07-01_

- feat: Add prop `renderItemSubContent` to all checkbox and radio group
  compnents — to support more advanced UI patterns.
- feat: Add prop `allow` to `IframeBlock`

## 0.10.127

_2024-06-27_

- fix: Ref error when `MainMenu2` unmounts

## 0.10.126

_2024-06-05_

- `FocusTrap`:
  - feat: Add className to wrapper element
  - fix: Exclude `FocusTrap` elements from list of eligible focusables
- fix: Mishandled focus-managment of `Modal` while open

## 0.10.125

_2024-04-10_

- fix: Stop updating `AutosuggestSearch` input value on up/down arrow keys

## 0.10.124

_2024-04-05_

- feat: Add prop `openBtnLabel` to `ContactBubble`
- feat: Make `FileInput`'s `dropzoneText` prop optional

## 0.10.123

_2024-03-21_

- feat: Add component `HannaCssLink` for flicker-free CSS URL changes
- feat: Make `'is'` the default language for `ReadSpeakerPlayer`

## 0.10.122

_2024-03-18_

- fix: Bad module import path in checkbox and radio inputs

## 0.10.121

_2024-03-14_

- fix: Translate `FormField` and `Checkbox` required label to 'en' and 'pl'
- fix: `DatePicker` only partially reflected the current `DEFAULT_LANG`

## 0.10.120

_2024-03-06_

- feat: Add props `inputValue`, `defaultInputValue` to `AutosuggestSearch`
- fix: `AutosuggestSearch` not calling `onInput` when input is emptied

## 0.10.119

_2024-02-29_

- fix: Stop `Multiselect` dropdown closing on touch-based page scroll

## 0.10.118

_2024-02-07_

- feat: Add component `IframeBlockClientScript`

## 0.10.117

_2024-01-26_

- feat: Add compnent `IframeedLayout`
- feat: Default to auto-activating the first `MainMenu2__main__item`
- fix: Remove leftover `data-icon` attribute off `MainMenu2`'s SSR toggler

## 0.10.116

_2024-01-10_

- feat: Remove `MainMenu2` toggler's hard-coded icon

## 0.10.115

_2024-01-09_

- feat: Add `getSearchContent` prop to `Multiselect`
- feat: Change icon on `MainMenu2`'s toggler button when menu is open

## 0.10.114

_2023-12-13_

- feat: Add prop `emptyMessage` to `AutosuggestSearch`
- feat: Add component `Radio` as a standalone atomic widget
- feat: Add prop `hideLabel` to `Checkbox` for minimal/atomic use
- fix: Regression in `Checkbox`- and `Radio`-related option typing

## 0.10.113

_2023-12-08_

- feat: Add component `MainMenu2`
- feat: Make `Datepicker` more flexible when parsing manual input strings –
  adds several, localized default formats
- feat: Add accessibility helper component `FocusTrap`
- Decouple all mobile-menu toggling logic from the `Layout` component
  - feat: Deprecate `useFormatMonitor` media flags `*Hamburger`, `*Topmenu`
  - feat: Deprecate `useMenuToggling` hook
  - feat: Add `.Layout__header__navlink`
  - feat: Make `MainMenu` define its own toggler button and "Hamburger" mode
- feat: Add standalone `MobileMenuToggler` component
- `Multiselect`:
  - fix: Suppress required asterisks on individual options
  - fix: Deduplicate the currentvalues list
  - fix: Manage focus after clicking remove buttons on currentvalues
- `BasicTable`:
  - feat: Pass `rowData` as 3rd param to `rowProps` callbacks
  - fix: Actually apply `rowProps` to the `<tr/>`s. (Awk)
- `ButtonPrimary`, `ButtonSecondary`, `ButtonTertiary`, `ButtonBack`,
  `TextButton`:
  - feat: Allow props `className` and `style`
- feat: Tweak `ContactBubble`'s show/hide scroll-distance thresholds
- fix: Suppress `MainMenu` server-rendering no-op `<button/>` elements

## 0.10.112

_2023-11-17_

- fix: `Modal` not reopening when `open` prop is toggled

## 0.10.110 – 0.10.111

_2023-11-10_

- `Modal`
  - feat: Add prop `wrapperProps`
  - feat: Add prop `stable`, deprecate `fickle` instead
  - feat: Add prop `noCloseButton`
  - refactor: Rewritten and modernized
- feat: Add prop `stacked` to `.CheckboxButtonsGroup` and `.RadioButtonsGroup`
- feat: Add property `group` to `MultiselectOption` type, for grouping options
- fix: Apply `wrapperProps.className` to `Heading`'s wrapper element
- fix: Non-sensical `Gallery` close button label

## 0.10.109

_2023-10-25_

- feat: Allow simple JSX in `HeroBlockProps.title`
- feat: Stop inserting `.TableWrapper__scroller` inner wrapping element
- fix: Conflicted/ambigious `wrapperProps` element type for `BasicTableProps`
- fix: Make `Pagination` root-element into a `<nav />`

## 0.10.108

_2023-10-09_

- fix: Add `rel="nofollow"` to all `Pagination` links
- fix: Fix esm import inside `useDomid` causing build errors in React<=v17
- fix: Make `useDomid` more efficient in React<=v17

## 0.10.107

_2023-10-05_

- fix: Next and prev links in `Pagination` not working

## 0.10.105 – 0.10.106

_2023-10-04_

- `Layout` and `WizardLayout`:
  - feat: Implement `__header__homelink` and `__header__sitename` markup
  - feat: Warn about missing/redundant `siteName` prop
- fix: Focus error on `SiteSearchAutocomplete` and `AutosuggestSearch`
  suggestion click
- fix: Make `GridBlocksProps.items` optional

## 0.10.104

_2023-09-13_

- feat: Make all translated components respect `DEFAULT_LANG` from hanna-utils
- `BasicTable`:
  - feat: Add props `wrapperProps`
  - feat: Add prop `rowProps`
  - feat: Export `Table*` types (`TableCell`, `TableRow`, etc.)
  - feat: Allow `key` prop as part of `TableCellData`
- feat: Add component `AutosuggestSearch`
- `SiteSearchAutocomplete`:
  - feat: Mark this component as deprecated, in favor of `AutosuggestSearch`
  - fix: Add translation prop `buttonText` — (optional, but logs warning in
    dev if missing.)
  - fix: Spread `wrapperProps` on the wrapping `<div/>` element not the
    contained `FormField`
- `SearchInput`:
  - feat: Add prop `onSubmit` firing on `Enter` keypress
  - feat: `onButtonClick` receives `value` as an argument
  - feat: Use `onSubmit` as fallback for `onButtonClick`
  - feat: Add prop `button` to toggle the button, ueses`onSubmit` as fallback
  - fix: Minor prop and attribute assignment cleanup
- `SiteSearchInput`:
  - feat: `onButtonClick` and `onSubmit` receive `value` as their argument
  - feat: Add prop `button` to toggle the button, ueses`onSubmit` as fallback
  - fix: Minor prop and attribute assignment cleanup
- `Datepicker`:
  - feat: Add prop `lang`, deprecate `localeCode`
  - feat: Add support for `hrefLang` values on `MainMenuItem` and
    `MegaMenuItem`
  - fix: Fix minor mistakes in aria-label translations
- feat: Add `useDomid` to `utils`

## 0.10.103

_2023-09-13_

- feat: Allow `BlingComboProps` values as `blingType` for `NewsHero` and
  `InfoHero`
- fix: Correctly pass `ssr` prop down to sub-`Tabs`
- fix: Respect `ssr` passed to `VerticalTabsTOC`

## 0.10.102

_2023-09-04_

- feat: Add component `Pagination`
- `MegaPanelItem` type:
  - feat: add prop `Content` for custom `*Panel__item` children
  - feat: add prop `modifier`, similar to `MainMenuItem.modifier`
- feat: Export `MegaPanelItemList` from `MainMenu`
- feat: Expand `MainMenuItem.modifier` to accept falsy and array values
- feat: Add props `wrapperProps` to `CarouselStepper`
- feat: Remove defeault/implicit seen-effect styling from all
  components(except `SeenEffect`, `BgBox` and `CenterColumn`) — flag
  `startSeen` prop as deprecated
- fix: Export type `MultiselectOption`, deprecate `MultiSelectOption`

## 0.10.101

_2023-08-28_

- feat: Add prop `wrapperProps` to almost all components — excluding a few
  low-level ones that already accept raw HTML props directly (e.g. most
  button-like compoments).  
  _(Exeptions: `BasicTable`, `Modal` and `CarouselStepper`. They'll also get a
  `wrapperProps` prop in a near-future release.)_
- feat: Deprecate prop, `wrapperRef` on all `FormField` related components
- fix: Export `CheckboxButtonProps` from `CheckboxButton`, deprecate old type

## 0.10.97 – 0.10.100

_2023-08-22_

- feat: Add prop `meta` to items of `ActionCards`
- feat: Add prop `summary` to items of `ArticleCards` and `ImageCards`
- feat: Add prop `size="large"` to `ArticleCards`
- feat: Allow `JSX.Element` as item `meta` for accepting `*Cards` components
- feat: Allow `JSX.Element` as item `summary` for all `*Cards` components
- feat: Expand `MainMenuItemList` to allow components as custom
  `MainMenu__item` children
- feat: Add default Polish translation for `Layout`
- feat: Make prop `title` optional for `MainMenu`
- feat: Make prop `title` optional for `BreadCrumbs`
- feat: Add prop `lang` to `BreadCrumbs`

## 0.10.96

_2023-07-26_

- fix: Remove `@types/react*` from `pkg.dependencies`

## 0.10.95

_2023-07-25_

- feat: Add optional `altText` parameter to `useGetSVGtext()`
- feat: Export `useMenuToggling` from `utils` module
- feat: Export `SSRSupportProps` type
- perf: Reduce render thrashing of `Layout`'s navChildren
- fix: `Layout` components set `alt="Reykjavík"` text on their header logo
- fix: Raise `Multiselect`'s internal `summaryLimit` to `20`
- fix: List `tslib` as dependency

## 0.10.93 – 0.10.94

_2023-07-06_

- feat: Add component `Multiselect`
- fix: Add `target` prop to all "\*Cards" components that have `href`s
- `Datepicker`:
  - feat: Add support for "uncontrolled" mode — (add prop `defaultValue`, make
    `value` and `onChange` optional.)
  - feat: Add prop `isoMode` to generate/submit ISO-8601 `<input/>` values
- Checkboxes and Radio buttons
  - feat: Support `readOnly` — using `disabled` + `input[type=hidden]`
  - feat: Support passing `options` as simple string array
  - feat: Make `name` prop optional for groups
  - fix: Handling of `disabled` as array of indexes
- fix: Runtime import errors in `FileInput` in ESM mode

## 0.10.92

_2023-06-06_

- feat: Add component `ReadSpeakerPlayer` and a `stopReading` helper
- fix: Update dependencies for minor esm and `Modal`-related bugfixes

## 0.10.90 – 0.10.91

_2023-06-01_

- fix: Add missing named export of `Tooltip` compnent
- fix: Update dependencies to fix esm–cjs import resolution errors

## 0.10.88 – 0.10.89

_2023-05-25_

- feat(ts): Export utility type `HtmlProps` from `utils` module — for adding
  HTML attributes (including `data-*`) to React components
- fix: Update dependencies to fix esm–cjs import resolution errors

## 0.10.87

_2023-05-19_

- feat: Add prop `target` to `MainMenuItem` type
- fix: Prevent nested/multpile `Modal`s from clashing with each other

## 0.10.86

_2023-04-24_

- feat: Add prop `Tag` to `SeenEffect`
- fix: `VerticalTabsTOCProps.activateOnFocus` now works as intended
- fix: Upstream regression in typed-input parsing in `react-datepicker`

## 0.10.85

_2023-04-04_

- feat: Re-enable ESM exports in published build
- fix: `MegaMenu` render thrashing and accidental scrolling to top of page

## 0.10.84

_2023-03-21_

- feat: Suppress hydration warnings for auto-generated DOM `id`s in React@18

## 0.10.83

_2023-03-20_

- feat: Add prop `small` to `FieldGroup`
- feat: Add prop `footer` to `InfoHero`
- fix: Error in `DatePicker` caused by
  [upstream regression](https://github.com/Hacker0x01/react-datepicker/issues/3918)

## 0.10.82

_2023-03-03_

- `MainMenu`:
  - feat: Add prop `homeLink` to `MainMenuProps` for convenience
  - feat: Add built-in support for Polish language to `MainMenu`
  - feat: Add optional `homeLink` prop to `MainMenuI18n`
- feat: Convert newlines in `ContactBubbleItem.extraLabel` into `<br/>`s
- fix: Remove `role="group"` off all Checkbox and Radio Group containers

## 0.10.81

_2023-02-16_

- feat: Add component `Tooltip`
- fix(ts): Make `MainMenu` onClick handlers return `void`, not `undefined`
- fix: Suppress accidental dev-mode warnings for
  `CheckboxButton`/`RadioButtonGroup`s

## 0.10.80

_2023-02-08_

- feat: Automatically close "Hamburger menu" when user clicks `MainMenu` links
- feat: Support `MainMenuProps.onItemClick` `MainMenuItem.onClick` returning
  `false` to prevent auto-closing of "Hamburger menu"
- feat: Add `useHannaUIState` hook to "utils" — exposing `isHamburgerMenuOpen`
  and `closeHamburgerMenu()`
- fix: Toggle `MainMenu` mega panels on repeated top-level link clicks
- fix: Close the currently open `MainMenu` mega panels on intra-link click
- fix: Close `ContactBubble` on intra-link/button click
- fix: Update `react-datepicker` for latest upstream bugfixes

## 0.10.79

_2023-01-23_

- feat: Support passing Array of `dateFormat`s to `Datepicker`

## 0.10.77 – 0.10.78

_2023-01-18_

- feat: Add standalone component `.CheckboxButton`
- feat: Add `.CheckboxButton__label__wrap` and `.RadioButton__label__wrap`
- feat: Add `utils` hooks `useIsBrowserSide`, `useIsServerSide` — for
  progressive enhancement
- feat: Add `utils` helper `setDefaultSSR()`
- feat: `ContentArticle` emits `__header` wrapper
- fix: Support "uncontrolled" use of all `Checkbox` and `Radio` groups
- fix: Edge-case bugs in `SiteSearchCurtain` focus-detection
- fix: Typo in `Datpicker`'s default `dateFormat`, broke typed input parsing

## 0.10.75 – 0.10.76

_2022-12-15_

- feat: Add `setLinkRenderer.pop()` to unset the last custom renderer
- feat: Add `setLinkRenderer`, exported from `/utils` — to allow hooking
  `hanna-react` into custom routing components
- fix: Suppress react warning about mixed-case `data-*` attributes
- fix: Update props type of `LinkRenderer` to use "modern" `ref`

## 0.10.74

_2022-12-12_

- feat: Add support for Polish to `DatePicker`
- fix: Make Icelandic the default `DatePicker` locale

## 0.10.73

_2022-12-08_

- fix: `Datepicker` calendar not closing when date is selected

## 0.10.72

_2022-12-07_

- feat: Add named exports to all component modules (heralds default export
  deprecation)
- fix: Disable all non-selected options in `readOnly` `Selectbox`es
- fix: Update `Selectbox` filled/empty status when `options` arrive late
- fix: incorrect SSR markup generated by `MainMenu`

## 0.10.71

_2022-11-23_

- feat: Add prop `onFilesRejected` to `FileInputProps`
- feat: Add prop `itemCount` for all Carousel-related components with
  `children` — drop requirement for children to be an Array
- feat(ts): Export `ArticleCardsItemProps`, deprecate `ArticleCardProps`
- feat(ts): Only allow either `align="right"` or `fullWidth` on `BasicTable`
- feat: Make `SiteSearchAutocompleteProps.renderSuggestion` optional
- feat: Add `FooterInfoGroup.main`, deprecate `FooterInfoGroup.role`
- `FileInput`:
  - feat: Add prop `lang` (default: `'is'`)
  - feat: Make prop `removeFileText` optional
  - fix: File-sizes are now formatted based on `lang` prop
- `ShareButton`:
  - fix: Add support for Polish
  - fix: Make Icelandic the default/fallback locale
  - fix: Swap in Icelandic and English `emailSubject`s
- fix: Lingering `--focus` state when keyboard navigating from `DatePicker`
- fix: Suppress Autocomplete suggestion container until suggestions arrive
- fix: Disable `button` element when `SearchInput` is disabled or readonly
- fix: Add missing `title` prop on `IframeBlock`
- fix: Set default value for empty `WizardStepper` step labels
- fix: Add missing prop `name` to `DatePicker`
- fix: Make `ContentArticleProps.meta` optional
- fix: Suppress `<hr>` in `ContentArticleProps` when `relatedLinks` is missing
- fix: Make `InfoBlockProps.subTitle` optional
- fix: Clicks inside `.Datepicker .FormField__input` div always focus `input`
- fix(ts): Remove unused (`never`) props from `ModalProps`

## 0.10.70

_2022-09-28_

- fix: Remove leftover dev logging

## 0.10.69

_2022-09-27_

- feat: Add controlled props `open` and `onToggle` to `AccordionList` — it now
  supports either [controlled or uncontrolled](./README-conventions.md) use
- fix: Squash `useMixedControlState` bugs/misbehavior and improve its typing

## 0.10.68

_2022-09-26_

- feat: Add prop `target` to `ArticleCarouselCardProps`
- feat: Improve `Selectbox`'s `options` and `onSelected` prop generics
- feat: Add prop `headingTag` to `ContentArticle` to support `<h1/>`
- feat: Add prop `forceH1` to `Heading`
- fix: Mark uncontrolled `TextInput`'s with user input `--filled` after reload
- fix(ts): Botched re-export of `SelectboxOption*` types

## 0.10.67

_2022-09-14_

- chore(ts): Add reference paths for better Intellisense sub module discovery
- feat: Add prop `summaryElement` to `ActionCards`
- feat(ts): Export `ActionCardsItemProps` type
- feat(ts): Export `ImageCardsProps`, `ImageCardsItemProps`, deprecate
  `ImageCardProps`
- feat(ts): Export `SelectboxOptionList`, deprecate `SelectboxOptions`
- fix(ts): Export omitted types `BasicTableProps` and `SelectboxOption`
- fix(ts): Make `PullQuote` & `BlockQuote`'s `by` prop required for `byHref`
- fix(ts): Remove accidentally exposed props on several `*Cards` components —
  these props were never supported and were either a no-op, or resulted in
  unstyled garbage

## 0.10.66

_2022-09-01_

- feat: Add `utils` hook `useDidChange`
- feat: Add `utils` hook `useMixedControlState`
- feat: Add `utils` hook `useScrollbarWidthCSSVar`
- fix: Stop hard-resetting `AccordionList`'s state on `defaultOpen` changes

## 0.10.63 – 0.10.65

_2022-08-29_

- feat: Changes to `FileInput`
  - feat: Add prop `FileList` to suppress (`false`) or customize its rendering
  - feat: Add props `multiple`, `accept`
  - feat: Deprecate prop `dropzoneProps`
  - fix: report deleted when adding files in single-file mode
  - fix: Make `dropZoneProps` optional, as originally indented
  - fix: Re-populate the file input on `value` prop change
  - feat: Explicitly skip rendering input element when `name` is missing
- fix: Hide `Carousel` mouse-cursor scroll controls at start/end positions
- fix: Pass `id` and other HTML props to static (span) `TagPill`s

## 0.10.62

_2022-08-23_

- feat: Add `diff` object to `FileInput`'s `onFilesUpdated` callback signature

## 0.10.61

_2022-08-11_

- feat: Add mouse-cursor scroll controls for `Carousel`-related components —
  Remove mousewheel hijacking behavior
- fix: `startSeen` hiding components with `html.before-sprinkling` present

## 0.10.60

_2022-06-24_

- fix: Add missing prop `checkOrigin` on `IframeBlock` (default: `false`)
- fix: Support "uncontrolled" use of `CheckboxGroup`, `RadioGroup`, et al
- fix: Change build to only export CommonJS

## 0.10.59

_2022-06-20_

- feat: Add component `ArticleCards`
- feat: Add component `Picture`
- feat: Add component `BgBox` for gray background wrapping
- feat: Add prop `small` to `ArticleMeta`
- fix: Suppress redundant className `.Heading--normal`
- feat: Add prop `focalPoint` to all `ImageProps`
- feat: Add `EffectProp.effectType` prop value `none` for opting out

## 0.10.56 – 0.10.58

_2022-06-13_

- feat: `MainMenu` returns `null` instead of rendering an empty menu
- feat: Add optional `group` prop to `SelectboxOptions` items
- fix: Problems in CJS and ESM, dual module file-structure

## 0.10.53 – 0.10.55

_2022-06-07_

- **IMPORTANT** feat: Rename package to `@reykjavik/hanna-react` — this means
  `@hugsmidjan_is/hanna-react` will not receive any more updates. The library
  is otherwise the same, with the same compatibility
- feat: Add `@reykjavik/hanna-utils` as dependency
- feat: Deprecate the `assets` exports (instead use
  `@reykjavik/hanna-utils/assets`)
- feat(ts): Export `AuxiliaryPanelIllustrations` from `MainMenu`

## 0.10.50 – 0.10.52

_2022-05-31_

- fix: Make `Carousel`-related components scroll on mousewheel
- fix: `CarouselStepper` buttons move focus to relevant carousel item

## 0.10.49

_2022-05-25_

- feat: Simplify all `Carousel`-related components to use CSS scroll-snap
- feat: Add prop `neutral` to `WizardStepperStep` to skip numbering

## 0.10.48

_2022-05-23_

- feat: Add components `BlockQuote`, `PullQuote`
- feat: Update `.Modal` to emit `.Modal__blings__inner` wrapper
- feat: Improve `DatePicker`:
  - feat: Add props `small`, `placeholder`, `value`, deprecate `initialDate`
  - fix: `onChange` may recieve `undefined`, when the field is cleared
  - fix: Make date-selection work, when initial value is empty
  - fix: `readOnly` prop had no effect

## 0.10.47

_2022-05-17_

- feat(ts): Export missing prop types:
  - `AuxiliaryPanelProps` from `MainMenu`
  - `ActionCardsProps` from `ActionCards`
  - `ExtraLinksCardProps` from `ExtraLinks`
- fix: Add module `Footnote`, deprecate module `Foonote` (typo)
- fix: Bump dependency for upstream bugfix for `Selectbox`

## 0.10.46

_2022-05-12_

- feat: Add optional prop `reqText` on `Checkbox`

## 0.10.44 – 0.10.45

_2022-05-04_

- feat: Add `utils` module with `useFormatMonitor` and `useGetSVGtext`
- fix: Add `type="button"` to various emitted `<button/>` elements
- fix: Suppress `key=""` prop warning on `ContentBubble`

## 0.10.43

_2022-05-02_

- fix: Support "uncontrolled" use of `SearchInput` and `SiteSearchInput`

## 0.10.42

_2022-04-27_

- feat: `ContactBubble` toggling sets `html[data-contact-bubble]` styling flag
- fix: Bundle missing dragging/animation library

## 0.10.40 – 0.10.41

_2022-04-20_

- feat: Add low-level component `Carousel`
- feat: Add features to `WizardStepper`:
  - feat: Add prop `WizardStepperStep.done` for custom control
  - feat: Add support `"always"` as value for `WizardStepperStep.clickable`
  - feat(ts): Export type `WizardStepperStep`

## 0.10.39

_2022-04-07_

- feat: Add prop `color` to `TagPill`
- feat: Add props `removable`, `onClose`, `removeLabel`,`removeLabelLong` to
  `TabPill`
- fix: `VerticalTabsTOC` not decoding non-ASCII URL fragments
- fix: Add to `ArticleCarouselCardProps.color` option `ellidaardalur` —
  deprecate mis-spelled `ellidarardalur`

## 0.10.38

_2022-04-04_

- feat: Add prop `wrapperRef` to `FormFieldProps` (used by form components)
- feat: Add prop `inputRef` to `TextInput` and `DatePícker`
- feat: Add props `inputRef`, `buttonRef` to `SearchInput`
- feat: Make `ContactBubbleItem.href` optional
- fix: Prop `SelectboxProps.selectRef` was not forwarded correctly
- fix: `CheckboxGroup` and `CheckboxButtonGroup` adding `undefined` value
- fix: Change `VSpacer` to emit `<hr/>`, not `<br/>` in non-wrapping mode
- fix(ts): Export `ButtonTertiaryProps`

## 0.10.37

_2022-03-31_

- feat: Add experimental helper component `VerticalTabsTOC`
- feat(ts): Support for `TabsProps.role` being explicitly `toc` (the default)

## 0.10.36

_2022-03-28_

- feat: Add props `vertical`, `subTabs` to `Tabs`
- feat: Add experimental component `Skeleton` — with static methods `.text()`
  and `.block()` returning branded types `SkeletonBlock` and `SkeletonText`
- feat(ts): Rename `TabsProps`, `TabItemProps` — (deprecate `TabListProps`,
  `TabProps`)

## 0.10.35

_2022-03-22_

- fix: Attempt to Better capture weird `Selectbox` edge cases — Where the
  browser (or React) snap value to something unexpected because of mismatching
  value and/or options

## 0.10.32 – 0.10.34

_2022-03-21_

- feat: Add prop `selectRef` to `SelectboxProps`
- feat: Add prop `placeholderDisabled` to `Selectbox`
- fix: Make `TagPillProps.children` optional again
- fix: `SelectboxOptions[number].disabled` was ignored
- fix: `Selectbox`'s non-empty detection failing on certain option types
- fix: `SelectboxProps.visibleFormat` should skip over empty/invisible labels
- fix: Relax typing of props.children, allow nullable `ReactNode`s — even when
  children are required
- chore: Widen reported peerDependency range to react `>=16.8 <19`

## 0.10.31

_2022-03-18_

- fix: Regression in `Selectbox` — externally sourced `value` changes failing

## 0.10.30

_2022-03-17_

- feat: Deprecate props `layout`, `columns` on `CheckboxButtonGroup` and
  `RadioButtonGroup`
- feat(ts): Export type `RadioButtonsGroupOptions`
- feat: Add prop `small` to `Attention`
- feat: Add prop `blings` to`Modal` — for decorations
- feat: Add new Bling tokens `waves-vertical-medium`, `circle-waves-vertical`
- feat: Make `SearchReesultI18n.lang` required
- fix: Add missing number formatting in `SearchResults`
- fix: Prevent access to esoteric/private `Modal` props
- fix: Clean up/tighten children prop definitions on all components

## 0.10.29

_2022-03-10_

- fix: `useFormatMonitor` causing errors in SSR contexts

## 0.10.28

_2022-03-09_

- feat: Add props `autoClose` and `onClosed` to `Alert` — use `onClosed` when
  removing the Alert from the DOM
- feat: Deprecate the `event` argument for `Alert`'s `onClose` callback
- feat: Add prop `align?: 'right'` to `ButtonBar`
- fix: Make `FileInput` image previews (thumbnails) more resilient overall
- fix: Plug memory-leaks caused by `FileInput` image thumbnails
- fix: Add support for "uncontrolled" use of `TextInput` and `Selectbox`
- fix: Suppress React's dev warning about preact compatibility workarounds

## 0.10.25 – 0.10.27

_2022-03-03_

- feat: Add component `ButtonBar` and `ButtonBar.Split`
- feat: Add prop `icon` with `go-back` + `go-forward` options to
  `Button(Primary|Secondary|Tertiary)`

## 0.10.24

_2022-03-01_

- feat: Add prop `background` to `IslandPageBlock`
- fix: Fix Icelandic number formatting in `SearchResults`

## 0.10.23

_2022-02-28_

- feat: Changes to `NameCards`
  - feat: Add props `availableLabel`, `unavailableLabel` to `NameCardI18n`
  - feat: Deprecate props `vacancyLabel`, `noVacancyLabel` on `NameCardI18n`
  - feat: Change object shape of `NameCardProps.contactInfo` to use `label`
    and `longLabel` (deprecate `value`)
  - feat: Reintroduce prop `NameCardProps.hours` as separaate value
  - feat: Add prop `NameCardProps.available` (deprecate `vacancy`)
  - feat: Allow passing `JSX.Element` to props `location` and `aboutText`
- feat: Export prop types for various `Button*`s
- feat: Add component `TextButton` for hyperlink-looking `<button/>`s
- feat: `ButtonPrimary`, `ButtonSecondary`, `ButtonTertiary`:
  - feat: Add prop `variant` with "destructive" option
- feat: Add prop `size` — deprecate prop `small`. Primary and Secondary
  buttons now have a `wide` size variant

## 0.10.22

_2022-02-16_

- feat: Add prop `disableBacktrack` to `WizardStepper`
- feat: Make `WizardStepper`'s `activeStep` prop optional for "preview" mode

## 0.10.21

_2022-02-15_

- fix: `SiteSearchCurtain` not triggering with Preact

## 0.10.19 – 0.10.20

_2022-02-08_

- feat: Add optional prop `lang` to `MegaMenuItem` (and export that type)
- feat(ts): Export type `MainMenuSeparator`
- fix: `ContactBubble` not reacting/appearing on scroll on mobile browsers
- fix: Improve `MainMenu`'s SSR rendering
- fix: Start `Layout` menu toggling logic with `.is-menu-closed` set
- fix: `MainMenu` should allow non-null (but empty) item `href`s

## 0.10.18

_2022-02-01_

- feat: Expose `ContactBubble`'s `alwaysShow` prop as
  `data-always-show="true"`

## 0.10.17

_2022-01-13_

- feat: Add type `ArticleCarouselImageProps`
- feat: Add prop `photo` to `ArticleCarouselImageProps`

## 0.10.15 – 0.10.16

_2021-12-07_

- feat: Auto-close `ContactBubble` when offing its scroll-based visibility
- fix: Over-eager `ContactBubble` closing callback hi-jacks all mouse clicks

## 0.10.14

_2021-12-02_

- feat: Auto-adjust height of non-fixed `IframeBlock`s
- fix: Auto detect if <html> or <body> is the page "scroll element"

## 0.10.13

_2021-11-04_

- feat: Add prop `ssr` to `FormField` — and `isBrowser` parameter to the
  `renderInput` callback

## 0.10.12

_2021-10-29_

- feat: Allow passing `target` prop to MainMenu mega panel items/links
- fix: Correctly apply `aria-current` to MainMenu's "auxiliary" panel items

## 0.10.11

_2021-10-26_

- feat: Add component `ContactBubble`

## 0.10.10

_2021-10-22_

- feat: Add component `ContentArticle`
- feat: Add component `RelatedLinks`
- feat: Add component `ContentImage`
- feat: Add component `ArticleMeta`
- feat: Add component `FooterBadges` for logos/badges/etc
- feat: Add seen-effect props to `CenterColumn`
- feat: Export type `ProcessOverviewItemProps`
- feat: Export type `FooterInfoProps`, add prop `modifier` to
  `FooterInfoGroup`

## 0.10.9

_2021-09-24_

- feat: Add props `lang`, `text` on `SiteSearchAutocomplete` (deprecate
  `label`)
- fix: Add missing `aria-label`s on `SiteSearchAutocomplete`' HTML elements
- fix: Update outdated dependency declarations
- fix: Flag optional "text" keys as such in `MainMenu` and `Layout`
- fix: Collapse effectively-duplicate class modifiers in `VSpacer`
- fix: HTML output updates

## 0.10.8

_2021-09-23_

- feat: Add component `VSpacer` for custom spacing between page components

## 0.10.7

_2021-09-22_

- feat: Add prop `fullWidth` to `BasicTable`
- fix: Scroll page to the top when `MainMenu` mega panel opens
- fix: Close `MainMenu` mega panel when leaving "top menu" screen format

## 0.10.6

_2021-06-11_

- feat: Add component `CenterColumn` - for simple "article" text block layout
- feat: Add content area prop `globalAlerts` to `WizardLayout`
- feat: Add prop `activePanelId` to `MainMenu` for remote-control
- fix: Pretty format `SearchResults`'s `totalHits`

## 0.10.5

_2021-06-03_

- fix: Inline `.WizardLayout__header__logo`'s SVG image

## 0.10.4

_2021-05-25_

- feat: Implement full mega-panel toggling behavior for `MainMenu`
- feat: Convert `\n`s in `NameCard` `location`/`aboutText` into `<br/>`s
- feat: Convert `\n`s in `InfoHero` `subtitle` into `<br/>`s
- fix: Incorrect default I18N strings in `Layout` and `MainMenu`

## 0.10.3

_2021-05-18_

- feat: `NameCard` changes:
  - feat: Add prop `contactInfo`, deprecate `tel` prop instead
  - feat: Add prop `aboutText`, deprecate `hours` prop instead
  - feat: Simplify signature of `texts` prop (deprecate `telLabel`)
  - feat: Make all props optional, except `name`
- fix: Skip over nested seen-effects candidates

## 0.10.2

_2021-05-18_

- feat: Add atomic effects component `SeenEffect`
- `SiteSearchInput` changes:
  - feat: Add prop `onSubmit` to capture user pressing `Enter`
  - feat: Make `onButtonClick` default to `onSubmit`
  - feat: Allow `onSubmit`/`onButtonClick` to return `true` for default
    browser submit behaviour
- `SiteSearchAutocomplete` changes:
  - feat: Add prop `onSubmit` and make it the default for `onButtonClick`
- feat: Add prop `small` to `PageHeader`
- feat: Add no-op `"normal"` option to `HeadingProps`'s `size` prop

## 0.10.1

_2021-05-04_

- refactor: sort elastic results by `bundle_weight` and `_score`

## 0.10.0

_2021-04-08_

- target: **Hanna 0.8** markup patterns
- **BREAKING** refactor: Remove `icon` prop from `MainMenu`
- **BREAKING** refactor: Remove `image` prop from `MegaPanel.item`
- feat: Add prop `auxiliaryPanel` to `MainMenu`
- fix(ts): Flag `ArticleCarousel`'s `moreLabel` prop as optional

## 0.9.5

_2020-12-09_

- feat: Add component `Footnote`
- feat: Add utility component `BlockBreak` for flexbox hard line-breaks
- feat: Add `startSeen` prop to all components with "seen" transitions

## 0.9.4

_2020-11-25_

- fix: Remove non-ascii characters from Illustration asset/file names

## 0.9.3

_2020-11-24_

- feat: Add support for "seen" transition effects on all "larger" components
- feat: Make `Alert`s transition into their initial `open` state

## 0.9.2

_2020-11-19_

- feat: Add new "forsida\*" `illustrations` names/tokens to `assets.ts`
- feat: Add component `IframeBlock`

## 0.9.1

_2020-11-18_

- feat: Relax `AccordionListItemProps` prop `title` to accept `JSX.Element`

## 0.9.0

_2020-11-18_

- target: **Hanna 0.7** markup patterns
- **BREAKING** feat: Change `SearchResultsItemProps`'s meta to accept simple
  render functions **insead of** bare JSX nodes
- feat: Add props `image` and `highlight` to `SearchResultsItemProps` type
- feat: Deprecate `strong` prop on `Attention`

## 0.8.6 – 0.8.7

_2020-11-11_

- feat: Add prop `align` to `BasicTable`
- feat: Add helper module `focus-visible` — an alias for the
  [npm package `focus-visible`](https://www.npmjs.com/package/focus-visible)
- feat: Remove all "manual" blurring of links, for `:focus-visible`
- fix: Add missing dependencies to package.json

## 0.8.5

_2020-11-05_

- feat: Add component `SearchResults`
- feat: Add prop `type?: 'link'|'pdf'|'text'` on
  `ExtraLinksProps.relatedLinks`
- feat: Order `GalleryItems` left-to-right
- fix: Add missing `--readonly` class-name modifier on `FormField`s

## 0.8.4

_2020-10-28_

- `MainMenu` changes:
  - feat: Add explicit (mobile) `menu-is-closed` class-name on document
    element
  - feat: Flag untouched `.MainMenu__megas` with `data-pristine="true"`
  - fix: Move `aria-current` attribute off `__mega__link` to `__mega__item`
- fix: Add `data-sprinkled` flag to Carousel-driven container element

## 0.8.3

_2020-10-22_

- feat: Add content area props `globalAlerts`, `mainContent` to `Layout`
- `Alert` changes:
  - feat: Add new `type="critical"` to `Alert` (alias for `error`)
  - feat: Add prop `closeUrl` to `Alert` to render server-side close links
  - feat: Pass the click event to `Alert`'s `onClose` and cancel the closing
    if it returns `false`
- feat: Add over 100 new `illustrations` names/tokens to `assets.ts`
- fix: `Gallery` and `ArticleCarousel` items sometimes disappeared

## 0.8.2

_2020-10-16_

- feat: Add component `FeatureList`
- feat: Add component `Sharpie` (for presentational text coloring)
- feat: Add prop `titleBlurb` to `InfoHero`
- feat: Relax `InfoHero` prop `blurb` to accept JSX/HTML content
- feat: Add missing `Efnistakn` value — `sund_heiturpottur`
- feat: Add prop `texts`, `lang`, `ssr` to `Alert`
- feat: Add prop `lang` to `NameCard`
- fix: Remove dev-only prop `closeLabel` from `Alert`
- fix: Only call `Tabs` activation callbacks when the active tab changes

## 0.8.1

_2020-10-14_

- feat: Add component `Attention`
- feat: Add props `closable`, `onClosed` to `Alert`
- feat: Skip `Tabs` `.onSetActive()` when a tab's `.onActivated()` returns
  `false`
- feat: Expand prop `imgPlaceholder` on `ImageCards` to accept string URLs
- feat: Add prop `badge` to `TabProps`

## 0.8.0

_2020-10-07_

- target: **Hanna 0.7** markup patterns
- `Tabs` changes:
  - **BREAKING** feat: Make `Tabs` a "controlled"-only component — with no
    internal "activated" state
  - **BREAKING** feat: Rename type `TabsProps` to `TablistProps`
  - **BREAKING** feat: Drop `defaultActiveIdx` prop from `TablistProps`
  - feat: Add props `activeIdx`, `role`, `activateOnFocus`, `aria-label`,
    `aria-labelledby`, `id`, `ssr` to `TablistProps`
  - **BREAKING** feat: Drop props `onClick` and `index` from `TabProps`
  - feat: Add prop `onActivated` to `TabProps`
  - feat: Support props `aria-controls`, `id`, `type` on `TabProps`
- feat: Add support for neutral `.TabPanel` wrapper elements
- feat: Add component `SiteSearchAutocomplete`
- feat: Add component `SiteSearchCurtain`
- feat: Add prop `underlap` to `PageFilter`
- feat: Make `ImageCardProps`'s `image` prop optional
- feat: Export `ImageCardProps` from `ImageCards`
- feat: Add new `Efnistakn` values — `sund_barnalaug`, `sund_eimbad`,
  `sund_kaldurpottur`, `sund_metralaug`, `sund_sauna`, `sund_sundfot`,
  `sund_utiklefi`, `wifi`
- fix: Set toggle `aria-expanded` on `AccordionList` buttons
- fix: Blur `Layout__header__skiplink` on mouseout

## 0.7.4

_2020-09-30_

- feat: Add prop `blingType` to `NewsHero` — deprecate prop `bling`
- fix: Add missing `Bling` type `dome-large`

## 0.7.3

_2020-09-30_

- feat: Add new `BlingTypes` values — `box-medium`, `bowl-medium`,
  `circle-xlarge`, `loops-small`, `arrow-right-large`
- feat: Add prop `ssr` to `Gallery` and `ArticleCarousel`
- fix: Correctly read `Gallery`'s `texts` prop
- feat: Add component `MiniMetrics`
- feat: Make `ArticleCarousel`'s `date` prop optional
- feat: Add prop `label` to `ButtonProps` type as an alias for `children`

## 0.7.2

_2020-09-25_

- feat: feat: Add prop `parent` (offset value) to `Bling`

## 0.7.1

_2020-09-25_

- feat: Add component `Heading`
- fix: Limit choice of `MainMenu__mega__item` icons to just `Efnistakn_Menu` –
  Mark Efnistakn tokens as deprecated (Remove in v0.8)
- feat: Deprecate `type="search"` prop value on search fields (Remove in v0.8)

## 0.7.0

_2020-09-23_

- **BREAKING** target: **Hanna 0.7** markup patterns
- `Bling` changes:
  - **BREAKING** feat: Drop `size` prop, add new types and alignment values
  - feat: Add `className` prop for custom additional class
- `CityCouncilHero` –> `InfoHero` changes:
  - **BREAKING** feat: Rename component `CityCouncilHero` to `InfoHero`
  - feat: Add prop `align` to `InfoHero`
  - feat: Add prop `blingType` to choose `.InfoHero__bling` combo presets
- `IslandBlock` changes:
  - **BREAKING** feat: Simplify `IslandBlock` to be always "expanded", no
    illustration
  - feat: Add component `IslandPageBlock` with illustration only
- `GridBlocks` changes:
  - **BREAKING** feat: Rename type `GridBlockProps` to `GridBlockItem`
  - **BREAKING** feat: Remove props `className` from `GridBlocks` — also
    disallow `children`
  - feat: Allow `GridBlockItem` to have a `href`
- `ArticleCarousel` changes:
  - feat: Add prop `image` to `ArticleCarouselCardProps` — for custom
    illustration urls
  - fix: Rename `ArticleCarousel`'s exported props to `ArticleCarouselProps`
- feat: Add prop (class-name) `modifier` to `Layout`

## 0.6.1 – 0.6.2

_2020-09-21_

- feat: Add components `ArticleCarousel`
- feat: Add components `NameCard` and `NameCards`
- feat: Add component `SiteSearchInput`
- feat: Add low-level component `CarouselStepper`
- feat: Add low-level components `RowBlock`, `RowBlockColumn`, `Illustration`
- feat: Add props `narrow`, `transparent` to `ProcessOverview`
- fix: Re-introduce missing `NewsHeroItems` `Bling`s

## 0.6.0

_2020-09-09_

- **BREAKING** target: **Hanna 0.6** markup patterns
- **BREAKING** feat: Drop `BasicTable`'s `fullWidth` prop
- **BREAKING** feat: Remove `TextBlock` props `largetext`, `title`, `TitleTag`
- feat: Add `small` prop to `TextBlock`
- feat: Add prop `wide` on `LabeledTextBlock`, deprecate prop `left`
- feat: Add component `Gallery`
- feat: Add component `TagPill`
- feat: Add `labelled` prop to `TextBlock`
- fix: Fallback to showing `<img />` if inlining a SVG fails

## 0.5.4

_2020-09-04_

- feat: Add component `ShareButtons`
- feat: Allow `NewsHero`'s `sharing` prop to return a custom share widget
- feat: Add `defaultOpen` prop to `AccordionList`
- fix(react): Make `ExtraLinks`'s `relatedTitle` truly optional
- fix: Render anchor tags for self-linking (empty) `BreadCrumbs` `href`s
- fix: Make the `aria-current` `WizardStepper__step` clickable by default
- fix: `ActionCards__card` and `ExtraLinks__card` not rendering as `<a/>`

## 0.5.2 - 0.5.3

_2020-08-26_

- feat: Add component `NewsHero`
- feat: Add component `CityCouncilHero`
- feat: Dreprecate `title`, `TitleTag` props on `TextBlock` (Remove in v0.6)
- fix: Better disambiguate `<a>` vs `<button>` props on `ButtonProps` type
- fix: Remove private `bem` and `small` props off the `ButtonProps` type
- fix: Remove private `className` prop off the `ImageProps` type

## 0.5.1

_2020-08-21_

- feat: Add component `Bling`
- feat: Add component `PageFilter`
- feat: Add component `ImageCards`
- feat: Add a list of `illustrations` to `assets.ts` and typings
- fix: Missing `MainMenu__mega__link` icons

## 0.5.0

_2020-08-12_

- **BREAKING** target: **Hanna 0.5** markup patterns
- **BREAKING** feat: Simplify `HeroBlock` — drop `align`, require image
- feat: Add `illustration` prop to `HeroBlock`
- feat: Add `onButtonClick` and `buttonText` props to `SearchInput`
- feat: Add `icon` prop to `MainMenuItem` and `GridBlock`
- feat: Add `illustration` prop to `CityBlock`
- feat: Add `shapes` and `illustration` props to `IslandBlock`
- fix: Suppress `<Image/>` on empty `imageSrc`, make `altText` prop optional

## 0.4.4

_2020-07-09_

- fix: First `Tabs__tab` is unclickable

## 0.4.3

_2020-07-03_

- feat: Falsy `navChildren` removes `.Layout__nav` + `.Layout__head__skiplink`
- feat: `Layout` and `WizardLayout` container props now accept any ReactNode
- feat: allow changing logo link URL in `Layout` and `WizardLayout`
- feat: Passing `reqText={false}` to `FormField` suppresses its `__reqStar`

## 0.4.2

_2020-06-19_

- feat: Add `assets` module with useful CSS/Style-related utilities
- feat: Add component `PageHeading`
- feat: Add `wide` and `align` props to `SubHeading`
- feat: Deprecate `fullWidth` prop on `BasicTable` (Remove in v0.6)
- feat: Add `wide` prop to `AccordionList`
- fix: Load site logo and other assets from `https://styles.reykjavik.is`

## 0.4.1

_2020-06-15_

- fix: Add `@hugsmidjan/react` to `pkg.dependencies`

## 0.4.0

_2020-06-09_

- **BREAKING** target: **Hanna 0.4** markup patterns
- **BREAKING** feat: Remove close-button related props off `WizardLayout`
  – Add a generic `wizardFooter` containter props instead
- feat: Add `WizardLayoutClose` mini component
- feat: add largetext boolean prop for `TextBlock`

## 0.3.0

_2020-06-03_

- **BREAKING** feat: Change prop signatures of `CheckboxGroup` and
  `RadioGroup`
  - The `selected` props has been renamed `value` now contain values instead
    of options-list indexes
  - `TogglerGroupOption`'s `value` is required instead of `label`
  - `TogglerGroupOption` no longer supports `selected`
  - New prop `inputProps` accepts most `JSX.IntrinsicElements['input']` props
  - New `onSelected({ value, checked, option, selectedValues })` callback prop
- feat: Add components `Modal`, `Form`
- feat: add `--align--right` and `--wide` modifiers to `TextBlock`
- feat: Add a `constants` module with a list of `colorThemes`
- feat: Add `colorTheme` prop to `Layout` and `WizardLayout`

## 0.2.4 – 0.2.6

_2020-05-29_

- feat: Mounting `*Layout`s sets `--browser-scrollbar-width` CSS var
- feat: Accept string values into `Selectbox`es with number options
- fix: Error in `Selectbox` when combining `onSelected` and `placeholder`

## 0.2.2 – 0.2.3

_2020-05-28_

- feat: Add bare-bones `SearchInput` component (w/o auto-complete)
- feat: Add i18n and close-button props to `WizardLayout`

## 0.2.1

_2020-05-27_

- feat: Add component `TextBlock`, `BasicTable`
- fix: Disallow right-alignment of `HeroBlock`s with images
- fix: Tighten types for `InfoBlock`, `abstract/Button`, `ProcessOverview`

## 0.2.0

_2020-05-21_

- **BREAKING** target: **Hanna 0.3** markup patterns
- **BREAKING** feat: Rename `ProcessStepper` to `ProcessOverview`
- **BREAKING** feat: Rename `Accordion` to `AccordionList`
- **BREAKING** feat: `Alert` (text) content is now passed as children
- feat: Add component `SubHeading`
- fix: `Selectbox` Didn't always display empty value correctly

## 0.1.1

_2020-05-14_

- feat: Add components `IslandBlock`, `Accordion`, `ProcessStepper`,
  `DatePicker`
- feat: Add optional menu-toggling behaviors to `<Layout/>`
- feat: Add `align` prop to `HeroBlock`

## 0.1.0

_2020-05-04_

- target: **Hanna 0.2** markup patterns
- feat: Includes: `-basics`, `ActionCards`, `Alert`, `BreadCrumbs`,
  `ButtonBack`, `ButtonPrimary`, `ButtonSecondary`, `ButtonTertiary`,
  `Checkbox`, `CheckboxButtonsGroup`, `CheckboxGroup`, `CityBlock`,
  `ExtraLinks`, `FieldGroup`,`FormField`, `FileInput`, `FooterInfo`,
  `GridBlocks`, `HeroBlock`, `InfoBlock`, `LabeledTextBlock`, `Layout-full`,
  `Layout`, `MainMenu` (wip) `RadioButtonsGroup`, `RadioGroup`, `Selectbox`,
  `Tabs`, `TextInput`, `WizardLayout`, `WizardStepper`,
