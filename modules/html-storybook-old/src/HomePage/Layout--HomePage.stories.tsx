import React from 'react';
import range from '@hugsmidjan/qj/range';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';
import { ExtraLinks } from '@reykjavik/hanna-react/ExtraLinks';
import { GridBlocks } from '@reykjavik/hanna-react/GridBlocks';
import { ImageCards } from '@reykjavik/hanna-react/ImageCards';
import { efnistakn } from '@reykjavik/hanna-utils/assets';

import { _ArticleCarousel } from '../ArticleCarousel.stories';
import { _MiniMetrics } from '../MiniMetrics.stories';
import { StoryComponent, StoryParameters } from '../storytypes.js';
import { imageCards } from '../utils/_dummyData.js';

import { SearchHeroParagraph as _SearchHeroParagraph } from './_SearchHeroParagraph.js';

export default {
  title: '_misc/HomePage',
  parameters: {
    layout: {
      modifier: 'HomePage',
      head: true,
    },
  } as StoryParameters,
};

export const HomePage: StoryComponent = () => {
  return (
    <>
      <_SearchHeroParagraph />
      {'\n\n\n'}
      <div className="ScrollCTA" aria-hidden="true">
        Meira efni
      </div>
      {'\n\n\n'}
      <GridBlocks
        blocks={range(1, 4).map((n) => ({
          icon: efnistakn[n],
          title: 'Heading',
          href: '',
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          summary: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doasdasd eiusmod tempor incididunt. Ut labore et.',
            'Dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
          ][n % 2]!,
        }))}
      />
      {'\n\n\n'}
      <ExtraLinks
        title="Framundan"
        cards={range(1, 7).map(() => ({
          title: 'Eignaskiptayfirlýsing',
          href: '',
          summary: 'Lögboðinn skriflegur gerningur um skiptingu fjöleignarhúss.',
        }))}
      />
      {'\n\n\n'}
      <_ArticleCarousel />
      {'\n\n\n'}
      <_MiniMetrics />
      {'\n\n\n'}
      <ImageCards
        title="Fréttir"
        summaryElement={<ButtonTertiary href="">Sjá allar fréttir</ButtonTertiary>}
        cards={imageCards}
      />
    </>
  );
};

HomePage.story = {
  parameters: {
    css: {
      tokens:
        'Layout--HomePage,GridBlocks,ExtraLinks,ArticleCarousel,MiniMetrics,ImageCards,' +
        _SearchHeroParagraph.cssTokens,
    },
  },
};
