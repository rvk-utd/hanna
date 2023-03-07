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
                onChange={handleSearchChange}
                onFocus={() => setIsOpen(true)}
                {...inputProps}
                {...inputElementProps}
                ref={props.inputRef}
              />
            )}
            <div className="MultiSelectHanna__container">
              <ul
                className="MultiSelectHanna__options"
                aria-labelledby="my-heading-id"
                role="group"
                aria-expanded={isOpen}
                hidden={!isOpen}
              >
                {filteredItems.map((item, indx) => {
                  return (
                    <li className="MultiSelectHanna__option" key={item.label}>
                      <Checkbox
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
