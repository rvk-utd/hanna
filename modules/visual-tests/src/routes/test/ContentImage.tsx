import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import ContentImage from '@reykjavik/hanna-react/ContentImage';

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
      Image with caption and credit
      <ContentImage
        image={photo.landscape}
        caption={lorem.medium}
        credit={'©2017 ' + lorem.tiny}
      />
      <hr />
      Image with caption
      <ContentImage image={photo.landscape} caption={lorem.medium} />
      <hr />
      Image with caption
      <ContentImage image={photo.landscape} credit={'©2017 ' + lorem.tiny} />
    </Minimal>
  );
}

export const testing: TestingInfo = {};
