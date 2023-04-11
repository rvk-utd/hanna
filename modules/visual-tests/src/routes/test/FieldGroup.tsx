import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Checkbox } from '@reykjavik/hanna-react/Checkbox';
import { FieldGroup } from '@reykjavik/hanna-react/FieldGroup';
import { Selectbox } from '@reykjavik/hanna-react/Selectbox';
import { TextInput } from '@reykjavik/hanna-react/TextInput';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route';

export const meta: MetaFunction = autoTitle;

// Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens('Checkbox', 'TextInput', 'Selectbox');

export default function () {
  return (
    <Minimal>
      <FieldGroup legend="Group Headline">
        <TextInput label="Enter text please" value="" />
        <Selectbox label="Enter text please" options={['', 'Hi!']} value="" />
        <Checkbox label="Tick me please" />
      </FieldGroup>
      <DummyBlock thin />
      <FieldGroup legend="Disabled Group Headline" disabled>
        <TextInput label="Enter text please" value="" />
        <Selectbox label="Enter text please" options={['', 'Hi!']} value="" />
        <Checkbox label="Tick me please" />
        {/** /
        <TextInput label="Enter text please" disabled />
        <Selectbox label="Enter text please" options={[]} disabled />
        /**/}
      </FieldGroup>
      <DummyBlock thin />
      <FieldGroup legend="Small Legend" small>
        <TextInput label="Enter text please" value="" />
        <p>Other fields...</p>
      </FieldGroup>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
