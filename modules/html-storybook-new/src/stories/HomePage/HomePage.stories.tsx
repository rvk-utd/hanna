import React from 'react';
import { getCssBundleUrl } from '@reykjavik/hanna-css';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../../utils/HiddenTrigger.js';

import { SearchHeroParagraph } from './_SearchHeroParagraph.js';

const meta: Meta = {
  title: '_misc/HomePage',
};
export default meta;

type Story = StoryObj;

const SearchHeroParagraphComponent = () => {
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
  render: () => <SearchHeroParagraphComponent />,
  parameters: {
    css: { tokens: SearchHeroParagraph.cssTokens },
  },
};
