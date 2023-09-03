import { Styles, Viewport } from '@storybook/addon-viewport/dist/models';

const wideScale = 810 / 1400;
const netbookScale = 810 / 1000;
const borderWidth = 2;
const styles = {
  border: borderWidth + 'px solid black',
  margin: '-3px 0 auto 0',
};

type _ViewportNames = 'wide' | 'netbook' | 'tablet' | 'phablet' | 'phone' | 'phone_s';

export type ViewportOptions = _ViewportNames | 'responsive';

export const viewports: Record<_ViewportNames, Viewport> = {
  wide: {
    name: 'Wide desktop',
    styles: {
      ...styles,
      width: '1400px',
      height: 100 / wideScale + '%',
      border: borderWidth / wideScale + 'px solid black',
      transformOrigin: 'center 0',
      transform: 'scale(' + wideScale + ')',
    } as Styles,
    type: 'desktop',
  },
  netbook: {
    name: 'Netbook',
    styles: {
      ...styles,
      width: '1000px',
      height: 100 / netbookScale + '%',
      border: borderWidth / netbookScale + 'px solid black',
      transformOrigin: 'center 0',
      transform: 'scale(' + netbookScale + ')',
    } as Styles,
    type: 'desktop',
  },
  tablet: {
    name: 'Tablet',
    styles: {
      ...styles,
      width: '768px',
      height: '100%',
    } as Styles,
    type: 'tablet',
  },
  phablet: {
    name: 'Phablet',
    styles: {
      ...styles,
      width: '550px',
      height: '100%',
    } as Styles,
    type: 'tablet',
  },
  phone: {
    name: 'Phone (375px)',
    styles: {
      ...styles,
      width: '375px',
      height: '100%',
    } as Styles,
    type: 'mobile',
  },
  phone_s: {
    name: 'Phone (320px)',
    styles: {
      ...styles,
      width: '320px',
      height: '100%',
    } as Styles,
    type: 'mobile',
  },
};
