import React, { useRef } from 'react';
import Autosuggest, { RenderInputComponentProps } from 'react-autosuggest';
import { modifiedClass } from '@reykjavik/hanna-utils';
import { DefaultTexts, getTexts, HannaLang } from '@reykjavik/hanna-utils/i18n';

import SearchInput, { SearchInputProps } from './SearchInput.js';
import { SiteSearchInputProps } from './SiteSearchInput.js';
import { useMixedControlState, WrapperElmProps } from './utils.js';

type ChangeMethod = Autosuggest.ChangeEvent['method'];

/** Change methods/types that should update the input value */
const inputChangeMethods = new Set<ChangeMethod>(['type', 'enter', 'click']);

// ---------------------------------------------------------------------------

export type AutosuggestSearchI18n = {
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
  /** @deprecated Not used (Will be removed in v0.11) */
  lang?: string;
};

export const defaultAutosuggestSearchTexts: DefaultTexts<AutosuggestSearchI18n> = {
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
    inputLabel: 'Wyszukaj frazę',
    buttonText: 'Szukaj',
    placeholder: 'Wpisz frazę',
    suggestionsLabel: 'Sugestie',
  },
};

// ---------------------------------------------------------------------------

type EmptyMessage = { message: string | JSX.Element; type: 'empty' | 'loading' };

export type AutosuggestSearchProps<T extends string | object> = {
  options: Array<T>;
  emptyMessage?: EmptyMessage | EmptyMessage['message'];
  onInput: (value: string) => void;
  onSelected: (payload: { value: string; option: T }) => void;
  onClearOptions: () => void;

  getOptionValue?: (option: T) => string;
  renderSuggestion?: (
    option: T,
    context: { query: string; isHighlighted: boolean }
  ) => JSX.Element | string;

  itemActionIcon?: 'search' | 'go';

  inputValue?: string;
  defaultInputValue?: string;

  InputComponent?: (props: SiteSearchInputProps & SearchInputProps) => JSX.Element;
  renderInputField?: (
    inputProps: RenderInputComponentProps,
    texts: AutosuggestSearchI18n
  ) => JSX.Element;

  texts?: AutosuggestSearchI18n;
  lang?: HannaLang;
} & Pick<SearchInputProps, 'onSubmit' | 'onButtonClick' | 'button'> &
  WrapperElmProps;

export const AutosuggestSearch = <T extends string | object>(
  props: AutosuggestSearchProps<T>
) => {
  const {
    options,
    emptyMessage,
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
  const [inputValue, setInputValue] = useMixedControlState(props, 'inputValue', '');

  const inputRef = useRef<HTMLInputElement>(null);

  const txt = getTexts(props, defaultAutosuggestSearchTexts);

  const showEmptyMessage = !options.length && emptyMessage;

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
      suggestions={showEmptyMessage ? [true as unknown as T] : options}
      onSuggestionsClearRequested={onClearOptions}
      onSuggestionsFetchRequested={
        (/* { value } */) => {
          // weirdly required prop, but we don't need to do anything here
          // as we run onInput on input change below.
        }
      }
      getSuggestionValue={
        showEmptyMessage
          ? () => inputValue // Return the input value in case the user uses the up/down keys to select the hidden empty message
          : getOptionValue
      }
      onSuggestionSelected={(event, data) => {
        if (showEmptyMessage) {
          event.preventDefault();
          return;
        }
        onSelected({ value: data.suggestionValue, option: data.suggestion });
      }}
      // onSuggestionHighlighted={onSuggestionHighlighted}
      renderSuggestion={showEmptyMessage ? () => '' : renderSuggestion}
      containerProps={{
        ...wrapperProps,
        'aria-label': txt.label,
      }}
      renderSuggestionsContainer={({ containerProps, children }) => {
        let contents = children;
        if (showEmptyMessage) {
          const { message, type } =
            typeof emptyMessage === 'string' || !('message' in emptyMessage)
              ? { message: emptyMessage, type: 'empty' }
              : emptyMessage;
          contents = (
            <div
              className={modifiedClass(
                'AutosuggestSearch__emptyMessage',
                type !== 'empty' && type
              )}
            >
              {message}
            </div>
          );
        }
        return (
          <div
            {...containerProps}
            aria-label={options.length ? txt.suggestionsLabel : undefined}
          >
            {contents}
          </div>
        );
      }}
      inputProps={{
        ref: inputRef,
        value: inputValue,
        onChange: (_, { newValue, method }) => {
          if (!inputChangeMethods.has(method)) {
            return;
          }
          onInput(newValue);
          setInputValue(newValue);
        },
      }}
      renderInputComponent={
        renderInputField
          ? (inputProps) => renderInputField(inputProps, txt)
          : (inputProps) => {
              /* prettier-ignore */
              const { className, type, disabled, readOnly, required, children, ref,
                defaultValue,
                ...siteSearchProps } = inputProps;

              return (
                <InputComponent
                  lang={props.lang}
                  defaultValue={defaultValue as string | undefined}
                  {...siteSearchProps}
                  inputRef={ref as React.RefObject<HTMLInputElement>}
                  button={button}
                  label={txt.inputLabel}
                  placeholder={txt.placeholder}
                  buttonText={txt.buttonText}
                  onSubmit={onSubmit && (() => onSubmit(inputValue))}
                  onButtonClick={onButtonClick && (() => onButtonClick(inputValue))}
                />
              );
            }
      }
    />
  );
};
