import React, { createRef, useState } from 'react';
import Autosuggest, { RenderInputComponentProps } from 'react-autosuggest';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { DefaultTexts, getTexts } from '@reykjavik/hanna-utils/i18n';

import SearchInput, { SearchInputProps } from './SearchInput.js';
import { SiteSearchInputProps } from './SiteSearchInput.js';
import { WrapperElmProps } from './utils.js';

// ---------------------------------------------------------------------------

export type AutosuggestSearchI18n = {
  lang?: string;
  /** Label for the autocomplete's combobox container div */
  label: string;
  /** Label for the text input */
  inputLabel: string;
  /** Label for the search button */
  buttonText: string;
  /** Placeholder text for the text input */
  placeholder?: string;
  /** Label for the suggestions item list container */
  suggestionsLabel: string;
};

export const defaultAutosuggestSearchTexts: DefaultTexts<AutosuggestSearchI18n> = {
  is: {
    lang: 'is',
    label: 'Leit á vefnum',
    inputLabel: 'Leitarorð',
    buttonText: 'Leita',
    placeholder: 'Sláðu inn leitarorð',
    suggestionsLabel: 'Tillögur',
  },
  en: {
    lang: 'en',
    label: 'Site search',
    inputLabel: 'Search terms',
    buttonText: 'Search',
    placeholder: 'Enter search terms',
    suggestionsLabel: 'Suggestions',
  },
  pl: {
    lang: 'pl',
    label: 'Wyszukiwanie na stronie',
    inputLabel: 'Wyszukaj frazę',
    buttonText: 'Szukaj',
    placeholder: 'Wpisz frazę',
    suggestionsLabel: 'Sugestie',
  },
};

// ---------------------------------------------------------------------------

export type AutosuggestSearchProps<T extends string | object> = {
  options: Array<T>;
  onInput: (value: string) => void;
  onSelected: (payload: { value: string; option: T }) => void;
  onClearOptions: () => void;

  getOptionValue?: (option: T) => string;
  renderSuggestion?: (
    option: T,
    context: { query: string; isHighlighted: boolean }
  ) => JSX.Element | string;

  itemActionIcon?: 'search' | 'go';

  InputComponent?: (props: SiteSearchInputProps & SearchInputProps) => JSX.Element;
  renderInputField?: (
    inputProps: RenderInputComponentProps,
    texts: AutosuggestSearchI18n
  ) => JSX.Element;

  texts?: AutosuggestSearchI18n;
  lang?: string;
} & Pick<SearchInputProps, 'onSubmit' | 'onButtonClick' | 'button'> &
  WrapperElmProps;

export const AutosuggestSearch = <T extends string | object>(
  props: AutosuggestSearchProps<T>
) => {
  const {
    options,
    itemActionIcon,

    onInput,
    onSelected,
    onClearOptions,
    onSubmit,
    onButtonClick = onSubmit,
    button,

    getOptionValue = (opt) =>
      typeof opt !== 'object' || !('value' in opt)
        ? opt.toString()
        : opt.value != null
        ? opt.value.toString()
        : '',
    renderSuggestion = (opt) =>
      typeof opt === 'object' && 'label' in opt && opt.label != null
        ? opt.label.toString()
        : getOptionValue(opt),

    InputComponent = SearchInput,
    renderInputField,

    wrapperProps,
  } = props;
  const [value, setValue] = useState('');
  const inputRef = createRef<HTMLInputElement>();

  const txt = getTexts(props, defaultAutosuggestSearchTexts);

  return (
    <Autosuggest
      theme={{
        container: 'AutosuggestSearch',
        containerOpen: 'AutosuggestSearch--open',
        suggestionsContainer: 'AutosuggestSearch__container',
        suggestionsContainerOpen: 'AutosuggestSearch__container--open',
        suggestionsList: modifiedClass(
          'AutosuggestSearch__list',
          itemActionIcon && `action--${itemActionIcon}`
        ),
        suggestion: 'AutosuggestSearch__item',
        suggestionHighlighted: 'AutosuggestSearch__item--highlighted',
      }}
      focusInputOnSuggestionClick={true}
      suggestions={options}
      onSuggestionsClearRequested={onClearOptions}
      onSuggestionsFetchRequested={({ value }) => onInput(value)}
      getSuggestionValue={getOptionValue}
      onSuggestionSelected={(_event, data) => {
        onSelected({ value: data.suggestionValue, option: data.suggestion });
      }}
      // onSuggestionHighlighted={onSuggestionHighlighted}
      renderSuggestion={renderSuggestion}
      containerProps={{
        ...wrapperProps,
        'aria-label': txt.label,
      }}
      renderSuggestionsContainer={({ containerProps, children }) => (
        <div
          lang={txt.lang}
          {...containerProps}
          aria-label={options.length ? txt.suggestionsLabel : undefined}
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
      renderInputComponent={
        renderInputField
          ? (inputProps) => renderInputField(inputProps, txt)
          : (inputProps) => {
              /* prettier-ignore */
              const { className, type, disabled, readOnly, required, children,
                ...siteSearchProps } = inputProps;

              return (
                <InputComponent
                  lang={txt.lang}
                  {...siteSearchProps}
                  button={button}
                  label={txt.inputLabel}
                  placeholder={txt.placeholder}
                  buttonText={txt.buttonText}
                  onSubmit={onSubmit && (() => onSubmit(value))}
                  onButtonClick={onButtonClick && (() => onButtonClick(value))}
                />
              );
            }
      }
    />
  );
};
