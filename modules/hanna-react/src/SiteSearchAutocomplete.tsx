import React, { createRef, useState } from 'react';
import Autosuggest, { RenderSuggestion } from 'react-autosuggest';
import { DefaultTexts, getTexts } from '@reykjavik/hanna-utils/i18n';

import { BemProps } from './utils/types.js';
import SiteSearchInput from './SiteSearchInput.js';

// ---------------------------------------------------------------------------

export type SiteSearchACI18n = {
  lang?: string;
  /** Label for the autocomplete's combobox container div */
  label: string;
  /** Label for the text input */
  inputLabel: string;
  /** Placeholder text for the text input */
  placeholder?: string;
  /** Label for the suggestions item list container */
  suggestionsLabel: string;
};

export const defaultSiteSearchACTexts: DefaultTexts<SiteSearchACI18n> = {
  is: {
    lang: 'is',
    label: 'Leit á vefnum',
    inputLabel: 'Leitarorð',
    placeholder: 'Sláðu inn leitarorð',
    suggestionsLabel: 'Tillögur',
  },
  en: {
    lang: 'en',
    label: 'Site search',
    inputLabel: 'Search terms',
    placeholder: 'Enter search terms',
    suggestionsLabel: 'Suggestions',
  },
};

// ---------------------------------------------------------------------------

export type SiteSearchAutocompleteProps<T> = {
  suggestions: Array<T>;
  renderSuggestion?: RenderSuggestion<T>;
  setSuggestions: (suggestions: Array<T>) => void;
  getSuggestionValue: (suggestion: T) => string;
  onSuggestionsFetchRequested: (
    request: Autosuggest.SuggestionsFetchRequestedParams
  ) => void;
  onSuggestionSelected?: (
    event: React.FormEvent<HTMLElement>,
    data: Autosuggest.SuggestionSelectedEventData<T>
  ) => void;
  onSuggestionHighlighted?: (params: { suggestion: T }) => void;

  /** Triggered when user hits ENTER key with the focus inside the input field */
  onSubmit?: (value: string) => void;

  /** Custom action to perform when the user clicks the search button
   *
   * Defaults to `onSubmit`
   */
  onButtonClick?: (value: string) => void;
  lang?: string;
  texts?: SiteSearchACI18n;
  /** @deprecated  Use `text` prop instead  (will be removed in v0.11) */
  label?: string;
} & BemProps;

export const SiteSearchAutocomplete = <T,>(props: SiteSearchAutocompleteProps<T>) => {
  const {
    suggestions,
    setSuggestions,
    renderSuggestion,
    getSuggestionValue,
    onSuggestionsFetchRequested,
    onSuggestionSelected,
    onSuggestionHighlighted,
    onSubmit,
    onButtonClick = onSubmit,
    bem = 'SiteSearchAutocomplete',
  } = props;
  const [value, setValue] = useState('');
  const inputRef = createRef<HTMLInputElement>();

  const txt = getTexts(props, defaultSiteSearchACTexts);

  return (
    <Autosuggest
      theme={{
        container: bem,
        containerOpen: bem + '--open',
        suggestionsContainer: bem + '__container',
        suggestionsContainerOpen: bem + '__container--open',
        suggestionsList: bem + '__list',
        suggestion: bem + '__item',
        suggestionHighlighted: bem + '__item--highlighted',
      }}
      focusInputOnSuggestionClick={true}
      suggestions={suggestions}
      onSuggestionsClearRequested={() => setSuggestions([])}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      getSuggestionValue={getSuggestionValue}
      onSuggestionSelected={onSuggestionSelected}
      onSuggestionHighlighted={onSuggestionHighlighted}
      renderSuggestion={renderSuggestion || ((s) => String(s))}
      containerProps={{ 'aria-label': txt.label }}
      renderSuggestionsContainer={({ containerProps, children }) => (
        <div
          {...containerProps}
          aria-label={suggestions.length ? txt.suggestionsLabel : undefined}
        >
          {children}
        </div>
      )}
      inputProps={{
        ref: inputRef,
        value: value,
        onChange: (_, { newValue }) => {
          setValue(newValue);
        },
      }}
      renderInputComponent={(inputProps) => {
        /* prettier-ignore */
        const {
					className, type, disabled, readOnly, required, children, //eslint-disable-line @typescript-eslint/no-unused-vars
					...siteSearchProps
				} = inputProps;
        return (
          <SiteSearchInput
            {...siteSearchProps}
            label={
              props.label || // eslint-disable-line deprecation/deprecation
              txt.inputLabel
            }
            placeholder={txt.placeholder}
            onSubmit={onSubmit && (() => onSubmit(value))}
            onButtonClick={onButtonClick && (() => onButtonClick(value))}
          />
        );
      }}
    />
  );
};

export default SiteSearchAutocomplete;
