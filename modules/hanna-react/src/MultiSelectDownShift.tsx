import React, { useMemo, useState } from 'react';
import { useCombobox, useMultipleSelection } from 'downshift';

import TagPill from './TagPill';

type Book = {
  author: string;
  title: string;
};

const books = [
  { author: 'Harper Lee', title: 'To Kill a Mockingbird' },
  { author: 'Lev Tolstoy', title: 'War and Peace' },
  { author: 'Fyodor Dostoyevsy', title: 'The Idiot' },
  { author: 'Oscar Wilde', title: 'A Picture of Dorian Gray' },
  { author: 'George Orwell', title: '1984' },
  { author: 'Jane Austen', title: 'Pride and Prejudice' },
  { author: 'Marcus Aurelius', title: 'Meditations' },
  { author: 'Fyodor Dostoevsky', title: 'The Brothers Karamazov' },
  { author: 'Lev Tolstoy', title: 'Anna Karenina' },
  { author: 'Fyodor Dostoevsky', title: 'Crime and Punishment' },
];

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const initialSelectedItems: Array<Book> = [books[0]!, books[1]!];

const getFilteredBooks = (selectedItems: Array<Book>, inputValue: string) => {
  const lowerCasedInputValue = inputValue.toLowerCase();

  return books
    .map((book) => ({ ...book } as Book))
    .filter(function filterBook(book: Book) {
      return (
        !selectedItems.includes(book) &&
        (book.title.toLowerCase().includes(lowerCasedInputValue) ||
          book.author.toLowerCase().includes(lowerCasedInputValue))
      );
    });
};

const MultiSelectDownshift = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState<Array<Book>>(initialSelectedItems);
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
  } = useCombobox({
    items,
    itemToString(item) {
      return item ? item.title : '';
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
          const newArray = [...selectedItems, newSelectedItem] as Array<Book>;
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
      <div className="Multiselect flex flex-col gap-1">
        <label className="w-fit" {...getLabelProps()}>
          Pick some books:
        </label>
        <div className="shadow-sm bg-white inline-flex gap-2 items-center flex-wrap p-1.5">
          <TagPill type="button" removable onRemove={() => undefined}>
            Green TagPill
          </TagPill>
          {selectedItems.map(function renderSelectedItem(selectedItemForRender, index) {
            return (
              <span
                className="bg-gray-100 rounded-md px-1 focus:bg-red-400"
                key={`selected-item-${index}`}
                {...getSelectedItemProps({
                  selectedItem: selectedItemForRender,
                  index,
                })}
              >
                {selectedItemForRender.title}
                <span
                  className="px-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSelectedItem(selectedItemForRender);
                  }}
                >
                  &#10005;
                </span>
              </span>
            );
          })}
          <div className="Multiselect__inputcontainer">
            <input
              placeholder="Best book ever"
              className="Multiselect_input"
              {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            />
            <button
              aria-label="toggle menu"
              className="Multiselect_inputButton"
              type="button"
              {...getToggleButtonProps()}
            >
              <svg
                height="20"
                width="20"
                viewBox="0 0 20 20"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <ul
        className={`absolute w-inherit bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 ${
          !(isOpen && items.length) && 'hidden'
        }`}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li key={`${item.title}${index}`} {...getItemProps({ item, index })}>
              <span>{item.title}</span>
              <span className="text-sm text-gray-700">{item.author}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MultiSelectDownshift;
