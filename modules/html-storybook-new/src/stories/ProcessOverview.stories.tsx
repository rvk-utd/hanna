import React from 'react';
import {
  ProcessOverview,
  ProcessOverviewItemProps,
} from '@reykjavik/hanna-react/ProcessOverview';
import { Meta, StoryObj } from '@storybook/react';

type ControlProps = {
  translucentBackground: boolean;
  narrowLayout: boolean;
  attentionMessage: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'ProcessOverview',
};
export default meta;

const TITLE = 'Hefðbundinn ferill umsóknar';
const ATTENTION_TEXT =
  'Athugið að samþykkt umsókn er ekki ígildi byggingarleyfis og mega framkvæmdir ekki hefjast fyrr en formlegt leyfi er gefið út.';

const ITEMS = (): Array<ProcessOverviewItemProps> => [
  {
    title: 'Dagur 1-5',
    content:
      'Umsókn tekin fyrir á afgreiðslufundi sem er að jafnaði alla þriðjudaga.\nStarfsmenn embættis byggingarfulltrúa fara yfir umsóknir og ganga úr skugga um að framkvæmd uppfylli ákvæði laga og reglna um mannvirki og byggingar, skipulagsskilmála og annað sem málið varða. Að fundi loknum fá umsækjendur tilkynningu um afgreiðslu málsins á uppgefin tölvupóstföng, auk þess sem bréf er sent á lögheimili viðkomandi.',
  },
  {
    title: 'Dagur 6',
    content: (
      <>
        Umsókn er lögð fyrir fund Umhverfis- og Skipulagsráðs
        <br /> sem er að jafnaði alla miðvikudaga.
      </>
    ),
  },
  {
    title: 'Dagur 7',
    content:
      'Umsókn er tekin fyrir á næsta fundi Borgarráðs sem er að jafnaði hvern fimmtudag. Því líða að öllu jöfnu að lágmarki tveir dagar frá samþykkt byggingarfulltrúa þar til borgarráð hefur staðfest erindið.',
  },
];

const ProcessOverviewStory: React.FC<ControlProps> = ({
  translucentBackground,
  narrowLayout,
  attentionMessage,
}) => {
  const transparent = translucentBackground;
  const narrow = narrowLayout;
  const attention = attentionMessage || undefined;
  return (
    <ProcessOverview
      title={TITLE}
      items={ITEMS()}
      attention={attention && ATTENTION_TEXT}
      transparent={transparent}
      narrow={narrow}
    />
  );
};

export const _ProcessOverview: StoryObj<ControlProps> = {
  render: (args) => <ProcessOverviewStory {...args} />,
  argTypes: {
    translucentBackground: { name: 'Translucent background' },
    narrowLayout: { name: 'Narrow layout' },
    attentionMessage: { name: '"Attention" message' },
  },
  args: {
    translucentBackground: false,
    narrowLayout: false,
    attentionMessage: false,
  },
};
