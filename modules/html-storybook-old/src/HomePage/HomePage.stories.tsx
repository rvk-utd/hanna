import React from 'react';
import { getCssBundleUrl } from '@reykjavik/hanna-css';

import { StoryComponent, StoryParameters } from '../storytypes.js';
import { HiddenTiger } from '../utils/HiddenTiger.js';

import { SearchHeroParagraph as _SearchHeroParagraph } from './_SearchHeroParagraph.js';

export default {
  title: '_misc/HomePage',
  parameters: {
    layout: { head: true },
  } as StoryParameters,
};

export const SearchHeroParagraph: StoryComponent = () => {
  const cssTokens = (
    _SearchHeroParagraph.cssTokens_server || _SearchHeroParagraph.cssTokens
  ).replace(/,$/, '');

  return (
    <>
      <_SearchHeroParagraph />

      <HiddenTiger>
        CSS tokens:{' '}
        <a href={getCssBundleUrl(cssTokens)}>{cssTokens.replace(',', ', ')}</a>
      </HiddenTiger>
    </>
  );
};

SearchHeroParagraph.story = {
  parameters: {
    css: { tokens: _SearchHeroParagraph.cssTokens },
  },
};
