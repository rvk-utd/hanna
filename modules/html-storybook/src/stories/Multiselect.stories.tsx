import React, { Fragment } from 'react';
import { Multiselect, MultiselectOption } from '@reykjavik/hanna-react/Multiselect';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';
import { FFControlProps, formFieldControls } from '../utils/knobs.js';

type ControlProps = FFControlProps & {
  nowrap: boolean;
  empty: boolean;
  grouped: boolean;
  forceSearchable: boolean;
  forceSummary: boolean;
};

const ffCtrls = formFieldControls({ hideLabel: false });

// ---------------------------------------------------------------------------

const meta: Meta<ControlProps> = {
  title: 'Forms/Multiselect',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
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

const optionsGrouped: Array<MultiselectOption> = [
  { value: 'Vanilla', group: 'Favourites' },
  { value: 'Pistachio', group: 'Favourites' },
  { value: 'Maple Walnut', group: 'Favourites' },
];
optionsGrouped.push(...options.map((value) => ({ value })));

const MultiselectStory = (props: ControlProps) => {
  const { nowrap, empty, grouped, forceSearchable, forceSummary } = props;
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
        nowrap={nowrap}
        {...ffProps}
        label="Veldu tegund"
        name="flavours"
        options={grouped ? optionsGrouped : options}
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
    grouped: { name: 'Grouped items' },
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
    grouped: false,
    forceSearchable: false,
    forceSummary: false,
    ...ffCtrls.args,
  },
};
