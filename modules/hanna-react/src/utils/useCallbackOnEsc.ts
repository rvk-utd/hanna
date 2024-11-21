import { useEffect, useRef } from 'react';

/**
 * Performs a callback whenever the user hits the ESC key.
 *
 * Pass `undefined` or `false` to remove the event listener.
 */
export const useCallbackOnEsc = (callback: (() => void) | undefined | false) => {
  const cb = useRef(callback);
  const active = !!callback;
  cb.current = callback;
  useEffect(() => {
    if (!active) {
      return;
    }
    const callbackOnEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cb.current && cb.current();
      }
    };
    document.addEventListener('keydown', callbackOnEsc);
    return () => {
      document.removeEventListener('keydown', callbackOnEsc);
    };
  }, [active]);
};
