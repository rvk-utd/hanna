import React from 'react';
import IslandBlock, { IslandBlockProps } from '@reykjavik/hanna-react/IslandBlock';
import { formheimur } from '@reykjavik/hanna-utils/assets';
import { boolean, optionsKnob } from '@storybook/addon-knobs';

import { getSummary, someButtons, TITLE_LONG, TITLE_SHORT } from './utils/_dummyData';
import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'IslandBlock',
  component: IslandBlock,
  parameters: {
    knobs: { theming: true, disabled: false },
  } as StoryParameters,
};

export const _IslandBlock: StoryComponent = () => {
  const type = optionsKnob(
    'Type',
    {
      "'Formheimur' SVG image": 'svg-asset',
      'Two text boxes': 'textonly',
    },
    'svg-asset',
    { display: 'inline-radio' }
  );

  const shapeImage = undefined;
  // const shapeImage =
  // 	type === 'svg-asset'
  // 		? select('Shape type', formheimur, 'sjorinn' )
  // 		: undefined;

  const align = optionsKnob('Layout', { Left: 'left', Right: 'right' }, 'right', {
    display: 'inline-radio',
  });
  const summary = boolean('Summary text', true) || undefined;
  const numButtons = parseInt(
    optionsKnob('Links', { 0: '0', 1: '1', 2: '2', 3: '3' }, '2', {
      display: 'inline-radio',
    })
  );
  const content = {
    title: TITLE_LONG,
    summary: summary && getSummary('html', 'strong'),
    buttons: someButtons.slice(0, numButtons),
  };

  const contentProps =
    type === 'textonly'
      ? { content: [content, { ...content, title: TITLE_SHORT + ' 2' }] }
      : { content, shapes: /* shapeImage ||  */ formheimur[3] };

  return <IslandBlock align={align} {...contentProps} startSeen />;
};

// ===========================================================================

const getSummaryType = (c: number) => (c % 3 ? 'html' : c % 2 ? 'text' : undefined);

const testCombos = (['svg-asset', 'textonly'] as const).reduce<Array<IslandBlockProps>>(
  (list, type) => {
    (['right', 'left'] as const).forEach((align) => {
      const c = 2 * list.length + 1;

      const content = {
        title: TITLE_LONG,
        summary: getSummary(getSummaryType(c), 'a'),
        buttons: someButtons.slice(0, 1 + ((c + 2) % 3)),
      };

      if (type === 'textonly') {
        const content2 = {
          title: TITLE_SHORT + ' 2',
          summary: getSummary(getSummaryType(c + 1), 'strong'),
          buttons: someButtons.slice(0, 1 + ((c + 3) % 3)),
        };

        list.push({
          align,
          content: [content, content2],
        });
      } else {
        list.push({
          align,
          content,
          shapes: formheimur[3],
        });
      }
    });
    return list;
  },
  []
);

// ---------------------------------------------------------------------------

export const IslandBlock_Examples: StoryComponent = () => (
  <>
    {' '}
    {testCombos.map((props, i) => (
      <React.Fragment key={i}>
        <IslandBlock {...props} startSeen />
        {'\n\n'}
      </React.Fragment>
    ))}
  </>
);
IslandBlock_Examples.story = {
  parameters: {
    knobs: { disabled: true },
  },
};
