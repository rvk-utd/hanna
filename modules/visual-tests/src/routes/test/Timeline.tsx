import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Timeline } from '@reykjavik/hanna-react/Timeline';
import { timelineItems } from 'modules/html-storybook/src/stories/Timeline.stories';

import { Minimal } from '../../layout/Minimal.js';
import { autoTitle } from '../../utils/meta.js';

// ---------------------------------------------------------------------------

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <div>
        <Timeline items={timelineItems} />
      </div>
    </Minimal>
  );
}

// ---------------------------------------------------------------------------
