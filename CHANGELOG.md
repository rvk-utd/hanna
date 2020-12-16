# Change Log

## Upcoming...

- ... <!-- Add new lines here. -->

## 0.7.23

_2020-12-15_

- feat: allow landscape images in  `InfoHero` component
- fix: add missing `$childSelector` to `SeenEffect--seen`

## 0.7.22

_2020-12-09_

- feat: add `Footnote` component styling

## 0.7.21

_2020-11-30_

- refactor: Transition/animation timing tweaks
- feat: Increase font-size of list items inside `*TextBlock`s
- feat: Add utility component `BlockBreak` for flexbox hard line-breaks – as
  [using `<br/>` is unreliable](https://stackoverflow.com/a/45143493)

## 0.7.20

_2020-11-25_

- feat: Make `.ImageCards__image` background transparent
- feat: Add "favicon" files
- feat: Reexport all "Illustration" assets with transparent background
- fix: Remove non-ascii characters from Illustration asset/file names

## 0.7.19

_2020-11-24_

- feat: Normalize transition durations and timing-functions – to use only
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
- feat: Change `.Attention` styling - deprecate `--strong variant`
- fix: Prevent site-wide `Alert` cutoff on mobile screen-sizes

## 0.7.13 – 0.7.14

_2020-11-11_

- feat: Make active `.MainMenu__megapanel` extend to full height
- feat: Add styling for `.TableWrapper--BasicTable--align--right`
- feat: Gobally use `:focus-visible` and `[data-focus-visible-added]`
- fix: Correct vertical margins of `.GridBlocks--twocol > .GridBlocks__item`s

## 0.7.12

_2020-11-05_

- feat: Improve styling for `SearchResults` – support `__loadmore` and new
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

- feat: Add white background and outline around Reykjavík's logo shape – to
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
- fix: Rename `sund_*` efnistákn SVG files – Token names remain unchanged and
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

- feat: Add new `Bling` SVG assets – `box-medium`, `bowl-medium`,
  `circle-xlarge`, `loops-small`, `arrow-right-large`
- feat: Add component `MiniMetrics`
- feat: Rename `Gallery` and `ArticleCarousel`'s `__track` to `__items` – Flag
  the old `__track` class-name as deprecated
- feat: Tweak `Gallery`'s styling and match updated markup
- fix: Minor styling fixes for `MainMenu`, `CityBlock`

## 0.7.3

_2020-09-25_

- feat: Add component `Heading`
- feat: Add support for `.Bling--parent--*` layout options

## 0.7.1 – 0.7.2

_2020-09-24_

- feat: Support `--menu-item-icon` on `.MainMenu__mega__links` – deprecate
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
- **BREAKING** feat: Simplify `TextBlock` – remove support for
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
- docs: Document the bundler URLs – `v{N}`, `dev-v{N}` vs `dev`
- docs: Dump this CHANGELOG on the server as `/changelog.txt`

## 0.2.0

_2020-03-30_

- **BREAKING** feat: Rename `PageTitleBlock` back to `HeroBlock`
- feat: Add `LabeledTextBlock`, `ExtraLinks`, `ActionCards`, `BreadCrumbs`
- feat: Add L15 webfont
- fix: Tweak `HeroBlock` and `Button*` styling and make them more responsive

## 0.1.0

_2020-03-20_

- First version – Includes: `-basics`, `Layout`, `FooterInfo`, `Layout-full`
  conveniConvenience tokens, like `ButtonPrimary`, , should have no styles
  themselves`ButtonTertiary`, `Tabs`, `PageTitleBlock`
