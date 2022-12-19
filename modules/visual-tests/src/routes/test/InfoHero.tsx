import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { InfoHero } from '@reykjavik/hanna-react/InfoHero';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import { lorem, loremRT, photo } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

const buttonProps = [
  { href: '', label: 'Lorem Ipsum' },
  { href: '', label: 'Leebur deroor iehroom,' },
  { href: '', label: 'Foo bar' },
];
export default function () {
  return (
    <Minimal>
      <InfoHero
        title="Align left"
        subTitle="Lorem ipsum dolor sit amet"
        image={photo.portrait}
        align="left"
      />
      <DummyBlock thin />
      <InfoHero
        title="Long, long, looong title"
        titleBlurb="Title blurb"
        subTitle={lorem.tiny}
        image={photo.portrait}
        blurb={
          <Fragment>
            And long, long blurb content…
            <br />
            {loremRT.long()}
            <br />
            <br />
            {loremRT.long()}
          </Fragment>
        }
        buttons={buttonProps.slice(0, 2)}
        align="left"
      />
      <DummyBlock thin />
      <InfoHero
        title="Align right"
        subTitle="Lörem ipsum dolor sit amet, dedeeshka duu."
        image={photo.landscape}
        blurb="Foo bar"
        buttons={buttonProps.slice(0, 2)}
        blingType="sunny-waves"
      />
      <DummyBlock thin />
      <InfoHero
        title="Align right with buttons"
        subTitle="Lorem ipsum dolor sit amet"
        image={photo.landscape}
        buttons={buttonProps}
        blingType="triangles"
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.ButtonTertiary:has-text("Lorem Ipsum") >> nth=0',
  clipViewport: true,
};
