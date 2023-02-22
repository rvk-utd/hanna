import React, { useRef, useState } from 'react';

import Checkbox from './Checkbox';
import SubHeading from './SubHeading';
import TagPill from './TagPill';
import TextInput from './TextInput';

type Item = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  items: Array<Item>;
};

const svgImage = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
    </svg>
  );
};

const MultiSelect = (props: MultiSelectProps) => {
  const { items } = props;

  const [selectedItems, setSelectedItems] = useState<Array<Item>>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
      setIsDropdownOpen(true);
    }
  };

  const removeSelectedItem = (item: Item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  return (
    <>
      <SubHeading startSeen={false}>Multiselect - Custom </SubHeading>

      <div className="Multiselect">
        <div
          className="Multiselect__inputcontainer"
          tabIndex={0}
          onFocus={() => {
            textInputRef.current?.focus();
          }}
        >
          {selectedItems.map((item) => (
            <TagPill
              key={item.label}
              type="button"
              removable
              label={item.label}
              onRemove={() => {
                removeSelectedItem(item);
              }}
            />
          ))}
          <div className="Multiselect__input">
            <TextInput
              onChange={handleSearchChange}
              className="Multiselect__textInput"
              label="Select a flavour.."
              ref={textInputRef}
              onClick={() => setIsDropdownOpen(true)}
              onKeyDown={handleKeyDown}
            />
            <button className="Multiselect__button" type="button" tabIndex={-1}>
              {svgImage()}
            </button>
          </div>
        </div>

        <ul
          className={`Multiselect__options ${
            isDropdownOpen || 'Multiselect__options--hidden'
          }`}
          role="listbox"
          aria-multiselectable="true"
          aria-activedescendant="multiselect-option-0"
        >
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

      <pre>
        <code>{JSON.stringify(filteredItems, null, 2)}</code>
      </pre>
    </>
  );
};

export default MultiSelect;
