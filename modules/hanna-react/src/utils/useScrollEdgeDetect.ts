import { LegacyRef, MutableRefObject, RefObject, useEffect, useState } from 'react';
import throttle from '@hugsmidjan/qj/throttle';

type ScrollAxis = 'horizontal' | 'vertical';
type AtState = {
  start: boolean;
  end: boolean;
};
export type ScrollEdgeDetectOptions<RefElm extends HTMLElement = HTMLElement> = {
  axis: ScrollAxis;
  /** **NOTE:** Make sure this function is stable to avoid unnecessary re-runs */
  getElm?: (elm: RefElm | null | undefined) => HTMLElement | undefined | null | false;
  /** Initial `at` status */
  startAt?: AtState;
};

const tolerance = 8; // px
const throttleMs = 100;

export const useScrollEdgeDetect = <RefElm extends HTMLElement = HTMLElement>(
  options: ScrollAxis | ScrollEdgeDetectOptions<RefElm>,
  scrollerRef?: RefObject<RefElm>
): [scrollElmRef: LegacyRef<RefElm>, at: AtState] => {
  const opts: ScrollEdgeDetectOptions<RefElm> =
    typeof options === 'string' ? { axis: options } : options;
  const [at, setAt] = useState(opts.startAt || { start: true, end: true });

  const [scrollerRefElm, _setScrollerRefElm] = useState<RefElm | null>(null);
  const setScrollerRefElm: LegacyRef<RefElm> = (elm) => {
    if (scrollerRef && elm) {
      (scrollerRef as MutableRefObject<RefElm>).current = elm;
    }
    _setScrollerRefElm(elm);
  };

  const { getElm, axis } = opts;
  useEffect(() => {
    const scrollerElm =
      scrollerRefElm && getElm ? getElm(scrollerRefElm) : scrollerRefElm;
    if (!(scrollerElm instanceof HTMLElement)) {
      return;
    }
    const checkScroll = throttle(() => {
      setAt((at) => {
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
          return at;
        }
        return { start, end };
      });
    }, throttleMs);

    scrollerElm.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    checkScroll();

    return () => {
      scrollerElm.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [scrollerRefElm, getElm, axis]);

  return [setScrollerRefElm, at];
};
