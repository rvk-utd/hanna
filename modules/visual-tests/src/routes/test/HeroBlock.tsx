import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { HeroBlock } from '@reykjavik/hanna-react/HeroBlock';

import { Minimal } from '../../layout/Minimal';
import { illustr } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <HeroBlock
        title="You Are My Hero!"
        summary={
          <Fragment>
            <p>
              Vender gests kämmen vewänthärdis{' '}
              <Link to="">wehrdsen onderpasje moose.</Link> Ut enim ad minim veniam, letsi
              ifder svensk og latin makinen dehr graek.
            </p>
            <p>
              Vender gests <strong>kämmen</strong> vewänthärdis wehrdsen onderpasje moose.
              Ut enim ad minim veniam, letsi ifder svensk og latin makinen dehr graek.
            </p>
          </Fragment>
        }
        primaryButton={{ href: '', label: 'Primary Button Prop' }}
        secondaryButton={{ href: '', label: 'Secondary Button Prop' }}
        image={illustr.tall}
        startSeen
      />

      <HeroBlock
        title="You Are My Hero, but Your Title Is Uncomfortably Long!"
        summary={
          <p>
            Lörem ipsum dolor sit amet, dedeeshka duu. Leebur deroor iehroom, bork bork
            Björk! Ut enim ad minim veniam, letsi ifder svensk og latin makinen dehr
            graek. Ut enim ad minim veniam, letsi ifder svensk og latin makinen dehr
            graek. Nawei raitinen de wehbsyte. Ut enim ad minim veniam, letsi ifder svensk
            og latin makinen dehr graek. Ut enim ad minim veniam, letsi ifder svensk og
            latin makinen dehr graek.
            {'\n'} … and no buttons.
          </p>
        }
        image={illustr.short}
        startSeen
      />

      <HeroBlock
        title="Super short"
        summary="Vender gests kämmen vewänthardis wehrdsen onderpasje moose"
        image={illustr.tall}
        startSeen
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {};
