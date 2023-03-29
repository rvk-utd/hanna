import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { CityBlock, CityBlockProps } from '@reykjavik/hanna-react/CityBlock';

import { Minimal } from '../../layout/Minimal.js';
import { illustr, lorem, loremRT, photo } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: MetaFunction = autoTitle;

// Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');
const buttonList = [
  { href: '', label: 'Button number one' },
  { href: '', label: 'Button number two' },
  { href: '', label: 'Button number three' },
  { href: '', label: 'Button number four' },
];

const content = (
  cityBlockTitle: string,
  i: number,
  summary: string | JSX.Element = lorem.medium
): Pick<CityBlockProps, 'content' | 'startSeen'> => ({
  content: {
    title: cityBlockTitle,
    summary,
    buttons: buttonList.slice(0, i),
  },
  startSeen: true,
});

export default function () {
  return (
    <Minimal>
      <CityBlock
        {...content('Large image and right aligned', 3, loremRT.medium(true))}
        image={photo.portrait}
        type="largeimage"
      />
      <CityBlock
        {...content('Large image and left aligned', 1, lorem.tiny)}
        image={photo.portrait}
        align="left"
        type="largeimage"
      />
      <CityBlock
        {...content('Large illustration and right aligned', 4)}
        image={illustr.tall}
      />
      <CityBlock
        {...content('Large illustration and left aligned', 2)}
        image={illustr.tall}
        align="left"
      />
      <CityBlock
        {...content('Largebox and left aligned', 0)}
        image={photo.landscape}
        type="largebox"
      />
      <CityBlock
        {...content('Largebox and right aligned', 2)}
        image={illustr.tall}
        align="left"
        type="largebox"
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.CityBlock__button >> nth=0',
};
