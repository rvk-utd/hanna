import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { BasicTable, BasicTableProps } from '@reykjavik/hanna-react/BasicTable';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import { lorem, loremRT } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;
// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

const content = (): Pick<BasicTableProps, 'thead' | 'tbody' | 'startSeen' | 'cols'> => ({
  cols: [{ number: true }, {}, {}, {}, { tel: true }, { number: true }, {}],
  thead: [
    [
      'Erindi nr.',
      'Lýsing',
      'Lýsing nr. 2',
      'Sent dags. / kl',
      'Sími',
      'Gjald',
      'Staða máls',
    ],
  ],
  tbody: [
    [
      '99',
      { value: loremRT.tiny(true) },
      'Umsókn um þjónustu án links',
      '16.09.2019 / kl. 18:45',
      '800 9000',
      '45.663.000 kr',
      'Í vinnslu',
    ],
    [
      '100',
      lorem.tiny.slice(0, 28),
      lorem.tiny.slice(0, 20),
      '16.09.2019 / kl. 18:45',
      '',
      '5.663.000 kr',
      'Í vinnslu',
    ],
    [
      '1199',
      lorem.tiny.slice(0, 21),
      lorem.tiny.slice(0, 6),
      '16.09.2019 / kl. 18:45',
      '800 9000',
      '40.663.000 kr',
      'Í vinnslu',
    ],
  ],
  startSeen: true,
});

const tFoot: BasicTableProps['tfoot'] = [
  [
    { value: 'Footer:', number: false, colSpan: 4 },
    { value: 'Footer Value', number: true, colSpan: 2 },
    '',
  ],
];

const miniTable: Pick<
  BasicTableProps,
  'cols' | 'thead' | 'tbody' | 'startSeen' | 'compact'
> = {
  cols: [{}, { text: 'right' }],
  thead: [['Vikudagur', 'Opnunartími']],
  tbody: [
    ['Mánudagur', '10-18'],
    ['Þriðjudagur – föstudagur', '9-21'],
    [{ value: 'Lokað um helgar', text: 'center', colSpan: 2 }],
  ],
  startSeen: true,
  compact: true,
};

export default function () {
  return (
    <Minimal>
      {/* False for 6 columns - true for 7 columns (to check scroll)*/}
      <BasicTable {...content()} caption="I'm a caption!" tfoot={tFoot} />
      <DummyBlock thin />
      <BasicTable {...content()} align="right" />
      <DummyBlock thin />
      <BasicTable {...miniTable} caption="Afgreiðslutímar" tfoot={[['Fótur?', 'Já!']]} />
      <DummyBlock thin />
      <BasicTable {...miniTable} fullWidth />
      <DummyBlock thin />
      <BasicTable {...miniTable} align="right" />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  extras: async ({ page, localScreenshot }) => {
    const scrollingTable = page.locator('.BasicTable >> nth=1');
    const scrollContainer = scrollingTable.locator('scrollContainer=');
    const tableWrapper = scrollingTable.locator('closest=.TableWrapper');

    // Scroll half way first
    await scrollContainer.evaluate((elm) => {
      const x = (elm.scrollWidth - elm.clientWidth) / 2;
      elm.scrollBy(x, 0);
    });
    await page.waitForTimeout(100); // needed?
    await localScreenshot(tableWrapper, 'scroll-middle', { margin: 'fullwidth' });

    // Scroll the rest of the way
    await scrollContainer.evaluate((elm) => elm.scrollBy(elm.scrollWidth, 0));
    await page.waitForTimeout(100); // needed?
    await localScreenshot(tableWrapper, 'scroll-right', { margin: 'fullwidth' });
  },
};
