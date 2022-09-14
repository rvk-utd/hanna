import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import ProcessOverview from '@reykjavik/hanna-react/ProcessOverview';

import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const props = {
  items1: [
    { title: 'Dagur 1-5', content: lorem.short },
    { title: 'Dagur 6', content: lorem.medium },
    { title: 'Dagur 7', content: lorem.long },
  ],
  items2: [
    { title: 'Dagur 1-5', content: lorem.long },
    { title: 'Dagur 6', content: lorem.medium },
    { title: 'Dagur 7', content: lorem.short },
  ],
};
export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <ProcessOverview
        title={'Overview with attention message'}
        items={props.items1}
        attention={lorem.short}
      />
      <ProcessOverview
        title={'Translucent Background'}
        transparent={true}
        items={props.items2}
      />
      <ProcessOverview title={'Narrow layout'} items={props.items2} narrow={true} />
      <ProcessOverview
        title={'Narrow layout with attention message'}
        items={props.items1}
        narrow={true}
        attention={lorem.short}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {};
