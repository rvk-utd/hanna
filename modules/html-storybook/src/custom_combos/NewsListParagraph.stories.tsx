import React from 'react';
import { css, getCssBundleUrl, hannaVars, mq } from '@reykjavik/hanna-css';
import ArticleCards from '@reykjavik/hanna-react/ArticleCards';
import ArticleMeta from '@reykjavik/hanna-react/ArticleMeta';
import BgBox from '@reykjavik/hanna-react/BgBox';
import ButtonTertiary from '@reykjavik/hanna-react/ButtonTertiary';
import Heading from '@reykjavik/hanna-react/Heading';
import Picture from '@reykjavik/hanna-react/Picture';

import landscapeImage from '../example_assets/NewsHero__landscape.jpg';
import { StoryComponent, StoryParameters } from '../storytypes';
import { imageCards as _imageCards } from '../utils/_dummyData';
import HiddenTiger from '../utils/HiddenTiger';

export default {
  title: '_misc/reykjavik-is',
  parameters: {
    // knobs: { disabled: false },
  } as StoryParameters,
};

const imageCards = _imageCards.slice(2).slice(0, 4);

const cssTokens = 'ArticleCards,ArticleMeta,BgBox,ButtonTertiary,Heading,Picture';

export const NewsListParagraph: StoryComponent = () => (
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
      <Heading>Fr??ttir</Heading>
      <div className="NewsListTopItem">
        <Picture src={landscapeImage} altText="Some alt text" />
        <div className="NewsListTopItem__content">
          <Heading Tag="h3" size="large">
            <a href="">??tivistarsv????in ?? borginni i??a af l??fi</a>
          </Heading>
          <ArticleMeta items={[{ label: 'M??nudagur , 13. apr??l 2022' }]} />
          <div className="NewsListTopItem__summary">
            Reykv??kingar eru heppnir a?? geta vali?? milli margra spennandi ??tivistarsv????a
            ??ar sem er h??gt a?? vi??ra sig og n??ra l??kama og s??l. ??essi sv????i eru
            s??rstaklega mikilv??g n?? ?? t??mum samkomu- banns og afl??stra vi??bur??a. N??tt??ran
            er enn opin og ?? ??tivistar- sv????um er au??velt a?? hl????a V????i og vir??a tveggja
            metra regluna en ?? sama t??ma finna fyrir ??kve??inni n??l??g?? vi?? anna?? f??lk.
          </div>
          <ButtonTertiary href="" aria-label="??tivistarsv????in ?? borginni i??a af l??fi">
            Lesa meira
          </ButtonTertiary>
        </div>
      </div>
      <ArticleCards cards={imageCards} />
    </BgBox>

    {/* Content hidden from the HTML source rendering tab */}
    <HiddenTiger>
      CSS tokens: <a href={getCssBundleUrl(cssTokens)}>{cssTokens.replace(',', ', ')}</a>
    </HiddenTiger>
  </>
);

NewsListParagraph.story = {
  parameters: {
    css: { tokens: cssTokens },
  },
};
