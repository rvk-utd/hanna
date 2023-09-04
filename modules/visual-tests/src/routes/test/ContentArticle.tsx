import React, { Fragment } from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import {
  ContentArticle,
  ContentArticleProps,
} from '@reykjavik/hanna-react/ContentArticle';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import { lorem, photo } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');
const META: ContentArticleProps['meta'] = [
  {
    label: 'Mánudagur, 30. maí 2021',
  },
  {
    label: 'Lörem Ipsum',
    href: '/',
  },
];

const CONTENTIMAGE_PROPS: ContentArticleProps['topImage'] = {
  image: photo.landscape,
  caption: lorem.short,
  credit: 'Mynd: Lorem Foobar',
};

const RELATEDLINKS: ContentArticleProps['relatedLinks'] = {
  title: 'Tengt efni',
  links: [
    {
      label: 'Tengt efni - upplýsingar',
      href: 'something.pdf',
    },
    {
      label: 'Leebur deroor iehrom',
      href: 'something?format=pdf',
      type: 'pdf',
    },
  ],
};
export default function () {
  return (
    <Minimal>
      <ContentArticle
        headline={lorem.tiny.slice(0, 52)}
        meta={META}
        topImage={CONTENTIMAGE_PROPS}
        body={
          <Fragment>
            <p>{lorem.medium}</p>
            <h3>Millifyrirsögn</h3>
            <p>{lorem.tiny}</p>
            <p>{lorem.short}</p>
          </Fragment>
        }
        relatedLinks={RELATEDLINKS}
      />
      <DummyBlock thin />
      <ContentArticle
        headlineTag="h1"
        headline={lorem.tiny.slice(0, 20)}
        body={
          <Fragment>
            <p>{lorem.tiny}</p>
            <p>{lorem.short}</p>
          </Fragment>
        }
      />
    </Minimal>
  );
}
export const testing: TestingInfo = {};
