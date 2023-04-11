import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { VSpacer } from '@reykjavik/hanna-react/VSpacer';

import { DummyBlock, GhostLabel } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <GhostLabel label="VSpacer" />
      <VSpacer size="default" />

      <DummyBlock thin />

      <GhostLabel label="VSpacer--small" />
      <VSpacer size="small" />

      <DummyBlock thin />

      <GhostLabel label="VSpacer--medium" />
      <VSpacer size="medium" />

      <DummyBlock thin />

      <GhostLabel label="VSpacer--large" />
      <VSpacer size="large" />

      <DummyBlock thin />

      <GhostLabel label="VSpacer--xlarge" />
      <VSpacer size="xlarge" />
    </Minimal>
  );
}

export const testing: TestingInfo = {};
