import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import BasicTable, { BasicTableProps } from '@reykjavik/hanna-react/BasicTable';
import range from '@hugsmidjan/qj/range';
import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };
const simpleContent: Pick<BasicTableProps, 'cols' | 'thead' | 'tbody' | 'startSeen'> = {
  //cols: [{ number: true }, {}, {}, { tel: true }, { number: true }, {}],
  thead: [['Erindi nr.', 'Lýsing', 'Sent dags. / kl', 'Sími', 'Gjald', 'Staða máls']],
  tbody: [
    [
      '99',
      {
        value: (
          <Fragment>
            Umsókn um <a href="/url">stuðningsþjónustu</a>
          </Fragment>
        ),
      },
      '16.09.2019 / kl. 18:45',
      '800 9000',
      '45.663 kr',
      'Í vinnslu',
    ],
    [
      '100',
      {
        value: lorem.short,
      },
      '16.09.2019 / kl. 18:45',
      '',
      '5.663 kr',
      'Í vinnslu',
    ],
    [
      '1199',
      {
        value: (
          <Fragment>
            Umsókn um <a href="/url">stuðningsþjónustu</a>
          </Fragment>
        ),
      },
      '16.09.2019 / kl. 18:45',
      '800 9000',
      '40.663 kr',
      'Í vinnslu',
    ],
  ],
  startSeen: true,
};
const extraContent: Pick<BasicTableProps, 'cols' | 'thead' | 'tbody' | 'startSeen'> = {
  cols: [{ number: true }, {}, {}, {}, {}, { tel: true }, { number: true }, {}],
  thead: [
    [
      'Erindi nr.',
      'Lýsing',
      'Lýsing nr. 2',
      'Lýsing nr. 3',
      'Sent dags. / kl',
      'Sími',
      'Gjald',
      'Staða máls',
    ],
  ],
  tbody: [
    [
      '99',
      {
        value: (
          <Fragment>
            Umsókn um <a href="/url">stuðningsþjónustu</a>
          </Fragment>
        ),
      },
      'Umsókn um stuðningsþjónustu án links',
      'Umsókn um aðra þjónustu',
      '16.09.2019 / kl. 18:45',
      '800 9000',
      '45.663 kr',
      'Í vinnslu',
    ],
    [
      '100',
      lorem.tiny,
      lorem.tiny,
      lorem.tiny,
      '16.09.2019 / kl. 18:45',
      '',
      '5.663 kr',
      'Í vinnslu',
    ],
    [
      '1199',
      {
        value: (
          <Fragment>
            Umsókn um <a href="/url">stuðningsþjónustu</a>
          </Fragment>
        ),
      },
      lorem.tiny,
      lorem.tiny,
      '16.09.2019 / kl. 18:45',
      '800 9000',
      '40.663 kr',
      'Í vinnslu',
    ],
  ],
};
const tFoot: BasicTableProps['tfoot'] = [
  [
    { value: 'Samtals:', number: false, colSpan: 4 },
    { value: '16.345 kr.', number: true },
    '',
  ],
];

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <BasicTable {...simpleContent} />
      <BasicTable {...simpleContent} tfoot={tFoot} />
      <BasicTable {...simpleContent} tfoot={tFoot} compact />
      <BasicTable {...extraContent} align="right" />
      <BasicTable {...simpleContent} caption="Table with caption" fullWidth />
    </Minimal>
  );
}

// TODO: Make scroll work!
export const testing: TestingInfo = {
  __DEV_FOCUS__: true,

  extras: async ({ page, pageScreenshot }) => {
    const compactTable = page.locator('.BasicTable >> nth=3');
    // Scroll to end - right, and take a screenshot
    const scrollContainer = compactTable.locator('scrollContainer=');
    // test compact table scroll-right
    await scrollContainer.evaluate((elm) => {
      elm.scrollBy(elm.scrollWidth, 0);
    });
    await page.waitForTimeout(100);
    await pageScreenshot('compactTable-scrolled-right');
  },
};
