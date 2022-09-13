import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import InfoHero, { InfoHeroProps } from '@reykjavik/hanna-react/InfoHero';

import { Minimal } from '../../layout/Minimal';
import { photo } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const cityCouncilContent: InfoHeroProps = {
  title: 'Dagur B. Eggertsson',
  subTitle: 'Borgarstjóri',
  blurb: 'Samfylkingin',
};

const buttonProps = [
  { href: '', label: 'Fjárhagslegir hagsmunir' },
  { href: '', label: 'Dagur á Facebook' },
  {
    href: 'mailto:borgarstjori@reykjavik.is',
    label: 'borgarstjori@reykjavik.is',
  },
];
export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <InfoHero
        {...cityCouncilContent}
        image={photo.portrait}
        align="left"
        buttons={buttonProps}
        blingType={'waves'}
      />
      <InfoHero
        {...cityCouncilContent}
        image={photo.landscape}
        buttons={buttonProps}
        blingType={'sunny-waves'}
      />
      <InfoHero
        {...cityCouncilContent}
        image={photo.landscape}
        buttons={buttonProps}
        blingType={'triangles'}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  __DEV_FOCUS__: true,
  initialHover: '.ButtonTertiary:has-text("Fjárhagslegir hagsmunir") >> nth=0',
};
