// Polyfills!
import 'focus-visible';

// ---------------------------------------------------------------------------
// This is useful for the CSS. Do this once and forget about it.
import getScrollbarWidth from '@hugsmidjan/qj/getScrollbarWidth';
// ---------------------------------------------------------------------------
import qq from '@hugsmidjan/qj/qq'; // needed for most browsers

const lacksIntersectionObserverSuppport =
  typeof window !== 'undefined' &&
  !(
    'IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype &&
    'isIntersecting' in window.IntersectionObserverEntry.prototype
  );

if (lacksIntersectionObserverSuppport) {
  // @ts-expect-error  (polyfill has no d.ts file)
  import('@hugsmidjan/qj/polyfills/IntersectionObserver');
}

// ---------------------------------------------------------------------------

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    Hanna: {
      sprinkles: Record<string, () => void>;
      refresh: () => void;
      makeSprinkle: typeof makeSprinkle;
      import: (...args: Array<string>) => Promise<Array<unknown>>;
      loadSprinkles: (...args: Array<string>) => Promise<Array<unknown>>;
    };
  }
}
getScrollbarWidth.setCSSvar();

// ---------------------------------------------------------------------------

// Defensively initialize the Hanna namespace.
const Hanna = (window.Hanna = window.Hanna || {}); // eslint-disable-line @typescript-eslint/no-unnecessary-condition
Hanna.sprinkles = Hanna.sprinkles || {}; // eslint-disable-line @typescript-eslint/no-unnecessary-condition

Hanna.refresh = () => Object.values(Hanna.sprinkles).forEach((sprinkle) => sprinkle());

type SprinkleMeta<E extends Element, D> = {
  /**
   * Name of your Hanna markup component.
   *
   * (Also used as class-name in a querySelector.)
   */
  name: string;

  /**
   * Custom selector to find the target elements.
   *
   * Default: `'.' + sprinkleName`
   */
  selector?: string;

  /**
   * Name of the data-attribute set on sprinkled elements
   *
   * Default: `sprinkled`
   */
  dataAttr?: string;

  /** Function to initialize the sprinkle effects for each matched element. */
  init: (compElm: E) => D;

  /**
   * Optional unmount function to un-subscribe events, etc.
   *
   * Called for Elements that have been removed from the dom.
   */
  refresh?: (compElm: E, data: D) => void;

  /**
   * Optional unmount function to un-subscribe events, etc.
   *
   * Called for Elements that have been removed from the dom.
   */
  unmount?: (compElm: E, data: D) => void;
};

// ---------------------------------------------------------------------------

const makeSprinkle = <E extends Element, D>(props: SprinkleMeta<E, D>) => {
  const { name, init, refresh, unmount } = props;
  const selector = props.selector || '.' + name;
  const dataAttr = 'data-' + (props.dataAttr || 'sprinkled');
  const sprinkles = window.Hanna.sprinkles;

  let sprinkledElms: Array<{ elm: E; data: D }> = [];

  // Build a function
  const SprinkleFn = () => {
    // Weed out all elements that have been removed from the DOM
    sprinkledElms = sprinkledElms.filter(({ elm, data }) => {
      if (!document.contains(elm)) {
        unmount && unmount(elm, data);
        elm.removeAttribute(dataAttr);
        return false;
      }
      refresh && refresh(elm, data);
      return true;
    });

    const newlySprinkled: typeof sprinkledElms = [];
    qq<E>(selector).forEach((elm) => {
      // Skip over (ignore) elements that are...
      if (
        // ...previously found, inited and placed in `spinkledElms`
        !sprinkledElms.find((item) => item.elm === elm) &&
        // ...aleady "data-spinkled" via some mysterious means (i.e. by React, etc.)
        !elm.hasAttribute(dataAttr)
      ) {
        const data = init(elm);
        // This allows CSS selectors to know then they can apply scripted-only styles
        !elm.hasAttribute(dataAttr) && elm.setAttribute(dataAttr, '');
        newlySprinkled.push({ elm, data });
      }
    });
    sprinkledElms = sprinkledElms.concat(newlySprinkled);
  };

  if (!sprinkles[name]) {
    // Stow SprinkleFn in the global storage to make manual refreshing possible
    sprinkles[name] = SprinkleFn;
    // Run it straight away
    SprinkleFn();
  } else {
    console.warn(`A sprinkle named '${name}' already exists.`);
  }
  return SprinkleFn;
};

Hanna.makeSprinkle = makeSprinkle;

// ---------------------------------------------------------------------------
// Globally sprinkle

Hanna.loadSprinkles && // eslint-disable-line @typescript-eslint/no-unnecessary-condition
  Hanna.loadSprinkles('SeenEffects');
