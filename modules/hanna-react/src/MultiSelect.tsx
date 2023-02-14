import React, { useState } from 'react';
import Select, { components, OptionProps } from 'react-select';
// import makeAnimated from 'react-select/animated';

// https://codesandbox.io/s/bedj8?file=/src/App.js:109-1274
// https://codesandbox.io/s/4w6wmo1n1x?file=/src/index.tsx:1109-1116

type OptionGaur = {
  value: string;
  label: string;
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

// const animatedComponents = makeAnimated();

const InputOption = ({
  getStyles,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}: OptionProps<OptionGaur, false>) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = 'transparent';
  if (isFocused) {
    bg = '#eee';
  }
  if (isActive) {
    bg = '#B2D4FF';
  }

  const style = {
    alignItems: 'center',
    backgroundColor: bg,
    color: 'inherit',
    display: 'flex ',
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <input type="checkbox" checked={isSelected} />
      {children}
    </components.Option>
  );
};

const MultiSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState<Array<OptionGaur>>([]);
  return (
    <div>
      <p>MultiSelect</p>
      <Select<OptionGaur>
        placeholder="Select a flavour..."
        defaultValue={[]}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        onChange={(options) => {
          if (Array.isArray(options)) {
            setSelectedOptions(options.map((opt) => opt));
          }
        }}
        options={options}
        components={{
          Option: InputOption,
        }}
      />
      <pre>{JSON.stringify({ selected: selectedOptions }, null, 2)}</pre>
    </div>
  );
};

export default MultiSelect;
