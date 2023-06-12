import React from 'react';
import { css, getCssBundleUrl, hannaVars, mq } from '@reykjavik/hanna-css';
import { ArticleCards } from '@reykjavik/hanna-react/ArticleCards';
import { ArticleMeta } from '@reykjavik/hanna-react/ArticleMeta';
import { BgBox } from '@reykjavik/hanna-react/BgBox';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';
import { Heading } from '@reykjavik/hanna-react/Heading';
import { Picture } from '@reykjavik/hanna-react/Picture';
import { Meta, StoryObj } from '@storybook/react';

import landscapeImage from '../example_assets/NewsHero__landscape.jpg';
import { imageCards as _imageCards } from '../utils/_dummyData.js';
import { HiddenTiger } from '../utils/HiddenTrigger.js';
import { StoryParameters } from '../utils/storytypes.js';

const imageCards = _imageCards.slice(2).slice(0, 4);

const cssTokens = 'ArticleCards,ArticleMeta,BgBox,ButtonTertiary,Heading,Picture';

type Story = StoryObj;

const meta: Meta = {
  title: '_misc/reykjavik-is',
};
export default meta;

const NewsListParagraphStory = () => {
  return (
    <>
      <style>{css`
        .NewsListParagraph {
        }
        .NewsListParagraph .Heading {
          margin-top: 0;
        }
        .NewsListTopItem {
          margin-bottom: var(--component-vspace--medium);
        }
        @media ${mq.phone_phablet} {
          .NewsListTopItem .Picture > img {
            position: relative;
          }
        }
        @media ${mq.tablet_up} {
          .NewsListTopItem {
            display: flex;
            justify-content: space-between;
          }
          .NewsListTopItem .Picture {
            margin-bottom: 0;
            margin-left: ${hannaVars.grid_margin__neg};
            width: calc(${hannaVars.grid_5_5} + ${hannaVars.grid_margin});
            padding-top: 50%;
            height: auto;
          }
          .NewsListTopItem__content {
            width: ${hannaVars.grid_6_6};
            align-self: center;
          }
        }
        @media ${mq.netbook_up} {
          .NewsListTopItem__content {
            width: ${hannaVars.grid_6};
          }
        }
        @media ${mq.wide} {
          .NewsListTopItem__content {
            padding-left: calc(0.5 * ${hannaVars.grid_gutter});
          }
        }

        .NewsListTopItem .Heading {
          margin-bottom: ${hannaVars.space_1};
        }
        .NewsListTopItem__summary {
          font: ${hannaVars.font_bd_l};
          margin-top: ${hannaVars.space_2};
          margin-bottom: ${hannaVars.space_2};
        }
      `}</style>

      <BgBox className="NewsListParagraph">
        <Heading>Fréttir</Heading>
        <div className="NewsListTopItem">
          <Picture src={landscapeImage} altText="Some alt text" />
          <div className="NewsListTopItem__content">
            <Heading Tag="h3" size="large">
              <a href="">Útivistarsvæðin í borginni iða af lífi</a>
            </Heading>
            <ArticleMeta items={[{ label: 'Mánudagur , 13. apríl 2022' }]} />
            <div className="NewsListTopItem__summary">
              Reykvíkingar eru heppnir að geta valið milli margra spennandi útivistarsvæða
              þar sem er hægt að viðra sig og næra líkama og sál. Þessi svæði eru
              sérstaklega mikilvæg nú á tímum samkomu- banns og aflýstra viðburða.
              Náttúran er enn opin og á útivistar- svæðum er auðvelt að hlýða Víði og
              virða tveggja metra regluna en á sama tíma finna fyrir ákveðinni nálægð við
              annað fólk.
            </div>
            <ButtonTertiary href="" aria-label="Útivistarsvæðin í borginni iða af lífi">
              Lesa meira
            </ButtonTertiary>
          </div>
        </div>
        <ArticleCards cards={imageCards} />
      </BgBox>

      {/* Content hidden from the HTML source rendering tab */}
      <HiddenTiger>
        CSS tokens:{' '}
        <a href={getCssBundleUrl(cssTokens)}>{cssTokens.replace(',', ', ')}</a>
      </HiddenTiger>
    </>
  );
};

export const _NewsListParagraph: Story = {
  render: () => NewsListParagraphStory(),
  parameters: {
    css: { tokens: cssTokens },
    controls: { hideNoControlsWarning: true },
  } as StoryParameters,
};
