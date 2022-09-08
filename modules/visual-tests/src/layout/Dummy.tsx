import React from 'react';
import { hannaVars } from '@reykjavik/hanna-css';

export type DummyProps = {
  big?: boolean;
};

export const Dummy = (props: DummyProps) => (
  <div
    className="Dummy"
    style={{
      background: `${hannaVars.color_suld_50} linear-gradient(-45deg,
        ${hannaVars.color_suld_75} 12.5%,
        transparent 12.5%,
        transparent 37.5%,
        ${hannaVars.color_suld_75} 37.5%,
        ${hannaVars.color_suld_75} 62.5%,
        transparent 62.5%,
        transparent 87.5%,
        ${hannaVars.color_suld_75} 87.5%
      )`,
      backgroundSize: '32px 32px',
      opacity: 0.5,
      height: props.big ? '100px' : '50px',
    }}
  />
);
