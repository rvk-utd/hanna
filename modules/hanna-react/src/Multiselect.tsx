import React, { useEffect, useRef, useState } from 'react';
import domId from '@hugsmidjan/qj/domid';
import { wait } from '@hugsmidjan/qj/wait';
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
  const checkboxes = wrapperRef.current?.querySelectorAll('input[type="checkbox"]');

  const [selectedItems, setSelectedItems] = useState<Array<Item>>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(wrapperRef, () => setIsOpen(false));

  const filteredItems = items.filter((item) => {
    const sq = searchQuery.toLowerCase();
    const result = item.label.toLowerCase().includes(sq);
    return result;
  });

  const handleCheckboxSelection = (item: Item) => {
    // TODO: only apply on mouse click
    inputRef.current?.focus();

    const itemHasNotBeenSelected = !selectedItems.find(
      (selItem) => selItem.value === item.value
    );
    const updatedSelectedItems = itemHasNotBeenSelected
      ? [...selectedItems, item]
      : selectedItems.filter((selected) => selected.value !== item.value);

    setSelectedItems(updatedSelectedItems);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setSearchQuery(val.trimEnd());
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      setSearchQuery('');
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    wait(30).then(() => {
      const classList = wrapperRef.current?.classList;
      const isFocused = classList && classList.contains('FormField--focused');
      if (!isFocused) {
        setIsOpen(false);
      }
    });
  };

  useEffect(() => {
    const focusInRange = focusedIndex >= 0 && focusedIndex < filteredItems.length;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();
          setFocusedIndex((prevIndex) =>
            prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
          );
          break;
        }
        case 'ArrowUp': {
          event.preventDefault();
          setFocusedIndex((prevIndex) =>
            prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1
          );
          break;
        }
        case 'Enter': {
          if (focusInRange) {
            const selItem = filteredItems[focusedIndex];
            if (selItem) {
              handleCheckboxSelection(selItem);
            }
          }
          break;
        }
        default: {
          break;
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    if (focusInRange && checkboxes && checkboxes[focusedIndex]) {
      (checkboxes[focusedIndex] as HTMLElement).focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, focusedIndex, filteredItems, wrapperRef, checkboxes]);

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
                onBlur={handleBlur}
                value={searchQuery}
                onClick={() => {
                  setIsOpen(true);
                  setFocusedIndex(0);
                }}
                {...inputProps}
                {...inputElementProps}
                ref={inputRef}
              />
            )}
            <div className="MultiSelect__container" tabIndex={-1}>
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
                        focusedIndex === indx && 'focus'
                      )}
                      key={indx}
                      Wrapper="li"
                      label={item.label}
                      onChange={() => handleCheckboxSelection(item)}
                      checked={selectedItems.includes(item)}
                      onFocus={() => setFocusedIndex(indx)}
                      onBlur={() => {
                        if (checkboxes && indx === filteredItems.length - 1) {
                          handleBlur();
                          // setFocusedIndex(0);
                        }
                      }}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        );
      }}
    />
  );
};

export default MultiSelect;
