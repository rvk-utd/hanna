import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { ButtonBar } from '@reykjavik/hanna-react/ButtonBar';
import ButtonPrimary, { ButtonPrimaryProps } from '@reykjavik/hanna-react/ButtonPrimary';
import ButtonSecondary, { ButtonSecondaryProps } from '@reykjavik/hanna-react/ButtonSecondary';
import ButtonTertiary, { ButtonTertiaryProps } from '@reykjavik/hanna-react/ButtonTertiary';
import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';
//import { Buttons } from 'modules/html-storybook/src/Buttons.stories';
import { PrimaryPanel } from '@reykjavik/hanna-react/MainMenu/_PrimaryPanel';
import { serialize } from 'v8';

export const meta: MetaFunction = autoTitle;

export const handle = { cssTokens: ["ButtonPrimary", "ButtonSecondary", "ButtonTertiary"] };

const buttons = (align: 'right' | undefined) =>
  [
    <Fragment>
      <ButtonBar align={align}>
        <ButtonPrimary icon="go-forward">Continue</ButtonPrimary>
        <ButtonTertiary icon="go-back">Go Back</ButtonTertiary>
      </ButtonBar>
      <hr />

      <ButtonBar align={align}>
        <ButtonPrimary icon="go-forward">Continue</ButtonPrimary>
        {/* <ButtonBar.Split /> */}
        <ButtonTertiary>To the Right</ButtonTertiary>
        <ButtonTertiary icon="go-back">Go Back</ButtonTertiary>
      </ButtonBar>
      <hr />
      <ButtonBar align={align}>
        <ButtonPrimary icon="go-forward">Continue</ButtonPrimary>
        <ButtonTertiary>To the Left</ButtonTertiary>
        {/* <ButtonBar.Split /> */}
        <ButtonTertiary icon="go-back">Go Back</ButtonTertiary>
      </ButtonBar>
      <hr />
      <ButtonBar align={align}>
        <ButtonPrimary icon="go-forward">Continue</ButtonPrimary>
      </ButtonBar>
      <hr />
      <ButtonBar align={align}>
        <ButtonSecondary>To the left</ButtonSecondary>
        {/* <ButtonBar.Split /> */}
        <ButtonSecondary>Middle</ButtonSecondary>
        {/* <ButtonBar.Split /> */}
        <ButtonPrimary>To the Right</ButtonPrimary>
      </ButtonBar>
      <hr />

      <ButtonBar align={align}>
        <ButtonSecondary>To the left</ButtonSecondary>
        <span>Random content</span>
        {/* <ButtonBar.Split /> */}
        <ButtonSecondary>Middle …ish</ButtonSecondary>
        {/* <ButtonBar.Split /> */}
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
        {/* <ButtonBar.Split /> */}
        <ButtonSecondary>Secondary</ButtonSecondary>
        <ButtonSecondary>Uno</ButtonSecondary>
        <ButtonSecondary>Dos</ButtonSecondary>
        {/* <ButtonBar.Split /> */}
        <ButtonSecondary>Tres</ButtonSecondary>
      </ButtonBar>
    </Fragment>
  ]

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

export const testing: TestingInfo = {
  //initialHover: '.ButtonPrimary--go--back >> nth = 0 ',
  extras: async ({ page, pageScreenshot }) => {
    //const  = page.locator('.ButtonSecondary >> nth=0');
  },
};
