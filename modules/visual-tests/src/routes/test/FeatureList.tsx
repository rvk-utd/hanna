import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { FeatureList, FeatureListProps } from '@reykjavik/hanna-react/FeatureList';

import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('FeatureList', 'TextBlock');

const features: FeatureListProps['features'] = [
  { name: 'Útiklefar', icon: 'sund_utiklefi' },
  { name: 'Frítt WiFi', icon: 'wifi' },
  { name: '25 metra laug', icon: 'sund_metralaug' },
  { name: 'Sauna', icon: 'sund_sauna' },
  { name: 'Heitir pottar', icon: 'sund_heiturpottur' },
  { name: 'No icon specified' },
  { name: 'Sala á sjúklega flottum sundfatnaði með langan titil', icon: 'sund_sundfot' },
  { name: 'Barnalaug', icon: 'sund_barnalaug' },
  { name: 'Eimbað', icon: 'sund_metralaug' },
  { name: 'Kaldur pottur', icon: 'sund_kaldurpottur' },
];
export default function () {
  return (
    <Minimal>
      <FeatureList title="Lorem Ipsum og Foo Bar" features={features} startSeen={true} />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  waitFor: '.Bling svg',
  clipViewport: true,
};
