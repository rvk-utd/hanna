import React, { useState } from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import Checkbox from './Checkbox';
import FormField from './FormField';
import { SearchInputProps } from './SearchInput';

type Item = {
  label: string;
  value: string;
};

type MultiSelectHannaProps = {
  items: Array<Item>;
};

const MultiSelectHanna = (props: MultiSelectHannaProps & SearchInputProps) => {
  const { onChange, ...inputElementProps } = props;
  const { value, items } = inputElementProps;

  const [hasValue, setHasValue] = useState<boolean | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const _onChange: typeof onChange =
    value != null
      ? onChange
      : (e) => {
          setHasValue(!!e.target.value);
          onChange && onChange(e);
        };

  return (
    <FormField
      className={getBemClass('MultiSelectHanna', null)}
      label="Select an option"
      LabelTag="h4"
      renderInput={(className, inputProps, addFocusProps, isBrowser) => {
        console.log('className: ', className);
        return (
          <div className={className.input} {...addFocusProps()}>
            {isBrowser && (
              <input
                onChange={_onChange}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
                {...inputProps}
                {...inputElementProps}
                ref={props.inputRef}
              />
            )}
            <div className="MultiSelectHanna__container">
              <ul
                className="MultiSelectHanna__options"
                aria-labelledby="my-heading-id"
                role="group"
                aria-expanded={isOpen}
                hidden={!isOpen}
              >
                {items.map((item, indx) => {
                  return (
                    <li className="MultiSelectHanna__option" key={item.label}>
                      <Checkbox
                        label={item.label}
                        onChange={() => console.log(item)}
                        checked={false}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      }}
    />
  );
};

export default MultiSelectHanna;
