// .storybook/preview.js|ts

const wideScale = 810 / 1400;
const netbookScale = 810 / 1000;

export const customViewports = {
  wide: {
    name: 'Wide desktop',
    styles: {
      width: '1400px',
      height: `${100 / wideScale}%`,
    },
  },
  netbook: {
    name: 'Netbook',
    styles: {
      width: '1000px',
      height: `${100 / netbookScale}%`,
    },
  },
  tablet: {
    name: 'Tablet',
    styles: {
      width: '768px',
      height: '100%',
    },
  },
  phablet: {
    name: 'Phablet',
    styles: {
      width: '550px',
      height: '100%',
    },
  },
  phone: {
    name: 'Phone (375px)',
    styles: {
      width: '375px',
      height: '100%',
    },
  },
  phone_s: {
    name: 'Phone (320px)',
    styles: {
      width: '320px',
      height: '100%',
    },
  },
};
