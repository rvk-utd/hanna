import React, { useMemo, useState } from 'react';
import { useCombobox, useMultipleSelection } from 'downshift';

import Checkbox from './Checkbox';
import SubHeading from './SubHeading';
import TagPill from './TagPill';

type Option = {
  label: string;
  value: string;
};

type MultiSelectDownshiftProps = {
  options: Array<Option>;
};

const getFilteredItems = (
  selectedItems: Array<Option>,
  inputValue: string,
  options: Array<Option>
) => {
  const lowerCasedInputValue = inputValue.toLowerCase();

  return options
    .map((option) => ({ ...option } as Option))
    .filter((option: Option) => {
      return (
        !selectedItems.includes(option) &&
        (option.label.toLowerCase().includes(lowerCasedInputValue) ||
          option.value.toLowerCase().includes(lowerCasedInputValue))
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

const MultiSelectDownshift = (props: MultiSelectDownshiftProps) => {
  const { options } = props;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const initialSelectedItems: Array<Option> = [options[0]!, options[1]!];
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<Array<Option>>(initialSelectedItems);
  const items = useMemo(
    () => getFilteredItems(selectedItems, inputValue, options),
    [selectedItems, inputValue, options]
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
      <SubHeading>Multiselect - Downshift</SubHeading>
      <div className="MultiselectDownshift">
        <div>
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
          <div className="MultiselectDownshift_inputcontainer">
            <input
              placeholder="Select an option..."
              className="MultiselectDownshift_input"
              {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            />
            <button
              aria-label="toggle menu"
              className="MultiselectDownshift_inputButton"
              type="button"
              {...getToggleButtonProps()}
            >
              {svgImage()}
            </button>
          </div>
        </div>
      </div>
      <ul
        className={`MultiselectDownshift__options ${
          isOpen || 'MultiselectDownshift__options--hidden'
        }`}
        {...getMenuProps()}
      >
        {items.map((item, index) => (
          <li
            className={`MultiselectDownshift__option ${
              highlightedIndex === index && 'MultiselectDownshift__option--selected'
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
