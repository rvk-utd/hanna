import React, { useRef, useState } from 'react';
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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(wrapperRef, () => setIsOpen(false));

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
    // inputRef.current?.focus();

    const itemHasNotBeenSelected = !selectedItems.find(
      (selItem) => selItem.value === item.value
    );
    const updatedSelectedItems = itemHasNotBeenSelected
      ? [...selectedItems, item]
      : selectedItems.filter((selected) => selected.value !== item.value);

    setSelectedItems(updatedSelectedItems);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      setIsOpen(true);
    }
  };

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
                aria-controls="Multiselect_options"
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
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
                id="Multiselect_options"
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
