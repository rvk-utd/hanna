import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { ContentImage } from '@reykjavik/hanna-react/ContentImage';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import { lorem, photo } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <ContentImage
        image={photo.banner}
        caption={lorem.medium}
        credit={'©2017 ' + lorem.tiny}
      />
      <DummyBlock thin />
      <div style={{ width: '50%', margin: '0 auto' }}>
        <ContentImage image={photo.banner} caption={lorem.tiny} />
      </div>
      <DummyBlock thin />
      <ContentImage image={photo.portrait} credit={'©2017 ' + lorem.tiny} />
    </Minimal>
  );
}

export const testing: TestingInfo = {};
