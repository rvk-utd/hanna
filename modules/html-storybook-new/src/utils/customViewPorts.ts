// https://storybook.js.org/docs/react/essentials/viewport

import { CSSProperties } from 'react';

const wideScale = 810 / 1400;
const netbookScale = 810 / 1000;
const borderWidth = 2;
const styles: CSSProperties = {
  border: borderWidth + 'px solid black',
  margin: '-3px 0 auto 0',
};

type ViewportNames = 'wide' | 'netbook' | 'tablet' | 'phablet' | 'phone' | 'phone_s';
type Viewport = {
  name: string;
  styles: CSSProperties;
};

export const customViewports: Record<ViewportNames, Viewport> = {
  wide: {
    name: 'Wide desktop',
    styles: {
      ...styles,
      width: '1400px',
      height: `${100 / wideScale}%`,
      border: borderWidth / wideScale + 'px solid black',
      transformOrigin: 'center 0',
      transform: 'scale(' + wideScale + ')',
    },
  },
  netbook: {
    name: 'Netbook',
    styles: {
      ...styles,
      width: '1000px',
      height: `${100 / netbookScale}%`,
      border: borderWidth / netbookScale + 'px solid black',
      transformOrigin: 'center 0',
      transform: 'scale(' + netbookScale + ')',
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      ...styles,
      width: '768px',
      height: '100%',
    },
  },
  phablet: {
    name: 'Phablet',
    styles: {
      ...styles,
      width: '550px',
      height: '100%',
    },
  },
  phone: {
    name: 'Phone (375px)',
    styles: {
      ...styles,
      width: '375px',
      height: '100%',
    },
  },
  phone_s: {
    name: 'Phone (320px)',
    styles: {
      ...styles,
      width: '320px',
      height: '100%',
    },
  },
};
