import React, { useState } from 'react';
import range from '@hugsmidjan/qj/range';
import SiteSearchAutocomplete from '@reykjavik/hanna-react/SiteSearchAutocomplete';

import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'Forms/SiteSearchAutocomplete',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

const items = range(1, 5).map((value) => `Suggestion ${value}`);

// const getSuggestions = (value: string): Array<string> => {
// 	return items.filter((item) =>
// 		item.toLowerCase().startsWith(value.trim().toLowerCase())
// 	);
// };

export const _SiteSearchAutocomplete: StoryComponent = () => {
  const [suggestions, setSuggestions] = useState<Array<string>>([]);
  return (
    <SiteSearchAutocomplete
      suggestions={suggestions}
      renderSuggestion={(suggestion) => {
        return suggestion;
      }}
      setSuggestions={setSuggestions}
      getSuggestionValue={(value) => value}
      onSuggestionsFetchRequested={
        () => setSuggestions(items)
        // ({ value }) => setSuggestions(getSuggestions(value))
      }
    />
  );
};
