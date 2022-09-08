import React from 'react';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import AccordionList from '@reykjavik/hanna-react/AccordionList';
import HeroBlock from '@reykjavik/hanna-react/HeroBlock';
import Layout from '@reykjavik/hanna-react/Layout';
import TextBlock from '@reykjavik/hanna-react/TextBlock';

import { getTestList } from '../utils/tests.server';

type LoaderData = {
  tests: Awaited<ReturnType<typeof getTestList>>;
};

export const loader: LoaderFunction = async (): Promise<Response> => {
  const tests = await getTestList();
  const TTL = process.env.NODE_ENV === 'production' ? 36_000 : 10;

  return json<LoaderData>(
    { tests },
    {
      headers: {
        'Cache-Control': `public, max-age=${TTL}, immutable`,
      },
    }
  );
};

export const handle = {
  cssTokens: ['Layout', 'HeroBlock', 'AccordionList', 'TextBlock', 'Datepicker'],
};

export default function Index() {
  const { tests } = useLoaderData<LoaderData>();

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
      </TextBlock>

      <AccordionList
        items={[
          {
            title: 'Test Pages',
            content: (
              <TextBlock>
                <ul>
                  {tests.map(({ label, path }) => (
                    <li key={path}>
                      <Link to={path}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </TextBlock>
            ),
          },
        ]}
        startSeen
        defaultOpen={[0]}
      />
    </Layout>
  );
}
