import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Attention } from '@reykjavik/hanna-react/Attention';
import { LabeledTextBlock } from '@reykjavik/hanna-react/LabeledTextBlock';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import { lorem, loremRT } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');
const buttons = [
  { href: '', label: 'See more' },
  { href: '', label: 'See more' },
];

export default function () {
  return (
    <Minimal>
      <LabeledTextBlock
        startSeen
        label="Labeled Text Block"
        summary={<p>{lorem.medium}</p>}
      />
      <DummyBlock thin />
      <LabeledTextBlock
        startSeen
        label="Labeled Text Block with buttons "
        buttons={buttons}
        summary={<p>{lorem.medium}</p>}
      />
      <DummyBlock thin />
      <LabeledTextBlock
        startSeen
        label="Wide with buttons"
        wide
        buttons={buttons}
        summary={<p>{lorem.medium}</p>}
      />
      <DummyBlock thin />
      <LabeledTextBlock
        startSeen
        label="Wide with Attention message"
        wide
        summary={
          <Fragment>
            <p>{lorem.medium}</p>
            <Attention>{loremRT.short(true)}</Attention>
          </Fragment>
        }
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {};
