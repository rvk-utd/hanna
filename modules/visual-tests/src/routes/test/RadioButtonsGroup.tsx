import React, { useState } from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { RadioButtonsGroup } from '@reykjavik/hanna-react/RadioButtonsGroup';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

import { options } from './CheckboxButtonsGroup.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  const [value, setValue] = useState('text');
  return (
    <Minimal>
      <RadioButtonsGroup
        label="Radio Buttons Group"
        options={options}
        defaultValue="text"
        required={true}
        name="normal"
      />
      <DummyBlock thin />
      <RadioButtonsGroup
        label="Invalid Radio buttons Group"
        options={options.slice(0, 4)}
        value={value}
        onSelected={({ value }) => setValue(value)}
        invalid
        name="invalid"
        errorMessage="This is an error message"
      />
      <DummyBlock thin />
      <RadioButtonsGroup
        label="Disabled Radio buttons Group"
        options={options.slice(0, 2)}
        defaultValue="text"
        disabled
        name="disabled"
        assistText="This is an error message"
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {};
