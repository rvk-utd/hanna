import React from 'react';
import { getCssBundleUrl } from '@reykjavik/hanna-css';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../../utils/HiddenTiger.js';

import { SearchHeroParagraph } from './_SearchHeroParagraph.js';

const meta: Meta = {
  title: '_misc/HomePage',
  parameters: {
    layout: { head: true },
  },
};
export default meta;

const SearchHeroParagraphStory = () => {
  const cssTokens = (
    SearchHeroParagraph.cssTokens_server || SearchHeroParagraph.cssTokens
  ).replace(/,$/, '');
  return (
    <>
      <SearchHeroParagraph />

      <HiddenTiger>
        CSS tokens:{' '}
        <a href={getCssBundleUrl(cssTokens)}>{cssTokens.replace(',', ', ')}</a>
      </HiddenTiger>
    </>
  );
};

export const _SearchHeroParagraph: StoryObj = {
  render: () => SearchHeroParagraphStory(),
  parameters: {
    css: { tokens: SearchHeroParagraph.cssTokens },
    controls: { hideNoControlsWarning: true },
  },
};
