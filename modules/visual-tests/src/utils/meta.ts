import type { MetaFunction } from '@remix-run/node';

/**
 * Constructs a nice test page <title> value, based on its route pathname.
 */
export const autoTitle: MetaFunction = ({ location }) => {
  const testTitle = location.pathname.replace(/\/$/, '').split(/\//).pop();
  return { title: `${testTitle} — visual test` };
};
