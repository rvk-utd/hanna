import React from 'react';
import Tooltip from '@reykjavik/hanna-react/Tooltip';
import { boolean } from '@storybook/addon-knobs';

import { loremRT } from '../../visual-tests/src/test-helpers/dummyData';

import { StoryComponent, StoryParameters } from './storytypes';

// ===========================================================================

export default {
  title: 'Tooltip',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _Tooltip: StoryComponent = () => {
  const iconOnlyKnob = boolean('Icon only', false);
  return <Tooltip label="Hover me" text={loremRT.tiny(true)} iconOnly={iconOnlyKnob} />;
};
