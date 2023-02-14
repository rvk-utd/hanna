import React, { useState } from 'react';
import Downshift from 'downshift';

import './MultiSelect.css';

type Option = {
  value: string;
  label: string;
};

// https://codesandbox.io/s/downshift-typescript-basic-n73f0?from-embed=&file=/src/index.tsx:262-271

const options: Array<Option> = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
  { value: 'coffee', label: 'Coffee' },
  { value: 'mint-chocolate-chip', label: 'Mint Chocolate Chip' },
  { value: 'rocky-road', label: 'Rocky Road' },
  { value: 'cookies-and-cream', label: 'Cookies and Cream' },
  { value: 'butter-pecan', label: 'Butter Pecan' },
  { value: 'pistachio', label: 'Pistachio' },
  { value: 'maple-walnut', label: 'Maple Walnut' },
  { value: 'caramel', label: 'Caramel' },
  { value: 'fudge', label: 'Fudge' },
];

const MultiSelect = () => {
  const [selectedItems, setSelectedItems] = useState<Array<Option>>([]);

  const handleSelection = (selectedItem: Option) => {
    const selected = selectedItems.includes(selectedItem)
      ? selectedItems.filter((item) => item !== selectedItem)
      : [...selectedItems, selectedItem];
    setSelectedItems(selected);
  };

  return (
    <div>
      <p>Huga buga</p>
      <Downshift
        itemToString={(item) => (item ? item.label : '')}
        onChange={(selectedItem) => handleSelection(selectedItem)}
        selectedItem={selectedItems}
        isOpen={true}
        multiple={true}
      >
        <p>hugabuga</p>
      </Downshift>
    </div>
  );
};

export default MultiSelect;
