import { useMemo } from 'react';
import { useMatches } from '@remix-run/react';

import { ensureStringArray } from './ensure';

/**
 * Builds a list of CSS module tokens from a Remix.run root route's
 * "matches" information.
 *
 * - Automatically includes `-basics` and `Layout``
 * - Uses the PascalCased start of the last segment of a `/test/**` sub-path
 * - Also appends any `cssToken` values returned by a route's `handle` export
 * */
export const useGetCssTokens = () => {
  const matches = useMatches();
  return useMemo(
    () =>
      // always add -bascis and Layout, for convenience
      ['-basics', 'Layout']
        .concat(
          matches
            .flatMap(({ handle, pathname }) => {
              const autoToken = [
                (pathname.match(
                  '' +
                    // path must start with /test/
                    '^/test/' +
                    // ignore any sub-folder segments (greedy match)
                    '(?:.+/)?' +
                    // capture as $1 the PascalCased start of the last path segment
                    '([A-Z][a-zA-Z0-9]+)' +
                    // ignore/tolerate "-" and everything following it
                    '(?:-.+)?' +
                    // Match all the way to the end
                    '$'
                ) || [])[1] || '',
              ];
              const { cssTokens } = handle || {};
              const handleTokens =
                typeof cssTokens === 'string'
                  ? [cssTokens]
                  : ensureStringArray(cssTokens) || [];

              return handleTokens
                .join(',')
                .replace(/\s/g, '')
                .split(',')
                .concat(autoToken);
            })
            .filter((tokens): tokens is string => !!tokens)
            .sort()
            .filter((item, i, arr) => item !== arr[i - 1])
        )
        .join(','),
    [matches]
  );
};
