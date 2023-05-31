import React, {
  CSSProperties,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import A from '@hugsmidjan/qj/A';
import debounce from '@hugsmidjan/qj/debounce';
import { focusElm } from '@hugsmidjan/qj/focusElm';
import throttle from '@hugsmidjan/qj/throttle';
import { BemProps } from '@hugsmidjan/react/types';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';
import { EitherObj, notNully } from '@reykjavik/hanna-utils';

import CarouselStepper from '../CarouselStepper.js';
import { SSRSupport, useIsBrowserSide } from '../utils.js';
import { SeenProp, useSeenEffect } from '../utils/seenEffect.js';

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

export type CarouselProps<
  I extends Record<string, unknown> = {},
  P extends Record<string, unknown> | undefined = {}
> = {
  className?: string;
  ssr?: SSRSupport;

  /** @deprecated Ingored because never used (Will be removed in v0.11) */
  scrollRight?: boolean;
} & EitherObj<
  {
    items: Array<I>;
    Component: (props: P extends undefined ? I : I & P) => ReactElement | null;
    ComponentProps?: P;
  },
  {
    children: ReactNode;
    /**
     * Explicit number of items contained by the `children` prop
     *
     * Use this when your returned child elements are wrapped in a
     * `<Fragment />` or some such.
     */
    itemCount?: number;
  }
> &
  SeenProp;

type AbstractCarouselProps<
  I extends Record<string, unknown> = Record<string, unknown>,
  P extends Record<string, unknown> | undefined = Record<string, unknown>
> = CarouselProps<I, P> & BemProps & { title?: string };

export const AbstractCarousel = <
  I extends Record<string, unknown> = Record<string, unknown>,
  P extends Record<string, unknown> | undefined = Record<string, unknown>
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

  const children = !props.children
    ? undefined
    : Array.isArray(props.children)
    ? props.children.filter(notNully)
    : [props.children];

  const [leftOffset, setLeftOffset] = useState<number | undefined>();

  const itemCount = props.itemCount || (children || items).length;
  const listRef = useRef<HTMLDivElement>(null);

  const [activeItem, setActiveItem] = useState(0);
  const isBrowser = useIsBrowserSide(ssr);

  // Since listElm gets unmounted and remounted based on isBrowser, we
  // wait for isBrowser is true before setting scroll and resize events.
  const listElm = isBrowser && listRef.current;
  useEffect(() => {
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

    listElm.addEventListener('scroll', calcActiveItem, { passive: true });
    window.addEventListener('resize', calcLeftOffset, { passive: true });
    return () => {
      listElm.removeEventListener('scroll', calcActiveItem);
      window.removeEventListener('resize', calcLeftOffset);
    };
  }, [listElm]);

  const scrollToItem = (newActive: number) => {
    const listElm = listRef.current!;
    const newItem = listElm.children[newActive] as HTMLElement | undefined;
    if (!newItem) {
      return;
    }
    setActiveItem(newActive);
    listElm.scrollLeft = newItem.offsetLeft || 1;
    setTimeout(() => focusElm(newItem), 500);
  };

  const { delayedScrollLeft, delayedScrollRight } = useMemo(() => {
    const delayedScrollLeft = debounce((currentActive: number) => {
      scrollToItem(currentActive - 1);
      setTimeout(() => delayedScrollLeft(currentActive - 1), 0);
    }, 1000);
    const delayedScrollRight = debounce((currentActive: number) => {
      scrollToItem(currentActive + 1);
      setTimeout(() => delayedScrollRight(currentActive + 1), 0);
    }, 1000);
    return { delayedScrollLeft, delayedScrollRight };
  }, []);

  const [outerRef] = useSeenEffect(startSeen);

  if (!itemCount) {
    return null;
  }

  const itemList = (
    <div
      className={bem + '__itemlist'}
      style={
        leftOffset
          ? ({ '--Carousel--leftOffset': `${leftOffset}px` } as CSSProperties)
          : undefined
      }
      data-scroll-snapping={leftOffset ? 'true' : undefined}
      ref={listRef}
    >
      {children ||
        items.map((item, i) => (
          // @ts-expect-error  (Can't be arsed...)
          <Component key={i} {...ComponentProps} {...item} />
        ))}
    </div>
  );

  return (
    <div
      className={getBemClass(bem, modifier, props.className)}
      ref={outerRef}
      data-sprinkled={isBrowser}
    >
      {title && <h2 className={bem + '__title'}>{title}</h2>}

      {isBrowser ? (
        <div className={bem + '__itemlist-wrapper'}>
          {itemList}
          {activeItem > 0 && (
            <div
              className={bem + '__itemlist-goLeft'}
              onClick={() => {
                delayedScrollLeft.cancel();
                scrollToItem(activeItem - 1);
              }}
              onMouseOver={() => delayedScrollLeft(activeItem)}
              onMouseOut={() => delayedScrollLeft.cancel()}
            />
          )}
          {activeItem < itemCount - 1 && (
            <div
              className={bem + '__itemlist-goRight'}
              onClick={() => {
                delayedScrollRight.cancel();
                scrollToItem(activeItem + 1);
              }}
              onMouseOver={() => delayedScrollRight(activeItem)}
              onMouseOut={() => delayedScrollRight.cancel()}
            />
          )}
        </div>
      ) : (
        itemList
      )}

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
