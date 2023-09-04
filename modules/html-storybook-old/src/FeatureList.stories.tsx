import React from 'react';
import { FeatureList, FeatureListProps } from '@reykjavik/hanna-react/FeatureList';
import { TextBlock } from '@reykjavik/hanna-react/TextBlock';
import { getEfnistaknUrl } from '@reykjavik/hanna-utils/assets';

import { HiddenTiger } from './utils/HiddenTiger.js';
import { StoryComponent, StoryParameters } from './storytypes.js';

const title = 'Hvað er í boði í lauginni?';

const features: FeatureListProps['features'] = [
  { name: 'Útiklefar', iconUrl: getEfnistaknUrl('sund_utiklefi') },
  { name: 'Frítt WiFi', icon: 'wifi' },
  { name: '25 metra laug', iconUrl: getEfnistaknUrl('sund_metralaug') },
  { name: 'Sauna', icon: 'sund_sauna' },
  { name: 'Heitir pottar', icon: 'sund_heiturpottur' },
  { name: 'No icon specified' },
  { name: 'Sala á sundfatnaði', icon: 'sund_sundfot' },
  { name: 'Barnalaug', icon: 'sund_barnalaug' },
  { name: 'Eimbað', icon: 'sund_sauna' },
  { name: 'Kaldur pottur', icon: 'sund_kaldurpottur' },
];

// ===========================================================================

const token = (name: string) => '{' + name + '}';

export default {
  title: 'FeatureList',
  parameters: {} as StoryParameters,
};

export const _FeatureList: StoryComponent = () => (
  <>
    <HiddenTiger>
      <TextBlock align="right">
        <p>The feature icons are set as either:</p>
        <ul>
          <li>
            Using <code>data-efnistakn="{token('icon_name')}"</code>
          </li>
          <li>
            Using <code>style="--efnistakn: url('{token('full_icon_url')}');'"</code>
          </li>
        </ul>
      </TextBlock>
      <br />
    </HiddenTiger>

    <FeatureList title={title} features={features} />

    <HiddenTiger>
      <br />
      <br />
      <br />
      <br />
    </HiddenTiger>
  </>
);

_FeatureList.story = {
  parameters: {
    css: {
      tokens: 'FeatureList,TextBlock',
    },
  },
};
