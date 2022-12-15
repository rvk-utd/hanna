import React from 'react';
import { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
  useSearchParams,
} from '@remix-run/react';
import { css, getCssBundleUrl, HannaColorTheme } from '@reykjavik/hanna-css';
import { setLinkRenderer } from '@reykjavik/hanna-react/utils';
import { getPageScrollElm as _getPageScrollElm } from '@reykjavik/hanna-utils';
import { getAssetUrl } from '@reykjavik/hanna-utils/assets';

import { useGetCssTokens } from './utils/useGetCssTokens';

setLinkRenderer((props) =>
  /^[a-z]+:/.test(props.href) ? <a {...props} /> : <Link to={props.href} {...props} />
);

const THEME: HannaColorTheme = 'colorful';

const usePageLang = (): string => {
  const matches = useMatches();
  let i = matches.length;
  let lang = '';
  while (i--) {
    const { pathname = '', handle = {} } = matches[i]!;
    if (handle.lang) {
      lang = handle.lang;
      break;
    }
    if (!lang) {
      lang = pathname.startsWith('/test/') ? 'is' : 'en';
    }
  }
  return lang;
};

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
  const lang = usePageLang();

  // if (typeof window !== 'undefined') {
  //   window.getPageScrollElm = _getPageScrollElm;
  // }

  const noAnimation = q.get('noAnimation') != null || undefined;

  return (
    <html lang={lang}>
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
            getCssBundleUrl(cssTokens, {
              testingServer: 'http://localhost:4000',
              // testingServer: 'https://styles.prod.thon.is/',
              // version: 'dev-v0', // or 'v0.8'
            }) +
            // magic parameter to override default dev config while running tests
            '&allowBadTokens=true'
          }
        />
        <Links />
        {noAnimation && (
          <style>{css`
            *,
            *::before,
            *::after {
              scroll-behavior: auto !important;
              transition: none !important;
              transition-delay: 0ms !important;
              transition-duration: 0ms !important;
            }
            #mediaformat {
              display: none !important;
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
        {!noAnimation && <div id="mediaformat" />}
      </body>
    </html>
  );
}
