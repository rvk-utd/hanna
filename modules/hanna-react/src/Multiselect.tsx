import React, { useRef, useState } from 'react';

import Checkbox from './Checkbox';
import TagPill from './TagPill';
import TextInput from './TextInput';

type Item = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  items: Array<Item>;
};

const MultiSelect = (props: MultiSelectProps) => {
  const { items } = props;

  const [selectedItems, setSelectedItems] = useState<Array<Item>>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const textInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <>
      <div
        className={`Multiselect ${isOpen ? 'Multiselect--open' : 'Multiselect--closed'}`}
      >
        <div className="Multiselect__input">
          {items.length > 10 && (
            <TextInput
              onChange={handleSearchChange}
              className="Multiselect__textInput"
              label="Select a flavour.."
              ref={textInputRef}
              onClick={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
            />
          )}

          <ul
            className="Multiselect__options"
            id="multi-select-dropdown"
            tabIndex={-1}
            role="menu"
          >
            {selectedItems.length > 0 && (
              <li className="Multiselect__tags">
                <div>
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
                  <hr className="Multiselect__divider" />
                </div>
              </li>
            )}

            {filteredItems.map((item, indx) => {
              return (
                <li
                  className="Multiselect__option"
                  key={item.label}
                  role="option"
                  aria-selected={selectedItems.includes(item)}
                  id={`multiselect-option-${indx}`}
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

      <pre>
        <code>{JSON.stringify(filteredItems, null, 2)}</code>
      </pre>
    </>
  );
};

export default MultiSelect;
