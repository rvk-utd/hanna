import React, { Fragment } from 'react';
import { ReadSpeakerPlayer } from '@reykjavik/hanna-react/ReadSpeakerPlayer';
import { boolean, optionsKnob } from '@storybook/addon-knobs';

import { lorem } from './utils/_dummyData.js';
import { StoryComponent, StoryParameters } from './storytypes.js';

// ===========================================================================

export default {
  title: 'ReadSpeakerPlayer',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _ReadSpeakerPlayer: StoryComponent = () => {
  const align =
    optionsKnob(
      'Layout',
      {
        'Left (default)': '',
        'Right aligned': 'right',
      },
      '',
      { display: 'inline-radio' }
    ) || undefined;

  const float = boolean('CSS Float', false);

  return (
    <Fragment key={'' + align + float}>
      <ReadSpeakerPlayer align={align} float={float} />
      <p>{lorem.medium}</p>
    </Fragment>
  );
};
