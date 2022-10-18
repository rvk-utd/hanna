import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import ContentImage from '@reykjavik/hanna-react/ContentImage';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import { lorem, photo } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
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
