import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { RowBlock } from '@reykjavik/hanna-react/RowBlock';
import { RowBlockColumn } from '@reykjavik/hanna-react/RowBlockColumn';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import { lorem, loremRT } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <RowBlock right startSeen>
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

      <RowBlock startSeen>
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

      <RowBlock startSeen>
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
