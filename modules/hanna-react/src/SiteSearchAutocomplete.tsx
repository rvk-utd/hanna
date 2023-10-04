import React, { useRef, useState } from 'react';
import Autosuggest, { RenderSuggestion } from 'react-autosuggest';
import { DefaultTexts, getTexts, HannaLang } from '@reykjavik/hanna-utils/i18n';

import { BemProps } from './utils/types.js';
import { SiteSearchInput, SiteSearchInputProps } from './SiteSearchInput.js';
import { WrapperElmProps } from './utils.js';

// ---------------------------------------------------------------------------

export type SiteSearchACI18n = {
  /** Label for the autocomplete's combobox container div */
  label: string;
  /** Label for the text input */
  inputLabel: string;
  /** Placeholder text for the text input */
  placeholder?: string;
  /** Label for the search button */
  buttonText?: string;
  /** Label for the suggestions item list container */
  suggestionsLabel: string;
  /** @deprecated Not used (Will be removed in v0.11) */
  lang?: string;
};

export const defaultSiteSearchACTexts: DefaultTexts<SiteSearchACI18n> = {
  is: {
    label: 'Leit á vefnum',
    inputLabel: 'Leitarorð',
    buttonText: 'Leita',
    placeholder: 'Sláðu inn leitarorð',
    suggestionsLabel: 'Tillögur',
  },
  en: {
    label: 'Site search',
    inputLabel: 'Search terms',
    buttonText: 'Search',
    placeholder: 'Enter search terms',
    suggestionsLabel: 'Suggestions',
  },
  pl: {
    label: 'Wyszukiwanie na stronie',
    inputLabel: 'Wyszukiwane słowa',
    buttonText: 'Szukaj',
    placeholder: 'Wpisz wyszukiwane słowa',
    suggestionsLabel: 'Sugestie',
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

  texts?: SiteSearchACI18n;
  lang?: HannaLang;
  /** @deprecated  Use `text` prop instead  (will be removed in v0.11) */
  label?: string;
} & Pick<SiteSearchInputProps, 'onSubmit' | 'onButtonClick'> &
  Pick<BemProps, 'bem'> &
  WrapperElmProps;

/**
 * @deprecated Use `<AutosuggestSearch InputComponent={SiteSearchInput} itemActionIcon="search" />` instead   (Will be removed in v0.11)
 */
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
    onButtonClick,
    bem = 'SiteSearchAutocomplete',
    wrapperProps,
  } = props;
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const txt = getTexts(props, defaultSiteSearchACTexts);

  if (process.env.NODE_ENV !== 'production' && !txt.buttonText) {
    console.warn('SiteSearchAutocomplete: Missing translation: `buttonText`');
  }

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
      containerProps={{ ...wrapperProps, 'aria-label': txt.label }}
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
					className, type, disabled, readOnly, required, children, ref,
					...siteSearchProps
				} = inputProps;
        return (
          <SiteSearchInput
            {...siteSearchProps}
            inputRef={ref as React.RefObject<HTMLInputElement>}
            label={
              props.label || // eslint-disable-line deprecation/deprecation
              txt.inputLabel
            }
            placeholder={txt.placeholder}
            buttonText={txt.buttonText}
            onSubmit={onSubmit && (() => onSubmit(value))}
            onButtonClick={onButtonClick && (() => onButtonClick(value))}
          />
        );
      }}
    />
  );
};

// eslint-disable-next-line deprecation/deprecation
export default SiteSearchAutocomplete;
