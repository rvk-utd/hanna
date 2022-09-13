import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import InfoBlock from '@reykjavik/hanna-react/InfoBlock';

import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const textItems = [
  'Umsækjandi sé lóðarhafi, húseigandi eða hönnunarstjóri í umboði hans.',
  'Hönnuður hafi löggildingu, viðurkennt gæðakerfi og fullnægjandi starfsábyrgðartryggingu.',
  'Stöðluðu eyðublaði Byggingarfulltrúa Reykjavíkurborgar og gátlista vegna aðaluppdráttar séu rétt útfyllt.',
  'Öllum fylgiskjölum sé skilað inn; aðaluppdrættir, útfylltur gátlisti vegna aðaluppdrátta og önnur viðeigandi fylgiskjöl varðandi umsókn sbr. lið 6 á umsóknareyðublaði sem eiga við framkvæmdina.',
  'Lágmarkgjald vegna umsóknar sé greitt fyrir fund Byggingarfulltrúa.',
];
export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <InfoBlock
        title={lorem.tiny}
        subtitle={lorem.short}
        items={textItems}
        attention={lorem.medium}
        startSeen
      />
      <InfoBlock
        title={lorem.tiny}
        subtitle={lorem.short}
        items={textItems}
        extraInfo={lorem.medium}
        startSeen
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {};
