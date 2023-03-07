import React, { useEffect, useRef, useState } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import Checkbox from './Checkbox';
import FormField from './FormField';
import { SearchInputProps } from './SearchInput';

type Item = {
  label: string;
  value: string;
};

type MultiSelectHannaProps = {
  items: Array<Item>;
};

const MultiSelectHanna = (props: MultiSelectHannaProps & SearchInputProps) => {
  const { onChange, ...inputElementProps } = props;
  const { value, items } = inputElementProps;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectedItems, setSelectedItems] = useState<Array<Item>>([]);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = items.filter((item) => {
    const sq = searchQuery.toLowerCase();
    const result = item.label.toLowerCase().includes(sq);
    return result;
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setSearchQuery(val.trimEnd());
  };

  const handleCheckboxSelection = (item: Item) => {
    const itemHasNotBeenSelected = !selectedItems.find(
      (selItem) => selItem.value === item.value
    );
    const updatedSelectedItems = itemHasNotBeenSelected
      ? [...selectedItems, item]
      : selectedItems.filter((selected) => selected.value !== item.value);

    setSelectedItems(updatedSelectedItems);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const clickIsInside = wrapperRef.current?.contains(target);
      if (!clickIsInside) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    const handleCheckboxSelectionByKeyboard = (index: number) => {
      const selectedItem = filteredItems[index];
      const itemHasBeenSelected = selectedItems.some((p) => p === selectedItem);

      const updatedSelectedItems =
        selectedItem && !itemHasBeenSelected
          ? [...selectedItems, selectedItem]
          : selectedItems.filter((selected) => selected !== selectedItem);

      setSelectedItems(updatedSelectedItems);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      console.log('event.key: ', event.key);
      switch (event.key) {
        case 'ArrowDown': {
          setFocusedIndex((prevIndex) =>
            prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
          );
          break;
        }
        case 'ArrowUp': {
          setFocusedIndex((prevIndex) =>
            prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1
          );
          break;
        }
        case 'Enter': {
          handleCheckboxSelectionByKeyboard(focusedIndex);
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

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, filteredItems.length, focusedIndex, filteredItems, selectedItems]);

  return (
    <FormField
      className={getBemClass('MultiSelectHanna', null)}
      label="Select an option"
      LabelTag="h4"
      wrapperRef={wrapperRef}
      renderInput={(className, inputProps, addFocusProps, isBrowser) => {
        return (
          <div className={className.input} {...addFocusProps()}>
            {isBrowser && (
              <input
                aria-owns="MultiselectHanna_options"
                onChange={handleSearchChange}
                onFocus={() => setIsOpen(true)}
                {...inputProps}
                {...inputElementProps}
                ref={props.inputRef}
              />
            )}
            <div className="MultiSelectHanna__container">
              <ul
                role="listbox"
                id="MultiselectHanna_options"
                aria-activedescendant={`MultiSelectHanna__option-${focusedIndex}`}
                aria-multiselectable={true}
                className="MultiSelectHanna__options"
                hidden={!isOpen}
              >
                {filteredItems.map((item, indx) => {
                  return (
                    <li
                      role="option"
                      id={`MultiSelectHanna__option-${indx}`}
                      className={`MultiSelectHanna__option ${
                        indx === focusedIndex ? 'focused' : ''
                      }`}
                      aria-selected={selectedItems.includes(item)}
                      key={item.label}
                    >
                      <Checkbox
                        tabIndex={-1}
                        label={item.label}
                        onChange={() => handleCheckboxSelection(item)}
                        checked={selectedItems.includes(item)}
                      />
                    </li>
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

export default MultiSelectHanna;
