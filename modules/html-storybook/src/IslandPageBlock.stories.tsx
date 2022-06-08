import React from 'react';
import IslandPageBlock from '@reykjavik/hanna-react/IslandPageBlock';
import { illustrations } from '@reykjavik/hanna-utils/assets';
import { boolean, optionsKnob } from '@storybook/addon-knobs';

import { getSummary, someButtons, TITLE_LONG } from './utils/_dummyData';
import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'IslandPageBlock',
  parameters: {
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _IslandPageBlock: StoryComponent = () => {
  const align = optionsKnob('Layout', { Left: 'left', Right: 'right' }, 'right', {
    display: 'inline-radio',
  });
  const background =
    optionsKnob('Background', { None: '', Gray: 'gray', Secondary: 'secondary' }, '', {
      display: 'inline-radio',
    }) || undefined;
  const summary = boolean('Summary text', true) || undefined;
  const numButtons = parseInt(
    optionsKnob('Links', { 0: '0', 1: '1', 2: '2', 3: '3' }, '2', {
      display: 'inline-radio',
    })
  );

  return (
    <IslandPageBlock
      title={TITLE_LONG}
      summary={summary && getSummary('html', 'strong')}
      buttons={someButtons.slice(0, numButtons)}
      align={align}
      background={background}
      illustration={illustrations[5]}
      startSeen
    />
  );
};
