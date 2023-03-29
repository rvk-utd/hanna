import React from 'react';
import {
  ContentArticle,
  ContentArticleProps,
} from '@reykjavik/hanna-react/ContentArticle';

import contentImageUrl from './example_assets/Gallery--landscape--large.jpg';
import { StoryComponent } from './storytypes.js';

export default {
  title: 'ContentArticle',
  // parameters: { knobs: { disabled: false } } as StoryParameters,
};

const demoMarkup = () => {
  return (
    <>
      <h2>Aðal fyrirsögn</h2>
      <p>
        Undanfarna mánuði hefur verið unnið að samningnum, skráningu safneignar, stofnskrá
        safnsins, erfðamálum og fleiru. Safnið verður í austurhluta Hafnarhússins í
        Reykjavík en í vesturhluta þess er nú Listasafn Reykjavíkur. Þar með verður allt
        Hafnarhúsið lagt undir listastarfsemi. Í samningnum er kveðið á um að Una Dóra
        Copley einkadóttir Nínu gefi Reykvíkingum (vel á annað þúsund) listaverk eftir
        móður sína sem endurspegla allan feril listakonunnar. Meðal annars málverk,
        teikningar, glerverk og vatnslitamyndir. Auk þess gefur Una Dóra Reykvíkingum
        fasteignir á Manhattan og í Reykjavík eftir sinn dag sem og aðrar
        listaverkaeignir, bókasafn og fleiri muni.
      </p>
      <h3>Millifyrirsögn</h3>
      <p>
        Borgarráð samþykkti í morgun að efnt verði til hugarflugs og samráðs vegna
        útfærslu á Hafnarhúsi, húsi myndlistar. Kallað verði eftir viðhorfum og hugmyndum
        til undirbúnings hönnunarsamkeppni þar sem útfærðar verði breytingar á Hafnarhúsi
        til að rúma Safn Nínu Tryggvadóttur, stækkun Listasafns Reykjavíkur og til að
        skapa rými fyrir aðra notkun hússins í þágu myndlistar og eftir atvikum annarrar
        listsköpunar. Kallað verði eftir aðkomu fjölbreyttra fulltrúa listafólks og
        borgarbúa á öllum aldri, Listasafns Reykjavíkur, bakhjarla Safns Nínu
        Tryggvadóttur, Erró-safnsins,Listaháskóla Íslands, tónlistarhússins Hörpu og
        annarra hagaðila.
      </p>
    </>
  );
};

const META: ContentArticleProps['meta'] = [
  {
    label: 'Mánudagur, 30. maí 2021',
  },
  {
    label: 'Dagur B. Eggertsson',
    href: '/borgarstjori',
  },
];

const HEADLINE = 'Undirritun um stofnun Listasafns Nínu Tryggvadóttur';

const CONTENTIMAGE_PROPS: ContentArticleProps['topImage'] = {
  image: {
    src: contentImageUrl,
    altText: 'Dagur B. Eggertsson og Una Dóra Copley takast í hendur',
  },
  caption:
    'Dagur B. Eggertsson borgarstjóri og Una Dóra Copley, dóttir Nínu Tryggvadóttur listakonu',
  credit: 'Mynd: Jón Jónsson',
};

const RELATEDLINKS: ContentArticleProps['relatedLinks'] = {
  title: 'Tengt efni',
  links: [
    {
      label: 'Brún tunna - upplýsingar',
      href: 'something.pdf',
    },
    {
      label: 'Brún tunna - upplýsingar',
      href: 'something?format=pdf',
      type: 'pdf',
    },
  ],
};

export const _ContentArticle: StoryComponent = () => (
  <ContentArticle
    meta={META}
    headline={HEADLINE}
    topImage={CONTENTIMAGE_PROPS}
    body={demoMarkup()}
    relatedLinks={RELATEDLINKS}
    startSeen
  />
);
