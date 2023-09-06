import React from 'react';
import { AccordionList } from '@reykjavik/hanna-react/AccordionList';
import { Meta, StoryObj } from '@storybook/react';

type ControlProps = {
  fullWidth: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'AccordionList',
  parameters: {
    css: { tokens: 'AccordionList' },
    viewport: { defaultViewport: 'responsive' },
  },
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

export const _AccordionList: StoryObj<ControlProps> = {
  render: (args) => (
    <AccordionList items={items()} wide={args.fullWidth} defaultOpen={[0]} />
  ),
  argTypes: {
    fullWidth: { name: 'Full width' },
  },
  args: {
    fullWidth: false,
  },
};

export const AccordionListStyling: StoryObj<ControlProps> = {
  render: () => (
    <>
      <AccordionList items={items()} />
      <AccordionList items={items()} wide />
    </>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
