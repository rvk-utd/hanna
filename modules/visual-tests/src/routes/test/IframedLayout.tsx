import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { useSearchParams } from '@remix-run/react';
import { IframeBlock } from '@reykjavik/hanna-react/IframeBlock';
import { IframeBlockClientScript } from '@reykjavik/hanna-react/IframeBlockClientScript';
import { IframedLayout } from '@reykjavik/hanna-react/IframedLayout';

import { DummyBlock, GhostLabel } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.js';

export const meta: V2_MetaFunction = autoTitle;

// Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens('IframeBlock');

export default function () {
  const [params] = useSearchParams();

  /*
    Load the route with `?iframed` to see IframedLayout actually being iframed.
  */
  if (params.get('iframed') != null) {
    return (
      <Minimal>
        <IframeBlock title="Iframed example" src="/test/IframedLayout" />
      </Minimal>
    );
  }

  return (
    <IframedLayout>
      <GhostLabel label="IframedLayout" black />
      <DummyBlock big />
      <div style={{ height: '1000px' }} />
      <DummyBlock big />
      <IframeBlockClientScript />
    </IframedLayout>
  );
}

export const testing: TestingInfo = {};
