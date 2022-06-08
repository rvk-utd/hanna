import React from 'react';
import MiniMetrics from '@reykjavik/hanna-react/MiniMetrics';

import { StoryComponent, StoryParameters } from './storytypes';

// ===========================================================================

export default {
  title: 'MiniMetrics',
  parameters: {} as StoryParameters,
};

export const _MiniMetrics: StoryComponent = () => (
  <MiniMetrics
    text="78% nemanda upplifðu gleði 2019"
    moreButton={{ href: '', label: 'Skoða mælaborðið' }}
    startSeen
  />
);
