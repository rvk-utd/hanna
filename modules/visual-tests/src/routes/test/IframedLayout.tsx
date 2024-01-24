import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { IframedLayout } from '@reykjavik/hanna-react/IframedLayout';

import { DummyBlock, GhostLabel } from '../../layout/DummyBlock.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('XXXXX');

export default function () {
  return (
    <IframedLayout>
      <GhostLabel label="IframedLayout" black />
      <DummyBlock big />
      <div style={{ height: '1000px' }} />
      <DummyBlock big />
    </IframedLayout>
  );
}

export const testing: TestingInfo = {};
