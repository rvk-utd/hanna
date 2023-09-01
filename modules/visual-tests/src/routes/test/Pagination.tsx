import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Pagination } from '@reykjavik/hanna-react/Pagination';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

const onChange = () => alert('asdf');

const btnTypes = [
  {
    label: 'Links',
    props: {
      href: '?page=${page}',
    },
  },
  {
    label: 'Buttons',
    props: {},
  },
] as const;

type BtnTypes = (typeof btnTypes)[number]['label'];

const stateExamples: Array<[current: number, pageCount: number]> = [
  [1, 25],
  [25, 25],
  [219, 300],
  [2, 4],
  [6, 7],
];

export default function () {
  return (
    <Minimal bare>
      <DummyBlock thin />
      {btnTypes.map(({ label, props }) => (
        <>
          <p>{label}</p>
          {stateExamples.map(([current, pageCount], i) => (
            <Pagination
              key={i}
              current={current}
              pageCount={pageCount}
              onChange={onChange}
              {...props}
              wrapperProps={{ 'data-testid': `${label}-${current}-of-${pageCount}` }}
            />
          ))}
          <DummyBlock thin />
        </>
      ))}
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '[data-testid="Links-1-of-25"] .Pagination__button:nth-child(4)',
  extras: async ({ localScreenshot, mediaFormat, page }) => {
    if (!mediaFormat('wide')) {
      return;
    }

    const btnsToHover: Array<{
      testId: `${BtnTypes}-${number}-of-${number}`;
      nth: number;
      name: string;
    }> = [
      { testId: 'Links-25-of-25', nth: 1, name: 'p25-link' },
      { testId: 'Links-219-of-300', nth: 8, name: 'p300-link' },
      { testId: 'Buttons-1-of-25', nth: 3, name: 'disabled-link' },
      { testId: 'Buttons-25-of-25', nth: 1, name: 'p25-button' },
      { testId: 'Buttons-219-of-300', nth: 8, name: '300-button' },
    ];

    /* eslint-disable no-await-in-loop */
    for (const { testId, nth, name } of btnsToHover) {
      const btn = page
        .getByTestId(testId)
        .locator(`.Pagination__button:nth-child(${nth})`);
      await btn.hover({ force: true });
      await localScreenshot(btn, `${name}-hover`, { margin: 10 });
    }
    /* eslint-enable no-await-in-loop */
  },
};
