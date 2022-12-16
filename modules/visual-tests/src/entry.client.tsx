import React from 'react';
import { hydrate } from 'react-dom';
import { RemixBrowser } from '@remix-run/react';

const start = () => hydrate(<RemixBrowser />, document);

if (window.requestIdleCallback) {
  window.requestIdleCallback(start);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(start, 1);
}
