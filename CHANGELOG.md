# Change Log

## Upcoming...

- ... <!-- Add new lines here. -->
- fix: Pass through mouse-clicks on labels overlapping `FormField`s

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
