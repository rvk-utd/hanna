import React from 'react';
import { InfoBlock } from '@reykjavik/hanna-react/InfoBlock';
import { optionsKnob } from '@storybook/addon-knobs';

import { StoryComponent, StoryParameters } from './storytypes.js';

export default {
  title: 'InfoBlock',
  component: InfoBlock,
  parameters: {
    knobs: { disabled: false },
  } as StoryParameters,
};

const TITLE_TEXT = 'Info block title';
const SUBTEXT_TEXT = 'Info block subtitle, lorem ipsum dolor sit ament foobar.';
const ATTENTION_TEXT =
  'Athugið að það er hlutverk hönnunarstjóra að tryggja að öll gögn berist embætti byggingarfulltrúa sem og að óska eftir áframhaldandi afgreiðslu málsins þegar gögnin og greiðslan hafa borist. Þá getur formlegt byggingarleyfi verið gefið út og einungis þá getur framkvæmdin hafist. ';
const EXTRAINFO_TEXT =
  'Eyðublaði og fylgigögnum er skilað til þjónustufulltrúa í þjónustuveri (Borgartúni 12-14), sem framsendir gögn til embættis byggingarfulltrúa.';

const ITEMS = [
  'Umsækjandi sé lóðarhafi, húseigandi eða hönnunarstjóri í umboði hans.',
  'Hönnuður hafi löggildingu, viðurkennt gæðakerfi og fullnægjandi starfsábyrgðartryggingu.',
  'Stöðluðu eyðublaði Byggingarfulltrúa Reykjavíkurborgar og gátlista vegna aðaluppdráttar séu rétt útfyllt.',
  'Öllum fylgiskjölum sé skilað inn; aðaluppdrættir, útfylltur gátlisti vegna aðaluppdrátta og önnur viðeigandi fylgiskjöl varðandi umsókn sbr. lið 6 á umsóknareyðublaði sem eiga við framkvæmdina.',
  'Lágmarkgjald vegna umsóknar sé greitt fyrir fund Byggingarfulltrúa.',
];

const getExtraProps = () => {
  const prop = optionsKnob(
    'With attention/extralinks ',
    { Neither: '', Attention: 'attention', 'Extra info': 'extraInfo' },
    '',
    { display: 'inline-radio' }
  );
  return prop === 'extraInfo'
    ? { extraInfo: EXTRAINFO_TEXT }
    : prop === 'attention'
    ? { attention: ATTENTION_TEXT }
    : undefined;
};

// ---------------------------------------------------------------------------

export const _InfoBlock: StoryComponent = () => {
  const extraProps = getExtraProps();
  return (
    <InfoBlock title={TITLE_TEXT} subtitle={SUBTEXT_TEXT} items={ITEMS} {...extraProps} />
  );
};
