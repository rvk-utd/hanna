# Change Log for `styles.reykjavik.is`

## Upcoming...

- ... <!-- Add new lines here. -->

## 0.8.84

_2023-11-10_

- feat: Partially revert `--Layout__header-height` reduction on wide viewports
- `CheckboxButtonsGroup` and `RadioButtonsGroup`
  - feat: Add styling for `--stacked` variant
  - feat: Cap item row-gap to be more reasonable height
- feat: Add styling for `.Multiselect__optionSeparator`
- feat: Add dev warnings for non-table content inside `.TableWrapper`s
- fix: Horizontal shift during `.Modal` close-transition

## 0.8.83

_2023-10-26_

- fix: Regression in styling of legacy `.TableWrapper__scroller`
- fix: Remove SVG `<style/>` elements to avoid CSS clashes when inlined in
  HTML documents.

## 0.8.82

_2023-10-18_

- feat: Update `.Layout__header__homelink` styling
  - Reduce `--Layout__header-height`
  - Left-offset top menu `.MainMenu__items` by
    `--Layout__header-homelink-space`
- fix: Incorrect size of legacy `a.Layout__header__logo` image

## 0.8.81

_2023-10-05_

- `Layout` and `WizardLayout`:
  - feat: Add styling for `__header__homelink` and `__header__sitename`
- feat: Add `<title />` to `reykjavik-logo*.svg` asset files
- feat: Add component `AutosuggestSearch`
- feat: Style `SiteSearchInput` when it has no `<button/>`
- feat: Tweaked styling of `.SiteSearchAutocomplete` dropdown
- fix: Typo in `Mutiselect`'s dependency list

## 0.8.80

_2023-09-07_

- feat: Add component `Pagination`
- feat: Add `/assets/reykjavik-logo-notext.png` — along with `--small` (x0.5)
  and `--large` (x2) variants
- Seen-effect changes:
  - Remove default/implicit seen-effect styling from all components
  - Seen effects are now opt-in, via the `[data-seen-effect]` attribute, or a
    custom sprinkle JS effect
  - Add `-legacy-AutoSeenEffects` CSS token as back-compat option.
- fix: Add missing thumbnails for the `hanna-*` illustrations
- fix: Improve `InfoHero` styling in `phablet` viewport mode
- feat: Add styling for `.ArticleCards--large`
- feat: Add styling for `.ActionCards__item__meta`
- feat: Add `__item__summary` styling for `ArticleCards` and `ImageCards`
- feat: Tweak `.MainMenu__items` styling to better tolerate custom children
- feat: Add CSS variables `--boxShadow-(subtle|hover|elevated)`
- feat: Add CSS variables `--space-10` and `--space-10--neg`
- feat: Make `--grid-margin--neg` inherit from `--grid-margin`
- feat: Reduce `--small` min-width of `ButtonPrimary` and `ButtonSecondary`
- fix: `Multiselect` overflow and space-contraint styling
- fix: Tweak overflow styling of `Selectbox`

## 0.8.79

_2023-07-06_

- feat: Add component `Multiselect`
- feat: Add component `ReadSpeakerPlayer`
- feat: Add `[readonly]` styling on checkboxes and radio buttons
- fix: `ButtonPrimary` and `ButtonSecondary` were 8px too tall
- fix: Hide newly added visible screen-reader label in `Datepicker`
- fix: Increase image–text spacing in `.IslandPageBlock--align--right`
- fix: Shift Checkboxes/Radios up a notch

## 0.8.78

_2023-05-10_

- Global `-basics` styles:
  - feat: Remove aggressive global reset for all `img` and `video` elements
  - feat: Shift typography style declarations from `html` to `body`
- feat: Make `MainMenu` responsible for changing `Layout__header` colors on
  `html.menu-is-open`
- feat: Add CSS variables `--Layout__header-logo-color`,
  `--Layout__header-color`
- fix: Apply missing `z-index` defaults inside `.Layout__nav`

## 0.8.77

_2023-03-20_

- feat: Decrease top padding of `Layout__main`, shift `BreadCrumbs` a bit
- feat: Add styling for `.FieldGroup--small`
- feat: Add CSS variable `--Layout__main--paddingTop`
- feat: Add styling for `.InfoHero__footer`

## 0.8.76

_2023-02-28_

- feat: Rename dev css folder to `dev-v0.8`
- feat: Add svg favicon assets:
  - `favicon.svg`
  - `favicon-maskable.svg`
  - `favicon-black.svg`
  - `favicon-black-maskable.svg`
- feat: Add component `Tooltip`

## 0.8.75

_2023-02-15_

- feat: Tweak thickness of `checkmark` icon and its size in `Checkbox`es
- fix: Add back `Tabs` css as required dependency for `SearchResults`
- fix: Add back `Footnote` css as required dependency for `BasicTable`

## 0.8.74

_2023-02-08_

- feat: Shift overflow-x rules off `<body/>` up to `<html/>` — this reverts a
  Safari bug workaround that has caused unacceptable drip-torturous grief. Use
  [`getEssentialHannaScripts`](https://www.npmjs.com/package/@reykjavik/hanna-css#getessentialhannascripts)
  from `@reykjavik/hanna-css` stop side-scrolling in older Safaris.
  [More info here](https://mastodon.online/@maranomynet/109755659925602531)
- fix: Spacing below logo in `.FooterInfo` on mobile screens

## 0.8.73

_2023-01-18_

- feat: Add standalone component `.CheckboxButton`
- feat: Update styling of invalid `Checkbox*`s and `Radio*`s
- feat: Styling of `.CheckboxButton__label__wrap`, `.RadioButton__label__wrap`
- feat: Add component `CheckboxButton`
- feat: Add styling for `.ContentArticle__header`
- feat: Improve `*Header` styling inside `.ContentArticle` and `.CenterColumn`
- feat: Update shape of icons `checkmark`, `edit`, `pen`
- feat: Add CSS variable `--link-underline--hairline`
- fix: Add workaround for Next.js + Chrome/Blink scrollbar bug
- fix: Case-sensitivity typo in filename of `CheckboxButtonsGroup.css`
- fix: Add missing vendor-prefixes to CSS files

## 0.8.72

_2023-01-05_

- feat: Update styling of `.SearchInput__button`
- fix: Remove automatic quotations off `.PullQuote__quote`
- fix: Apply disabled styles to `.FormField`s insidøe disabled `.FieldGroup`
- fix: Suppress border effect when `:hover`ing `.FormField__input`s
- fix: Font-size in `.FormField--small .FormField__input`s
- fix: Page header cutoff after input field focus on iPhones
- fix: Reduce line-height within `BreadCrumbs`
- fix: Suppress `.MainMenu` flicker on window resize

## 0.8.71

_2022-11-23_

- feat: Add styling for `.Cell--text--(right|center)` inside `.BasicTable`
- feat: Add dev warnings for missing text labels (i.e. `alt` attributes on
  iframes and multimedia elements)
- feat: Add `.FooterInfo__group--main`, deprecate `[role]` styling
- feat: Add "[Illustration](src/assets/illustrations/files.json)" PNG asset
  ("vegvisir")
- fix: `.TextInput--multiline` not repsonding to `rows=""` attribute
- fix: Text color of `.Selectbox`'s placeholder (non-empty, non-filled)
- fix: Reversed order of `RowBlockColumn`s on narrow screens + padding
- fix: Improve mobile rendering of `.RelatedLinks`
- fix: Update the "Esja" font files better Polish alphabet support
- fix: Improve mobile rendering of `.SearchResultsHighlightItem` images
- fix: Top-align search icons on hovered `.SiteSearchAutocomplete__item`s
- fix: Adjust alignment and cap height of `.InfoHero__image`
- fix: `BasicTable` with `--align--right` position on "tablet" sized viewports
- fix: Disappearing border on link `.Tabs__tab` hover
- fix: Set color of `.SiteSearchInput__button` to Faxaflói
- fix: Color of disabled invalid checkboxes/radios
- fix: Suppress dev warning about forced `h1.Heading` elements
- fix: Tweak layout of `FileInput__filelist` items
- fix: Set color of `Gallery` modal links/buttons to Faxaflói
- fix: Correct minor responsive rendering glitches in `.FeatureList`
- fix: Make `--inline` `Checkbox` and `Radio` labels line wrap
- fix: Right padding on `.ButtonTertiary--disabled`
- fix: Height-scaling of `Layout` and `WizardLayout` with `__alerts` visible
- fix: Hover styling of `.WizardLayoutClose`
- fix: Background-color of disabled and readonly `.SearchInput__button`

## 0.8.70

_2022-10-07_

- feat: Set `ButtonPrimary`/-`Secondary`/-`Tertiary` base color to Faxaflói
- feat: Add rich text styling inside `.ArticleList__content`
- feat: Add styling for `.ActionCards__summary`
- fix: Top margin on `.InfoHero__titleblurb`
- fix: Delay on `.MainMenu`'s auxiliary menu image in mobile
- fix: Height of `MainMenu`'s auxiliary menu on small-yet-tall screens
- fix: Display `.MainMenu`'s auxiliary menu image on wider screens
- fix: Color on destructive `.ButtonPrimary`s in all color themes

## 0.8.69

_2022-09-02_

- fix: Remove default hard `display:none` on `[aria-hidden="true"]` elements
- fix: Hover styling on `a.Alert__close` links
- fix: Spacing in `HeroBlock` on smaller viewports

## 0.8.68

_2022-08-11_

- feat: Add styling for `Carousel`-related mouse-cursor controls
- fix: Auto-closing `Alert`s should have CSS transition also

## 0.8.67

_2022-06-21_

- feat: Update styling of dates/result meta texts inside `SearchResults`
- feat: Add inline fill and stoke attributes for `reykjavik-logo*.svg` files
- feat: Add `/assets/favicon-288.png`

## 0.8.66

_2022-06-20_

- feat: Add component `ArticleCards`
- feat: Add component `Picture`
- feat: Add component `BgBox`
- feat: Disable link color + underline inside `.Heading` and `.SubHeading`
- feat: Change mouse cursor on `Carousel`-related component itemlist elements
- feat: Add styling for `.ArticleMeta--small` variant
- feat: Use CSS variable `--focalPoint` as `object-position` for all `<img/>`s
- fix: Add `-basics` styling for `<optgroup/>` elements

## 0.8.65

_2022-05-25_

- feat: Use `scroll-snap` styling for all `Carousel`-related components — Add
  styling for the new `__itemlist` wrapper. Flag the old `__items` wrapper as
  deprecated.
- feat: Add styling for `.WizardStepper__step--neutral`

## 0.8.64

_2022-05-23_

- feat: Add CSS variable `--ButtonTertiary--height`
- feat: Add components `PullQuote`, `BlockQuote`
- feat: Update text content `blockquote` styling (in `TextBlock`, etc.)
- feat: Add styling for `.Modal__blings__inner` wrapper — allow minor styling
  regression with older markup pattern
- fix: Use "button" leading for all `.ButtonTertiary` stylings, add padding
- fix: Contain `.HeroBlock__image`'s `z-index` layering
- fix: Allow content (date-pickers, etc.) to overflow `.Modal`
- feat: Tweak styling of disabled `FormField`s, `Checkbox`es and `Radio`
  buttons

## 0.8.62 – 0.8.63

_2022-05-12_

- feat: Add CSS variables `--icon--*` for iconfont characters
- feat: Add styling for `.Checkbox__label__reqstar`
- fix: Chrome counter-increment bug in `WizardStepper`

## 0.8.60 – 0.8.61

_2022-05-11_

- feat: Update styling of `.Tabs--vertical`

## 0.8.58 – 0.8.59

_2022-05-04_

- fix: `TextBlock--align-right`'s max-width should not be `%` based

## 0.8.56 – 0.8.57

_2022-04-29_

- feat: Add CSS variable `--cssVersion`
- fix: Allow line-wrapping of vertical `Tabs` labels
- fix: Botched update of iframe-resizer script

## 0.8.55

_2022-04-27_

- feat: Add css variables `--space--(6|7|8|9)`
- fix: Buggy styling of `ContactBubble`'s open state in mobile

## 0.8.54

_2022-04-26_

- feat: Add css variable `--Layout__header-backgroundColor`
- feat: Add some default spacing to `.Carousel__items` children
- feat: Float `.FormField__label__reqstar` to the left
- fix: Remove browser-default opacity off `.FormField`'s `::placholder`

## 0.8.52 – 0.8.53

_2022-04-20_

- feat: Extends `ContactBubble`'s "mobile" mode to `phablet` sizes only
- feat: Add low-level component `Carousel`
- feat: Support more flexible/complex `.WizardStepper__step` patterns
- fix: `.ContactBubble` menu underlapping `.Layout__header` in desktop

## 0.8.50 – 0.8.51

_2022-04-07_

- feat: Update "active" styling of `.Tags--vertical`
- feat: Add styling for `.TagPill--color--*`
- feat: Add styling for `.TagPill--large`
- feat: Add styling for `.TagPill__remove` and `.TagPill__button`
- feat: Unify all "close" icons into one SVG, deprecate "close-thin" icon
- fix: Improve wrapping of `.ButtonBar` contents in mobile viewport sizes
- fix: Keyboard focus killing the arrow icon on all `.*--go--forward` buttons
- fix: Add CSS variables `--color-ellidaardalur-*` — deprecate mis-spelled
  `--color-ellidarardalur-*`
- fix: Add `.ArticleCarouselCard[data-color]` value `ellidaardalur` —
  deprecate mis-spelled `ellidarardalur`

## 0.8.49

_2022-04-04_

- feat: Add styling for `button.ContactBubble__link`
- fix: Update non-wrapping `VSpacer` styling (deprecate old `br` selectors)

## 0.8.48

_2022-03-31_

- feat: Make `.Tabs--vertical` float left by default + non-sticky in mobile
- feat: Support `<svg/>` as an `<img/>` alternative in `.FooterBadges__badge`
- fix: Remove incorrect indenting of `.FooterBadges`

## 0.8.47

_2022-03-28_

- feat: Add `/assets/reykjavik-logo.png` — along with `--small` (x0.5) and
  `--large` (x2) variants
- feat: Add styling for `.Tabs--vertical`
- feat: Add experimental styling for `.Skeleton`

## 0.8.44 – 0.8.46

_2022-03-17_

- feat: Add CSS variables `--font-button`, `--font-button-(size|leading)`
- feat: Update styling for `.Checkbox`, `.Radio`, `.CheckboxButtonsGroup` and
  `.CheckboxButtonsGroup`
- feat: Add styling for `.Attention--small`
- feat: Add styling for `.Modal__blings` container
- feat: Change styling of `.Modal` to match newer design
- feat: Add new `Bling` SVG asset — `circle-waves-vertical`
- fix: Make Bling sizing more resilient to different sized containers
- fix: Increase `max-height` of `.AccordionList__content`

## 0.8.43

_2022-03-09_

- feat: Add new `Bling` SVG asset — `waves-vertical-medium`
- fix: Prevent layout jump when `Modal` opens

## 0.8.42

_2022-03-03_

- feat: Add styling for `.ButtonBar`
- feat: Add styling for `--go--(back|forward)` variants for
  `Button(Primary|Secondary|Tertiary)`

## 0.8.41

_2022-03-01_

- feat: Style `.IslandPageBlock--background--(gray|secondary)` variants
- feat: Add CSS variable `--border-default`

## 0.8.40

_2022-02-28_

- feat: Update styling of `NameCard` and add support for new markup options
- feat: Add component `TextButton`
- feat: Add styling for `--destructive` buttons
- feat: Make `ButtonPrimary` and `ButtonSecondary` more compact by default
- feat: Add styling for `.ButtonPrimary--wide` and `.ButtonSecondary--wide`
- feat: Make `ButtonTertiary` and `ButtonBack` less jiggly on :hover
- feat: Spit and polish various `Button*` styles

## 0.8.39

_2022-02-18_

- feat: CSS variables:
  - feat: Rename/simplify `--MainMenu-(background|accentcolor)`
  - feat: Add `--zindex--*`
  - feat: Add `--bp-w-*` (breakpoint widths)
  - feat: Rename `--grid-margin*` (deprecate `--grid-edge*`)
- fix: Add :hover styling for `.ContactBubble__openbtn`
- fix: Make `.ArticleCarouselCard__illustration` overlap card border
- fix: Prevent over-applying 'external' icon on `RelatedLinks__link`
- fix: Add back default link :hover underline

## 0.8.38

_2022-02-16_

- feat: Support `.WizardStepper--preview`

## 0.8.37

_2022-02-15_

- feat: Add border around `ContactBubble`'s open button.
- fix: Minor breakages in `MainMenu` and some newly added CSS variables

## 0.8.35 – 0.8.36

_2022-02-10_

- feat: Add more design-token CSS Variables — focusing on `font`-shorthand
  values, basic font properties and some `--space-*` units.
- docs: Add thumbnail views for
  ['illustrations'](https://styles.reykjavik.is/assets/illustrations),
  ['efnistakn'](https://styles.reykjavik.is/assets/efnistakn),
  ['formheimur'](https://styles.reykjavik.is/assets/formheimur)
- fix: Regression of line-height of various "BodyText Small" elements

## 0.8.34

_2022-02-08_

- feat: Improve mobile `MainMenu` and `Layout__header` styling
- feat: Remove support for never-used `MainMenu__greeting` message
- feat: Make `--font-bd-l-size` and `--font-bd-l-leading` non-scaling
- fix: Revert global hiding of `Layout`-level `Alert` banners on small screens
- fix: Tweak styling of mobile menu button (`.Layout__header__skiplink`)
- fix: Correct value for CSS token `--grid-edge--right--neg`
- fix: Tweak `MainMenu` mobile styles
- fix: Improve `MainMenu` display in "no script" situations

## 0.8.33

_2022-01-28_

- feat: added styles for bubble button

## 0.8.32

_2022-01-20_

- feat: added responsive styles for mobile menu

## 0.8.31

_2022-01-19_

- feat: changed styles of tables

## 0.8.29 – 0.8.30

_2022-01-18_

- feat: Fixed position of the title
- feat: Chanched info hero title

## 0.8.28

_2022-01-17_

- feat: Add language selector to menu

## 0.8.27

_2022-01-13_

- feat: Add styling for `.ArticleCarouselCard__illustration--photo`

## 0.8.26

_2021-12-09_

- fix: Extend `--fullwidth` `BasicTables` inside right-aligned text blocks
  leftwards

## 0.8.25

_2021-12-07_

- fix: Remove extra spacing above `.Layout__footer`

## 0.8.24

_2021-12-02_

- feat: Allow auto-adjusting height of non-fixed `IframeBlock`s — using
  `iframe-resizer`
- fix: Font size for `ContentImage__credit`

## 0.8.23

_2021-10-28_

- fix: `.WizardLayout__alerts` was too wide
- fix: `.WizardLayout__stepper` fixed positioning overlapped alerts
- refactor: Simplify html/body overflow/scrolling for X-browser support

## 0.8.20 – 0.8.22

_2021-10-26_

- feat: Add component `ContactBubble`
- fix: Too narrow multi-column `MainMenu` mega-panels
- fix: Minor right-shift of `MainMenu` mega-panel curtain

## 0.8.19

_2021-10-22_

- feat: Add component `ContentArticle`
- feat: Add component `RelatedLinks`
- feat: Add component `ContentImage`
- feat: Add component `ArticleMeta`
- feat: Add component `FooterBadges` for logos/badges/etc.
- feat: New styling for `FooterInfo`
- feat: Add nicer default styling for `<hr />`s
- feat: Create CSS variables `--font-label-size`, `--font-label-leading`
- feat: Add new icons `data`, `document`, `edit`, `external`
- feat: Update icon shape `edit`
- fix: Set fixed width on `.ProcessOverview__item__content`
- fix: Prevent skip-to-navigation link from appearing on window resize
- fix: Better account for scrollbar in page layout
- fix: Minor inaccuracies in grid/column CSS variable values

## 0.8.18

_2021-09-29_

- feat: Add new convenience token `WizardLayout-full`
- fix: Enable rudimentary scrolling in `MainMenu` mega panels

## 0.8.16 – 0.8.17

_2021-09-24_

- feat: Add visible underline to `FooterInfo`'s inline links
- fix: Layering issues with `PageFilter--underlap`

## 0.8.15

_2021-09-23_

- feat: Add component `VSpacer` for custom spacing between page components
- feat: Add CSS variables `--component-vspace--(small|medium|large|xlarge)`
- feat: Add CSS variables `--color-{name}-{number}`
- fix: Reintroduce L15 font files because older CSS versions link to them

## 0.8.12 – 0.8.14

_2021-09-22_

- feat: Introduce the new "Esja" typeface
- feat: Add styling for `TableWrapper--BasicTable--fullWidth`
- feat: Increase `HeroBlock`'s min-height
- feat: Slightly increase top-padding of `GridBlocks` items
- fix: Minor typographic fixes and upates
- fix: Various `MainMenu` mega menu rendering issues
- fix: Dev warning messages for `CenterColumn` appeared in prod build
- fix: Increase `ImageCards__list` spacing in mobile format
- fix: Minor spacing and layering corrections/tweaks

## 0.8.11

_2021-06-14_

- fix: Reintroduce `.experimental_Columnized` but mark it deprecated

## 0.8.10

_2021-06-14_

- feat: Remove experimental component `.experimental_Columnized` (not used)
- fix: Incorrect position of `.WizardLayoutClose` in ultra wide format

## 0.8.9

_2021-06-11_

- feat: Add component `CenterColumn` - for simple "article" text block layout
- feat: Add support for `.WizardLayout__alerts` and `.WizardLayout__content`

## 0.8.8

_2021-06-03_

- fix: `.WizardLayout__stepper` positioned too high on mobile
- fix: Jaggy height+spacing of `WizardStepper__step`s on mobile
- fix: Center `DatePicker`'s icon when `.FormField__label` is visible
- fix: Half-cropped header logo text showing in tablet/phone formats

## 0.8.7

_2021-06-02_

- fix: Prevent horizontal page scroll in Safari — Note: The current fix blocks
  future use of `position:sticky;`
- fix: Prevent line-wrap of "inlined" `.FormField__label` texts

## 0.8.6

_2021-05-25_

- feat: Update styling for `AccordionList`
- feat: Add `favicon-large.png` alias of `favicon-144.png`
- feat: Add global CSS varible `--link-focus-outlineColor`
- feat: Change the default keyboard-focus outline color to `currentColor`
- feat: Switch primary and secondary colors in "colorful" theme
- fix: Force-wrap super long words in `InfoHero` and `GridBlock__item` titles
- fix: Add spacing between `.CityBlock__button`s
- fix: Improve `MainMenu`-related keyboard focus styling
- fix: Incorrect theme-color mapping in some
  ["formheimur"](src/assets/formheimur/files.json) assets
- fix: Update color of `.FooterInfo` headings
- fix: Improve color-contrast of `BreadCrumbs`
- fix: Remove 1px rounding-inaccuracy gap between `IslandBlock` columns and
  background-bleed around the SVG image
- fix: Set default icon for `.FeatureList__feature`
- fix: Add more margins between certain page blocks
- docs: Add simple welcome message and useful links to
  [`public/index.html`](public/index.html)

## 0.8.5

_2021-05-18_

- fix: Tweak seen-effects styles in minor ways
- feat: Update `NameCards` styling to match updated HTML

## 0.8.4

_2021-05-18_

- feat: Add styling for `PageHeader--small` variant
- feat: Support generic attribute `[data-seen-effect]`
- feat: Add placebo bundling token `SeenEffect` (provided by `-basics`)
- feat: Update styling of `.FooterInfo` links
- fix: Suppress nested `[data-is-seen]` effects on atomic elements
- fix: Tolerate stray wrapper elements better inside `.AccordionList`
- fix: Super long `ButtonTertiary`s didn't line-wrap
- fix: Missing primary-color border on `ExtraLinks` w. `startSeen`

## 0.8.3

_2021-04-20_

- fix: overwrite `before-sprinkling` rule hiding `.MainMenu__panelsWrap` with
  `data-sprinkled` selector

## 0.8.2

_2021-04-12_

- fix: Make sure `.MainMenu__panelsWrap` is higher than that of
  `.SiteSearchCurtain`
- fix: Allow scrolling in `.MainMenu__panelsWrap` when content exceeds height
  of window

## 0.8.1

_2021-04-09_

- fix: add `logo-text` class text group instead of letter path
- fix: correct language nav item separator color

## 0.8.0

_2021-04-08_

- **BREAKING** target: **Hanna 0.8** markup patterns
- feat: **BREAKING** Update styling for `MainMenu` to match new design +
  markup.
- feat: Add new Hanna ["Illustration"](src/assets/illustrations/files.json)
  assets

## 0.7.23

_2020-12-15_

- feat: allow landscape images in `InfoHero` component
- fix: add missing `$childSelector` to `SeenEffect--seen`

## 0.7.22

_2020-12-09_

- feat: add `Footnote` component styling

## 0.7.21

_2020-11-30_

- refactor: Transition/animation timing tweaks
- feat: Increase font-size of list items inside `*TextBlock`s
- feat: Add utility component `BlockBreak` for flexbox hard line-breaks — as
  [using `<br/>` is unreliable](https://stackoverflow.com/a/45143493)

## 0.7.20

_2020-11-25_

- feat: Make `.ImageCards__image` background transparent
- feat: Add "favicon" files
- feat: Reexport all "Illustration" assets with transparent background
- fix: Remove non-ascii characters from Illustration asset/file names

## 0.7.19

_2020-11-24_

- feat: Normalize transition durations and timing-functions — to use only
  `200`, `400` or `650ms` and `ease-in`

## 0.7.18

_2020-11-20_

- feat: Suppress initial flicker of "seen" content on page-load

## 0.7.17

_2020-11-19_

- feat: Add component `IframeBlock`
- fix: Add basic styling for bare `<iframes/>`s and `<video/>`s

## 0.7.15 – 0.7.16

_2020-11-18_

- feat: Add fade-up effects for page/block components on `[data-is-seen]`
- feat: Add 5 new ["Illustration"](src/assets/illustrations/files.json) assets
  for the homepage
- feat: Add styling for `.SearchResultsHighlightItem` with images
- feat: Tweak styling of `.SearchResultsItem__meta`
- feat: Change `.Attention` styling - deprecate `--strong` variant
- fix: Prevent site-wide `Alert` cutoff on mobile screen-sizes

## 0.7.13 – 0.7.14

_2020-11-11_

- feat: Make active `.MainMenu__megapanel` extend to full height
- feat: Add styling for `.TableWrapper--BasicTable--align--right`
- feat: Gobally use `:focus-visible` and `[data-focus-visible-added]`
- fix: Correct vertical margins of `.GridBlocks--twocol > .GridBlocks__item`s

## 0.7.12

_2020-11-05_

- feat: Improve styling for `SearchResults` — support `__loadmore` and new
  `--loading*` styles
- feat: Add icons to `.ExtraLinks__related__link--{type}` links
- feat: Order `GalleryItems` left-to-right
- feat: Support full range of WYSIWYG content inside `LabeledTextBlock`
- feat: Reduce font-size of "Labelled" (left-floated) `*TextBlock` headlines
- fix: Tweak vertical spacing in `ExtraLinks`
- fix: Increase spacing between "labelled" `H2`s and their text-column
- fix: Correct text-column width in `HeroBlock`
- fix: Tweak line-height and spacing of `ButtonTertiary`
- fix: Make `ActionCards__card`s equal height within a row
- fix: Correct the width of `.GridBlocks--twocol > .GridBlocks__item`s
- fix: Suppress focus outline on `.MainMenu__link`s
- fix: Remove redundant mediaFormat marker styling off `<body/>`

## 0.7.11

_2020-10-28_

- feat: Add white background and outline around Reykjavík's logo shape — to
  make it more resilent to overlapping other content
- feat: Styling for `.Layout__nav` and `MainMenu` toggling on small screens
- fix: Improve `ArticleCarousel` + `Gallery` mobile and unscripted styling
- fix: Prevent `button.Tabs__tab`'s widths collapsing in Chrome

## 0.7.9 – 0.7.10

_2020-10-22_

- feat: Add support for `.Layout__alerts` and `.Layout__content`
- feat: Add styling for `.Alert--alert` state (alias for `--error`)
- feat: Add 109 new ["Illustration"](src/assets/illustrations/files.json)
  assets, with "tags" info added
- feat: Relax content styling inside `TextBlock`, etc to allow more nesting
- fix: Make `.ImageCards__image--missing` background border visible
- fix: Prevent line-wrapping inside `.Tabs__tab`

## 0.7.8

_2020-10-16_

- feat: Add component `FeatureList`
- feat: Add component `Sharpie` (for presentational text coloring)
- feat: Add styling for `.InfoHero__titleblurb`
- feat: Add missing ["Efnistákn"](src/assets/efnistakn/files.json) asset –
  `sund_heiturpottur`
- feat: Tweak styling of `.ImageCards__image--missing` fallback
- feat: Add custom `.ScrollCTA` styling on `.Layout--HomePage`
- fix: Tweak vertical spacing between components
- fix: Rename `sund_*` efnistákn SVG files — Token names remain unchanged and
  old SVG files remain, but are unlisted.
- fix: Tweak fadeout transition for `.Alert--closable`

## 0.7.7

_2020-10-14_

- feat: Add component `SearchResults`
- feat: Add component `Attention`
- feat: Add styling for `.Alert--closable`
- feat: Add styling for `.Tabs__tab__badge`
- feat: Add scroll and overflow styling to `BasicTable`'s wrapper
- feat: Support `--ImageCards--fallback` variable as primary fallback image
- feat: Increase the clickable area of `SiteSearchInput`'s text input field
- feat: Make `.ArticleCarouselCard` use the primary theme color by default
- fix: Make `.PageFilter--underlap`'s content clickable again

## 0.7.6

_2020-10-07_

- feat: Add component `SiteSearchAutocomplete`
- feat: Add component `SiteSearchCurtain`
- feat: Add styling for `.PageFilter--underlap`
- feat: Add styling for `.ImageCards__image--missing`
- feat: Add new ["Efnistákn"](src/assets/efnistakn/files.json) assets –
  `sund_barnalaug`, `sund_eimbad`, `sund_kaldurpottur`, `sund_metralaug`,
  `sund_sauna`, `sund_sundfot`, `sund_utiklefi`, `wifi`
- feat: Add support for neutral `.TabPanel` wrapper elements
- fix: Fix visual regression in `Datepicker`

## 0.7.5

_2020-09-30_

- fix: Add missing asset type `dome-large` to
  ["Blings"](src/assets/bling/files.json)
- fix: Minor styling tweaks for `NewsHero`

## 0.7.4

_2020-09-30_

- feat: Add new `Bling` SVG assets — `box-medium`, `bowl-medium`,
  `circle-xlarge`, `loops-small`, `arrow-right-large`
- feat: Add component `MiniMetrics`
- feat: Rename `Gallery` and `ArticleCarousel`'s `__track` to `__items` — Flag
  the old `__track` class-name as deprecated
- feat: Tweak `Gallery`'s styling and match updated markup
- fix: Minor styling fixes for `MainMenu`, `CityBlock`

## 0.7.3

_2020-09-25_

- feat: Add component `Heading`
- feat: Add support for `.Bling--parent--*` layout options

## 0.7.1 – 0.7.2

_2020-09-24_

- feat: Support `--menu-item-icon` on `.MainMenu__mega__links` — deprecate
  inlined `background-image` style
- fix Add top-border on open `MainMenu` mega panels
- fix: Hide word "Reykjavík" appearing in `.Layout__header__logo`

## 0.7.0

_2020-09-23_

- **BREAKING** target: **Hanna 0.7** markup patterns
- **BREAKING** feat: Update `Bling` shapes and settings
- `CityCouncilHero` –> `InfoHero` changes:
  - **BREAKING** feat: Rename `CityCouncilHero` to `InfoHero`
  - feat: Add `--align--left` and `--align--right` options to `InfoHero`
  - feat: Add styling for `.InfoHero__bling` combo presets
- **BREAKING** feat: Simplify `IslandBlock` to be always "expanded", no
  illustration
- feat: Add component `IslandPageBlock` with illustration only
- feat: Allow `GridBlock` item titles to have links
- feat: Add custom (content) Frontpage styling for `.Layout--HomePage`

## 0.6.3

_2020-09-22_

- fix: Set explicit width on (disappeared) `GridBlocks__illustration` images

## 0.6.2

_2020-09-21_

- feat: Add components `ArticleCarousel`
- feat: Add components `NameCard` and `NameCards`
- feat: Add component `SiteSearchInput`
- feat: Add low-level component `CarouselStepper`
- feat: Add low-level components `RowBlock`, `RowBlockColumn`, `Illustration`
- feat: Add `--narrow` and `--transparent` options to `ProcessOverview`
- fix: Add back missing `.FormField__input` borders

## 0.6.1

_2020-09-11_

- fix: Broken `button.MainMenu__links` styling
- refactor: Reduced file sizes through more aggressive CSS variables use

## 0.6.0

_2020-09-09_

- **BREAKING** target: **Hanna 0.6** markup patterns
- **BREAKING** feat: Add `.LabeledTextBlock--wide`, replacing `--left`
- **BREAKING** feat: Simplify `TextBlock` — remove support for
  `.TextBlock--largetext` modifier and `.TextBlock__title`
- feat: Add `.TextBlock--small` option for smaller font-size
- feat: Add component `Gallery`
- feat: Add component `TagPill`
- feat: Add `.TextBlock--labelled` option with left-floating H2 headings
- feat: Change `Tabs` and `ActionCards` to also use theme colors
- feat: Update styling for basic tables, add `.Cell--*` type styles
- fix: Correct the width of `.LabeledTextBlock--wide`'s summary column – and
  tweak mobile styling to better match `.TextBlock--labelled`'s
- fix: Make all `BasicTable`s full-width
- fix: Remove max-width off all `--align--right` text/heading components
- fix: Tolerate missing `.ImageCards__title`
- fix: Apply `ExtraLinks__card` hover styling on all screen sizes
- fix: Reset `.MainMenu__mega__link__title` link colors variables
- fix: Reduce/Tweak font-size headings inside `TextBlock`s
- fix: Reduce font-size of `<ul/>`s and `<ol/>`s inside large-text blocks

## 0.5.5

_2020-09-04_

- feat: Add component `ShareButtons`
- feat: Make all components pick up theme-colors
- feat: Update `WizardStepper__step` colors and line-wrap handling
- feat: Add styling for `.ExtraLinks--related` modifier
- fix: Limit height of portrait `.NewsHero__image`s & increase text size
- fix: Visually hide `.ShareButtons__label`
- fix: Add margins to `InfoBlock` and `ExtraLinks` components

## 0.5.4

_2020-08-31_

- fix: Tweak `Alert` colors more consitent and make A11y more uniform
- fix: Tweak `WizardStepper__step` spacing and hover style
- fix: Display invisible `.HeroBlock__image`s

## 0.5.3

_2020-08-26_

- feat: add component `NewsHero`
- feat: Add dreprecation warnings for `.TextBlock__title` (Remove in v0.6)
- feat: Add component `CityCouncilHero`
- fix: Increase width of illustration containers to match new, wider crops
- fix: Minor `IslandBlock` and `CityBlock` image tweaks
- fix: `Bling`'s `vertical` positioning was inverted
- fix: Revert removal of button `width: max-content` capping

## 0.5.2

_2020-08-21_

- feat: Add component `PageFilter`
- feat: Add component `ImageCards`
- feat: Add component `Bling`, and "[Bling](src/assets/bling/files.json)" SVG
  assets
- feat: Add "[Illustration](src/assets/illustrations/files.json)" PNG asssets

## 0.5.1

_2020-08-13_

- fix: Upgrade Formheimur assets with custom theme-color tweaks

## 0.5.0

_2020-08-12_

- **BREAKING** target: **Hanna 0.5** markup patterns
- **BREAKING** feat: Drop support for `.HeroBlock--align--right`
- **BREAKING** feat: Wrap `.SearchInput`'s input in a div, add `<button/>`
- feat: Set min-height on `.HeroBlock` and tweak vertical align
- feat: Add "Efnistákn" (see [1](src/assets/efnistakn/files.json),
  [2](src/assets/efnistakn/menu/files.json)) and
  "[Formheimur](src/assets/formheimur/files.json)" SVG assets.
- feat: Style inlined "Formheimur" `<svg/>` assets in `IslandBlock`
- fix: Set correct padding+margins on `IslandBlock`'s content blocks

## 0.4.3

_2020-07-15_

- fix: fixed html height was messing up absolute positions
- fix: correct icon position for `Datepicker`
- fix: disable browser default focus outline on nested input fields
- fix: add basic quotes to blockquote
- fix: add correct link styles to `TextContent` links

## 0.4.2

_2020-07-03_

- feat: Improve styling of `.FormField__label__reqstar`
- fix: logo spacing for `WizardLayout` in tablet/netbook
- fix: `.AccordionList__content` not working correctly when sprinkled

## 0.4.1

_2020-06-19_

- feat: Add component `PageHeading`
- feat: Add `.SubHeading--wide` and `.SubHeading--align--right` styling
- feat: Drop `.BasicTable--fullwidth` - make all tables wide by default
- feat: Drop experimental `.AccordionList--fullwidth`, add
  `.AccordionList--wide`
- fix: Stablize `.IslandBlock__content` widths, paddings, margins
- fix: Stablize `.AccordionList` width, left-padding and icon-placement
- fix: Minor tweaks/fixes for `InfoBlock`, `TextBlock`, and a few others

## 0.4.0

_2020-06-09_

- **BREAKING** target: **Hanna 0.4** markup patterns
- feat: add largetext variant for `TextBlock`
- feat: Add `WizardLayoutClose` mini component
- fix: add missing margin to single `Checkbox`
- fix: Pass through mouse-clicks on labels overlapping `FormField`s
- fix: add spacing for `SubHeading`
- fix: html needs relative position when scrollbarwidth margin is applied

## 0.3.6

_2020-06-03_

- feat: Add CSS for `Form` component
- feat: Add `--align--right` and `--wide` modifiers to `TextBlock`
- fix: Improve `Checkbox`/`Radio` error styling
- feat: Set global CSS color variables based on `[data-color-theme="{...}"]`

## 0.3.5

_2020-06-02_

- feat: Add component `Modal`
- feat: Add support (default value) for `--browser-scrollbar-width`
- fix: Pass through mouse-clicks on labels overlapping `FormField`s

## 0.3.4

_2020-05-29_

- fix: minor layout fixes for `wizardstepper`

## 0.3.3

_2020-05-28_

- feat: Add component `SearchInput`
- feat: Add explicit `.MainMenu__separator` marker

## 0.3.2

_2020-05-27_

- fix: Improve `HeroBlock`, `CityBlock` image styling
- fix: Decrease `.Layout__main`'s top padding
- feat: **experimental** Add utility component `.experimental_Columnized`
- feat: **experimental** Add `.AccordionList--fullwidth`, `.Form`,
  `.TextBlock--align--right`

## 0.3.1

_2020-05-25_

- feat: Add components `TextBlock`, `BasicTable`

## 0.3.0

_2020-05-21_

- **BREAKING** feat: Rename `ProcessStepper` to `ProcessOverview`
- **BREAKING** feat: Rename `Accordion` to `AccordionList`
- feat: Add component `SubHeading`
- feat: Handle `h3.AccordionList__title`
- fix: Improve styling of `Button*`, `AccordionList`

## 0.2.8

_2020-05-15_

- fix: Improve `IslandBlock` styling

## 0.2.7

_2020-05-14_

- feat: Add updated `Alert` icons
- fix: Tweak spacing/padding of `Layout__main`, `HeroBlock`,
  `LabeledTextBlock` and `ExtraLinks`
- fix: Maintain correct `HeroBlock__image` aspect ratio
- fix: Convenience tokens, like `Layout-full`, should have no styles

## 0.2.6

_2020-05-14_

- feat: Finish styling of `MainMenu`'s mega panels
- fix: Mis-Casing in some `MegaMenu__` class-names
- fix: Use `html.before-sprinkling` and `[data-sprinkled]` to suppress flicker
- fix: Misc minor styling fixes for `ExtraLinks` and `LabeledTextBlock`

## 0.2.5

_2020-05-08_

- feat: Add component `IslandBlock`
- feat: Add `--align--right` modifier to `HeroBlock`
- fix: Tweak `Accordion` open/close styling

## 0.2.4

_2020-05-06_

- feat: Add components `Accordion` ,`ProcessStepper` ,`FileInput`,
  `Datepicker` and `Alert`
- fix: Improve responsive scaling for `ActionCards` and `ExtraLinks`

## 0.2.3

_2020-04-27_

- feat: Add component `MainMenu` (WIP)
- feat: Add components `WizardLayout`, `WizardStepper`, `CityBlock`,
  `InfoBlock`, `GridBlocks`
- feat: Make all `Button*`s inline by default - and correct their
  active/pressed state

## 0.2.2

_2020-04-15_

- feat: Add components `FormField`, `TextInput`, `Selectbox`, `Checkbox`,
  `CheckboxGroup`, `CheckboxButtonsGroup`, `RadioGroup` and
  `RadioButtonsGroup`

## 0.2.1

_2020-04-03_

- feat: Add component `FieldGroup`
- fix: Stop `a.Button*`s expanding to full width
- feat: Publish a `dev-v0` CSS version - with debug and error messages for
  developers writing templates/markup
- docs: Document the bundler URLs — `v{N}`, `dev-v{N}` vs `dev`
- docs: Dump this CHANGELOG on the server as `/changelog.txt`

## 0.2.0

_2020-03-30_

- **BREAKING** feat: Rename `PageTitleBlock` back to `HeroBlock`
- feat: Add `LabeledTextBlock`, `ExtraLinks`, `ActionCards`, `BreadCrumbs`
- feat: Add L15 webfont
- fix: Tweak `HeroBlock` and `Button*` styling and make them more responsive

## 0.1.0

_2020-03-20_

- First version — Includes: `-basics`, `Layout`, `FooterInfo`, `Layout-full`
  conveniConvenience tokens, like `ButtonPrimary`, , should have no styles
  themselves`ButtonTertiary`, `Tabs`, `PageTitleBlock`
