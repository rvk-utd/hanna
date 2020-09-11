# Change Log

## Upcoming...

- ... <!-- Add new lines here. -->
- feat: Add component `Gallery`
- feat: Add component `TagPill`
- feat: Add `.TextBlock--labelled` option with left-floating H2 headings
- feat: Change `Tabs` and `ActionCards` to also use theme colors
- feat: Update styling for basic tables, add `.Cell--*` type styles
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
