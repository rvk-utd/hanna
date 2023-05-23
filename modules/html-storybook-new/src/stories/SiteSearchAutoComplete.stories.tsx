import React, { useState } from 'react';
import range from '@hugsmidjan/qj/range';
import { SiteSearchAutocomplete } from '@reykjavik/hanna-react/SiteSearchAutocomplete';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SiteSearchAutocomplete> = {
  title: 'components/Forms/Site Search Autocomplete',
  component: SiteSearchAutocomplete,
};
export default meta;

type Story = StoryObj<typeof SiteSearchAutocomplete>;

const items = range(1, 5).map((value) => `Suggestion ${value}`);

// const getSuggestions = (value: string): Array<string> => {
// 	return items.filter((item) =>
// 		item.toLowerCase().startsWith(value.trim().toLowerCase())
// 	);
// };

const Component = () => {
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
  render: () => <Component />,
};
