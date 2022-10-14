import React, { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import SiteSearchAutocomplete from '@reykjavik/hanna-react/SiteSearchAutocomplete';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

const items = [1, 2, 3, 4, 5].map((value) => `Suggestion ${value}`);

export default function () {
  const [suggestions, setSuggestions] = useState(items);
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <SiteSearchAutocomplete
        suggestions={suggestions}
        renderSuggestion={(suggestion) => {
          return suggestion;
        }}
        setSuggestions={setSuggestions}
        getSuggestionValue={(value) => value}
        onSuggestionsFetchRequested={() => setSuggestions(items)}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, pageScreenshot, setViewportSize }) => {
    const searchBox = page.locator('.SiteSearchInput__input');
    const searchButton = page.locator('.SiteSearchInput__button');

    // Hover search button
    await searchButton.hover();
    await pageScreenshot('searchButton-hover');
    // Focus search box
    await searchBox.hover();
    await pageScreenshot('searchbox-hover');

    // Hover suggestion
    setViewportSize(1000);
    await searchBox.fill('a');
    await page.keyboard.press('ArrowDown');
    await pageScreenshot('suggestion-hover');
  },
};
