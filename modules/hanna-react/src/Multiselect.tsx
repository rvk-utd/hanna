import React, { useCallback, useEffect, useRef, useState } from 'react';
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
      // setFocusedIndex(0);
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

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === 'ArrowUp' || (e.shiftKey && e.key === 'Tab')) {
        setFocusedIndex((prevIndex) =>
          prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1
        );
      } else if (e.key === 'ArrowDown' || e.key === 'Tab') {
        setFocusedIndex((prevIndex) =>
          prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
        );
      } else if ((e.key === 'Enter' || e.key === ' ') && focusInRange) {
        const selItem = filteredItems[focusedIndex];
        if (selItem) {
          handleCheckboxSelection(selItem);
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false);
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
  }, [
    isOpen,
    focusedIndex,
    filteredItems,
    wrapperRef,
    checkboxes,
    handleCheckboxSelection,
  ]);

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
                onClick={() => setIsOpen(true)}
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
