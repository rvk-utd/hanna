import React from 'react';
import { useMultipleSelection, useSelect } from 'downshift';

type ItemGaur = {
  value: string;
  label: string;
};

const itemsList = [
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

const MultiSelectDownshift = () => {
  const { getSelectedItemProps, selectedItems, removeSelectedItem } =
    useMultipleSelection<ItemGaur | undefined>({
      initialSelectedItems: [itemsList[0], itemsList[1]],
    });

  const { getLabelProps, getMenuProps, getItemProps } = useSelect({ items: itemsList });
  return (
    <div>
      <p>MultiSelect</p>
      <label {...getLabelProps()}>Choose a flavour</label>
      {selectedItems.map((selectedItem, index) => (
        <span
          key={`selected-item-${index}`}
          {...getSelectedItemProps({ selectedItem, index })}
        >
          {selectedItem?.label}
          <span onClick={() => removeSelectedItem(selectedItem)}>&#10005;</span>
        </span>
      ))}

      <ul {...getMenuProps()}>
        {itemsList.map((item, index) => (
          <li key={`${item}${index}`} {...getItemProps({ item, index })}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultiSelectDownshift;
