import React, { useState } from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { AutosuggestSearch } from '@reykjavik/hanna-react/AutosuggestSearch';

import { Minimal } from '../../layout/Minimal.js';
import { lorem } from '../../test-helpers/dummyData.js';
import { keyboardFocus } from '../../test-helpers/keyboardFocus.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.js';

export const meta: V2_MetaFunction = autoTitle;

// Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens('SiteSearchInput');

const items = [1, 2, 3, 4, 5].map((value) =>
  value === 2 ? lorem.medium : `Suggestion ${value}`
);

export default function () {
  const [options, setOptions] = useState(items);
  return (
    <Minimal>
      <AutosuggestSearch
        options={options}
        emptyMessage="No results"
        onClearOptions={() => setOptions([])}
        onInput={(value) => setOptions(value.length > 4 ? [] : items)}
        onSelected={(payload) => console.info('onSelected', payload)}
        onSubmit={(payload) => console.info('onSubmit (and onButtonClick)', payload)}
        // itemActionIcon="search"
        itemActionIcon="go"
        button={false}
      />
      {/* * /}
      <DummyBlock thin />
      <AutosuggestSearch
        options={options}
        onClearOptions={() => setOptions([])}
        onInput={() => setOptions(items)}
        onSelected={(payload) => console.info('onSelected', payload)}
        onSubmit={(payload) => console.info('onSubmit (and onButtonClick)', payload)}
        InputComponent={SiteSearchInput}
      />
      {/* */}
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({
    page,
    pageScreenshot,
    localScreenshot,
    setViewportSize,
    mediaFormat,
  }) => {
    const formFieldInput = page.locator('.FormField__input');
    const searchButton = page.locator('.SearchInput__button');
    const searchBox = page.locator('.SearchInput__input');

    if (mediaFormat('wide') || mediaFormat('phone')) {
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

    await page.locator('.AutosuggestSearch__item >> nth=0').hover();
    await pageScreenshot('suggestion-hover');

    const wrappedItem = page.locator('.AutosuggestSearch__item >> nth=1');
    await wrappedItem.hover();
    await localScreenshot(wrappedItem, 'suggestion-wrap-hover');
  },
};
