# Hanna JavaScript Sprinkles

The official vanilla JavaScript "sprinkle" effects for server-rendered
components from **Hanna**, Reykjavík's design system.

Just template your HTML output according to the design-system HTML examples
and the "sprinkles" will "Progressively Enhance" your components with scripted
effects.

**Chapters:**

<!-- prettier-ignore-start -->
- [Script loading](#script-loading)
  - [Refreshing effects](#refreshing-effects)
- [Script helpers](#script-helpers)
- [Available Sprinkles](#available-sprinkles)
- [Available Utility Helpers](#available-utility-helpers)

<!-- prettier-ignore-end -->

### Versioning

The **major** version number of this module always matches the Hanna markup
pattern major version that it targets.

## Script loading

For fast, efficient, script loading, add the following code-block, **near the
top** of your page's `<head/>`:

**Note:** To ensure instant execution and smooth CSS performance, the top
`<script/>` block **MUST** be inlined in the HTML.

```html
<script>
  // Suppress Flicker of Unstyled Content Before Scripts
  // (Must be INLINED in `<head/>`)
  ((c, n) => {
    c.add(n);
    setTimeout(() => c.remove(n), 6000);
  })(document.documentElement.classList, 'before-sprinkling');
</script>
<script src="https://styles.reykjavik.is/sprinkles/v0.8" />
```

Now you can call `window.Hanna.loadSprinkles` anywhere in your code to load
the corresponding script effects, like so:

```html
<script>
  window.Hanna.loadSprinkles('MainMenu', 'Accordion' /*, ... */);
</script>
```

### Refreshing effects

All sprinkle effects register as functions under `window.Hanna.sprinkles.*`
and you can call them any time to **safely** re-run their effects. If you have
replaced a Hanna component with a new HTML block, the sprinkle effect will
"unmount"/"remove" all effects off any components that aren't part of the DOM
any longer and sprinkle upp any new components it finds.

However, in order to keep it simple and sane you MUST always add/remove whole
components at a time, and make sure you **don't reuse bits of the old DOM** in
the new compnent.

To refresh ALL sprinkles in one go, call

```js
window.Hanna.refresh();
```

## Script helpers

This library also offers a few utility functions for client-side programmers
that need more control.

Those utilities can be loaded using `window.Hanna.import(...moduleNames)`
function, which returns a Promise that resolves to an Array of the export
values of the imported modules. (See
[dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
for more info.)

Example usage:

```js
widow.Hanna.import(`utils/makeTabs`, `some/otherUtil`).then(function ([
  makeTabsModule,
  otherUtilModule,
]) {
  const makeTabs = makeTabsModule.default;

  const otherUtil = otherUtilModule.default;
  const someNamedExport = otherUtilModule.someNamedExport;

  //... code using the above exported values
});
```

**NOTE:** If you're writing your UI code in React, you should use the
[`@reykjavik/hanna-react`](../hanna-react/) package instead.

## Available Sprinkles

- [`Accordion`](../src/AccordionList.ts) – Insert toggling buttons
- [`Alert`](../src/Alert.ts) – Add close button to `.Alert--closable` elements
- [`ArticleCarousel`](../src/ArticleCarousel.tsx) – Adds `CarouselStepper` UI
  and touch/drag support.
- [`BasicTable`](../src/BasicTable.ts) – Add mobile scroll-state flags to
  `BasicTable`s and un-classed tables inside `TableWrapper---BasicTable`
- [`Bling`](../src/Bling.ts) – Fetches and inlines the correct SVG for the
  specified `data-bling-type`
- [ContactBubble](../src/ContactBubble.tsx) – Sets scroll monitoring and
  bubble toggling
- [`Gallery`](../src/Gallery.tsx) – Adds `CarouselStepper` UI, touch/drag
  support and a full-window Modal.
- [`InfoHero`](../src/InfoHero.ts) – Activates the inlined `Bling`s
- [`IslandBlock`](../src/IslandBlock.ts) – Fetches and inlines the embedded
  SVG images, if needed
- [`Layout`](../src/Layout.ts) – Toggles the mobile menu display, inlines
  logo.
- [`WizardLayout`](../src/WizardLayout.ts) – Inlines logo.
- [`MainMenu`](../src/MainMenu.ts) – Triggers toggling of the "mega" menu
  panels
- [`NewsHero`](../src/NewsHero.ts) – Activates the inlined `Bling`s and
  `ShareButtons`
- [`ShareButtons`](../src/ShareButtons.ts) – Builds social-media sharing
  buttons based on the page's <meta/> data
- [`Tabs`](../src/Tabs.tsx) – Adds dynamic toggling to #anchor-link-driven
  tabs pointing to static tab-panel divs.
- [`FormField`](./src/FormField.ts) - empty-state and focus behavior and fancy
  styling for select boxes

## Available Utility Helpers

- [`utils/makeTabs`](../src/utils/makeTabs.tsx) – Builds a `Tabs` component
  from input props and returns a useful updating API.
- [`utils/sitewideAlerts`](../src/utils/sitewideAlerts.tsx) – Initializes
  "site-wide alerts" on appropriately configured Drupal sites, such as
  www.reykjavik.is.
