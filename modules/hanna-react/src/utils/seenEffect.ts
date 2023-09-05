import { RefObject, useEffect, useRef, useState } from 'react';

export const DATA_ATTR_NAME = 'is-seen' as const;
const STACKING_DELAY = 200; // ms

const dataAttr = 'data-' + DATA_ATTR_NAME;

const inTargetSourceOrder = (
  a: IntersectionObserverEntry,
  b: IntersectionObserverEntry
) =>
  a.target.compareDocumentPosition(b.target) & Node.DOCUMENT_POSITION_PRECEDING ? 1 : -1;

const options = {
  // root: window
  rootMargin: '-100px 0px 0px 0px', // '0px'
  threshold: 0, // 0
};

let observer: IntersectionObserver;
export const getObserver = (target: Element, callback?: (target: Element) => void) => {
  if (target.hasAttribute(dataAttr)) {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!observer) {
    observer = new IntersectionObserver(
      (entries, observer) =>
        entries
          .filter((e) => e.isIntersecting)
          .sort(inTargetSourceOrder)
          .forEach(({ target }, i) => {
            setTimeout(() => {
              target.setAttribute(dataAttr, 'true');
              callback && callback(target);
              observer.unobserve(target);
            }, STACKING_DELAY * i);
          }),
      options
    );
  }
  if (target.matches('[' + dataAttr + '] *')) {
    // opt out if target is contained by another "seen-effect" element
    target.setAttribute(dataAttr, '');
    return;
  }
  target.setAttribute(dataAttr, 'false');
  observer.observe(target);

  // return teardown/unmount effect
  return () => observer.unobserve(target);
};

getObserver.DATA_ATTR_NAME = DATA_ATTR_NAME;

// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------

const effects = {
  /** The default effect type */
  fadeup: 1,
  fadein: 1,
  fadeleft: 1,
  custom: 1,
} as const;
export type SeenEffectType = keyof typeof effects;

export type EffectProp = {
  /** Should the component appear instantly, and not transition-in once seen */
  effectType?: SeenEffectType | 'none';
};

/** Asserts that a prop value is a SeenEffectType and returns undefined otherwise */
export const ensureEffectType = (maybeType?: string): SeenEffectType | undefined =>
  maybeType && maybeType in effects ? (maybeType as SeenEffectType) : undefined;

export const getEffectAttr = (maybeType?: string) => ({
  'data-seen-effect':
    maybeType === 'none' ? undefined : ensureEffectType(maybeType) || '',
});

// ---------------------------------------------------------------------------

/**
 * Use this prop type on components that were previously automatically
 * setting seen-effect on themselves.
 */
export type DeprecatedSeenProp = {
  /** @deprecated  This prop does nothing nowadays (Will be removed in v0.11) */
  startSeen?: boolean;
};

export type SeenProp = {
  /** Should the component appear instantly, and not transition-in once seen */
  startSeen?: boolean;
};

export const useSeenEffect = <E extends Element = HTMLDivElement>(
  /** Should the component appear instantly, and not transition-in once seen */
  startSeen?: boolean,
  /** Bring Your Own RefObject */
  customRef?: RefObject<E>
): [
  // elementRef: RefObject<E>,
  // isSeen: true | undefined
  /* Storybook's Typescript compiler can't handle labelled tuples ATM :-(
		Prolly something to do with https://www.npmjs.com/package/fork-ts-checker-webpack-plugin
	*/
  RefObject<E> | undefined,
  true | undefined
] => {
  const _startSeen = startSeen || undefined; // normalize
  const [isSeen, setSeen] = useState(_startSeen);

  const localRef = useRef<E>(null);
  const ref = customRef || localRef;
  useEffect(() => {
    setSeen(_startSeen);
    const refElm = ref.current;
    if (refElm) {
      if (_startSeen) {
        refElm.setAttribute(dataAttr, '');
      } else {
        refElm.removeAttribute(dataAttr);
        return getObserver(refElm, () => setSeen(true));
      }
    }
  }, [_startSeen, ref]);

  return [ref, isSeen];
};
