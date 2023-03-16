import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import domId from '@hugsmidjan/qj/domid';
import { useOnClickOutside } from '@hugsmidjan/react/hooks';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import Checkbox from './Checkbox';
import FormField from './FormField';
import { SearchInputProps } from './SearchInput';

type Item = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  items: Array<Item>;
};

const MultiSelect = (props: MultiSelectProps & SearchInputProps) => {
  const _inputRef = useRef<HTMLInputElement>(null);

  const { onChange, inputRef = _inputRef, ...inputElementProps } = props;
  const { items } = inputElementProps;

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [selectedItems, setSelectedItems] = useState<Array<Item>>([]);
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(wrapperRef, () => setIsOpen(false));

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

  return (
    <FormField
      className="MultiSelect"
      label="Select an option"
      LabelTag="h4"
      wrapperRef={wrapperRef}
      renderInput={(className, inputProps, addFocusProps, isBrowser) => {
        return (
          <div className={className.input} {...addFocusProps()}>
            {isBrowser && (
              <input
                aria-controls={domId()}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                value={searchQuery}
                onFocus={() => setActiveItemIndex(-1)}
                onClick={() =>
                  setIsOpen((isOpen) => {
                    // TODO: Make this more nuanced ... maybe for active searches.?
                    return !isOpen;
                  })
                }
                {...inputProps}
                {...inputElementProps}
                ref={inputRef}
              />
            )}
            <div className="MultiSelect__container" tabIndex={-1}>
              {/* TOOD: Insert currently selected tagpills here */}
              <ul
                id={domId()}
                className="MultiSelect__options"
                role="group"
                aria-expanded={isOpen}
                hidden={!isOpen}
              >
                {filteredItems.map((item, indx) => {
                  return (
                    <Checkbox
                      className={getBemClass(
                        'MultiSelect__option',
                        activeItemIndex === indx && 'focus'
                      )}
                      key={indx}
                      Wrapper="li"
                      label={item.label}
                      onChange={() => handleCheckboxSelection(item)}
                      checked={selectedItems.includes(item)}
                      onFocus={() => setActiveItemIndex(indx)}
                      wrapperProps={{
                        onMouseEnter: () => {
                          setActiveItemIndex(indx);
                        },
                      }}
                    />
                  );
                })}
                <li
                  // "focus trap"
                  tabIndex={0}
                  onFocus={(e) => {
                    e.currentTarget.parentElement?.querySelector('input')?.focus();
                    // e.currentTarget
                    //   .closest('.FormField__input')
                    //   ?.querySelector<HTMLButtonElement | HTMLInputElement>('input, button')
                    //   ?.focus();
                  }}
                />
              </ul>
            </div>
          </div>
        );
      }}
    />
  );
};

export default MultiSelect;
