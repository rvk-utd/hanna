import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { RowBlock } from '@reykjavik/hanna-react/RowBlock';
import { RowBlockColumn } from '@reykjavik/hanna-react/RowBlockColumn';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import { lorem, loremRT } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <RowBlock right>
        <RowBlockColumn background="primary">
          <strong>1. Column (Right Aligned)</strong>
          <br />
          {loremRT.medium()}
          {loremRT.medium()}
        </RowBlockColumn>
        <RowBlockColumn>
          <strong>2. Column</strong>
          <br /> {lorem.tiny.slice(0, 20)}
          <hr />
          Horizontal Rule
        </RowBlockColumn>
      </RowBlock>

      <DummyBlock thin />

      <RowBlock>
        <RowBlockColumn background>
          <strong>1. Column Left Aligned </strong>
          <br />
          {loremRT.short()}
        </RowBlockColumn>
        <RowBlockColumn background narrow>
          <strong>2. Column Narrow</strong>
        </RowBlockColumn>
      </RowBlock>

      <DummyBlock thin />

      <RowBlock>
        <RowBlockColumn background="primary" narrow>
          <strong>1. Column Left Aligned Narrow</strong>
          <br />
          {loremRT.short()}
        </RowBlockColumn>
        <RowBlockColumn background narrow>
          <strong>2. Column Narrow</strong>
          <br />
          {loremRT.long()}
        </RowBlockColumn>
      </RowBlock>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
