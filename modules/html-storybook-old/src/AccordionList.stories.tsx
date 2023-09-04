import React from 'react';
import { AccordionList } from '@reykjavik/hanna-react/AccordionList';
import { boolean } from '@storybook/addon-knobs';

import { StoryComponent, StoryParameters } from './storytypes.js';

export default {
  title: 'AccordionList',
  // component: AccordionList,
  parameters: {
    knobs: { disabled: false },
    viewport: { defaultViewport: 'responsive' },
  } as StoryParameters,
};

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

export const _AccordionList: StoryComponent = () => {
  const wide = boolean('Full width', false);
  return (
    <AccordionList key={String(wide)} items={items()} wide={wide} defaultOpen={[0]} />
  );
};

export const AccordionListStyling: StoryComponent = () => {
  return (
    <>
      <AccordionList items={items()} />
      <AccordionList items={items()} wide />
    </>
  );
};
