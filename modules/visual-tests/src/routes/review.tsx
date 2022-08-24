import React from 'react';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import PageHeading from '@reykjavik/hanna-react/PageHeading';
import SeenEffect from '@reykjavik/hanna-react/SeenEffect';
import TagPill from '@reykjavik/hanna-react/TagPill';
import TextBlock from '@reykjavik/hanna-react/TextBlock';

import { Minimal } from '../layout/Minimal';
import { doesReportExists, getChangesToReview } from '../utils/tests.server';

import styles from './review.css';

// ---------------------------------------------------------------------------

export type LoaderData = {
  changed: Awaited<ReturnType<typeof getChangesToReview>>;
  reportExists: boolean;
};

export const loader: LoaderFunction = async () => {
  const changed = await getChangesToReview();
  const reportExists = doesReportExists();

  const TTL = 10;

  return json<LoaderData>(
    { changed, reportExists },
    {
      headers: {
        'Cache-Control': `public, max-age=${TTL}, immutable`,
      },
    }
  );
};

// ---------------------------------------------------------------------------

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: 'data:text/css,' + encodeURIComponent(styles),
  },
];

// ---------------------------------------------------------------------------

export const handle = {
  cssTokens: ['PageHeading', 'TextBlock', 'TagPill', 'SeenEffect'],
};

// ---------------------------------------------------------------------------

export default function () {
  const { changed, reportExists } = useLoaderData<LoaderData>();

  return (
    <Minimal>
      <PageHeading>Review Changed Screenshots</PageHeading>
      {reportExists && (
        <SeenEffect className="ReviewReport">
          <a href="/report/index.html">View Playwright report</a>
        </SeenEffect>
      )}
      {changed.length ? (
        <ul className="ChangesList">
          {changed.map(
            ({ id, testName, label, project, expectedUrl, confirmedBug }, i) => {
              const tagLabel =
                (expectedUrl ? 'Change' : 'New') + (confirmedBug ? ' (Bug!)' : '');
              const tagColor = confirmedBug ? 'red' : expectedUrl ? 'yellow' : 'green';

              return (
                <li
                  key={i}
                  className={
                    'ChangesList__item' + (confirmedBug ? ' ChangesList__item--bug' : '')
                  }
                >
                  <Link to={id} className="ChangesList__link">
                    <TagPill color={tagColor}>{tagLabel}</TagPill>
                    <span className="ChangesList__name">
                      {testName} – {label}
                      <span className="ChangesList__project">({project})</span>
                    </span>
                  </Link>
                </li>
              );
            }
          )}
        </ul>
      ) : (
        <TextBlock>
          <p>
            <strong>No reviewable changes found.</strong>
          </p>
          {reportExists ? (
            <p>
              If you just ran <code>yarn run test</code>, then this is good news.
            </p>
          ) : (
            <p>
              Run <code>yarn run test</code> to generate a report
            </p>
          )}
        </TextBlock>
      )}{' '}
    </Minimal>
  );
}
