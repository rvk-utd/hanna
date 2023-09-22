import * as React from 'react';
import domid from '@hugsmidjan/qj/domid';

// @ts-expect-error  (transparently feature-detect useId hook, which is introduced in React@18)
const useId: () => string = React.useId;

/**
 * Returns a stable, unique ID string.
 *
 * Uses useId from React@18 when available, but falls back on a custom id
 * generator. (The custom generator causes angry hydration warnings in dev
 * mode).
 */
export const useDomid = useId
  ? (staticId?: string) => {
      const id = useId();
      return staticId || id;
    }
  : (staticId?: string) => React.useRef(staticId || domid()).current;
