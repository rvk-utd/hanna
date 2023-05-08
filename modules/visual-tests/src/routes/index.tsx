import React from 'react';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { HeroBlock } from '@reykjavik/hanna-react/HeroBlock';
import { Layout } from '@reykjavik/hanna-react/Layout';
import { TextBlock } from '@reykjavik/hanna-react/TextBlock';

import { copyCacheControl, cssTokens } from '../utils/route';
import { getTestList } from '../utils/tests.server';

type LoaderData = {
  tests: Awaited<ReturnType<typeof getTestList>>;
};

export const loader = async () => {
  const tests = await getTestList();
  const TTL = process.env.NODE_ENV === 'production' ? 36_000 : 10;

  return json<LoaderData>(
    { tests },
    { headers: { 'Cache-Control': `public, max-age=${TTL}, immutable` } }
  );
};

export const headers = copyCacheControl;

export const handle = cssTokens('Layout', 'HeroBlock', 'TextBlock', 'Datepicker');

export default function Index() {
  const { tests } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <HeroBlock
        title="Hanna Visual Regression Testing"
        summary={
          <p>
            This server contains multiple pages visited by{' '}
            <Link to="https://playwright.dev/">PlayWright</Link> scripts for testing CSS
            layuts and dynamic behavior
          </p>
        }
        illustration="fundur"
        startSeen
      />

      <TextBlock startSeen>
        <Link to="/review">Review VRT results</Link>

        <h2>Test Pages</h2>
        <ul>
          {tests.map((item, i) => (
            <li key={i}>
              {'path' in item ? (
                <Link to={item.path}>{item.label}</Link>
              ) : (
                <i key={i}>
                  {item.label} {item.reasons && <small>({' ' + item.reasons})</small>}
                </i>
              )}
            </li>
          ))}
        </ul>
      </TextBlock>
    </Layout>
  );
}
