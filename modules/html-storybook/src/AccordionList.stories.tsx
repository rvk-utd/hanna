import React from 'react';
import AccordionList from '@reykjavik/hanna-react/AccordionList';
import { boolean } from '@storybook/addon-knobs';

import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'AccordionList',
  // component: AccordionList,
  parameters: {
    knobs: { disabled: false },
    viewport: { defaultViewport: 'responsive' },
  } as StoryParameters,
};

const items = [
  {
    title:
      'Accordion list with label spreading over 2 lines ' +
      'spreading over 2 lines spreading over 2 lines',
    content: 'Hello this accordion item starts open',
  },
  {
    title: 'Accordion item',
    content:
      'Reri goðaheill renni, söfnum akratungu óvirða hofgarða-refs dyflini. Sigvaldi frekust lögfengið vífi, barðan sveinung ódáðamanninn, firðinum skipkaup sæmdina tjóar kníf geldur ræna ójafnað. Gjósa þiðrandason, þrotin mannafarar styggðist. Kærðu skegg, bárðarsonar sektar mjaðmárdal. Gjörvast húsaviðar útfiri, bænarorð ekið, skalla-grímur auðhnykkjanda askmannsstöðum víkingi bræðrunga gerðinu allmikilli. Dirf vífi hróp, úlfa skyldleikar, hauginn fremi hnútu færir geirþjófsfirði reginmóðs.	Svefnsel sundsins, lamb ryðst meðallok siglt. Kviðling orfið bróklindahaldið, sorti skipbrotsmönnum, eirði flusti rignir lýkst þrotin. Jafnnýtt málstefnuna allhjaldrjúgt, ynnist konungsþræll, þorviðar senn leiru klæðahlaðann gestbeinlega gininn rauðgrani. Hýrmælt þveraðist leikmótsins, bræðrunga mannvandur laxakarl mælist hvalurinn. Kanntu fljúga færist, binda handviðris, svartar keppa hylli hleypir fjölkynngi aldur.',
  },
  { title: 'Accordion items', content: 'Hello content', disabled: true },
];

export const _AccordionList: StoryComponent = () => {
  const wide = boolean('Full width', false);
  return (
    <AccordionList
      key={String(wide)}
      items={items}
      wide={wide}
      defaultOpen={[0]}
      startSeen
    />
  );
};

export const AccordionListStyling: StoryComponent = () => {
  return (
    <>
      <AccordionList items={items} startSeen />
      <AccordionList items={items} wide startSeen />
    </>
  );
};
