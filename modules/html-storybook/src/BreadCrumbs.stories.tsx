import React, { useMemo } from 'react';
import { BreadCrumbs } from '@reykjavik/hanna-react/BreadCrumbs';
import { boolean, number } from '@storybook/addon-knobs';

import { crumbTrail } from './utils/_dummyData.js';
import { StoryComponent, StoryParameters } from './storytypes.js';

export default {
  title: 'Layout/BreadCrumbs',
  component: BreadCrumbs,
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _BreadCrumbs: StoryComponent = () => {
  const trailLength = number('Length', 4, { min: 2, max: 4 });
  const sparse = boolean('Sparse links', false);
  const links = useMemo(() => {
    const links = crumbTrail.slice(0, trailLength);
    if (sparse) {
      const i = Math.min(2, trailLength - 1);
      links[i] = { label: links[i]!.label };
    }
    return links;
  }, [sparse, trailLength]);

  return <BreadCrumbs title="Þú ert hér" trail={links} />;
};
