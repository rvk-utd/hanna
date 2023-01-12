import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { RadioButtonsGroup } from '@reykjavik/hanna-react/RadioButtonsGroup';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

import { options } from './CheckboxButtonsGroup';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    <Minimal>
      <RadioButtonsGroup
        label="Radio Buttons Group"
        options={options}
        value="text"
        required={true}
        name="normal"
      />
      <DummyBlock thin />
      <RadioButtonsGroup
        label="Invalid Radio buttons Group"
        options={options.slice(0, 4)}
        value="text"
        invalid
        name="invalid"
        errorMessage="This is an error message"
      />
      <DummyBlock thin />
      <RadioButtonsGroup
        label="Disabled Radio buttons Group"
        options={options.slice(0, 2)}
        value="text"
        disabled
        name="disabled"
        assistText="This is an error message"
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  __DEV_FOCUS__: true,
};
