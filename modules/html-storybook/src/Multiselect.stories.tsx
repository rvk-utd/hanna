import React, { Fragment } from 'react';
import { Multiselect } from '@reykjavik/hanna-react/Multiselect';
import { boolean } from '@storybook/addon-knobs';

import { HiddenTiger } from './utils/HiddenTiger.js';
import { getFormFieldKnobs } from './utils/knobs.js';
import { StoryComponent, StoryParameters } from './storytypes.js';

// ===========================================================================

export default {
  title: 'Forms/Multiselect',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

const options = [
  'Chocolate',
  'Strawberry',
  'Vanilla',
  'Coffee',
  'Mint Chocolate Chip',
  'Rocky Road',
  'Cookies and Cream',
  'Butter Pecan',
  'Pistachio',
  'Maple Walnut',
  'Caramel',
  'Fudge',
];

export const _Multiselect: StoryComponent = () => {
  const nowrap = boolean('No-wrap', false);
  const ffProps = getFormFieldKnobs({ hideLabel: false });

  const empty = boolean('Empty', true);
  const forceSearchable = boolean('Searchable options', false);

  const values = empty ? [] : nowrap ? options : options.slice(2, 4);

  const key = [nowrap, empty, forceSearchable].join('-') + JSON.stringify(ffProps);

  return (
    <Fragment key={key}>
      <Multiselect
        {...ffProps}
        label="Veldu tegund"
        name="flavours"
        options={options}
        defaultValue={values}
        forceSearchable={forceSearchable}
      />

      <HiddenTiger>
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
      </HiddenTiger>
    </Fragment>
  );
};
