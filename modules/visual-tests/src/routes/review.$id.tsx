import React from 'react';
import {
  ActionFunction,
  json,
  LinksFunction,
  LoaderFunction,
  redirect,
} from '@remix-run/node';
import { Link, useCatch, useLoaderData } from '@remix-run/react';
import { Layout } from '@reykjavik/hanna-react/Layout';
import { PageHeading } from '@reykjavik/hanna-react/PageHeading';
import { TextBlock } from '@reykjavik/hanna-react/TextBlock';

import { Minimal } from '../layout/Minimal.js';
import { ReviewShot } from '../layout/ReviewShot.js';
import { ensureString } from '../utils/ensure.js';
import { copyCacheControl, cssTokens } from '../utils/route.server';
import { Changeset, getChangeById, updateScreenshotsFor } from '../utils/tests.server';

type LoaderData = {
  change: Changeset;
};

const ensureAction = (cand: unknown) => {
  const value = ensureString(cand);
  if (value === 'reject' || value === 'accept') {
    return value;
  }
};

export const action: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData();
  const action = ensureAction(formData.get('action'));

  if (!action) {
    throw new Response('Invalid or missing action.', {
      status: 400,
      statusText: 'Bad Request',
    });
  }
  const id = ensureString(params.id) || '';
  const nextId = await updateScreenshotsFor(id, action);
  return redirect(nextId ? `/review/${nextId}` : '/review');
};

// ---------------------------------------------------------------------------

export const loader: LoaderFunction = async ({ params }) => {
  const id = ensureString(params.id) || '';
  const change = await getChangeById(id);
  const TTL = 10;

  if (!change) {
    throw new Response(`Invalid change id: "${id}"`, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return json<LoaderData>(
    { change },
    { headers: { 'Cache-Control': `public, max-age=${TTL}, immutable` } }
  );

  // ---------------------------------------------------------------------------
};

export const headers = copyCacheControl;

export const links: LinksFunction = () => [...ReviewShot.links()];

export const handle = cssTokens('PageHeading', 'TextBlock', ...ReviewShot.cssTokens);

// ---------------------------------------------------------------------------

export const CatchBoundary = () => {
  // const { id = '' } = useParams<'id'>();
  const cought = useCatch();

  return (
    <Layout>
      <PageHeading small>{cought.statusText}</PageHeading>
      <TextBlock>
        <p>{cought.data}</p>
      </TextBlock>
    </Layout>
  );
};

// ---------------------------------------------------------------------------

export default function () {
  const { change } = useLoaderData<LoaderData>();

  return (
    <Minimal bare key={change.id}>
      <PageHeading small startSeen>
        {change.testName}{' '}
        <small>
          <small>
            {' '}({change.project})
          </small>
        </small>
        <br />
        {change.label || ' '}
      </PageHeading>
      <p>
        <Link to="./..">List of changes</Link>
      </p>
      <ReviewShot change={change} />
    </Minimal>
  );
}
