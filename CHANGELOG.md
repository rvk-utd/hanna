# Change Log for Hanna HTML Patterns

## Upcoming...

- ... <!-- Add new lines here. -->
- feat: Add component `Tooltip`
- feat: Add modifier `.FieldGroup--small` for smaller label
- feat: Add optional `.InfoHero__footer` element
- fix: Remove redundant `role="group"` off `FieldGroup`'s `fieldset` element
- fix: Remove `role="group"` off all Checkbox and Radio Group containers

## 0.8.29

_2023-01-30_

- feat: Add standalone component `.CheckboxButton`
- feat: Add `.CheckboxButton__label__wrap` and `.RadioButton__label__wrap`
- feat: Add optional `.ContentArticle__header` wrapper
- feat: Add support for rich text directly inside `.ArticleList__content`
- feat: Add `.ActionCards__summary`
- feat: Add `.FooterInfo__group--main`, deprecate `[role]` styling
- fix: Add missing `title=""` attribute on `.IframeBlock` pattern

## 0.8.28

_2022-08-11_

- feat: Add scripted mouse scroll controls for `Carousel`-related components

## 0.8.27

_2022-06-20_

- feat: Add component `ArticleCards`
- feat: Add component `Picture`
- feat: Add component `BgBox`
- feat: Add variant `--small` to `ArticleMeta`

## 0.8.26

_2022-05-25_

- feat: Rename `Carousel`, `Gallery` and `ArticleCarousel`'s `__items` to
  `__itemlist` — Flag the old `__items` class-name as deprecated
- feat: Add modifier `.WizardStepper__step--neutral` to skip numbering

## 0.8.25

_2022-05-23_

- feat: Add components `BlockQuote`, `PullQuote`
- feat: Add `.Modal__blings__inner` wrapper

## 0.8.24

_2022-05-12_

- feat: Add `.Checkbox__label__reqstar`

## 0.8.23

_2022-04-20_

- feat: Add low-level, generic component `Carousel`
- feat: Support `--done` flagging on future `WizardStepper__step`s

## 0.8.22

_2022-04-07_

- feat: Add variants `--color--(green|yellow|orange|red)` to `TagPill`
- feat: Add variant `--large` to `TagPill`
- feat: Add optional `.TagPill__remove` and `.TagPill__button` elements

## 0.8.21

_2022-04-04_

- feat: Allow `.ContactBubble__link` to be a `<button/>`
- fix: Make non-wrapping `VSpacer` use `<hr/>` (deprecate `<br/>` pattern)
- story: Show use of `FooterBadges` in "Layout with Content" story

## 0.8.20

_2022-03-28_

- feat: Add support for nested `.Tabs` (single level deep)
- feat: Add variant `--vertical` to `Tabs`
- feat: Add experimental component `Skeleton`
- story: Add example of `.Tabs__tab__badge`

## 0.8.19

_2022-03-17_

- feat: Add variant `--small` to `Attention`
- feat: Add `.Modal__blings` container for `Modal` decorations
- feat: Deprecate variants `--small`, `--2ol` and `--3col` on
  `.CheckboxButtonsGroup` and `.RadioButtonsGroup`

## 0.8.18

_2022-03-09_

- feat: Add variant `--align--right` to `ButtonBar`

## 0.8.17

_2022-03-03_

- feat: Add component `ButtonBar` with `__split`ting ability
- feat: Add `--go--(back|forward)` variants for
  `Button(Primary|Secondary|Tertiary)`

## 0.8.16

_2022-03-01_

- feat: Add variants `--background--(gray|secondary)` for `IslandPageBlock`

## 0.8.15

_2022-02-28_

- feat: Add back `.NameCard__hours` for separate display of operation hours
- feat: Add `.NameCard__availability`, deprecate `.NameCard__vacancy`
- feat: Add component `TextButton` for hyperlink-looking `<button/>`s
- feat: Add `--wide` alternative for `ButtonPrimary` and `ButtonSecondary`
- feat: Add `--destructive` variant for `ButtonPrimary`, `ButtonSecondary` and
  `ButtonTertiary`

## 0.8.14

_2022-02-16_

- feat: Add variant `WizardStepper--preview` when no step is active yet

## 0.8.13

_2022-02-08_

- story: Show `lang=""` on `.MainMenu__link--lang` + other minor example fixes

## 0.8.12

_2022-02-01_

- feat: Expose ContactBubble's alwaysShow prop as `data-always-show="true"`

## 0.8.11

_2022-01-13_

- feat: Add `--photo` option to `.ArticleCarouselCard__illustration`

## 0.8.10

_2021-11-04_

- fix: Improve/cleanup `TextInput` abnd `Selectbox` HTML examples

## 0.8.9

_2021-10-29_

- fix: Minor fixes/cleanup of `MainMenu` markup

## 0.8.8

_2021-10-26_

- feat: Add component `ContactBubble`

## 0.8.7

_2021-10-22_

- feat: Add component `ContentArticle`
- feat: Add component `RelatedLinks`
- feat: Add component `ContentImage`
- feat: Add component `ArticleMeta`
- feat: Add component `FooterBadges` for logos/badges/etc.
- story: Update `FooterInfo`'s example content

## 0.8.6

_2021-09-24_

- fix: Set default `role` attributes on `Layout` and `WizardLayout` landmarks
- story: Minor improvements to form-related stories

## 0.8.5

_2021-09-23_

- feat: Add component `VSpacer` for custom spacing between page components

## 0.8.4

_2021-09-22_

- feat: Add `--fullwidth` option to `BasicTable`'s wrapper element — to break
  out of containers

## 0.8.3

_2021-06-11_

- feat: Add component `CenterColumn` - for simple "article" text block layout
- feat: Add global "alerts" support with `.WizardLayout__alerts` — (and
  `.WizardLayout__content` around the rest)

## 0.8.2

_2021-05-18_

- feat: `NameCard` changes:
  - feat: Add `.NameCard__contactinfo`, deprecate `.NameCard__tel`
  - feat: Add `.NameCard__contactinfo__item`, deprecate
    `.NameCard__tel__number`
  - feat: Add `.NameCard__abouttext`, deprecate `.NameCard__hours`
  - feat: Make all contents optional, except `__name`

## 0.8.1

_2021-05-18_

- feat: Add generic attribute `data-seen-effect="(fadein|fadeup|fadeleft)"`

## 0.8.0

_2021-04-08_

- `MainMenu` changes:
  - **BREAKING** refactor: Remove `icon` prop from `MainMenu`
  - **BREAKING** refactor: Remove `image` prop from `MegaPanel.item`
  - **BREAKING** refactor: Rename/move `MainMenu__megapanel` to `PrimaryPanel`
  - **BREAKING** refactor: Rename `MainMenu__megas` to `MainMenu__panels`
  - feat: Add prop `auxiliaryPanel` to `MainMenu`
- feat: update `illuastration` list in `assets.ts`
- feat: Add `--small` option to `PageHeader`

## 0.7.16

_2020-12-09_

- feat: add component `Footnote`
- feat: Add utility component `BlockBreak` for flexbox hard line-breaks
- feat: Remove "seen" effects from stories to stay focused reduce jag

## 0.7.15

_2020-11-25_

- feat: Update stories with "seen" effects and other minor tweaks

## 0.7.14

_2020-11-19_

- feat: Add component `IframeBlock`

## 0.7.13

_2020-11-18_

- feat: Add `.SearchResultsHighlightItem` markup to `SearchResults`
- feat: Deprecate `.Attention--strong` variant

## 0.7.12

_2020-11-11_

- feat: Add `--align--right` option to `BasicTable`'s wrapper element

## 0.7.11

_2020-11-06_

- story: Clean up, simplify and improve form-field related stories
- story: Tweak `FooterInfo` content

## 0.7.10

_2020-11-05_

- `SearchResults` changes:
  - feat: Add `__loadmore` button for `SearchResults` (remove paging buttons)
  - feat: Update `--load*` modifiers for `SearchResults`
  - feat: Add `SearchResults__results` wrapper below the `Tabs`
  - fix: Correct typo in `SearchResultsItem__*` class-names
- feat: Add `.ExtraLinks__related__link--{type}` classNames
- story: Edit `BasicTable`'s example data to make slightly more sense

## 0.7.9

_2020-10-28_

- feat: Various minor markup and story fixes

## 0.7.8

_2020-10-22_

- feat: Add global "alerts" support with `.Layout__alerts` — (and
  `.Layout__content` around the rest)
- feat: Add `.Alert--critical` state (alias for `--error`)
- story: Add example of server-side `.Alert__close` links

## 0.7.7

_2020-10-16_

- feat: Add component `FeatureList`
- feat: Add component `Sharpie` (for presentational text coloring)
- feat: Add support for optional `.InfoHero__titleblurb`
- story: Add example of `InfoHero` showing swimming pool open/closed status
- story: Add example of custom `ScrollCTA` element on HomePage
- story: Clean up HTML example for `.Alert--closable`

## 0.7.6

_2020-10-14_

- feat: Add component `SearchResults`
- feat: Add component `Attention`
- story: Add example of `Attention` being used inside `LabelledTextBlock`
- feat: Add support for `data-color-theme=""` on `.ArticleCarouselItem`s
- feat: Add `--closable` option to `Alert`s
- feat: Add support for optional `.Tabs__tab__badge`s
- feat: Allow setting fallback image for `ImageCards` via CSS variable
- story: Update `SearchHeroParagraph` story to use
  `<script id="SiteSearchRoot"/>`
- story: Fix broken/missing `SearchHeroParagraph` CSS in `HomePage` story
- story: Prevent display of `BasicTable`'s scripted scroll/overflow markup

## 0.7.5

_2020-10-07_

- feat: Add story with `Tabs` as dynamic anchor-link-driven tab panel toggler
- feat: Add component `SiteSearchAutocomplete`
- feat: Add component `SiteSearchCurtain`
- feat: Add custom homepage component `SearchHeroParagraph`
- feat: Add `--underlap` option to `PageFilter` to pull its next sibling up
- feat: Make `.ImageCards__image` optional, adding `--missing` modifier
- story: Add example of `aria-controls` and `aria-pressed` use in `Tabs`

## 0.7.4

_2020-09-30_

- feat: Add `Bling` combo presets to `NewsHero`

## 0.7.3

_2020-09-30_

- feat: Add component `MiniMetrics`
- feat: Rename `Gallery` and `ArticleCarousel`'s `__track` to `__items` — Flag
  the old `__track` class-name as deprecated
- feat: Drop `Gallery` and `ArticleCarousel`'s `__inner` wrapper
- feat: Drop `GalleryItem`'s `--landscape` and `--portrait` modifiers
- story: Add `ArticleCarousel` to `Layout--HomePage` story, fix CSS link

## 0.7.2

_2020-09-25_

- feat: Add `--parent--{(top|bottom)(-ish)?|center}` options to `Bling`
- feat: Update `Bling` modifiers/classes on `InfoHero` and `NewsHero`
- fix: Mend malformed `Heading` size-modifier class-names
- story: Fix unselectable knobs

## 0.7.1

_2020-09-25_

- feat: Add component `Heading`
- feat: Set `--menu-item-icon` on `.MainMenu__mega__links` — deprecate inlined
  `background-image` style
- feat: Normalize search fields to only use `type="text"`
- story: Fix right shifting of the viewport preview iframe

## 0.7.0

_2020-09-23_

- `Bling` changes:
  - **BREAKING** feat: Update `Bling` - remove `size`, new types and alignment
    values
  - **BREAKING** feat: Update `Bling` presets in `InfoHero` and `NewsHero`
- `CityCouncilHero` –> `InfoHero` changes:
  - **BREAKING** feat: Rename `CityCouncilHero` to `InfoHero`
  - feat: Add `--align--left` and `--align--right` options to `InfoHero`
  - feat: Add `.InfoHero__bling` combo presets
- `IslandBlock` changes:
  - **BREAKING** feat: Simplify `IslandBlock` to be always "expanded", no
    illustration
  - feat: Add component `IslandPageBlock` with illustration only
- feat: Allow `GridBlock` item titles to have links
- `ArticleCarousel` changes:
  - feat: Add class-name `.ArticleCarousel__illustration--missing` if image is
    missing
  - **BREAKING** feat: Move `ArticleCarouselCard` color info to a `data-color`
    attribute

## 0.6.1

_2020-09-21_

- feat: Add components `ArticleCarousel`,
- feat: Add components `NameCard` and `NameCards`
- feat: Add component `SiteSearchInput`
- feat: Add low-level component `CarouselStepper`
- feat: Add low-level components `RowBlock`, `RowBlockColumn`, `Illustration`
- feat: Add `--narrow` and `--transparent` options to `ProcessOverview`
- story: Fix a bug that prevented checkboxe and radio button toggling
- fix: Set `.SearchInput__button`'s `title` attribute, drop `aria-label`

## 0.6.0

_2020-09-09_

- **BREAKING** feat: Add `.LabeledTextBlock--wide`, replacing `--left`
- **BREAKING** feat: Simplify `TextBlock` — remove support for
  `.TextBlock--largetext` modifier and `.TextBlock__title`
- feat: Add `.TextBlock--small` option for smaller font-size
- feat: Add component `Gallery`
- feat: Add component `TagPill`
- feat: Add `.TextBlock--labelled` option with left-floating H2 headings
- story: Add knob to toggle `BasicTable`'s "`tfoot`" row on/off
- story: Add examples of `BasicTable`'s `.Cell--*` types

## 0.5.3

_2020-09-04_

- feat: Add component `ShareButtons`
- feat: Add support for `data-bling-type` attribute on `Bling` containers
- feat: Add `--related` modifier to `ExtraLinks` component
- feat: Add `data-start-open="true"` option to `AccordionList__item`s
- fix: `ActionCards__card` and `ExtraLinks__card` not rendering as `<a/>`
- fix: `IslandBlock` SVG-shape `<img/>` tags were not visible in HTML example

## 0.5.2

_2020-08-26_

- feat: Add component `NewsHero`
- feat: Add component `CityCouncilHero`
- feat: Add deprecation warnings for `.TextBlock__title` (Remove in v0.6)
- feat: Add support for `--small` variant of `ButtonTertiary`

## 0.5.1

_2020-08-21_

- feat: Add component `Bling`
- feat: Add component `PageFilter`
- feat: Add component `ImageCards`

## 0.5.0

_2020-08-12_

- **BREAKING** feat: Simplify `HeroBlock`. It now must always have an image,
  and the right-alignment option has been droped
- **BREAKING** feat: Wrap `.SearchInput`'s input in a div, add `<button/>`

## 0.4.3

_2020-07-09_

- fix: First `Tabs__tab` is unclickable

## 0.4.2

_2020-07-03_

- feat: Show example of `Layout` with no `.Layout__nav` and skiplink
- feat: Make `.FormField__label__reqStar` optional

## 0.4.1

_2020-06-19_

- feat: Add component `PageHeading`
- feat: Add `.SubHeading--wide` and `.SubHeading--align--right` options
- feat: Drop `.BasicTable--fullwidth` class
- feat: Add `--wide` variant to `AccordionList`

## 0.4.0

_2020-06-09_

- **BREAKING** feat: Remove the `.WizardLayout__close` button
- feat: Add `WizardLayoutClose` mini component
- feat: add variant `TextBlock--largetext`

## 0.3.4

_2020-06-03_

- feat: Add components `Modal`, `Form`
- feat: add `--align--right` and `--wide` modifiers to `TextBlock`
- feat: Support for `data-color-theme` attribute to change component colors

## 0.3.2 – 0.3.3

_2020-05-28_

- feat: Add component `SearchInput` (w/o auto-complete)
- feat: Add explicit `.MainMenu__separator` marker

## 0.3.1

_2020-05-27_

- fix: Disallow right-alignment of `HeroBlock`s with images

## 0.3.0

_2020-05-21_

- **BREAKING** feat: Rename `ProcessStepper` to `ProcessOverview`
- **BREAKING** feat: Rename `Accordion` to `AccordionList`
- **BREAKING** feat: Change `span.AccordionList__button` into
  `h3.AccordionList__title`
- feat: Add component `SubHeading`
- fix: Add `role="alert"` to `Alert`
- fix: Minor fixes in HTML attribute names, etc.

## 0.2.9

_2020-05-15_

- feat: Add `.HeroBlock__buttons` wrapper

## 0.2.8

_2020-05-14_

- fix: Mis-Casing in some `MegaMenu__` class-names

## 0.2.7

_2020-05-08_

- feat: Add `--align--right` modifier to `HeroBlock`

## 0.2.6

_2020-05-06_

- feat: Add components `IslandBlock`, `Accordion`, `ProcessStepper`,
  `FileInput`, `DatePicker` and `Alert`

## 0.2.4 – 0.2.5

_2020-04-27_

- feat: Add component `MainMenu` (Server-side markup)
- feat: Add components `WizardLayout`, `WizardStepper`, `CityBlock`,
  `InfoBlock` and `GridBlocks`
- feat: Make BreadCrumbs `<nav/>`
- fix: Add missing `aria-current="true"` to the last `.BreadCumbs__item`

## 0.2.3

_2020-04-15_

- feat: Add components `FormField`, `TextInput`, `Selectbox`, `Checkbox`,
  `CheckboxGroup`, `CheckboxButtonsGroup`, `RadioGroup` and
  `RadioButtonsGroup`

## 0.2.2

_2020-04-03_

- feat: Add component `FieldGroup`
- fix: Change `.HeroBlock__summary` to be `<div/>`
- story: Add examples of Buttons being either `<button/>` or `<a/>`

## 0.2.0 – 0.2.1

_2020-03-30_

- **BREAKING** feat: Rename `PageTitleBlock` back to `HeroBlock`
- **BREAKING** feat: Make `-basics` again an explicit top-level token
- feat: Add `LabeledTextBlock`, `ExtraLinks`, `ActionCards`, `BreadCrumbs`

## 0.1.0

_2020-03-20_

- First version — Includes: `-basics`, `Layout`, `FooterInfo`, `Layout-full`,
  `ButtonBack`, `ButtonPrimary`, `ButtonSecondary`, `ButtonTertiary`, `Tabs`,
  `PageTitleBlock`
