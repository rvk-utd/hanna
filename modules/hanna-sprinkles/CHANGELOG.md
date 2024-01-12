# Change Log

## Upcoming...

- ... <!-- Add new lines here. -->

## 0.8.54

_2024-01-15_

- fix: Remove `__link__descr` text from `MainMenu2` link label texts

## 0.8.53

_2024-01-12_

- fix: Regression in `utils/makeVerticalTabsTOC` causing runtime failure

## 0.8.51 – 0.8.52

_2024-01-10_

- feat: Remove `MainMenu2` toggler's hard-coded icon, rely on CSS instead
- fix: Issues in parsing `MainMenu2Props` from HTML

## 0.8.50

_2023-12-11_

- feat: Add component `MainMenu2`
- feat: Simplify `Layout` sprinkle to not handle mobile menu toggling
- feat: Update `MainMenu` to use `MobileMenuToggler`
- feat: Globally apply `setDefaultLanguage` based on page's `lang` attribute

## 0.8.49

_2023-11-10_

- fix: Non-sensical `Gallery` close button label

## 0.8.48

_2023-10-25_

- feat: Stop inserting `.TableWrapper__scroller` inner wrapping element

## 0.8.47

_2023-09-07_

- feat: Only do auto seen-effects if `-legacy-AutoSeenEffects` CSS is loaded
- fix: Correctly initialize multiple `VerticalTabsTOC`s on same page

## 0.8.46

_2023-07-11_

- feat: Upgrade `sitewideAlerts` to support renamed property `renderedAlert`
- feat: Make `loadSprinkles`' "base inport URL" resolution more resilient

## 0.8.44 – 0.8.45

_2023-07-06_

- feat: ~~Make `loadSprinkles`' "base inport URL" resolution more resilient~~
  (Temporarily reverted)

## 0.8.43

_2023-05-19_

- feat: Add `version` property to `window.Hanna` object
- feat: Publish sprinkle scripts on styles.reykjavik.is/sprinkles
  - Update README.md with new, shorter initialization guidelines.
  - Remove mention of the old npm package, which has reached EOL

## 0.8.42

_2022-12-21_

- feat: `utils/makeVerticalTabsTOC` merges contents of heading-less containers
  into the previous panel

## 0.8.41

_2022-09-26_

- feat: Add prop `target` to `ArticleCarouselCardProps`
- fix: Hide `Carousel` mouse-cursor scroll controls at start/end positions

## 0.8.40

_2022-08-11_

- feat: Add mouse-cursor scroll controls for `Carousel`-related components —
  Remove mousewheel hijacking behavior.
- fix: Set `checkOrigin: false` on all `IframeBlock`s

## 0.8.37 — 0.8.39

_2022-05-31_

- fix: Make `Carousel`-related components scroll on mousewheel
- fix: `CarouselStepper` buttons move focus to relevant carousel item

## 0.8.36

_2022-05-25_

- feat: Simplify all `Carousel`-related components to use CSS scroll-snap
- fix: Add `type="button"` to various emitted `<button/>` elements

## 0.8.35

_2022-04-27_

- feat: `ContactBubble` toggling sets `html[data-contact-bubble]` styling flag

## 0.8.33 — 0.8.34

_2022-04-08_

- fix: `utils/makeVerticalTabsTOC` should default to first TabPanel
- fix: Broken import path for `IntersectionObserver` polyfill

## 0.8.31 — 0.8.32

_2022-04-07_

- fix: Stop `utils/makeVerticalTabsTOC` handling content before first headline
- fix: `VerticalTabsTOC` not decoding non-ASCII URL fragments

## 0.8.30

_2022-03-31_

- feat: Add `utils/makeVerticalTabsTOC` helper module
- feat(ts): Export (renamed) type `TabsProps` from `utils/makeTabs` (deprecate
  type `TablistProps`)

## 0.8.29

_2022-03-23_

- feat: Refresh `.FormField`'s empty/filled state classes on "change"
- feat: Add `.setStateClasses()` helper method on `.FormField` elements, for
  manual refreshing for custom input UIs

## 0.8.28

_2022-03-17_

- fix: Add missing number formatting in `SearchResults`

## 0.8.27

_2022-03-01_

- fix: Fix Icelandic number formatting in `SearchResults`

## 0.8.26

_2022-02-15_

- fix: `SiteSearchCurtain` not triggering with Preact

## 0.8.25

_2022-02-08_

- feat: Remove support for never-used `MainMenu__greeting` message
- fix: `ContactBubble` not reacting/appearing on scroll on mobile browsers
- fix: Start `Layout` menu toggling logic with `.is-menu-closed` set

## 0.8.24

_2022-02-01_

- feat: Support `ContactBubble`'s `data-always-show="true"` flag

## 0.8.23

_2022-01-13_

- feat: Add support of `--photo` images to `ArticleCarousel` sprinkle

## 0.8.22

_2021-12-17_

- feat: Improve sorting of `utils/elsearch/renderSiteSearchPage` results

## 0.8.20 – 0.8.21

_2021-12-07_

- feat: Auto-close `ContactBubble` when offing its scroll-based visibility
- fix: Over-eager `ContactBubble` closing callback hi-jacks all mouse clicks

## 0.8.19

_2021-12-02_

- feat: Add sprinkle `IframeBlock` to auto-ajust the iframe height
- fix: Auto detect if <html> or <body> is the page "scroll element"

## 0.8.18

_2021-11-04_

- fix: `FormField` sprinkle failed on multiline text inputs

## 0.8.17

_2021-10-26_

- feat: Add `ContactBubble` sprinkle

## 0.8.16

_2021-10-22_

- feat: Add `ContentArticle` to list of seen-effect components
- fix: `Gallery` sprinkle dropping image alt-texts

## 0.8.13 – 0.8.15

_2021-09-29_

- feat: Make `utils/sitewideAlerts` polite and not completely hijack
  `.Layout__alerts`
- feat: Allow `utils/sitewideAlerts`'s `rootElm` prop to be a CSS selector
- feat: Add `layoutName` prop to `utils/sitewideAlerts`

## 0.8.12

_2021-09-24_

- fix: Add missing `aria-label`s on `SiteSearchAutocomplete`' HTML elements
- fix: Add missing illustration to "phone" media ContactBuble panel
- fix: Update outdated dependency declarations

## 0.8.10 – 0.8.11

_2021-09-22_

- fix: `FormField`s `--filled` status was inverted
- fix: Scroll page to the top when `MainMenu` mega panel opens
- fix: Close `MainMenu` mega panel when leaving "top menu" format

## 0.8.9

_2021-06-11_

- fix: Pretty format `SearchResults`'s `totalHits`
- fix: Build-up of `MainMenu` mega panels when switching between them

## 0.8.8

_2021-06-03_

- feat: Add `WizardLayout` sprinkle
- fix: Sprinkle all `.FormField`s that contain `label.FormField__label`
- fix: Inline `Layout`'s Logo SVG even if skiplink+nav is missing

## 0.8.6 – 0.8.7

_2021-05-26_

- fix: Update elastic query for ElasticSearch 7.1
- fix: `MainMenu` mega panel closing jitter whack-a-mole

## 0.8.5

_2021-05-25_

- fix: Reduce jitter when closing `MainMenu` mega panels
- fix: Improve default I18N strings in `Layout`

## 0.8.4

_2021-05-18_

- fix: Skip over nested seen-effects candidates

## 0.8.3

_2021-05-18_

- feat: Support more "summary" types in `utils/elsearch/renderSiteSearchPage`
- feat: Make `utils/elsearch/renderSiteSearchAutocomplete` search when user
  presses `Enter`
- feat: Support generic attribute `[data-seen-effect]`
- fix: Set `.AccordionList__button`s inital `aria-expanded` value correctly

## 0.8.2

_2021-05-04_

- refactor: sort elastic results by `bundle_weight` and `_score`

## 0.8.1

_2021-04-08_

- fix: Over-eager inlining of `.Layout__header__logo` SVG

## 0.8.0

_2021-04-08_

- `MainMenu` changes:
  - **BREAKING** target: **Hanna 0.8** markup patterns
- feat: update `Layout` to inline SVG logo
- refactor: move SVG inlining logic from `IslandBlock` to util
- fix: correct `img` selector in `IslandBlock`

## 0.7.12

_2020-12-09_

- feat: add `exceptBundles` option for filtering out certain bundles in
  elastic query

## 0.7.11

_2020-11-24_

- feat: Site-wide `Alert`s transition into their initial `open` state
- feat: Stack SeenEffect triggering when multiple elements appear at once
- fix: Ensure SeenEffects capture `BasicTable` and super-tall `TextBlock`s

## 0.7.10

_2020-11-18_

- feat: Add `SeenEffects` sprinkle and `utils/addSeenEffect` helper
- feat: Auto-sprinkle `SeenEffects` during `Hanna` namespace initialization
- feat: Auto-load `IntersectionObserver` polyfill in old browsers
- feat: Add support for `.SearchResultsHighlightItem`
- feat: Add site-search result dates in `.SearchResults`
- fix: Ensure focus styling appears on `SiteSearchInput` fields
- fix: Prevent unwanted "Skip"-link focusing on browser resize

## 0.7.8 – 0.7.9

_2020-11-11_

- feat: Update `MainMenu` to toggle a global `data-mega-panel-active=""` flag
- fix: Ensure `MainMenu__megapanel__backtomenu` is always inserted

## 0.7.7

_2020-11-11_

- feat: Turn all `<table/>`s into `BasicTable` by default
- feat: Add helper `utils/focus-visible`
- feat: Auto-import `focus-visible` polyfill when loading any sprinkles
- fix: Add missing dependencies to package.json
- fix: Broken build of `utils/elsearch/renderSiteSearchPage`

## 0.7.6

_2020-11-05_

- `utils/elsearch/renderSiteSearchPage` changes:
  - feat: Add "Load more" button to `utils/elsearch/renderSiteSearchPage`
  - feat: Make `utils/elsearch/renderSiteSearchPage` searches update the URL
- feat: Add sprinkle `FormField` for basic visual effects
- feat: Order `GalleryItems` left-to-right
- fix: Correct (keyboard) focus-handling in `MainMenu__megapanel` toggling
- fix: Hide `.MainMenu__items--greetingHack` by default

## 0.7.5

_2020-10-28_

- feat: Update `MainMenu`-related sprinkles to match the React components
- feat: Add `utils/sitewideAlerts` helper module
- fix: Add `data-sprinkled` flag to Carousel-driven components

## 0.7.4

_2020-10-22_

- feat: Ignore `.Alert--closable`s with pre-existing `__close` links

## 0.7.3

_2020-10-16_

- feat: Add sprinkle `Alert`
- `utils/makeTabs` changes:
  - feat: Export `setPanelDisplay()` helper from `utils/makeTabs`
  - feat: Make `utils/makeTabs` ensure that `Tabs` CSS is loaded
  - feat: Mark `MakeTabMeta`'s `setPanelDisplay` as deprecated

## 0.7.2

_2020-10-14_

- feat: Add sprinkle `BasicTable`
- feat: Add `utils/elsearch/renderSiteSearchAutocomplete` helper
- feat: Add `utils/elsearch/renderSiteSearchPage` helper
- feat: Add `utils/makeTabs` helper module
- feat: Rewrite the Hanna `<head/>` script block to add
  `window.Hanna.import()` method for utility module loading
- feat: Make `ArticleCarousel` sprinkle pick up `data-color-theme` data
- feat: Make `Tabs` sprinkle pick up `__badge` data

## 0.7.1

_2020-10-07_

- feat: Add sprinkle `Tabs`
- fix: Blur `Layout__header__skiplink` on mouseout
- fix: Set toggle `aria-expanded` on `AccordionList` buttons (not
  `aria-pressed`)
- chore: Optimize/group sprinkle script chunks

## 0.7.0

_2020-09-23_

- **BREAKING** target: **Hanna 0.7** markup patterns
- feat: Add sprinkle: `ArticleCarousel`
- feat: Add sprinkle: `InfoHero` (aliasing the `Bling` sprinkle)

## 0.6.1

_2020-09-23_

- fix: Remove nested `Gallery` elements after sprinkling

## 0.6.0

_2020-09-09_

- **BREAKING** target: **Hanna 0.6** markup patterns
- feat: Add sprinkle `Gallery`

## 0.5.3

_2020-09-04_

- feat: Add sprinkle `NewsHero` (aliasing a `ShareButtons` and `Bling`)
- feat: Support `data-start-open="true"` option on `AccordionList__item`s
- feat: Support `data-bling-type` attribute on `Bling` containers
- feat: Skip sprinkling elements marked as `data-sprinkled` by React or SSR
- fix(sprinkle): Hide `IslandBlock` SVG `<img/>`s while inlining — for less
  jag

## 0.5.2

_2020-08-21_

- feat: Add sprinkle `Bling` - inlining the SVG assets

## 0.5.1

_2020-08-13_

- fix: Broaden reach of IslandBlock's SVG fetching logic to fetch any SVG

## 0.5.0

_2020-08-12_

- **BREAKING** target: **Hanna 0.5** markup patterns
- feat: Add sprinkle `IslandBlock` - inlining "Formheimur" SVG assets

## 0.4.1

_2020-08-12_

- fix: Add missing className to `.Layout__nav__closebutton`

## 0.4.0

_2020-06-19_

- **BREAKING** target: **Hanna 0.4** markup patterns
- feat: Auto blur `MainMenu__link` after closing `__megapanel`

## 0.3.3 – 0.3.4

_2020-06-08_

- fix: Make `MainMenu`'s link—megapanel pairing more robust

## 0.3.2

_2020-06-03_

- feat: Automatically set `--browser-scrollbar-width` on sprinkle load

## 0.3.1

_2020-05-27_

- feat: Update the Hanna head script block example – Add `Hanna.loadModule()`
- feat: Add component `TextBlock`, `BasicTable`

## 0.3.0

_2020-05-21_

- **BREAKING** feat: Rename `Accordion` to `AccordionList`
- feat: Handle `h3.AccordionList__title`
- feat: Auto-detect and initialze new `.AccordionList__item`s

## 0.2.8

_2020-05-14_

- feat: Add sprinkles: `Layout`, `MainMenu`
- feat: Set `data-sprinkled="true"` on sprinkled elements
- fix: Change `before--Layout` class-name to `before-sprinkling`

## 0.2.6 – 0.2.7

_2020-05-06_

- feat: Add sprinkle `Accordion`
- feat: Inital release.
