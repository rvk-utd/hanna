import React from 'react';
import MultiSelect from '@reykjavik/hanna-react/Multiselect';
import MultiSelectCustom from '@reykjavik/hanna-react/MultiselectCustom';
import MultiSelectDownshift from '@reykjavik/hanna-react/MultiSelectDownShift';
import MultiSelectReactSelect from '@reykjavik/hanna-react/MultiSelectReactSelect';
import SubHeading from '@reykjavik/hanna-react/SubHeading';

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

export const _Multiselect: StoryComponent = () => {
  return (
    <>
      <SubHeading startSeen>Multiselect - React select </SubHeading>
      <MultiSelectReactSelect />
      <SubHeading startSeen>Multiselect - Downshift </SubHeading>
      <MultiSelectDownshift options={options} />
      <SubHeading startSeen>Multiselect - Custom </SubHeading>
      <MultiSelectCustom items={options} />
      <SubHeading startSeen>Multiselect - Hanna</SubHeading>
      <MultiSelect items={options} label="Veldu tegund" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};
