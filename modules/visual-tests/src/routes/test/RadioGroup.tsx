import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { RadioGroup } from '@reykjavik/hanna-react/RadioGroup';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

import { options } from './CheckboxGroup';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
//export const handle = { cssTokens: [] };

export default function () {
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
              value="text"
              required={true}
              name={name + 'normal'}
            />
            <DummyBlock thin />
            <RadioGroup
              layout={layout}
              label="Invalid Checkbox Group"
              options={opts}
              value="text"
              invalid
              name={name + 'invalid'}
              errorMessage="This is an error message"
            />
            <DummyBlock thin />
            <RadioGroup
              layout={layout}
              label="Checkbox Group"
              disabled
              options={opts}
              value="text"
              required={true}
              name={name + 'disabled'}
            />
          </Fragment>
        );
      })}
    </Minimal>
  );
}

export const testing: TestingInfo = {};
