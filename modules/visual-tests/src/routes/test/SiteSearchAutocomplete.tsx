import React, { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { SiteSearchAutocomplete } from '@reykjavik/hanna-react/SiteSearchAutocomplete';

import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import { keyboardFocus } from '../../test-helpers/keyboardFocus';
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
  extras: async ({ page, pageScreenshot, localScreenshot, setViewportSize, project }) => {
    const formFieldInput = page.locator('.FormField__input');
    const searchButton = page.locator('.SiteSearchInput__button');
    const searchBox = page.locator('.SiteSearchInput__input');

    if (project === 'firefox-wide' || project === 'firefox-phone') {
      // Focus search button
      await keyboardFocus(searchButton, true);
      await localScreenshot(formFieldInput, 'searchButton-focus');
      // Focus search box
      await keyboardFocus(searchBox, true);
      await localScreenshot(formFieldInput, 'searchbox-focus');

      // Hover search button
      await searchButton.hover();
      await localScreenshot(formFieldInput, 'searchButton-hover');
      // Focus search box
      await searchBox.hover();
      await localScreenshot(formFieldInput, 'searchbox-hover');
    }

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
