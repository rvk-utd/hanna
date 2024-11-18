import { MutableRefObject, RefObject, useEffect, useRef } from 'react';

type ClickHandler = (event: globalThis.MouseEvent | globalThis.TouchEvent) => void;

/**
 * A hook that calls a `handler` function when a click event occurs outside of
 * a given `containerRef`.
 *
 * Pass `undefined` or `false` to remove the event listener.
 */
export const useOnClickOutside = (
  containerRef: MutableRefObject<Element> | RefObject<Element>,
  handler: ClickHandler | undefined | false
) => {
  const h = useRef(handler);
  const active = !!handler;
  h.current = handler;
  useEffect(() => {
    if (!active || !containerRef.current) {
      return;
    }
    const listener: ClickHandler = (event) => {
      if (!containerRef.current) {
        return false;
      }
      if (!containerRef.current.contains(event.target as Node)) {
        h.current && h.current(event);
      }
    };
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [active, containerRef]);
};
