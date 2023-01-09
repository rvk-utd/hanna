import React, { FocusEvent, ReactNode, useEffect } from 'react';
import { useLaggedState } from '@hugsmidjan/react/hooks';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { isPreact } from './utils/env';

export type SiteSearchCurtainProps = {
  children: ReactNode;
};

export const SiteSearchCurtain = (props: SiteSearchCurtainProps) => {
  const [focused, setFocused] = useLaggedState(false);

  useEffect(
    () => {
      const closeSearch = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setFocused(false);
        }
      };
      document.addEventListener('keyup', closeSearch);

      return () => document.removeEventListener('keyup', closeSearch);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const focusHandler = () => {
    setFocused(true);
  };
  const blurHandler = (e: FocusEvent) => {
    if (!e.relatedTarget || !e.currentTarget.contains(e.relatedTarget as Node)) {
      setFocused(false, 100);
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
