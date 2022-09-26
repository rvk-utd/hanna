import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import AccordionList from '@reykjavik/hanna-react/AccordionList';

import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

const makeItems = () => [
  {
    title:
      'Accordion list with label spreading over 2 lines, ' +
      'spreading over 2 lines, spreading over 2 lines',
    content: 'Hello this accordion item starts open',
  },
  {
    title: 'Accordion item',
    content: lorem.medium,
  },
  {
    title: 'Accordion items',
    content: 'Hello content',
    disabled: true,
  },
];

// ---------------------------------------------------------------------------

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    <Minimal>
      <AccordionList items={makeItems()} startSeen />
      <AccordionList items={makeItems()} defaultOpen={[0, 1, 2]} startSeen />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.AccordionList__button >> nth=0',
  extras: async ({ page, localScreenshot }) => {
    const disabledButton = await page.locator('.AccordionList__button[disabled]').first();
    await disabledButton.hover({ force: true });
    await localScreenshot(
      disabledButton.locator('closest=.AccordionList__item'),
      'disabled-item-hover'
    );
  },
};
