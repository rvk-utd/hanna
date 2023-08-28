import React, { Fragment } from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { IslandBlock, IslandBlockProps } from '@reykjavik/hanna-react/IslandBlock';

import { Minimal } from '../../layout/Minimal.js';
import { lorem, photo } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;
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
        summary: c === 3 ? lorem.short : c === 2 ? undefined : lorem.medium,
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
    <Minimal>
      {testCombos.map((props, i) => (
        <Fragment key={i}>
          <IslandBlock {...props} />
        </Fragment>
      ))}
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.IslandBlock__button >> nth=0',
};
