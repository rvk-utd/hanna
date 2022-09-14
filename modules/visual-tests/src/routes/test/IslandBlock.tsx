import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import IslandBlock, { IslandBlockProps } from '@reykjavik/hanna-react/IslandBlock';

import { Minimal } from '../../layout/Minimal';
import { lorem, photo } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;
const buttons = [
  { href: '', label: 'Dagskrá næsta fundar' },
  { href: '', label: 'Stjórnkerfi' },
  { href: '', label: 'Nánari upplýsingar' },
  { href: '', label: 'Enn frekari upplýsingar' },
];

const testCombos = (['svg-asset', 'textonly'] as const).reduce<Array<IslandBlockProps>>(
  (list, type) => {
    (['right', 'left'] as const).forEach((align) => {
      const c = list.length;

      const content = {
        title: c === 1 || c === 2 ? 'Lorem ipsum' : lorem.tiny,
        summary: c === 3 ? lorem.short : lorem.medium,
        buttons: c === 0 ? [] : buttons.slice(c, buttons.length),
      };

      if (type === 'textonly') {
        const content2 = {
          title: lorem.tiny,
          summary: c === 2 ? lorem.short : lorem.medium,
          buttons: buttons.slice(0, c),
        };

        list.push({
          align,
          content: [content, content2],
        });
      } else {
        list.push({
          align,
          content,
          image: photo.landscape,
        });
      }
    });
    return list;
  },
  []
);

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      {testCombos.map((props, i) => (
        <React.Fragment key={i}>
          <IslandBlock {...props} startSeen />
          {'\n\n'}
        </React.Fragment>
      ))}
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: 'IslandBlock__button',
};
