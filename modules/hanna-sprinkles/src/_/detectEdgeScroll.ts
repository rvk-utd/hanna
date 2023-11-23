import throttle from '@hugsmidjan/qj/throttle';

type AtState = {
  start: boolean;
  end: boolean;
};

export type DetectEdgeScrollOptions = {
  /**
   * Default: `"vertical"`
   */
  axis?: 'horizontal' | 'vertical';
  /**
   * Element to monitor the scrolling status of
   */
  scrollerElm: HTMLElement;
  /**
   * Element that receives the classNames
   *
   * Default: `options.scrollerElm`
   */
  classedElm?: HTMLElement;
  /**
   * BEM prefix for the `--at`, `--at--start` and `--at--end` class-names
   *
   * Default:  `""`
   */
  bem?: string;
} & (
  | {
      /**
       * Set to false if you're passing your own `onChange handler
       * and wish to opt out of the default automatic class-name toggling
       *
       * Default: `true`
       */
      setClasses?: boolean;
      /**
       * Custom function that gets called when the AtState changes.
       */
      onChange: (newAt: AtState) => void;
    }
  | {
      onChange?: undefined;
      /** @deprecated (Will be removed in v0.11)
       *
       * This props is redundant when `onChange`, as its only possible value is `true`.
       */
      setClasses?: true;
    }
);
type Actions = {
  checkScroll: () => void;
  unmount: () => void;
};

const tolerance = 5; // px
const throttleMs = 100;

export const detectEdgeScroll = (opts: DetectEdgeScrollOptions): Actions => {
  const {
    axis,
    scrollerElm,
    classedElm,
    bem,
    onChange,
    setClasses = true, // eslint-disable-line deprecation/deprecation
  } = opts;

  let at = { start: true, end: true };
  const bemAt = bem ? bem + '--at' : 'at';

  const doClasses = !onChange || setClasses;

  const toggleClassNames = (at: AtState) => {
    const elmClasses = (classedElm || scrollerElm).classList;
    elmClasses[at.start ? 'add' : 'remove'](bemAt + '--start');
    elmClasses[at.end ? 'add' : 'remove'](bemAt + '--end');
  };

  const setAt = !onChange
    ? toggleClassNames
    : setClasses // only consider `setClasses` if onChange is defined
    ? (at: AtState) => {
        onChange(at);
        toggleClassNames(at);
      }
    : onChange;

  const checkScroll = throttle(() => {
    let scroll, offsetSize, totalSize;
    if (axis === 'horizontal') {
      scroll = scrollerElm.scrollLeft;
      offsetSize = scrollerElm.offsetWidth;
      totalSize = scrollerElm.scrollWidth;
    } else {
      scroll = scrollerElm.scrollTop;
      offsetSize = scrollerElm.offsetHeight;
      totalSize = scrollerElm.scrollHeight;
    }

    const start = scroll < tolerance;
    const end = totalSize - (offsetSize + scroll) < tolerance;
    if (at.start === start && at.end === end) {
      return;
    }
    at = { start, end };
    setAt(at);
  }, throttleMs);

  checkScroll();
  if (doClasses) {
    (classedElm || scrollerElm).classList.add(bemAt);
    toggleClassNames(at);
  }
  scrollerElm.addEventListener('scroll', checkScroll);
  window.addEventListener('resize', checkScroll);

  return {
    checkScroll,
    unmount: () => {
      if (doClasses) {
        toggleClassNames({ start: false, end: false });
        (classedElm || scrollerElm).classList.remove(bemAt);
      }
      scrollerElm.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    },
  };
};
