import React from 'react';
import { css } from '@reykjavik/hanna-css';
import { Picture } from '@reykjavik/hanna-react/Picture';
import { boolean } from '@storybook/addon-knobs';

import landscapeImage from './example_assets/NewsHero__landscape.jpg';
import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'Picture',
  parameters: {
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _Picture: StoryComponent = () => {
  const focalPoint = boolean('Custom image focal point', false) ? '80% 80%' : undefined;

  return (
    <>
      <div className="demobox">
        <Picture src={landscapeImage} focalPoint={focalPoint} />
      </div>
      {'\n\n'}
      <div className="demobox">
        <Picture src={landscapeImage} focalPoint={focalPoint} contain />
      </div>
      {'\n\n'}
      <style>{css`
        .demobox {
          float: left;
          width: 320px;
          height: 320px;
          border: 1px solid red;
          margin-right: 2em;
          margin-bottom: 2em;
        }
      `}</style>
    </>
  );
};
