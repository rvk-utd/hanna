import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import domId from '@hugsmidjan/qj/domid';
import { useOnClickOutside } from '@hugsmidjan/react/hooks';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { FocusTrap } from './_abstract/_FocusTrap';
import Checkbox from './Checkbox';
import FormField from './FormField';
import { SearchInputProps } from './SearchInput';
import TagPill from './TagPill';

/** The item-count where the list becomes searchable */
const searchableLimit = 20;
/**
 * The item-count where we display a summary of "current" values
 * at the top of the drop-down list
 */
const summaryLimit = 10;

// ---------------------------------------------------------------------------

type Item = {
  label: string;
  value: string;
};

type MultiselectProps = {
  items: Array<Item>;
  /**
   * Prevent the selected items from wrapping into multiple lines.
   * Use this option when vertical space is limited.
   */
  nowrap?: boolean;
};

const Multiselect = (props: MultiselectProps & SearchInputProps) => {
  const _inputRef = useRef<HTMLInputElement>(null);

  const { onChange, inputRef = _inputRef, ...inputElementProps } = props;
  const { items } = inputElementProps;

  const wrapperRef = useRef<HTMLDivElement>(null);

  const isSearchable = items.length >= searchableLimit;
  const [selectedItems, setSelectedItems] = useState<Array<Item>>([]);
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(wrapperRef, () => setIsOpen(false));

  /*
    NOTE: he `.MultiSelect__currentvalues` should only be visible when
    there are some items selected, and multiselect is either collapsed,
    or the dropdown has reached `summaryLimit` number of items.
    (For fewer items, the "summary" is just in the way.)
  */
  const showCurrentValues =
    selectedItems.length > 0 && (!isOpen || items.length >= summaryLimit);

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        const sq = searchQuery.toLowerCase();
        const result = item.label.toLowerCase().includes(sq);
        return result;
      }),
    [searchQuery, items]
  );

  const handleCheckboxSelection = useCallback(
    (item: Item) => {
      const itemHasNotBeenSelected = !selectedItems.find(
        (selItem) => selItem.value === item.value
      );
      const updatedSelectedItems = itemHasNotBeenSelected
        ? [...selectedItems, item]
        : selectedItems.filter((selected) => selected.value !== item.value);

      setSelectedItems(updatedSelectedItems);
    },
    [selectedItems]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    const fixVal = val === ' ' ? val.trimEnd() : val;
    setSearchQuery(fixVal);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ' && searchQuery.length === 0) {
      setSearchQuery('');
      // setActiveItemIndex(0);
      setIsOpen((isOpen) => (activeItemIndex > -1 ? true : !isOpen));
    }
  };

  const removeSelectedItem = (item: Item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const focusInRange = activeItemIndex >= 0 && activeItemIndex < filteredItems.length;
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveItemIndex((prevIndex) =>
          prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1
        );
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveItemIndex((prevIndex) =>
          prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
        );
      } else if ((e.key === 'Enter' || e.key === ' ') && focusInRange) {
        e.preventDefault();
        const selItem = filteredItems[activeItemIndex];
        if (selItem) {
          handleCheckboxSelection(selItem);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItemIndex, filteredItems, isOpen, handleCheckboxSelection]);

  // Auto-close the dropdown when focus has left the building
  useEffect(() => {
    const wrapperDiv = wrapperRef.current;
    let closing: ReturnType<typeof setTimeout>;
    const cancelClose = () => clearTimeout(closing);
    const closeDropdown = () => {
      closing = setTimeout(() => {
        setIsOpen(false);
      }, 200);
    };
    wrapperDiv?.addEventListener('focusout', closeDropdown);
    wrapperDiv?.addEventListener('focusin', cancelClose);
    return () => {
      wrapperDiv?.removeEventListener('focusout', closeDropdown);
      wrapperDiv?.removeEventListener('focusin', cancelClose);
    };
  }, []);

  useEffect(() => {
    wrapperRef.current
      ?.querySelectorAll('.Multiselect__options > *')
      [activeItemIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
  }, [activeItemIndex]);

  return (
    <FormField
      className={getBemClass('Multiselect', props.nowrap && 'nowrap')}
      label="Select an option"
      LabelTag="h4"
      wrapperRef={wrapperRef}
      renderInput={(className, inputProps, addFocusProps, isBrowser) => {
        return (
          <div className={className.input} {...addFocusProps()}>
            {!isBrowser ? null : isSearchable ? (
              <input
                aria-controls={domId()}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                value={searchQuery}
                onFocus={() => setActiveItemIndex(-1)}
                {...inputProps}
                {...inputElementProps}
                ref={inputRef}
              />
            ) : (
              <button
                className="Multiselect__inputbutton"
                type="button"
                aria-label={isOpen ? 'Fela valkosti' : 'Birta valkosti'}
                aria-controls={domId()}
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
              ></button>
            )}
            <div className="Multiselect__container" tabIndex={-1}>
              {isBrowser && showCurrentValues && (
                <div className="Multiselect__currentvalues" aria-label="Valin gildi:">
                  {selectedItems.map((selItem, indx) => (
                    <TagPill
                      key={indx}
                      label={selItem.label}
                      {...(isOpen
                        ? {
                            removable: true,
                            onRemove: () => {
                              removeSelectedItem(selItem);
                            },
                          }
                        : { removable: false })}
                    />
                  ))}
                </div>
              )}
              <ul
                id={domId()}
                className="Multiselect__options"
                role="group"
                aria-expanded={isOpen}
                hidden={!isOpen}
              >
                {filteredItems.map((item, indx) => {
                  return (
                    <Checkbox
                      className={getBemClass(
                        'Multiselect__option',
                        activeItemIndex === indx && 'focus'
                      )}
                      key={indx}
                      Wrapper="li"
                      label={item.label}
                      onChange={() => handleCheckboxSelection(item)}
                      checked={selectedItems.includes(item)}
                      onFocus={() => setActiveItemIndex(indx)}
                      wrapperProps={{
                        onMouseEnter: () => setActiveItemIndex(indx),
                      }}
                    />
                  );
                })}
                <FocusTrap Tag="li" />
              </ul>
            </div>
          </div>
        );
      }}
    />
  );
};

export default Multiselect;
