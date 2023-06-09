import React, { useState } from 'react';
import range from '@hugsmidjan/qj/range';
import { SiteSearchAutocomplete } from '@reykjavik/hanna-react/SiteSearchAutocomplete';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

const meta: Meta = {
  title: 'Forms/Site Search Autocomplete',
};
export default meta;

type Story = StoryObj;

const items = range(1, 5).map((value) => `Suggestion ${value}`);

// const getSuggestions = (value: string): Array<string> => {
// 	return items.filter((item) =>
// 		item.toLowerCase().startsWith(value.trim().toLowerCase())
// 	);
// };

const SiteSearchAutocompleteStory = () => {
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

export const _SiteSearchAutocomplete: Story = {
  render: () => <SiteSearchAutocompleteStory />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  } as StoryParameters,
};
