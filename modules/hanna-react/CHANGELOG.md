# Change Log for `@reykjavik/hanna-react`

## Upcoming...

- ... <!-- Add new lines here. -->

## 0.10.60

_2022-06-24_

- fix: Add missing prop `checkOrigin` on `IframeBlock` (default: `false`)
- fix: Suppot "uncontrolled" use of `CheckboxGroup`, `RadioGroup`, et al.
- fix: Change build to only export CommonJS

## 0.10.59

_2022-06-20_

- feat: Add component `ArticleCards`
- feat: Add component `Picture`
- feat: Add component `BgBox` for gray background wrapping
- feat: Add prop `small` to `ArticleMeta`
- fix: Suppress redundant className `.Heading--normal`
- feat: Add prop `focalPoint` to all `ImageProps`

## 0.10.56 – 0.10.58

_2022-06-13_

- feat: `MainMenu` returns `null` instead of rendering an empty menu
- feat: Add optional `group` prop to `SelectboxOptions` items
- fix: Problems in CJS and ESM, dual module file-structure

## 0.10.53 – 0.10.55

_2022-06-07_

- **IMPORTANT** feat: Rename package to `@reykjavik/hanna-react` — this means
  `@hugsmidjan_is/hanna-react` will not receive any more updates. The library
  is otherwise the same, with the same compatibility.
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
  value and/or options.

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
- fix: Plug memory-leaks caused by `FileInput` image thumbnails.
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
  buttons now have a `wide` size variant.

## 0.10.22

_2022-02-16_

- feat: Add prop `disableBacktrack` to `WizardStepper`
- feat: Make `WizardStepper`'s `activeStep` prop optional for "preview" mode

## 0.10.21

_2022-02-15_

- fix: `SiteSearchCurtain` not triggering with Preact

## 0.10.19 – 0.10.20

_2022-02-08_

- feat: Add `setLinkRenderer`, exported from `utils/config` — to allow hooking
  `hanna-react` into custom routing components
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
- feat: Add component `FooterBadges` for logos/badges/etc.
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
    internal "activated" state.
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
