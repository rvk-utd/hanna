import { useMatches } from '@remix-run/react';

export const useParentLoaderData = <Data>(): Data | undefined => {
  const matches = useMatches();
  const idx = matches.length - 2;
  return (matches[idx] || {}).data as Data | undefined;
};
