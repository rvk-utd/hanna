import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { IslandPageBlock } from '@reykjavik/hanna-react/IslandPageBlock';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import { illustr, loremRT } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const buttonList = [
  { href: '', label: 'Button number one' },
  { href: '', label: 'Button number two' },
  { href: '', label: 'Button number three' },
];
export default function () {
  return (
    <Minimal>
      <IslandPageBlock
        title="Left aligned"
        align="left"
        buttons={buttonList.slice(0, 1)}
        background="none"
        image={illustr.tall}
        startSeen
      />
      <DummyBlock thin />
      <IslandPageBlock
        title="Right aligned"
        summary={loremRT.short()}
        buttons={buttonList.slice(0, 2)}
        align="right"
        background="gray"
        image={illustr.tall}
        startSeen
      />
      <DummyBlock thin />
      <IslandPageBlock
        title="Left aligned with secondary background"
        summary={loremRT.medium(true)}
        buttons={buttonList}
        align="left"
        background="secondary"
        image={illustr.tall}
        startSeen
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {};
