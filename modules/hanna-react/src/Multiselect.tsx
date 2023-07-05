import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import domId from '@hugsmidjan/qj/domid';
import { useDomid, useOnClickOutside } from '@hugsmidjan/react/hooks';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';
import { notNully } from '@reykjavik/hanna-utils';
import { DefaultTexts, getTexts } from '@reykjavik/hanna-utils/i18n';

import { FocusTrap } from './_abstract/_FocusTrap.js';
import { TogglerGroupFieldProps } from './_abstract/_TogglerGroupField.js';
import { filterItems, SearchScoringfn } from './Multiselect/_Multiselect.search.js';
import Checkbox from './Checkbox.js';
import FormField from './FormField.js';
import TagPill from './TagPill.js';
import { useMixedControlState } from './utils.js';

const metaData = {
  /**
   * The item-count where the list becomes searchable.
   *
   * (The search UI, including the on-screen keyboard, takes up a lot of space
   * on mobile devices, so there's a balance that we want to strike.)
   */
  searchableLimit: 20 as number,

  /**
   * The item-count above which we display a summary of "current" values
   * at the top of the drop-down list.
   *
   * (This summary just gets in the way with ultra short option lists.)
   */
  summaryLimit: 10 as number,
};

const { searchableLimit, summaryLimit } = metaData;

// ---------------------------------------------------------------------------

export type MultiselectI18n = {
  search: string;
  buttonShow: string;
  // buttonHide: string;
  currentValues: string;
  noneFoundMsg: string;
};

const defaultTexts: DefaultTexts<MultiselectI18n> = {
  pl: {
    search: 'Wyszukaj opcje',
    buttonShow: 'Pokaż opcje',
    // buttonHide: 'Ukryj opcje',
    currentValues: 'Wybrane wartości',
    noneFoundMsg: 'Brak dopasowań',
  },
  en: {
    search: 'Search options',
    buttonShow: 'Show options',
    // buttonHide: 'Hide options',
    currentValues: 'Currently selected',
    noneFoundMsg: 'No matches',
  },
  is: {
    search: 'Leita í valkostum',
    buttonShow: 'Birta valkosti',
    // buttonHide: 'Fela valkosti',
    currentValues: 'Valin gildi',
    noneFoundMsg: 'Ekkert passar',
  },
};

// ---------------------------------------------------------------------------

export type MultiselectProps = TogglerGroupFieldProps<string> & {
  value?: Array<string>;
  defaultValue?: Array<string>;

  placeholder?: string;

  small?: boolean;

  /**
   * Prevent the selected items from wrapping into multiple lines.
   * Use this option when vertical space is limited.
   */
  nowrap?: boolean;
  /**
   * Custom function to calculate a search score for a given option item.
   * Higher scores mean better matches.
   *
   * A score of zero (or less) means the item is not a valid match.
   */
  searchScoring?: SearchScoringfn;

  /**
   * Force display the current values at the top of the dropdown,
   * even when the total options are fewer than
   * `Multiselect.meta.summaryLimit`.
   *
   * NOTE: Using this option is generally not recommended.
   */
  forceSummary?: boolean;
  /**
   * Force the options to be searchable, even when they're
   * fewer than `Multiselect.meta.searchableLimit`.
   *
   * NOTE: Using this option is generally not recommended.
   */
  forceSearchable?: boolean;

  texts?: MultiselectI18n;
  lang?: string;
};

export type MultiSelectOption = Exclude<MultiselectProps['options'][number], string>;

export const Multiselect = (props: MultiselectProps) => {
  const { onSelected, options: _options, disabled: _disabled, readOnly } = props;
  const disabled = _disabled === true;
  const disableds = !disabled && _disabled;

  const name = useDomid(props.name);

  const [values, setValues] = useMixedControlState(props, 'value', []);

  const filled = values.length > 0;
  const empty = !filled && !props.placeholder;

  const placeholderText = !values.length ? props.placeholder : undefined;

  const texts = getTexts(props, defaultTexts);

  const inputRef = useRef<HTMLInputElement>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = (newIsOpen?: boolean) => {
    setIsOpen((isOpen) => {
      newIsOpen = typeof newIsOpen === 'boolean' ? newIsOpen : !isOpen;
      if (!newIsOpen) {
        wrapperRef.current!.querySelector('.Multiselect__choices')!.scrollTo(0, 0);
        setSearchQuery('');
        setActiveItemIndex(-1);
      }
      return newIsOpen;
    });
  };

  useOnClickOutside(wrapperRef, () => toggleOpen(false));

  const options = useMemo(
    () => _options.map((item) => (typeof item === 'string' ? { value: item } : item)),
    [_options]
  );

  const isSearchable = props.forceSearchable || options.length >= searchableLimit;
  /*
    NOTE: he `.MultiSelect__currentvalues` should only be visible when
    there are some items selected, and multiselect is either collapsed,
    or the dropdown has reached `summaryLimit` number of items.
    (For fewer items, the "summary" is just in the way.)
    The `forceSummary` prop overrides this default.
  */
  const showCurrentValues =
    values.length > 0 &&
    (props.forceSummary || !isOpen || options.length >= summaryLimit);

  const filteredOptions = useMemo(
    () => filterItems(options, searchQuery, props.searchScoring),
    [searchQuery, options, props.searchScoring]
  );

  const handleCheckboxSelection = useCallback(
    (selectedItem: MultiSelectOption) => {
      const selValue = selectedItem.value;
      const isAdding = values.indexOf(selValue) === -1;
      const _newValues = isAdding
        ? [...values, selValue]
        : values.filter((value) => value !== selValue);

      const selectedValues = options
        .filter((item) => _newValues.includes(item.value))
        .map((item) => item.value);

      setValues(selectedValues);

      if (onSelected) {
        onSelected({
          value: selectedItem.value,
          checked: isAdding,
          option: selectedItem,
          selectedValues,
        });
      }
    },
    [values, options, onSelected, setValues]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    const fixVal = val === ' ' ? '' : val;
    setSearchQuery(fixVal);
    toggleOpen(true);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchQuery.length === 0 && [' ', 'Delete', 'Backspace'].includes(event.key)) {
      // setSearchQuery('');
      toggleOpen(activeItemIndex > -1 ? true : !isOpen);
    }
  };

  // When the dropdown is open, add keydown handlers
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      const inputElm = inputRef.current!;
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        inputElm.focus();
        setActiveItemIndex((prevIndex) =>
          prevIndex === 0 ? filteredOptions.length - 1 : prevIndex - 1
        );
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        inputElm.focus();
        setActiveItemIndex((prevIndex) =>
          prevIndex === filteredOptions.length - 1 ? 0 : prevIndex + 1
        );
      } else if (e.key === 'Escape') {
        e.preventDefault();
        inputElm.blur();
        inputElm.focus();
        toggleOpen(false);
      } else if (e.key === 'Enter' || e.key === ' ') {
        if ((e.target as HTMLElement).closest('.MultiSelect__currentvalues')) {
          return;
        }
        const focusInRange =
          activeItemIndex >= 0 && activeItemIndex < filteredOptions.length;
        if (focusInRange) {
          e.preventDefault();
          const selItem = filteredOptions[activeItemIndex];
          if (selItem) {
            handleCheckboxSelection(selItem);
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItemIndex, filteredOptions, isOpen, handleCheckboxSelection, inputRef]);

  // Auto-close the dropdown when focus has left the building
  useEffect(() => {
    const wrapperDiv = wrapperRef.current;
    if (!wrapperDiv) {
      return;
    }
    let closing: ReturnType<typeof setTimeout>;
    const cancelClose = () => clearTimeout(closing);
    const closeDropdown = () => {
      closing = setTimeout(() => toggleOpen(false), 200);
    };
    wrapperDiv.addEventListener('focusin', cancelClose);
    wrapperDiv.addEventListener('focusout', closeDropdown);
    return () => {
      wrapperDiv.removeEventListener('focusin', cancelClose);
      wrapperDiv.removeEventListener('focusout', closeDropdown);
    };
  }, []);

  useEffect(() => {
    wrapperRef.current
      ?.querySelectorAll('.Multiselect__option')
      [activeItemIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
  }, [activeItemIndex]);

  return (
    <FormField
      className={getBemClass('Multiselect', props.nowrap && 'nowrap', props.className)}
      ssr={props.ssr}
      group="inputlike"
      label={props.label}
      LabelTag={props.LabelTag}
      hideLabel={props.hideLabel}
      small={props.small}
      filled={filled}
      empty={empty}
      disabled={disabled}
      invalid={props.invalid}
      errorMessage={props.errorMessage}
      assistText={props.assistText}
      readOnly={readOnly}
      required={props.required}
      reqText={props.reqText}
      id={props.id}
      renderInput={(className, inputProps, addFocusProps, isBrowser) => {
        const { id } = inputProps;
        return (
          <div
            className={getBemClass(
              'Multiselect__input',
              [isOpen && 'open'],
              className.input
            )}
            {...addFocusProps()}
            data-sprinkled={isBrowser}
            ref={wrapperRef}
          >
            {!isBrowser ? null : isSearchable ? (
              <input
                className="Multiselect__search"
                id={`toggler:${id}`}
                aria-label={texts.search}
                aria-controls={domId()}
                data-expanded={isOpen || undefined}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                onClick={() => toggleOpen()}
                value={searchQuery}
                // onFocus={handleInputFocus}
                placeholder={placeholderText}
                disabled={disabled}
                ref={inputRef}
              />
            ) : (
              <button
                className="Multiselect__toggler"
                id={`toggler:${id}`}
                type="button"
                aria-label={texts.buttonShow}
                aria-controls={domId()}
                aria-expanded={isOpen}
                onClick={() => toggleOpen()}
                disabled={disabled}
                // Seems like an innocent hack for visible "placeholder" value.
                // For scren-readers aria-label should take precedence.
                ref={inputRef as React.RefObject<HTMLButtonElement>}
              >
                {placeholderText || ' '}
              </button>
            )}

            <div className="Multiselect__choices" tabIndex={-1}>
              {isBrowser && showCurrentValues && (
                <div
                  className="Multiselect__currentvalues"
                  onClick={
                    isOpen || disabled
                      ? undefined
                      : () => {
                          toggleOpen();
                          inputRef.current?.focus();
                        }
                  }
                  aria-label={`${texts.currentValues}:`}
                >
                  {values
                    .map((value) => options.find((opt) => opt.value === value))
                    .filter(notNully)
                    .map((item, idx) => (
                      <TagPill
                        key={idx}
                        large
                        label={item.label || item.value}
                        {...(isOpen && !readOnly
                          ? {
                              removable: true,
                              onRemove: () => {
                                handleCheckboxSelection(item);
                              },
                            }
                          : { removable: false })}
                      />
                    ))}
                </div>
              )}
              <ul
                id={id}
                className="Multiselect__options"
                aria-expanded={isBrowser ? isOpen : undefined}
                hidden={isBrowser && !isOpen}
                role="group"
                aria-labelledby={inputProps['aria-labelledby']}
                aria-describedby={inputProps['aria-describedby']}
                aria-required={props.required}
              >
                {filteredOptions.length ? (
                  filteredOptions.map((item, idx) => {
                    const isDisabled =
                      item.disabled != null
                        ? item.disabled
                        : disableds && disableds.includes(idx);

                    const isChecked = values.includes(item.value);

                    return (
                      <Checkbox
                        key={idx}
                        className={getBemClass(
                          'Multiselect__option',
                          activeItemIndex === idx && 'focused'
                        )}
                        disabled={isDisabled}
                        readOnly={readOnly}
                        required={props.required}
                        Wrapper="li"
                        name={name}
                        {...item}
                        checked={isChecked}
                        aria-invalid={props.invalid}
                        label={item.label || item.value}
                        onChange={() => handleCheckboxSelection(item)}
                        onFocus={() => setActiveItemIndex(idx)}
                        wrapperProps={{
                          onMouseEnter: () => setActiveItemIndex(idx),
                        }}
                      />
                    );
                  })
                ) : searchQuery ? (
                  <li className="Multiselect__noresults">{texts.noneFoundMsg}</li>
                ) : undefined}
                <FocusTrap Tag="li" />
              </ul>
            </div>
          </div>
        );
      }}
    />
  );
};

/** Configuration constants for the Multiselect components */
Multiselect.meta = metaData;
