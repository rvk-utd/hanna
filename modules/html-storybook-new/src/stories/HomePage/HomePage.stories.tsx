import React from 'react';
import { getCssBundleUrl } from '@reykjavik/hanna-css';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../../utils/HiddenTrigger.js';
import { StoryParameters } from '../../utils/storytypes.js';

import { SearchHeroParagraph } from './_SearchHeroParagraph.js';

const meta: Meta = {
  title: '_misc/HomePage',
};
export default meta;

type Story = StoryObj;

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

export const _SearchHeroParagraph: Story = {
  render: () => SearchHeroParagraphStory(),
  parameters: {
    css: { tokens: SearchHeroParagraph.cssTokens },
    controls: { hideNoControlsWarning: true },
  } as StoryParameters,
};
