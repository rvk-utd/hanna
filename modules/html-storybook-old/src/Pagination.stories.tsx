import React from 'react';
import Pagination from '@reykjavik/hanna-react/Pagination';
import { optionsKnob } from '@storybook/addon-knobs';

import { StoryComponent, StoryParameters } from './storytypes.js';

// ===========================================================================

export default {
  title: 'Pagination',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _Pagination: StoryComponent = () => {
  const type = optionsKnob(
    'Button type',
    { Links: 'link', Buttons: 'button', 'Submit buttons': 'submit' },
    'link',
    { display: 'inline-radio' }
  );
  const [current, pageCount] = optionsKnob(
    'Status',
    {
      'First page': [1, 25],
      'Page near the middie': [9, 25],
      'Last page': [9, 25],
      'Short list': [1, 5],
    },
    [1, 25],
    { display: 'radio' }
  );

  const props =
    type === 'link'
      ? ({
          href: '?page=${page}',
        } as const)
      : ({
          onChange: () => undefined,
          submit: type === 'submit',
        } as const);

  const key = [type, current, pageCount].join('-');

  return <Pagination key={key} current={current} pageCount={pageCount} {...props} />;
};
