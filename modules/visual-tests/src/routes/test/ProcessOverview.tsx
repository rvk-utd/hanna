import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import ProcessOverview from '@reykjavik/hanna-react/ProcessOverview';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import { lorem, loremRT } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const props = {
  items1: [
    { title: 'Dagur 1-5 (mán, þri, mið, fim, fös)', content: lorem.short },
    { title: 'Dagur 6-7', content: loremRT.medium(true) },
  ],
  items2: [
    { title: 'Dagur 1-5  (mán, þri, mið, fim, fös)', content: loremRT.medium(true) },
    { title: 'Dagur 6-7', content: lorem.short },
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
      <DummyBlock thin />
      <ProcessOverview
        title={'Translucent Background'}
        transparent={true}
        items={props.items2}
      />
      <DummyBlock thin />
      <ProcessOverview title={'Narrow layout'} items={props.items2} narrow={true} />
      <DummyBlock thin />
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
