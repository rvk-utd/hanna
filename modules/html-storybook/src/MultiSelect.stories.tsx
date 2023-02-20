import React from 'react';
import MultiSelect from '@reykjavik/hanna-react/Multiselect';
import MultiSelectDownshift from '@reykjavik/hanna-react/MultiSelectDownShift';
import MultiSelectReactSelect from '@reykjavik/hanna-react/MultiSelectReactSelect';

import { StoryComponent, StoryParameters } from './storytypes';

// ===========================================================================

export default {
  title: 'Multiselect',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'coffee', label: 'Coffee' },
  { value: 'mint-chocolate-chip', label: 'Mint Chocolate Chip' },
  { value: 'rocky-road', label: 'Rocky Road' },
  { value: 'cookies-and-cream', label: 'Cookies and Cream' },
  { value: 'butter-pecan', label: 'Butter Pecan' },
  { value: 'pistachio', label: 'Pistachio' },
  { value: 'maple-walnut', label: 'Maple Walnut' },
  { value: 'caramel', label: 'Caramel' },
  { value: 'fudge', label: 'Fudge' },
];

const customOptions = [
  { value: 'chocolate', label: 'Chocolate', group: 'vegan' },
  { value: 'strawberry', label: 'Strawberry', group: 'vegan' },
  { value: 'vanilla', label: 'Vanilla', group: 'keto' },
  { value: 'coffee', label: 'Coffee', group: 'keto' },
  { value: 'mint-chocolate-chip', label: 'Mint Chocolate Chip', group: 'keto' },
  { value: 'rocky-road', label: 'Rocky Road', group: 'keto' },
  { value: 'cookies-and-cream', label: 'Cookies and Cream', group: 'protein' },
  { value: 'butter-pecan', label: 'Butter Pecan', group: 'protein' },
  { value: 'pistachio', label: 'Pistachio', group: 'protein' },
  { value: 'maple-walnut', label: 'Maple Walnut', group: 'vegan' },
  { value: 'caramel', label: 'Caramel', group: 'keto' },
  { value: 'fudge', label: 'Fudge', group: 'protein' },
];

export const _Multiselect: StoryComponent = () => {
  return (
    <>
      <MultiSelectReactSelect /> <MultiSelectDownshift options={options} />{' '}
      <MultiSelect items={customOptions} />
    </>
  );
};
