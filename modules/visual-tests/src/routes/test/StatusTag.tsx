import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { StatusTag } from '@reykjavik/hanna-react/StatusTag';

import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.js';

// ---------------------------------------------------------------------------

export const meta: V2_MetaFunction = autoTitle;

export const handle = cssTokens('StatusTag');

export default function () {
  return (
    <Minimal>
      <div>
        <StatusTag wrapperProps={{ id: 'default-grey' }} color="grey">
          Grey
        </StatusTag>
        <StatusTag wrapperProps={{ id: 'default-blue' }}>Default</StatusTag>
        <StatusTag wrapperProps={{ id: 'default-green' }} color="green">
          Green
        </StatusTag>
        <StatusTag wrapperProps={{ id: 'default-yellow' }} color="yellow">
          Yellow
        </StatusTag>
        <StatusTag wrapperProps={{ id: 'default-red' }} color="red">
          Red
        </StatusTag>
      </div>
      <div>
        <StatusTag wrapperProps={{ id: 'lightoff-grey' }} light={false} color="grey">
          Light off Grey
        </StatusTag>
        <StatusTag wrapperProps={{ id: 'lightoff-blue' }} light={false}>
          Light off
        </StatusTag>
        <StatusTag wrapperProps={{ id: 'lightoff-green' }} light={false} color="green">
          Light off Green
        </StatusTag>
        <StatusTag wrapperProps={{ id: 'lightoff-yellow' }} light={false} color="yellow">
          Light off Yellow
        </StatusTag>
        <StatusTag wrapperProps={{ id: 'lightoff-red' }} light={false} color="red">
          Light off Red
        </StatusTag>
      </div>
      <div>
        <StatusTag wrapperProps={{ id: 'large-grey' }} large color="grey">
          Large Grey
        </StatusTag>
        <StatusTag wrapperProps={{ id: 'large-blue' }} large>
          Large Default
        </StatusTag>
        <StatusTag wrapperProps={{ id: 'large-green' }} large color="green">
          Large Green
        </StatusTag>
        <StatusTag wrapperProps={{ id: 'large-yellow' }} large color="yellow">
          Large Yellow
        </StatusTag>
        <StatusTag wrapperProps={{ id: 'large-red' }} large color="red">
          Large Red
        </StatusTag>
      </div>
      <div>
        <StatusTag
          wrapperProps={{ id: 'large-lightoff-grey' }}
          large
          light={false}
          color="grey"
        >
          Large Grey
        </StatusTag>
        <StatusTag wrapperProps={{ id: 'large-lightoff-blue' }} large light={false}>
          Large Default
        </StatusTag>
        <StatusTag
          wrapperProps={{ id: 'large-lightoff-green' }}
          large
          light={false}
          color="green"
        >
          Large Green
        </StatusTag>
        <StatusTag
          wrapperProps={{ id: 'large-lightoff-yellow' }}
          large
          light={false}
          color="yellow"
        >
          Large Yellow
        </StatusTag>
        <StatusTag
          wrapperProps={{ id: 'large-lightoff-red' }}
          large
          light={false}
          color="red"
        >
          Large Red
        </StatusTag>
      </div>
    </Minimal>
  );
}

// ---------------------------------------------------------------------------

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot }) => {
    for (const id of [
      'default-grey',
      'default-blue',
      'default-green',
      'default-yellow',
      'default-red',
      'lightoff-grey',
      'lightoff-blue',
      'lightoff-green',
      'lightoff-yellow',
      'lightoff-red',
      'large-grey',
      'large-blue',
      'large-green',
      'large-yellow',
      'large-red',
      'large-lightoff-grey',
      'large-lightoff-blue',
      'large-lightoff-green',
      'large-lightoff-yellow',
      'large-lightoff-red',
    ]) {
      /* eslint-disable no-await-in-loop */
      const statusTag = page.locator(`#${id}`);
      await localScreenshot(statusTag, id);
      /* eslint-enable no-await-in-loop */
    }
  },
};
