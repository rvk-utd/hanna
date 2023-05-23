import React from 'react';
import {
  ProcessOverview,
  ProcessOverviewItemProps,
} from '@reykjavik/hanna-react/ProcessOverview';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProcessOverview> = {
  title: 'ProcessOverview',
  component: ProcessOverview,
};
export default meta;

type Story = StoryObj<typeof ProcessOverview>;

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

const Component = () => {
  const transparent = boolean('Translucent background', false);
  const narrow = boolean('Narrow layout', false);
  const attention = boolean('"Attention" message', false) || undefined;
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

export const _ProcessOverview: Story = {
  render: () => <Component />,
};
