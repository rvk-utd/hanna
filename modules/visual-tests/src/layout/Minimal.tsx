import type { ReactNode } from 'react';
import React from 'react';

export type MinimalProps = {
  children: ReactNode;
};

/**
 * Minimal, no-frills, no-chrome, "__main"-only replacement for the `Layout` component,
 * for use by visual testing pages.
 */
export const Minimal = (props: MinimalProps) => {
  return (
    <div className="Layout">
      <div className="Layout__main" role="main">
        {props.children}
      </div>
    </div>
  );
};

Minimal.cssTokens = 'Layout';
