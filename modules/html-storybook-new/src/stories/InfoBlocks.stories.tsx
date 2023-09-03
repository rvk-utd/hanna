import React from 'react';
import { InfoBlock } from '@reykjavik/hanna-react/InfoBlock';
import { Meta, StoryObj } from '@storybook/react';

const appearanceOptions = ['neither', 'attention', 'extra'] as const;

type ControlProps = {
  appearance: (typeof appearanceOptions)[number];
};

// ---------------------------------------------------------------------------

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

const getExtraProps = (radioOption: ControlProps['appearance']) => {
  if (radioOption === 'extra') {
    return { extraInfo: EXTRAINFO_TEXT };
  }
  if (radioOption === 'attention') {
    return { attention: ATTENTION_TEXT };
  }
  return undefined;
};

// ---------------------------------------------------------------------------

const meta: Meta<ControlProps> = {
  title: 'InfoBlock',
};
export default meta;

const InfoBlockStory: React.FC<ControlProps> = ({ appearance }) => {
  const extraProps = getExtraProps(appearance);
  return (
    <InfoBlock
      title={TITLE_TEXT}
      subtitle={SUBTEXT_TEXT}
      items={ITEMS}
      {...extraProps}
      startSeen
    />
  );
};

export const _InfoBlock: StoryObj<ControlProps> = {
  render: (args) => <InfoBlockStory {...args} />,
  argTypes: {
    appearance: {
      name: 'With attention/extralinks',
      options: appearanceOptions,
      control: {
        type: 'inline-radio',
        labels: {
          neither: 'Neither',
          attention: 'Attention',
          extra: 'Extra info',
        } satisfies Record<ControlProps['appearance'], string>,
      },
    },
  },
  args: {
    appearance: 'neither',
  },
};
