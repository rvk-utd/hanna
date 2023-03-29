import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import ArticleMeta from '@reykjavik/hanna-react/ArticleMeta';
import { CenterColumn } from '@reykjavik/hanna-react/CenterColumn';
import Heading from '@reykjavik/hanna-react/Heading';
import { PageHeading } from '@reykjavik/hanna-react/PageHeading';
import { TextBlock } from '@reykjavik/hanna-react/TextBlock';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import { lorem, loremRT } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.server';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens(
  'CenterColumn',
  'PageHeading',
  'TextBlock',
  'ArticleMeta',
  'Heading'
);

export default function () {
  return (
    <Minimal>
      <CenterColumn>
        <PageHeading startSeen>This is the page heading</PageHeading>
        <TextBlock startSeen>
          <p>{lorem.short}</p>
          <p>{loremRT.medium(true)}</p>
          <h2>Lorem ipsum H2 title</h2>
          <p>{lorem.medium}</p>
        </TextBlock>
      </CenterColumn>
      <DummyBlock thin />
      <CenterColumn>
        <ArticleMeta items={[{ label: 'Meta meta' }]} />
        <Heading>This is the page heading</Heading>
        <TextBlock startSeen>
          <p>{lorem.short}</p>
        </TextBlock>
      </CenterColumn>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
