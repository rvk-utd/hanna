import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import RowBlock from '@reykjavik/hanna-react/RowBlock';
import RowBlockColumn from '@reykjavik/hanna-react/RowBlockColumn';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import { lorem, loremRT } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <RowBlock right startSeen>
        <RowBlockColumn background="primary">
          <strong>First Column Right Aligned </strong>
          <br />
          {loremRT.medium()}
        </RowBlockColumn>
        <RowBlockColumn narrow={false}>
          <strong>Second Column</strong>
          <br /> {lorem.tiny}
        </RowBlockColumn>
      </RowBlock>
      <DummyBlock thin />
      <RowBlock startSeen>
        <RowBlockColumn background={true}>
          <strong>First Column Left Aligned </strong>
          <br />
          {loremRT.short()}
        </RowBlockColumn>
        <RowBlockColumn background={true} narrow={true}>
          <strong>Narrow Second Column</strong>
        </RowBlockColumn>
      </RowBlock>
      <DummyBlock thin />
      <RowBlock startSeen>
        <RowBlockColumn background="primary" narrow>
          <strong>Narrow First Column Left Aligned </strong>
          <br />
          {loremRT.short()}
        </RowBlockColumn>
        <RowBlockColumn background={true} narrow={true}>
          <strong>Narrow Second Column</strong>
          <br />
          {loremRT.long()}
        </RowBlockColumn>
      </RowBlock>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
