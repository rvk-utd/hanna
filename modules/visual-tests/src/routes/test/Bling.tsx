import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import Bling, { BlingProps } from '@reykjavik/hanna-react/Bling';

import { Minimal } from '../../layout/Minimal';
import { blingUrl } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

const Blocks = (props: { borderTop?: boolean }) => (
  <div
    style={{
      height: 'min(300px, 30vw)',
      background: 'rgba(222, 222, 222, .5)',
      borderTop: props.borderTop ? '1px dashed rgba(0,0,0,.15)' : undefined,
    }}
  >
    <div
      style={{
        height: '100%',
        width: '50%',
        borderRight: '1px dashed rgba(0,0,0,.15)',
      }}
    />
  </div>
);

type TestBlingList = Array<Omit<BlingProps, 'type'>>;
const variants: TestBlingList = [
  {},
  { parent: 'top-ish' },
  { parent: 'top' },
  { parent: 'bottom' },
  { parent: 'bottom-ish' },
  { overlay: true },
];

const blings: TestBlingList = [
  { align: undefined /* 'left' */ },
  { align: 'right', color: 'primary' },
  { align: 'left-ish', vertical: 'up-ish', color: 'secondary' },
  { align: 'right-ish', vertical: 'down-ish', color: 'secondary' },
  { align: 'left-center', vertical: 'down' },
  { align: 'right-center', vertical: 'up', color: 'primary' },
];
// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    <Minimal>
      {variants.map((variantProps, v) => (
        <div key={v} style={{ position: 'relative', marginTop: v ? '10vw' : undefined }}>
          <Blocks />
          {blings.map((blingProps, b) => (
            <Bling key={b} blingUrl={blingUrl} {...variantProps} {...blingProps} />
          ))}
          <Blocks borderTop />
        </div>
      ))}
    </Minimal>
  );
}

export const testing: TestingInfo = {};
