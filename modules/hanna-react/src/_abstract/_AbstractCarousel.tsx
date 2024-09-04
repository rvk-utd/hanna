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
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import debounce from '@hugsmidjan/qj/debounce';
import { focusElm } from '@hugsmidjan/qj/focusElm';
import throttle from '@hugsmidjan/qj/throttle';
import { EitherObj, notNully } from '@reykjavik/hanna-utils';

import CarouselStepper from '../CarouselStepper.js';
import { SSRSupportProps, useIsBrowserSide, WrapperElmProps } from '../utils.js';
import { DeprecatedSeenProp } from '../utils/seenEffect.js';
import { BemProps } from '../utils/types.js';

// ---------------------------------------------------------------------------

const scrollXBy = (elm: HTMLElement, deltaX: number) => {
  const left = elm.scrollLeft + deltaX;
  elm.scrollTo(left, elm.scrollTop);
  // NOTE 1: The scroll behavior is left up to the CSS styles.
  //
  // NOTE 2: Both Chrome and Safari tend to snap hard to the nearest list item
  // while Firefox is more smooth. Haven't found a way around that.
  // (`behavior: 'smooth'` starts some weird interactions with the browser's
  // CSS `scroll-snap-type` behavior.)
};

// ---------------------------------------------------------------------------

export type CarouselProps<
  I extends Record<string, unknown> = Record<string, never>,
  P extends Record<string, unknown> | undefined = Record<string, never>
> = {
  className?: string;

  /** @deprecated Ingored because never used (Will be removed in v0.11) */
  scrollRight?: boolean;
} & SSRSupportProps &
  EitherObj<
    {
      items: Array<I>;
      Component: (props: I & P) => ReactElement | null;
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
    },
    {
      /**
       * HTML content that should be dangerously inserted directly into the
       * `__itemlist` element
       */
      childrenHTML: string;
    }
  > &
  WrapperElmProps &
  DeprecatedSeenProp;

type AbstractCarouselProps<
  I extends Record<string, unknown> = Record<string, unknown>,
  P extends Record<string, unknown> | undefined = Record<string, unknown>
> = CarouselProps<I, P> & BemProps & { title?: string };

// eslint-disable-next-line complexity
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
    childrenHTML,
    bem = 'Carousel',
    modifier,
    ssr,
    className,
    wrapperProps,
  } = props;

  const isBrowser = useIsBrowserSide(ssr);

  const children = !props.children
    ? undefined
    : Array.isArray(props.children)
    ? props.children.filter(notNully)
    : [props.children];

  const [leftOffset, setLeftOffset] = useState<number | undefined>();

  const htmlChildrenCount = useMemo(() => {
    if (!childrenHTML?.trim()) {
      return;
    }
    if (!isBrowser) {
      return 1; // Return arbitrary non-zero count to avoid early return below.
      // During SSR (and initial hydration render) we want to render the
      // Carousel component, even though we don't know the exact number of
      // items yet.
    }
    const div = document.createElement('div');
    div.innerHTML = childrenHTML;
    return div.children.length;
  }, [childrenHTML, isBrowser]);

  const itemCount =
    props.itemCount != null
      ? props.itemCount
      : childrenHTML
      ? htmlChildrenCount
      : (children || items).length;
  const listRef = useRef<HTMLDivElement>(null);

  const [activeItem, setActiveItem] = useState(0);

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

  if (!itemCount) {
    return null;
  }

  const itemList = (
    <div
      className={`${bem}__itemlist`}
      style={
        leftOffset
          ? ({ '--Carousel--leftOffset': `${leftOffset}px` } as CSSProperties)
          : undefined
      }
      data-scroll-snapping={leftOffset ? 'true' : undefined}
      ref={listRef}
      dangerouslySetInnerHTML={childrenHTML ? { __html: childrenHTML } : undefined}
    >
      {childrenHTML
        ? undefined
        : children ||
          items.map((item, i) => (
            // @ts-expect-error  (Can't be arsed...)
            <Component key={i} {...ComponentProps} {...item} />
          ))}
    </div>
  );

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        bem,
        modifier,
        // Prefer `className` over `wrapperProps.className`
        className || (wrapperProps || {}).className
      )}
      data-sprinkled={isBrowser}
    >
      {title && <h2 className={`${bem}__title`}>{title}</h2>}

      {isBrowser ? (
        <div className={`${bem}__itemlist-wrapper`}>
          {itemList}
          {activeItem > 0 && (
            <div
              className={`${bem}__itemlist-goLeft`}
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
              className={`${bem}__itemlist-goRight`}
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
