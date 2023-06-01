/* eslint-disable no-await-in-loop */
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
      <p>Right float: {lorem.medium}</p>

      <DummyBlock thin />

      <ReadSpeakerPlayer float readId="2" wrapperProps={{ 'data-testid': 'rsp2' }} />
      <p>Left float: {lorem.medium}</p>

      <DummyBlock thin />

      <ReadSpeakerPlayer
        align="right"
        readId="3"
        wrapperProps={{ 'data-testid': 'rsp3' }}
      />
      <p>Right: {lorem.medium}</p>

      <DummyBlock thin />

      <ReadSpeakerPlayer readId="4" wrapperProps={{ 'data-testid': 'rsp4' }} />
      <p>Left: {lorem.medium}</p>
    </Minimal>
  );
}

export const testing: TestingInfo = {
  async extras({ page, localScreenshot }) {
    await localScreenshot();
  },
};
