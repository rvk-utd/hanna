import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import AccordionList from '@reykjavik/hanna-react/AccordionList';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

const makeItems = () => [
  {
    title:
      'Accordion list with label spreading over 2 lines, ' +
      'spreading over 2 lines, spreading over 2 lines',
    content: 'Hello this accordion item starts open',
  },
  {
    title: 'Accordion item',
    content: (
      <Fragment>
        <p>
          Reri <strong>goðaheill renni</strong>, söfnum <a href="url">akratungu óvirða</a>{' '}
          hofgarða-refs dyflini. Sigvaldi frekust lögfengið vífi, barðan sveinung
          ódáðamanninn, firðinum skipkaup sæmdina tjóar kníf geldur ræna ójafnað. Gjósa
          þiðrandason,
        </p>
        <p>
          askmannsstöðum víkingi bræðrunga gerðinu allmikilli. Dirf vífi hróp, úlfa
          skyldleikar, hauginn fremi hnútu færir geirþjófsfirði reginmóðs. Svefnsel
          sundsins, lamb ryðst meðallok siglt. Kviðling orfið bróklindahaldið, sorti
          skipbrotsmönnum, eirði flusti rignir lýkst þrotin. Jafnnýtt málstefnuna
          allhjaldrjúgt, ynnist konungsþræll, þorviðar senn leiru klæðahlaðann
          gestbeinlega gininn rauðgrani. Hýrmælt þveraðist leikmótsins, bræðrunga
          mannvandur laxakarl mælist hvalurinn. Kanntu fljúga færist, binda handviðris,
          svartar keppa hylli hleypir fjölkynngi aldur.
        </p>
      </Fragment>
    ),
  },
  {
    title: 'Accordion items',
    content: 'Hello content',
    disabled: true,
  },
];

// ---------------------------------------------------------------------------

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    <Minimal>
      <AccordionList items={makeItems()} startSeen />
      <AccordionList items={makeItems()} defaultOpen={[0, 1, 2]} startSeen />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.AccordionList__button >> nth=0',
  extras: async ({ page, localScreenshot }) => {
    const disabledButton = await page.locator('.AccordionList__button[disabled]').first();
    await disabledButton.hover();
    await localScreenshot(
      disabledButton.locator('closest=.AccordionList__item'),
      'disabled-item-hover'
    );
  },
};
