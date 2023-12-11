import React, { Fragment, useState } from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { RadioGroup } from '@reykjavik/hanna-react/RadioGroup';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

import { options } from './CheckboxGroup.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  const [value, setValue] = useState('text');
  return (
    <Minimal>
      {([undefined, 'inline'] as const).map((layout, i) => {
        const opts = !layout ? options.slice(0, 3) : options;
        const name = layout || '';
        return (
          <Fragment key={i}>
            {i > 0 && <DummyBlock thin />}
            <RadioGroup
              layout={layout}
              label="Checkbox Group"
              options={opts}
              defaultValue="text"
              required={true}
              name={`${name}normal`}
            />
            <DummyBlock thin />
            <RadioGroup
              layout={layout}
              label="Invalid Checkbox Group"
              options={opts}
              value={value}
              onSelected={({ value }) => setValue(value)}
              invalid
              name={`${name}invalid`}
              errorMessage="This is an error message"
            />
            <DummyBlock thin />
            <RadioGroup
              layout={layout}
              label="Checkbox Group"
              disabled
              options={opts}
              defaultValue="text"
              required={true}
              name={`${name}disabled`}
            />
          </Fragment>
        );
      })}
    </Minimal>
  );
}

export const testing: TestingInfo = {};
