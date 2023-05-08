import React, { Fragment, useState } from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { CheckboxButtonsGroup } from '@reykjavik/hanna-react/CheckboxButtonsGroup';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import { lorem } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export const options = [
  {
    value: 'text',
    label: (
      <Fragment>
        Some checkbox text <small>Extra info</small>
      </Fragment>
    ),
  },
  {
    value: 'random',
    label: (
      <Fragment>
        Random text <a href="">link</a> <small>Extra info</small>
      </Fragment>
    ),
  },
  {
    value: 'long',
    label: (
      <Fragment>
        {lorem.tiny} <small>Longer extra info</small>
      </Fragment>
    ),
  },
  {
    disabled: true,
    value: 'disabled',
    label: (
      <Fragment>
        Disabled checkbox <small>Extra info</small>
      </Fragment>
    ),
  },
  {
    value: 'tiny',
    label: lorem.tiny,
  },
  {
    value: 'label',
    label: 'Label Label',
  },
  {
    value: 'great',
    label: (
      <Fragment>
        {lorem.tiny.slice(0, 50)}{' '}
        <small>
          Extra extra info (<a href="">with link</a>) that is a bit longer than it maybe
          should be
        </small>
      </Fragment>
    ),
  },
];

export default function () {
  const [value, setValue] = useState(['text']);
  return (
    <Minimal>
      <CheckboxButtonsGroup
        label="Checkbox Group"
        options={options}
        defaultValue={['text']}
        required={true}
        name="normal"
      />
      <DummyBlock thin />
      <CheckboxButtonsGroup
        label="Invalid Checkbox Group"
        options={options.slice(0, 4)}
        value={value}
        onSelected={({ selectedValues }) => setValue(selectedValues)}
        invalid
        name="invalid"
        errorMessage="This is an error message"
      />
      <DummyBlock thin />
      <CheckboxButtonsGroup
        label="Disabled Checkbox Group"
        options={options.slice(0, 2)}
        value={['text']}
        disabled
        name="disabled"
        assistText="This is an assist text..."
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {};
