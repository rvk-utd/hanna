import React from 'react';
import domid from '@hugsmidjan/qj/domid';

// @ts-expect-error  (transparently feature-detect useId hook, which is introduced in React@18)
const useId: undefined | (() => string) = React.useId;

/**
 * Returns a stable, unique ID string.
 *
 * Accepts an optional static ID string, which takes precedence.
 *
 * Uses useId from React (v18+) when available, falling back on a custom
 * unique id generator.
 *
 * (NOTE: The custom generator causes angry hydration warnings in dev
 * mode and there's nothing we can do about it, except to ignore them.)
 */
export const useDomid = useId
  ? (staticId?: string): string => {
      const id = useId();
      return staticId || id;
    }
  : (staticId?: string): string => {
      const idRef = React.useRef<string>();
      if (!idRef.current) {
        idRef.current = staticId || domid();
      }
      return idRef.current;
    };
