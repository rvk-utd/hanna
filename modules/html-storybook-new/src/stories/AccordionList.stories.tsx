import React from 'react';
import { AccordionList } from '@reykjavik/hanna-react/AccordionList';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

type ControlsProps = {
  fullWidth: boolean;
};
type AccordionListStory = StoryObj<ControlsProps>;
type AccordionListStylingStory = StoryObj;

const meta: Meta<ControlsProps> = {
  title: 'AccordionList',
  parameters: {
    knobs: { disabled: false },
    viewport: { defaultViewport: 'responsive' },
  } as StoryParameters,
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

const AccordionListStory = ({ fullWidth }: ControlsProps) => {
  const wide = fullWidth;
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

export const _AccordionList: AccordionListStory = {
  render: (args: ControlsProps) => <AccordionListStory {...args} />,
  argTypes: {
    fullWidth: {
      control: 'boolean',
      name: 'Full width',
    },
  },
  args: {
    fullWidth: false,
  },
};

export const AccordionListStyling: AccordionListStylingStory = {
  render: () => (
    <>
      <AccordionList items={items()} startSeen />
      <AccordionList items={items()} wide startSeen />
    </>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
    css: {
      tokens: 'AccordionList',
    },
  } as StoryParameters,
};
