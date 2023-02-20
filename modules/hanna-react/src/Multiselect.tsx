import React, { useState } from 'react';

import Checkbox from './Checkbox';
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

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleItemClick = (item: Item) => {
    const itemHasNotBeenSelected = !selectedItems.find(
      (selected) => selected.value === item.value
    );
    if (itemHasNotBeenSelected) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((selected) => selected.value !== item.value));
    }
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <p>MultiSelect</p>
      <br />
      <br />
      <div className="MultiSelect__header">
        <TextInput
          onChange={handleSearchChange}
          className="MultiSelect__textInput"
          label="Select a flavour.."
        />
        <button className="MultiSelect__button" type="button">
          {svgImage()}
        </button>
      </div>

      <ul className="MultiSelect__options">
        {filteredItems.map((item, indx) => {
          return (
            <li className="MultiSelect__option" key={`${item.label}${indx}`}>
              <Checkbox
                label={item.label}
                onChange={() => handleItemClick(item)}
                checked={selectedItems.includes(item)}
              />
            </li>
          );
        })}
      </ul>

      <pre>
        <code>{JSON.stringify(selectedItems, null, 2)}</code>
      </pre>
    </div>
  );
};

export default MultiSelect;
