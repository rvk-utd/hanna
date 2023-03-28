import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Form } from '@reykjavik/hanna-react/Form';

import { checkeredBackground, DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      {checkeredBackground('.Form')}
      <Form>Normal</Form>
      <DummyBlock thin />
      <Form wide>Wide</Form>
      <DummyBlock thin />
      <Form align="right">Align right</Form>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
