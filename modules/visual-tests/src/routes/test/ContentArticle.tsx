import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import ContentArticle, {
  ContentArticleProps,
} from '@reykjavik/hanna-react/ContentArticle';

import { Minimal } from '../../layout/Minimal';
import { lorem, photo } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const META: ContentArticleProps['meta'] = [
  {
    label: 'Mánudagur, 30. maí 2021',
  },
  {
    label: 'Lörem Ipsum',
    href: '/',
  },
];
const HEADLINE = lorem.short;

const CONTENTIMAGE_PROPS: ContentArticleProps['topImage'] = {
  image: photo.square,
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
      label: 'Tengt efni - upplýsingar',
      href: 'something?format=pdf',
      type: 'pdf',
    },
  ],
};
export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <ContentArticle
        meta={META}
        headline={HEADLINE}
        topImage={CONTENTIMAGE_PROPS}
        body={
          <Fragment>
            <h2>Aðal fyrirsögn</h2>
            <p>{lorem.long + lorem.long}</p>
            <h3>Millifyrirsögn</h3>
            <p>{lorem.long + lorem.medium}</p>
          </Fragment>
        }
        relatedLinks={RELATEDLINKS}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {};
