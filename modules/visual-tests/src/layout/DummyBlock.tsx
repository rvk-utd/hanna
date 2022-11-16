import React, { ReactNode } from 'react';
import { css, hannaVars as vars } from '@reykjavik/hanna-css';
import { EitherObj } from '@reykjavik/hanna-utils';

export type DummyBlockProps = { clear?: false } & EitherObj<
  { big?: true },
  { thin?: true },
  { thick?: true },
  { customHeight?: string }
>;

export const DummyBlock = (props: DummyBlockProps) => {
  const { big, thick, thin, customHeight, clear } = props;
  return (
    <div
      className="DummyBlock"
      style={{
        background: `${vars.color_suld_50}
        linear-gradient(-45deg,
          ${vars.color_suld_75} 12.5%,
          transparent 12.5%,
          transparent 37.5%,
          ${vars.color_suld_75} 37.5%,
          ${vars.color_suld_75} 62.5%,
          transparent 62.5%,
          transparent 87.5%,
          ${vars.color_suld_75} 87.5%
        )`,
        backgroundPosition: '0 0',
        backgroundSize: '32px 32px',
        opacity: 0.5,
        margin: '1px 0',
        height: customHeight
          ? customHeight
          : big
          ? '6.5rem'
          : thick || !thin
          ? '3rem'
          : '1rem',
        clear: clear === false ? undefined : 'both',
      }}
    />
  );
};

export const checkeredBackgroundStyles = () => css`
  background-image: repeating-conic-gradient(
    rgba(0, 0, 0, 0.03) 0% 25%,
    rgba(255, 255, 255, 0.03) 0% 50%
  );
  background-position: 50% 50%;
  background-size: 20px 20px;
`;

export const checkeredBackground = (selector: string) => (
  <style>
    {css`
      ${selector} {
        ${checkeredBackgroundStyles};
      }
    `}
  </style>
);

// ===========================================================================

export const GhostLabel = (props: { label: ReactNode }) => (
  <div
    className="GhostLabel"
    style={{
      position: 'absolute',
      font: `${vars.font_label}`,
      color: `${vars.color_suld_100}`,
    }}
  >
    {props.label}
  </div>
);
