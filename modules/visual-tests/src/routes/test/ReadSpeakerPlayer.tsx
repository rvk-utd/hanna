import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { ReadSpeakerPlayer } from '@reykjavik/hanna-react/ReadSpeakerPlayer';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import { lorem } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

export default function () {
  return (
    <Minimal>
      <ReadSpeakerPlayer
        align="right"
        float
        readId="1"
        wrapperProps={{ 'data-testid': 'rsp1' }}
      />
      <p>
        <b>Right float:</b> {lorem.medium}
      </p>

      <DummyBlock thin />

      <ReadSpeakerPlayer float readId="2" wrapperProps={{ 'data-testid': 'rsp2' }} />
      <p>
        <b>Left float:</b> {lorem.medium}
      </p>

      <DummyBlock thin />

      <ReadSpeakerPlayer
        align="right"
        readId="3"
        wrapperProps={{ 'data-testid': 'rsp3' }}
      />
      <p>
        <b>Right block:</b> {lorem.medium}
      </p>

      <DummyBlock thin />

      <ReadSpeakerPlayer readId="4" wrapperProps={{ 'data-testid': 'rsp4' }} />
      <p>
        <b>Left block:</b> {lorem.medium}
      </p>
    </Minimal>
  );
}

export const testing: TestingInfo = {
  // TODO: Re-enable this and review the screenshots to see if the playe design has changed
  tags: [], // Temporarily disable these tests while the external readspeaker server is having hickups

  initialHover: '[data-testId="rsp1"] .rsbtn_tooltoggle',
  async extras({ page, pageScreenshot, mediaFormat }) {
    if (!mediaFormat('tablet')) {
      return;
    }

    const rsp1 = page.getByTestId('rsp1');

    await rsp1.locator('.rsbtn_tooltoggle').click();
    await rsp1.locator('.rsbtn_toollist > li:nth-child(4)').hover();
    await pageScreenshot('menu-open');

    const { width, height } = page.viewportSize() || { width: 0, height: 0 };
    await page.setViewportSize({
      width,
      // account for player resize causing linewrapping and the popup player
      // initially rendering too high
      height: height + 24,
    });

    await rsp1.locator('.rsbtn_play').click();
    await pageScreenshot('player-open');
  },
};
