import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Alert } from '@reykjavik/hanna-react/Alert';

import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

// ---------------------------------------------------------------------------

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
    <Minimal>
      <Alert type="info" ssr>
        <strong>Information</strong>
        <br />
        Lorem ipsum <a href="">dolor sit amet</a> consectetur adipisicing elit. Ipsum
        officia itaque odit necessitatibus soluta dolorum error deleniti rerum reiciendis
        assumenda!
      </Alert>

      <Alert type="success" closable closeUrl="?close=1" ssr>
        <p>
          <strong>Success</strong> -{' '}
          <a href="" id="hover-me">
            Bein útsending
          </a>{' '}
          frá <a href="">fundi borgarstjórnar</a> í Ráðhúsi Reykjavíkur{' '}
          <strong>hefst kl. 14:00</strong>
        </p>
      </Alert>

      <Alert type="warning" closable closeUrl="?close=2" ssr>
        <strong>Warning</strong> - Kosningar í fullum gangi.{' '}
        <a href="">Flettu upp þínum kosningarstað</a>
      </Alert>

      <Alert type="error" closable ssr>
        <strong>Error</strong> - Þú slóst <a href="">eitthvað</a> rangt inn, kjánaprik.
      </Alert>

      <Alert type="critical" ssr>
        <strong>Critical</strong> - Veðurviðvörun fyrir höfuðborgarsvæðið.{' '}
        <a href="">Sjá nánar á vedur.is</a>
      </Alert>
    </Minimal>
  );
}

// ---------------------------------------------------------------------------

export const testing: TestingInfo = {
  initialHover: 'a#hover-me',
  extras: async ({ page, localScreenshot, dumbHover }) => {
    const closeLink = page.locator('.Alert--success a.Alert__close >> nth=0');
    await dumbHover(closeLink);
    await localScreenshot(closeLink.locator('closest=.Alert'), 'closelink-hover');

    const closeButton = page.locator('.Alert--error button.Alert__close >> nth=0');
    await dumbHover(closeButton);
    await localScreenshot(closeButton.locator('closest=.Alert'), 'closebutton-hover');
  },
};
