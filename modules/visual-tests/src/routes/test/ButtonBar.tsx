import React, { Fragment } from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { ButtonBar } from '@reykjavik/hanna-react/ButtonBar';
import { ButtonPrimary } from '@reykjavik/hanna-react/ButtonPrimary';
import { ButtonSecondary } from '@reykjavik/hanna-react/ButtonSecondary';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.js';

export const meta: V2_MetaFunction = autoTitle;

export const handle = cssTokens('ButtonPrimary', 'ButtonSecondary', 'ButtonTertiary');

const buttons = (align: 'right' | undefined) => {
  return (
    <Fragment>
      <ButtonBar align={align}>
        <ButtonPrimary icon="go-forward">Continue</ButtonPrimary>
        <ButtonTertiary icon="go-back">Go Back</ButtonTertiary>
      </ButtonBar>
      <hr />

      <ButtonBar align={align}>
        <ButtonPrimary icon="go-forward">Continue</ButtonPrimary>
        <ButtonBar.Split />
        <ButtonTertiary>To the Right</ButtonTertiary>
        <ButtonTertiary icon="go-back">Go Back</ButtonTertiary>
      </ButtonBar>
      <hr />
      <ButtonBar align={align}>
        <ButtonPrimary icon="go-forward">Continue</ButtonPrimary>
        <ButtonTertiary>To the Left</ButtonTertiary>
        <ButtonBar.Split />
        <ButtonTertiary icon="go-back">Go Back</ButtonTertiary>
      </ButtonBar>
      <hr />
      <ButtonBar align={align}>
        <ButtonPrimary icon="go-forward">Continue</ButtonPrimary>
      </ButtonBar>
      <hr />
      <ButtonBar align={align}>
        <ButtonSecondary>To the left</ButtonSecondary>
        <ButtonBar.Split />
        <ButtonSecondary>Middle</ButtonSecondary>
        <ButtonBar.Split />
        <ButtonPrimary>To the Right</ButtonPrimary>
      </ButtonBar>
      <hr />

      <ButtonBar align={align}>
        <ButtonSecondary>To the left</ButtonSecondary>
        <span>Random content</span>
        <ButtonBar.Split />
        <ButtonSecondary>Middle …ish</ButtonSecondary>
        <ButtonBar.Split />
        <ButtonPrimary>To the Right</ButtonPrimary>
      </ButtonBar>

      <hr />
      <ButtonBar align={align}>
        <ButtonPrimary>Primary</ButtonPrimary>
        <ButtonSecondary>Eins</ButtonSecondary>
        <ButtonTertiary>Zwei</ButtonTertiary>
      </ButtonBar>
      <hr />

      <ButtonBar align={align}>
        <ButtonPrimary icon="go-forward">Continue</ButtonPrimary>
        <ButtonTertiary icon="go-back">Go Back</ButtonTertiary>
        <ButtonBar.Split />
        <ButtonSecondary>Secondary</ButtonSecondary>
        <ButtonSecondary>Uno</ButtonSecondary>
        <ButtonSecondary>Dos</ButtonSecondary>
        <ButtonBar.Split />
        <ButtonSecondary>Tres</ButtonSecondary>
      </ButtonBar>
    </Fragment>
  );
};

export default function () {
  return (
    <Minimal>
      <hr />
      {buttons(undefined)}
      <DummyBlock thin />
      {buttons('right')}
    </Minimal>
  );
}

export const testing: TestingInfo = {};
