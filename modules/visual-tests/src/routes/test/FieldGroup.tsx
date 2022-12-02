import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Checkbox } from '@reykjavik/hanna-react/Checkbox';
import { FieldGroup } from '@reykjavik/hanna-react/FieldGroup';
import { Selectbox } from '@reykjavik/hanna-react/Selectbox';
import { TextInput } from '@reykjavik/hanna-react/TextInput';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// Use `handle` if you're using multiple Hanna compnents
export const handle = { cssTokens: ['Checkbox', 'TextInput', 'Selectbox'] };

export default function () {
  return (
    <Minimal>
      <FieldGroup legend="Group Headline">
        <Checkbox label="Tick me please" />
        <TextInput label="Enter text please" value="" />
        <Selectbox label="Enter text please" options={['', 'Hi!']} value="" />
      </FieldGroup>
      <DummyBlock thin />
      <FieldGroup legend="Disabled Group Headline" disabled>
        <Checkbox label="Tick me please" />
        <TextInput label="Enter text please" value="" />
        <Selectbox label="Enter text please" options={['', 'Hi!']} value="" />
        {/** /
        <TextInput label="Enter text please" disabled />
        <Selectbox label="Enter text please" options={[]} disabled />
        /**/}
      </FieldGroup>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
