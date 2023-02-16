import React, { useMemo, useState } from 'react';
import { useCombobox, useMultipleSelection } from 'downshift';

import Checkbox from './Checkbox';
import TagPill from './TagPill';

type Option = {
  label: string;
  value: string;
};

const options = [
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

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const initialSelectedItems: Array<Option> = [options[0]!, options[1]!];

const getFilteredBooks = (selectedItems: Array<Option>, inputValue: string) => {
  const lowerCasedInputValue = inputValue.toLowerCase();

  return options
    .map((option) => ({ ...option } as Option))
    .filter(function filterBook(book: Option) {
      return (
        !selectedItems.includes(book) &&
        (book.label.toLowerCase().includes(lowerCasedInputValue) ||
          book.value.toLowerCase().includes(lowerCasedInputValue))
      );
    });
};

const svgImage = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
    </svg>
  );
};

const MultiSelectDownshift = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<Array<Option>>(initialSelectedItems);
  const items = useMemo(
    () => getFilteredBooks(selectedItems, inputValue),
    [selectedItems, inputValue]
  );

  const { getSelectedItemProps, getDropdownProps, addSelectedItem, removeSelectedItem } =
    useMultipleSelection({
      selectedItems,
      onStateChange({ selectedItems: newSelectedItems, type }) {
        switch (type) {
          case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
          case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
          case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
            if (newSelectedItems) {
              setSelectedItems(newSelectedItems);
            }
            break;
          default:
            break;
        }
      },
    });

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    selectItem,
  } = useCombobox({
    items,
    itemToString(item) {
      return item ? item.label : '';
    },
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    stateReducer(state, actionAndChanges) {
      const { changes, type } = actionAndChanges;

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            ...(changes.selectedItem && { isOpen: true, highlightedIndex: 0 }),
          };
        default:
          return changes;
      }
    },
    onStateChange({ inputValue: newInputValue, type, selectedItem: newSelectedItem }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick: {
          const newArray = [...selectedItems, newSelectedItem] as Array<Option>;
          setSelectedItems(newArray);
          break;
        }

        case useCombobox.stateChangeTypes.InputChange:
          if (newInputValue) {
            setInputValue(newInputValue);
          }
          break;
        default:
          break;
      }
    },
  });

  return (
    <div>
      <p>MultiSelect with Downshift</p>
      <br />
      <br />
      <div className="Multiselect flex flex-col gap-1">
        <div className="shadow-sm bg-white inline-flex gap-2 items-center flex-wrap p-1.5">
          {selectedItems.map(function renderSelectedItem(selectedItemForRender, index) {
            return (
              <TagPill
                key={`selected-item-${index}`}
                type="button"
                removable
                onRemove={() => {
                  removeSelectedItem(selectedItemForRender);
                }}
                {...getSelectedItemProps({
                  selectedItem: selectedItemForRender,
                  index,
                })}
              >
                {selectedItemForRender.label}
              </TagPill>
            );
          })}
          <div className="Multiselect__inputcontainer">
            <input
              placeholder="Select an option..."
              className="Multiselect_input"
              {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            />
            <button
              aria-label="toggle menu"
              className="Multiselect_inputButton"
              type="button"
              {...getToggleButtonProps()}
            >
              {svgImage()}
            </button>
          </div>
        </div>
      </div>
      <ul
        className={`Multiselect__options ${isOpen || 'Multiselect__options--hidden'}`}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              className={`Multiselect__option ${
                highlightedIndex === index && 'Multiselect__option--selected'
              }`}
              {...getItemProps({
                item,
                index,
                checked: selectedItems.includes(item),
              })}
              key={`${item.label}${index}`}
            >
              <Checkbox
                label={item.label}
                value={item.value}
                onChange={() => selectItem(item)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MultiSelectDownshift;
