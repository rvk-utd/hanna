import React from 'react';
import { AccordionList, AccordionListProps } from '@reykjavik/hanna-react/AccordionList';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { disableControlProps } from '../utils/disableControlTypes.js';

type AccordionListControlsProps = {
  fullWidth: boolean;
};
type AccordionListStoryProps = AccordionListControlsProps & AccordionListProps;
type Story = StoryObj<AccordionListStoryProps>;

const meta: Meta<AccordionListStoryProps> = {
  title: 'AccordionList',
  component: AccordionList,
};

export default meta;

const items = () => [
  {
    title:
      'Accordion list with label spreading over 2 lines ' +
      'spreading over 2 lines spreading over 2 lines',
    content: 'Hello this accordion item starts open',
  },
  {
    title: 'Accordion item',
    content: (
      <>
        <p>
          Reri goðaheill renni, <a href="">söfnum akratungu óvirða</a> hofgarða-refs
          dyflini. Sigvaldi frekust lögfengið vífi, barðan sveinung ódáðamanninn,{' '}
          <strong>firðinum skipkaup</strong> sæmdina tjóar kníf geldur ræna ójafnað. Gjósa
          þiðrandason, þrotin mannafarar styggðist.
        </p>
        <p>
          Kærðu skegg, bárðarsonar sektar mjaðmárdal. Gjörvast húsaviðar útfiri, bænarorð
          ekið, skalla-grímur auðhnykkjanda askmannsstöðum víkingi bræðrunga gerðinu
          allmikilli.
        </p>
        <ul>
          <li>Dirf vífi hróp, úlfa skyldleikar, hauginn fremi hnútu færir.</li>
          <li>
            geirþjófsfirði reginmóðs. Svefnsel sundsins, lamb ryðst meðallok siglt.
            Kviðling orfið bróklindahaldið, sorti skipbrotsmönnum, eirði flusti rignir
            lýkst þrotin.
          </li>
        </ul>
      </>
    ),
  },
  { title: 'Accordion items', content: 'Hello content', disabled: true },
];

const AccordionListStory = () => {
  const wide = boolean('Full width', false);
  return (
    <AccordionList
      key={String(wide)}
      items={items()}
      wide={wide}
      defaultOpen={[0]}
      startSeen
    />
  );
};

const disabledControlProps = disableControlProps([
  'items',
  'open',
  'onToggle',
  'defaultOpen',
  'wide',
  'ssr',
  'startSeen',
]);

export const _AccordionList: Story = {
  render: () => <AccordionListStory />,
  argTypes: {
    fullWidth: {
      control: 'boolean',
      name: 'Full width',
    },
    ...disabledControlProps,
  },
  args: {
    fullWidth: false,
  },
};

export const AccordionListStyling: Story = {
  render: () => (
    <>
      <AccordionList items={items()} startSeen />
      <AccordionList items={items()} wide startSeen />
    </>
  ),
  argTypes: {
    ...disabledControlProps,
  },
  parameters: {
    css: {
      tokens: 'AccordionList',
    },
  },
};
