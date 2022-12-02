import React from 'react';
import { Skeleton } from '@reykjavik/hanna-react/Skeleton';

import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'Skeleton',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  } as StoryParameters,
};

export const _Skeleton: StoryComponent = () => (
  <>
    <p>
      <br /> Single line:
      <Skeleton text />
    </p>
    <p>
      <br /> Multi-line:
      <Skeleton text height={4} />
    </p>
    <p>
      <br /> Block:
      <Skeleton height={6} />
    </p>

    <p>
      <br /> Multi item (default gap: 3):
      <Skeleton items={3} height={3} text />
    </p>
    <p>
      <br /> Multi block:
      <Skeleton items={3} height={3} gap={1} />
    </p>
  </>
);
