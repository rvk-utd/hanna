import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import ButtonBar from '@reykjavik/hanna-react/ButtonBar';
import ButtonPrimary from '@reykjavik/hanna-react/ButtonPrimary';
import ButtonSecondary from '@reykjavik/hanna-react/ButtonSecondary';
import ButtonTertiary from '@reykjavik/hanna-react/ButtonTertiary';

import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

export const handle = {
  cssTokens: ['ButtonPrimary', 'ButtonSecondary', 'ButtonTertiary'],
};

const buttons = (align: 'right' | undefined) => {
  // alias here to appease PlayWright's weirdly limited build config
  const ButtonBarSplit = ButtonBar.Split;
  return (
    <Fragment>
      <ButtonBar align={align}>
        <ButtonPrimary icon="go-forward">Continue</ButtonPrimary>
        <ButtonTertiary icon="go-back">Go Back</ButtonTertiary>
      </ButtonBar>
      <hr />

      <ButtonBar align={align}>
        <ButtonPrimary icon="go-forward">Continue</ButtonPrimary>
        <ButtonBarSplit />
        <ButtonTertiary>To the Right</ButtonTertiary>
        <ButtonTertiary icon="go-back">Go Back</ButtonTertiary>
      </ButtonBar>
      <hr />
      <ButtonBar align={align}>
        <ButtonPrimary icon="go-forward">Continue</ButtonPrimary>
        <ButtonTertiary>To the Left</ButtonTertiary>
        <ButtonBarSplit />
        <ButtonTertiary icon="go-back">Go Back</ButtonTertiary>
      </ButtonBar>
      <hr />
      <ButtonBar align={align}>
        <ButtonPrimary icon="go-forward">Continue</ButtonPrimary>
      </ButtonBar>
      <hr />
      <ButtonBar align={align}>
        <ButtonSecondary>To the left</ButtonSecondary>
        <ButtonBarSplit />
        <ButtonSecondary>Middle</ButtonSecondary>
        <ButtonBarSplit />
        <ButtonPrimary>To the Right</ButtonPrimary>
      </ButtonBar>
      <hr />

      <ButtonBar align={align}>
        <ButtonSecondary>To the left</ButtonSecondary>
        <span>Random content</span>
        <ButtonBarSplit />
        <ButtonSecondary>Middle …ish</ButtonSecondary>
        <ButtonBarSplit />
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
        <ButtonBarSplit />
        <ButtonSecondary>Secondary</ButtonSecondary>
        <ButtonSecondary>Uno</ButtonSecondary>
        <ButtonSecondary>Dos</ButtonSecondary>
        <ButtonBarSplit />
        <ButtonSecondary>Tres</ButtonSecondary>
      </ButtonBar>
    </Fragment>
  );
};

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <hr />
      {buttons(undefined)}
      <hr />
      Right align
      <hr />
      {buttons('right')}
    </Minimal>
  );
}

export const testing: TestingInfo = {};