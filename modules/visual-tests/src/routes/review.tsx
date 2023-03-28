import React from 'react';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData, useSearchParams } from '@remix-run/react';
import { Layout } from '@reykjavik/hanna-react/Layout';
import { PageHeading } from '@reykjavik/hanna-react/PageHeading';
import { SeenEffect } from '@reykjavik/hanna-react/SeenEffect';
import { TagPill } from '@reykjavik/hanna-react/TagPill';
import { TextBlock } from '@reykjavik/hanna-react/TextBlock';

import { copyCacheControl, cssTokens } from '../utils/route.server';
import { getChangesToReview, getReportDate } from '../utils/tests.server';

import styles from './review.css';

const formatDate = (timestamp: number) =>
  new Date(timestamp).toISOString().substring(0, 16).replace('T', ' at ');

// ---------------------------------------------------------------------------

export type LoaderData = {
  changed: Awaited<ReturnType<typeof getChangesToReview>>;
  reportCreatedDate: number | undefined;
};

export const loader: LoaderFunction = async () => {
  const [changed, reportCreatedDate] = await Promise.all([
    getChangesToReview(),
    getReportDate(),
  ]);

  return json<LoaderData>({ changed, reportCreatedDate });
};

// ---------------------------------------------------------------------------

export const headers = copyCacheControl;

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: 'data:text/css,' + encodeURIComponent(styles),
  },
];

// ---------------------------------------------------------------------------

export const handle = cssTokens('PageHeading', 'TextBlock', 'TagPill', 'SeenEffect');

// ---------------------------------------------------------------------------

export default function () {
  const { changed, reportCreatedDate } = useLoaderData<LoaderData>();
  const [q] = useSearchParams();

  const reportUrl = `/report/index.html?t=${reportCreatedDate}`;

  return (
    <Layout>
      <PageHeading small>Review Changed Screenshots</PageHeading>
      <SeenEffect>
        {reportCreatedDate && (
          <p className="ReviewReport">
            <a href={reportUrl}>View Playwright report</a>{' '}
            <span>— (Created on {formatDate(reportCreatedDate)})</span>
          </p>
        )}
        {changed.length ? (
          <ul className="ChangesList">
            {changed.map(
              (
                { id, testName, label, project, expectedUrl, confirmedBug, confirmedOk },
                i
              ) => {
                const tagLabel =
                  (confirmedBug ? '❌ ' : '') +
                  (confirmedOk ? '✅ ' : '') +
                  (expectedUrl ? 'Change' : 'New');
                const tagColor =
                  confirmedBug || confirmedOk
                    ? undefined
                    : expectedUrl
                    ? 'yellow'
                    : 'green';

                const lastItem = changed[i - 1];
                const nameChange =
                  !lastItem || testName !== lastItem.testName || label !== lastItem.label;

                return (
                  <li
                    key={i}
                    className={
                      'ChangesList__item' +
                      (confirmedBug ? ' ChangesList__item--bug' : '') +
                      (confirmedOk ? ' ChangesList__item--ok' : '') +
                      (nameChange ? ' ChangesList__item--namechange' : '')
                    }
                  >
                    <Link to={id} className="ChangesList__link">
                      <TagPill color={tagColor}>{tagLabel}</TagPill>{' '}
                      <span className="ChangesList__label">
                        <span className="ChangesList__name">
                          {testName + ' – ' + label}
                        </span>{' '}
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
            {!reportCreatedDate ? (
              <p>
                Run <code>yarn run test</code> to generate a report
              </p>
            ) : q.get('errored') != null ? (
              <p>
                ...but there were still some errors.{' '}
                <a href={reportUrl}>View Playwright report</a>
              </p>
            ) : (
              <p>
                If you just ran <code>yarn run test</code>, then this is good news.
              </p>
            )}
          </TextBlock>
        )}{' '}
      </SeenEffect>
    </Layout>
  );
}
