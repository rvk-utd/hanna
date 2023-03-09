import React, { useEffect, useRef, useState } from 'react';

import Checkbox from './Checkbox';
import TagPill from './TagPill';
import TextInput from './TextInput';

type Item = {
  label: string;
  value: string;
};

type MultiSelectCustomProps = {
  items: Array<Item>;
};

const MultiSelectCustom = (props: MultiSelectCustomProps) => {
  const { items } = props;

  const [selectedItems, setSelectedItems] = useState<Array<Item>>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const filteredItems = items.filter((item) => {
    const sq = searchQuery.toLowerCase();
    const result = item.label.toLowerCase().includes(sq);
    return result;
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setSearchQuery(val.trimEnd());
  };

  const handleItemClick = (item: Item) => {
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

  const removeSelectedItem = (item: Item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isClickOutside =
        selectRef.current &&
        !selectRef.current.contains(target) &&
        !['TagPill', 'TagPill__button', 'TagPill__remove'].some((className) =>
          target.classList.contains(className)
        );
      if (isClickOutside) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [selectRef]);

  return (
    <div
      className={`MultiselectCustom ${
        isOpen ? 'MultiselectCustom--open' : 'MultiselectCustom--closed'
      }`}
      ref={selectRef}
    >
      <div className="MultiselectCustom__input">
        {items.length > 10 && (
          <TextInput
            onChange={handleSearchChange}
            className="MultiselectCustom__textInput"
            label="Select a flavour.."
            onClick={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
          />
        )}

        <ul
          className="MultiselectCustom__options"
          id="multi-select-dropdown"
          tabIndex={-1}
          role="menu"
        >
          {selectedItems.length > 0 && (
            <li className="MultiselectCustom__tags">
              <div className="MultiselectCustom__tagpills">
                {selectedItems.map((tag) => (
                  <TagPill
                    key={tag.label}
                    type="button"
                    removable
                    onRemove={() => {
                      removeSelectedItem(tag);
                    }}
                  >
                    {tag.label}
                  </TagPill>
                ))}
              </div>
            </li>
          )}

          {filteredItems.map((item, indx) => {
            return (
              <li
                className="MultiselectCustom__option"
                key={item.label}
                role="option"
                aria-selected={selectedItems.includes(item)}
                id={`multiselectCustom-option-${indx}`}
              >
                <Checkbox
                  label={item.label}
                  onChange={() => handleItemClick(item)}
                  checked={selectedItems.includes(item)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MultiSelectCustom;
