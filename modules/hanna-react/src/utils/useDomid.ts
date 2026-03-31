import React from 'react';
import { dumbId } from '@reykjavik/hanna-utils';

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
        idRef.current = staticId || dumbId();
      }
      return idRef.current;
    };

/** @deprecated Use `import { dumbId } from '@reykjavik/hanna-utils'` instead  (Will be removed in v0.3) */
export const domid = dumbId;
