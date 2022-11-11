import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import VSpacer from '@reykjavik/hanna-react/VSpacer';

import { DummyBlock, GhostLabel } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

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
