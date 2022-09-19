import React from 'react';
import range from '@hugsmidjan/qj/range';
import type { MetaFunction } from '@remix-run/node';
import InfoHero, { InfoHeroProps } from '@reykjavik/hanna-react/InfoHero';

import { Minimal } from '../../layout/Minimal';
import { lorem, photo } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

const cityCouncilContent: InfoHeroProps = {
  title: 'Lorem Ipsum',
  subTitle: 'Lorem ipsum dolor sit amet,',
  // blurb: 'Foo bar',
};

const buttonProps = [
  { href: '', label: 'Lorem Ipsum' },
  { href: '', label: 'Leebur deroor iehroom,' },
  {
    href: '',
    label: 'Foo bar',
  },
];
export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <InfoHero
        title={'Lorem Ipsum'}
        subTitle={'Lorem ipsum dolor sit amet'}
        image={photo.portrait}
        align="left"
        blurb="Foo bar"
      />
      <InfoHero
        title={'Lorem Ipsum'}
        subTitle={'Lörem ipsum dolor sit amet, dedeeshka duu.'}
        image={photo.landscape}
        buttons={buttonProps.slice(0, 2)}
        blingType={'sunny-waves'}
        blurb="Foo bar"
      />
      <InfoHero
        title={'Lörem ipsum dolor sit amet.'}
        subTitle={'Lorem ipsum dolor sit amet'}
        image={photo.landscape}
        buttons={buttonProps}
        blingType={'triangles'}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.ButtonTertiary:has-text("Lorem Ipsum") >> nth=0',
  clipViewport: true,
};
