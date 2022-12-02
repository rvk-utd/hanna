import React, { FocusEvent, ReactNode, useState } from 'react';
import { useOnMount } from '@hugsmidjan/react/hooks';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { isPreact } from './utils/env';

export type SiteSearchCurtain = {
  children: ReactNode;
};

export const SiteSearchCurtain = (props: SiteSearchCurtain) => {
  const [focused, setFocused] = useState(false);
  let blurTimeout: NodeJS.Timeout | undefined;

  useOnMount(() => {
    const closeSearch = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFocused(false);
      }
    };
    document.addEventListener('keyup', closeSearch);

    return () => {
      document.removeEventListener('keyup', closeSearch);
    };
  });

  const focusHandler = () => {
    blurTimeout && clearTimeout(blurTimeout);
    setFocused(true);
  };
  const blurHandler = (e: FocusEvent) => {
    if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget as Node)) {
      blurTimeout = setTimeout(() => {
        setFocused(false);
        blurTimeout = undefined;
      }, 100);
    }
  };

  return (
    <div
      className={getBemClass('SiteSearchCurtain', [focused && 'focused'])}
      onFocus={focusHandler}
      onBlur={blurHandler}
      // (Sneak this in as Preact does not bubble `FocusEvent`s)
      {...(isPreact && { onfocusin: focusHandler, onfocusout: blurHandler })}
    >
      {props.children}
    </div>
  );
};

export default SiteSearchCurtain;
