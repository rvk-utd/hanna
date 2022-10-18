import React, { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import SiteSearchAutocomplete from '@reykjavik/hanna-react/SiteSearchAutocomplete';

import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

const items = [1, 2, 3, 4, 5].map((value) =>
  value === 2 ? lorem.medium : `Suggestion ${value}`
);

export default function () {
  const [suggestions, setSuggestions] = useState(items);
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <SiteSearchAutocomplete
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        getSuggestionValue={(value) => value}
        onSuggestionsFetchRequested={() => setSuggestions(items)}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, pageScreenshot, localScreenshot, setViewportSize }) => {
    const searchBox = page.locator('.SiteSearchInput__input');
    const searchButton = page.locator('.SiteSearchInput__button');

    // Focus search button
    await searchButton.focus();
    await localScreenshot(searchBox, 'searchButton-focus');
    // Focus search box
    await searchBox.focus();
    await localScreenshot(searchBox, 'searchbox-focus');

    // Hover search button
    await searchButton.hover();
    await localScreenshot(searchBox, 'searchButton-hover');
    // Focus search box
    await searchBox.hover();
    await localScreenshot(searchBox, 'searchbox-hover');

    // Hover suggestion
    setViewportSize(1000);
    await searchBox.fill('a');

    await page.locator('.SiteSearchAutocomplete__item >> nth=0').hover();
    await pageScreenshot('suggestion-hover');

    const wrappedItem = page.locator('.SiteSearchAutocomplete__item >> nth=1');
    await wrappedItem.hover();
    await localScreenshot(wrappedItem, 'suggestion-wrap-hover');
  },
};
