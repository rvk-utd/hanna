import React from 'react';

import Checkbox from './Checkbox';
import TextInput from './TextInput';

type Item = {
  label: string;
  value: string;
  group?: string;
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
  return (
    <div>
      <br />
      <br />
      <br />
      <p>MultiSelect</p>
      <br />
      <br />
      <div className="MultiSelect__header">
        <TextInput className="MultiSelect__textInput" label="Select a flavour.." />
        <button className="MultiSelect__button" type="button">
          {svgImage()}
        </button>
      </div>

      <ul className="MultiSelect__options">
        {items.map((item, indx) => {
          return (
            <li className="MultiSelect__option" key={`${item.label}${indx}`}>
              <Checkbox label={item.label} value={item.value} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MultiSelect;
