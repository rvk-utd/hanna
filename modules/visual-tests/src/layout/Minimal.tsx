import type { ReactNode } from 'react';
import React from 'react';
import { useScrollbarWidthCSSVar } from '@reykjavik/hanna-react/utils/useScrollbarWidthCSSVar';

const roles = {
  main: 'main',
  nav: 'navigation',
  footer: 'complementary',
};

export type MinimalProps = {
  slot?: 'main' | 'nav' | 'footer';
  children: ReactNode;
};

/**
 * Minimal, no-frills, no-chrome, pseudo-replacement for the `Layout` component,
 * for use by visual testing pages.
 */
export const Minimal = (props: MinimalProps) => {
  useScrollbarWidthCSSVar();
  const slot = props.slot || 'main';
  return (
    <div className="Layout">
      <div className={'Layout__' + slot} role={roles[slot]}>
        {props.children}
      </div>
    </div>
  );
};

Minimal.cssTokens = 'Layout';
