import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import TextBlock from '@reykjavik/hanna-react/TextBlock';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

const text = (headline: string) => {
  return (
    <Fragment>
      <h2>{headline}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quam voluptas
        necessitatibus <a href="">Text link demo</a> in beatae distinctio cum!
      </p>
      <h3>Test h3 title</h3>
      <ul>
        <li>Test bullet 1</li>
        <li>
          Test bullet 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
          dolores esse animi laboriosam!{' '}
        </li>
        <li>Test bullet 3</li>
      </ul>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo</p>
      <hr />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo</p>
      <h2>Testing a H2 headline</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo{' '}
        <a href="">text with line wrapping </a> quam voluptas necessitatibus in beatae
        distinctio cum!
      </p>
      <h4>Test h4 title!</h4>
      <blockquote>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quam voluptas
        necessitatibus in beatae distinctio cum!
      </blockquote>
    </Fragment>
  );
};

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <TextBlock small={true} startSeen>
        {text('Left aligned with small text')}
      </TextBlock>
      <br />
      <TextBlock align="right" small={false} startSeen>
        {text('Right aligned with regular text')}
      </TextBlock>
      <br />
      <TextBlock wide={true} small={false} startSeen>
        {text('Wide with regular text')}
      </TextBlock>
      <br />
      <TextBlock labelled={true} small={false} startSeen>
        {text('Labelled with regular text')}
      </TextBlock>
    </Minimal>
  );
}

export const testing: TestingInfo = {
  tags: ['chrome'],
  __DEV_FOCUS__: true,
  extras: async ({ page, localScreenshot, pageScreenshot }) => {
    const smallText = page.locator('.TextBlock--small');
    const rightAligned = page.locator('.TextBlock--align--right >> nth = 0');
    const wide = page.locator('.TextBlock--wide');
    const labelled = page.locator('.TextBlock--labelled');

    // await localScreenshot(smallText, 'smallText', { margin: true });
    // await localScreenshot(rightAligned, 'rightAligned', { margin: true });
    // await localScreenshot(wide, 'wideLayout', { margin: true });

    const boundingBox = await labelled.evaluate((elm) => elm.getBoundingClientRect());
    // Doesn't snap full labbelled TextBlock because the headlines are located in the margin section - fullpage needs to be clipped to frame labelled
    // await pageScreenshot('labelled', {
    //   clip: {
    //     x: boundingBox.x - 800,
    //     y: boundingBox.y,
    //     width: boundingBox.width + 2 * 800,
    //     height: boundingBox.height,
    //   },
    // });

    await localScreenshot(labelled, 'testing', { margin: [600, 0] });
    await localScreenshot(labelled, 'testing2', { margin: 600 });
    await localScreenshot(labelled, 'testing3');
  },
};
