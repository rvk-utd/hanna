import React, { Fragment } from 'react';
import { Multiselect } from '@reykjavik/hanna-react/Multiselect';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';
import { FFControlProps, formFieldControls } from '../utils/knobs.js';
import { StoryParameters } from '../utils/storytypes.js';

type ControlProps = FFControlProps & {
  nowrap: boolean;
  empty: boolean;
  forceSearchable: boolean;
  forceSummary: boolean;
};

const ffCtrls = formFieldControls({ hideLabel: false });

// ---------------------------------------------------------------------------

const meta: Meta<ControlProps> = {
  title: 'Forms/Multiselect',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  } as StoryParameters,
};
export default meta;

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

const MultiselectStory = (props: ControlProps) => {
  const { nowrap, empty, forceSearchable, forceSummary } = props;
  const ffProps = ffCtrls.getProps(props);

  const values = empty ? [] : nowrap ? options : options.slice(2, 4);

  const key = [
    nowrap,
    empty,
    forceSearchable,
    forceSummary,
    JSON.stringify(ffProps),
  ].join('-');

  return (
    <Fragment key={key}>
      <Multiselect
        {...ffProps}
        label="Veldu tegund"
        name="flavours"
        options={options}
        value={values}
        forceSearchable={forceSearchable}
        forceSummary={forceSummary}
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

export const _Multiselect: StoryObj<ControlProps> = {
  render: (args) => <MultiselectStory {...args} />,
  argTypes: {
    nowrap: { name: 'No-wrap' },
    empty: { name: 'Empty' },
    forceSearchable: { name: 'Searchable options' },
    forceSummary: {
      name: 'Summarize selected values',
      if: { arg: 'empty', truthy: false },
    },
    ...ffCtrls.argTypes,
  },
  args: {
    nowrap: false,
    empty: false,
    forceSearchable: false,
    forceSummary: false,
    ...ffCtrls.args,
  },
};
