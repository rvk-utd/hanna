import React from 'react';
import { MiniMetrics } from '@reykjavik/hanna-react/MiniMetrics';

export const MiniMetricsStory = () => (
  <MiniMetrics
    text="78% nemanda upplifðu gleði 2019"
    moreButton={{ href: '', label: 'Skoða mælaborðið' }}
    startSeen
  />
);
