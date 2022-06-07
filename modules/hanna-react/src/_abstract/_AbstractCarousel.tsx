import React, {
  CSSProperties,
  MouseEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import A from '@hugsmidjan/qj/A';
import focusElm from '@hugsmidjan/qj/focusElm';
import throttle from '@hugsmidjan/qj/throttle';
import { SSRSupport, useIsBrowserSide } from '@hugsmidjan/react/hooks';
import { BemProps } from '@hugsmidjan/react/types';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';
import { notNully } from '@reykjavik/hanna-utils';

import CarouselStepper from '../CarouselStepper';
import { SeenProp, useSeenEffect } from '../utils/seenEffect';

// ---------------------------------------------------------------------------
// BEGIN: Scroll capture
//
// Convert vertical mouse-wheel scroll into horizontal scroll.

type CarouselListElm = HTMLDivElement & {
  /**
   * Signals that the element has seen deltaX during the current WheelEvent stream
   *
   * Reset on mouseleave
   */
  $hasXDeltaed?: boolean;
  /**
   * Storage for the timeout that cancels the current "scroll capture" session
   * and resets the element's `style.scrollSnapType`.
   */
  $timeout?: number | ReturnType<typeof setTimeout>;
};

const WHEEL_AMPLIFIER = 3;
const WHEEL_HIJACK_TIMEOUT_MS = 667;

const scrollXBy = (elm: HTMLElement, deltaX: number) => {
  const left = elm.scrollLeft + deltaX;
  elm.scrollTo(left, elm.scrollTop);
  // NOTE 1: using elm.scrollTo({ left, behavior: 'smooth' }); seems to be too much
  // as `behavior: 'smooth'` starts some weird interactions with the browser's
  // `scroll-snap-type` behavior.
  //
  // NOTE 2: Both Chrome and Safari tend to snap hard to the nearest list item
  // while Firefox is more smooth. Haven't found a way around that.
};

const exitWheelHijack = (elm: CarouselListElm) => () => {
  elm.style.scrollSnapType = '';
  const lastElmOffset = elm.lastElementChild
    ? (elm.lastElementChild as HTMLElement).offsetLeft
    : 0;
  // trigger one last scroll event, to make sure the element's
  // `style.scrollSnapType`'s behavior kicks in.
  // Otherwise the list may stay stuck in an over-scrolled state —
  // off to the right.
  scrollXBy(elm, Math.min(0, lastElmOffset - elm.scrollLeft));
};

const handleMouseWheel = (e: WheelEvent) => {
  const elm = e.currentTarget as CarouselListElm;

  if (e.deltaX || elm.$hasXDeltaed) {
    elm.$hasXDeltaed = true;
    exitWheelHijack(elm);
    return;
  }

  if (e.deltaY && !e.deltaX) {
    if (e.deltaY < 0) {
      // Stop scroll-capture when list is at left-edge
      if (elm.scrollLeft < 50) {
        return;
      }
    } else {
      // Stop scroll-capture when list is beyond left edge of last list item
      if (
        elm.scrollLeft >
        (elm.lastElementChild ? (elm.lastElementChild as HTMLElement).offsetLeft : 0)
      ) {
        exitWheelHijack(elm);
        return;
      }
    }

    e.preventDefault();
    e.stopImmediatePropagation();

    // Disable `scroll-snap-style` because otherwise
    // small-scale elm.scrollTo() calls have no effect
    elm.style.scrollSnapType = 'initial';
    scrollXBy(elm, e.deltaY * WHEEL_AMPLIFIER);
    clearTimeout(elm.$timeout as number);
    elm.$timeout = setTimeout(exitWheelHijack(elm), WHEEL_HIJACK_TIMEOUT_MS);
  }
};

const handleMouseLeave = (e: MouseEvent) => {
  const elm = e.currentTarget as CarouselListElm;
  exitWheelHijack(elm);
  elm.$hasXDeltaed = undefined;
};

// END: Scroll capture
// ---------------------------------------------------------------------------

export type CarouselProps<
  I extends Record<string, unknown> = {},
  P extends Record<string, unknown> | undefined = {}
> = {
  className?: string;
  ssr?: SSRSupport;

  /** @deprecated Ingored because never used (Will be removed in v0.11) */
  scrollRight?: boolean;
} & (
  | {
      children?: never;
      items: Array<I>;
      Component: (props: P extends undefined ? I : I & P) => ReactElement | null;
      ComponentProps?: P;
    }
  | {
      children: Array<ReactElement>;
      items?: never;
      Component?: never;
      ComponentProps?: never;
    }
) &
  SeenProp;

type AbstractCarouselProps<
  I extends Record<string, unknown> = {},
  P extends Record<string, unknown> | undefined = {}
> = CarouselProps<I, P> & BemProps & { title?: string };

const AbstractCarousel = <
  I extends Record<string, unknown> = {},
  P extends Record<string, unknown> | undefined = {}
>(
  props: AbstractCarouselProps<I, P>
) => {
  const {
    title,
    items = [],
    Component,
    ComponentProps,
    bem = 'Carousel',
    modifier,
    ssr,
    startSeen,
  } = props;
  const children = props.children && props.children.filter(notNully);

  const [leftOffset, setLeftOffset] = useState<number | undefined>();

  const itemCount = (children || items).length;
  const listRef = useRef<HTMLDivElement>(null);

  const [activeItem, setActiveItem] = useState(0);
  const isBrowser = useIsBrowserSide(ssr);

  // update on activeItem state change
  useEffect(() => {
    const listElm = listRef.current;
    if (!listElm) {
      return;
    }
    const calcLeftOffset = () => {
      setLeftOffset(listElm.parentElement?.getBoundingClientRect().left);
      scrollXBy(listElm, 0);
    };

    const calcActiveItem = throttle(
      () => {
        const { scrollLeft, children } = listElm;
        // using Array#find as forEachUntil
        A(children as unknown as ArrayLike<HTMLElement>).find((item, i) => {
          if (scrollLeft <= item.offsetLeft + item.offsetWidth / 2) {
            setActiveItem(i);
            return true;
          }
        });
      },
      300,
      true
    );

    calcLeftOffset();

    listElm.addEventListener('wheel', handleMouseWheel);
    listElm.addEventListener('scroll', calcActiveItem, { passive: true });
    window.addEventListener('resize', calcLeftOffset, { passive: true });
    return () => {
      listElm.removeEventListener('wheel', handleMouseWheel);
      listElm.removeEventListener('scroll', calcActiveItem);
      window.removeEventListener('resize', calcLeftOffset);
    };
  }, []);

  const scrollToItem = (newActive: number) => {
    setActiveItem(newActive);
    const listElm = listRef.current!;
    const newItem = listElm.children[newActive] as HTMLElement | undefined;

    listElm.scrollTo(newItem ? newItem.offsetLeft : 0, 0);
    setTimeout(() => focusElm(newItem), 500);
  };

  const [outerRef] = useSeenEffect(startSeen);

  if (!itemCount) {
    return null;
  }

  return (
    <div
      className={getBemClass(bem, modifier, props.className)}
      ref={outerRef}
      data-sprinkled={isBrowser}
    >
      {title && <h2 className={bem + '__title'}>{title}</h2>}
      <div
        className={bem + '__itemlist'}
        style={
          leftOffset
            ? ({ '--Carousel--leftOffset': `${leftOffset}px` } as CSSProperties)
            : undefined
        }
        data-scroll-snapping={leftOffset ? 'true' : undefined}
        onMouseLeave={handleMouseLeave}
        ref={listRef}
      >
        {children ||
          items.map((item, i) => (
            // @ts-expect-error  (Can't be arsed...)
            <Component key={i} {...ComponentProps} {...item} />
          ))}
      </div>
      {isBrowser && (
        <CarouselStepper
          itemCount={itemCount}
          setCurrent={scrollToItem}
          current={activeItem}
        />
      )}
    </div>
  );
};

export default AbstractCarousel;
