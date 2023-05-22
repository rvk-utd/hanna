import React, { Fragment } from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { AccordionList } from '@reykjavik/hanna-react/AccordionList';
import { TextBlock } from '@reykjavik/hanna-react/TextBlock';

import { Minimal } from '../../layout/Minimal.js';
import { lorem, loremRT } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.js';

const makeItems = () => [
  {
    title:
      'Accordion list with label spreading over 2 lines, ' +
      'spreading over 2 lines, spreading over 2 lines',
    content: lorem.short,
  },
  {
    title: 'Accordion item',
    content: (
      <Fragment>
        <p>{loremRT.medium(true)}</p>
        <p>{lorem.short}</p>
        <ul>
          <li>{lorem.tiny}</li>
          <li>{lorem.short}</li>
        </ul>
        <TextBlock>
          <p>{lorem.short}</p>
        </TextBlock>
      </Fragment>
    ),
  },
  {
    title: 'Accordion items',
    content: lorem.tiny,
    disabled: true,
  },
];

// ---------------------------------------------------------------------------

export const meta: V2_MetaFunction = autoTitle;

// Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens('TextBlock');

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
    const disabledButton = await page.locator('.AccordionList__button:disabled').first();
    await disabledButton.hover({ force: true });
    await localScreenshot(
      disabledButton.locator('closest=.AccordionList__item'),
      'disabled-item-hover'
    );
  },
};
