import React from 'react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useSearchParams,
} from '@remix-run/react';
import { css, getCssBundleUrl, HannaColorTheme } from '@reykjavik/hanna-css';
import { getPageScrollElm as _getPageScrollElm } from '@reykjavik/hanna-utils';
import { getAssetUrl } from '@reykjavik/hanna-utils/assets';

import { useGetCssTokens } from './utils/useGetCssTokens';

const THEME: HannaColorTheme = 'colorful';

// ---------------------------------------------------------------------------

declare global {
  // NOTE: This helper function is added into the global scope to make the
  // visual regression testing easier.
  // Thing is, we can't easily inject functions into PlayWright's `.evaluate`
  // methods because their arguments must be serializable.
  //
  // Also: half-hearted attempts to hack around this by passing a function's
  // `.toString()`ed source and re-evaluating it with `new Function()`
  // have failed.
  //
  var getPageScrollElm: typeof _getPageScrollElm; // eslint-disable-line no-var
}

// ---------------------------------------------------------------------------

export const meta: MetaFunction = () => {
  return {
    charSet: 'utf-8',
    title: 'Hanna Visual Regression Testing',
    viewport: 'width=device-width, initial-scale=1.0',
  };
};
export const links: LinksFunction = () => [
  {
    rel: 'shortcut icon',
    href: getAssetUrl('favicon.png'),
  },
  {
    rel: 'apple-touch-icon',
    sizes: '288x288',
    href: getAssetUrl('favicon-288.png'),
  },
];

const noFlickerSnippet = `
  (function (c, n) {
    c.add(n);
    setTimeout(function () {
      c.remove(n);
    }, 8000);
  })(document.documentElement.classList, 'before-sprinkling');
`.replace(/\s/g, '');

export default function App() {
  const cssTokens = useGetCssTokens();
  const [q] = useSearchParams();

  // if (typeof window !== 'undefined') {
  //   window.getPageScrollElm = _getPageScrollElm;
  // }

  return (
    <html lang="en">
      <head>
        <Meta />
        <script
          dangerouslySetInnerHTML={{
            __html:
              noFlickerSnippet +
              // NOTE: Hacky injection of a utility function into the page's global scope,
              // in order to make life easier for tests/tests.spec.ts
              ';\nwindow.getPageScrollElm = ' +
              _getPageScrollElm.toString(),
          }}
        />
        <link
          rel="stylesheet"
          href={
            getCssBundleUrl(cssTokens, { testingServer: 'http://localhost:4000' }) +
            // magic parameter to override default dev config while running tests
            '&allowBadTokens=true'
          }
        />
        <Links />
        {q.get('noAnimation') != null && (
          <style>{css`
            * {
              scroll-behavior: auto !important;
              transition: none !important;
              transition-delay: 0ms !important;
              transition-duration: 0ms !important;
            }
          `}</style>
        )}
      </head>
      <body
        // NOTE: Here we set non-default color theme to stress test
        // component-colors.
        // (Most Figma designs show the default "trustworthy" theme,
        // so by running these tests with another theme, we're more likely
        // to catch accidental hard-coding of color types in the CSS)
        data-color-theme={THEME}
      >
        <div id="bodyinner">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
