import React, { useState } from 'react';
import range from '@hugsmidjan/qj/range';
import { AutosuggestSearch } from '@reykjavik/hanna-react/AutosuggestSearch';
import { SiteSearchInput } from '@reykjavik/hanna-react/SiteSearchInput';
import { Meta, StoryObj } from '@storybook/react';

const inputTypes = ['', 'SiteSearchInput'] as const;
const actionIcons = ['', 'search', 'go'] as const;

type ControlProps = {
  inputType: (typeof inputTypes)[number];
  actionIcon: (typeof actionIcons)[number];
  button?: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'Forms/AutosuggestSearch',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: { defaultViewport: 'responsive' },
    css: { tokens: 'AutosuggestSearch,SiteSearchInput' },
  },
};
export default meta;

const items = range(1, 5).map((value) => `Suggestion ${value}`);

// const getSuggestions = (value: string): Array<string> => {
// 	return items.filter((item) =>
// 		item.toLowerCase().startsWith(value.trim().toLowerCase())
// 	);
// };

const AutosuggestSearchStory = (args: ControlProps) => {
  const [options, setOptions] = useState<Array<string>>([]);
  return (
    <AutosuggestSearch
      options={options}
      onClearOptions={() => setOptions([])}
      onInput={(value) => (value.length > 4 ? [] : setOptions(items))}
      getOptionValue={(option) => option}
      onSelected={(payload) => console.info('onSelected', payload)}
      onSubmit={(payload) => console.info('onSubmit (and onButtonClick)', payload)}
      itemActionIcon={args.actionIcon || undefined}
      InputComponent={args.inputType === 'SiteSearchInput' ? SiteSearchInput : undefined}
      button={args.button}
    />
  );
};

export const _AutosuggestSearch: StoryObj<ControlProps> = {
  render: AutosuggestSearchStory,
  argTypes: {
    inputType: {
      name: 'Input Field type',
      options: inputTypes,
      control: {
        type: 'inline-radio',
        labels: {
          '': 'Default (SearchInput)',
          SiteSearchInput: 'SiteSearchInput',
        } satisfies Record<ControlProps['inputType'], string>,
      },
    },
    actionIcon: {
      name: 'Item action icon',
      options: actionIcons,
      control: {
        type: 'inline-radio',
        labels: {
          '': 'None',
          search: 'Search',
          go: 'Go!',
        } satisfies Record<ControlProps['actionIcon'], string>,
      },
    },
    button: { name: 'Submit button' },
  },
  args: {
    inputType: '',
    actionIcon: '',
    button: true,
  },
};
