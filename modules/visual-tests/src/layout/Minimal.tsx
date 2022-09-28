import type { ReactNode } from 'react';
import React from 'react';
import { useScrollbarWidthCSSVar } from '@reykjavik/hanna-react/utils';

import { DummyBlock } from './DummyBlock';

const roles = {
  main: 'main',
  nav: 'navigation',
  footer: 'complementary',
};

export type MinimalProps = {
  slot?: 'main' | 'nav' | 'footer';
  bare?: boolean;
  children: ReactNode;
};

/**
 * Minimal, no-frills, no-chrome, pseudo-replacement for the `Layout` component,
 * for use by visual testing pages.
 */
export const Minimal = (props: MinimalProps) => {
  useScrollbarWidthCSSVar();
  const bare = props.bare;
  const slot = props.slot || 'main';
  return (
    <div className="Layout">
      <div
        className={'Layout__' + slot}
        role={roles[slot]}
        style={{ paddingBlock: '1rem', minHeight: 0 }}
      >
        {!bare && <DummyBlock thin />}
        {props.children}
        {!bare && <DummyBlock thin />}
      </div>
    </div>
  );
};

Minimal.cssTokens = 'Layout';
