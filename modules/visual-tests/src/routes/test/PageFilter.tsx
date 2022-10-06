import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import BlockBreak from '@reykjavik/hanna-react/BlockBreak';
import ButtonPrimary from '@reykjavik/hanna-react/ButtonPrimary';
import ButtonTertiary from '@reykjavik/hanna-react/ButtonTertiary';
import PageFilter from '@reykjavik/hanna-react/PageFilter';
import Selectbox from '@reykjavik/hanna-react/Selectbox';
import TextInput from '@reykjavik/hanna-react/TextInput';
import HiddenTiger from 'modules/html-storybook/src/utils/HiddenTiger';

import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = { cssTokens: ['BlockBreak'] };

const summary = 'This is a summary text!';
const filters = (br: boolean) => (
  <Fragment>
    <TextInput label="Search terms" />
    {br && <BlockBreak />}
    <TextInput label="Moar terms" />
    <Selectbox
      label="Optional"
      placeholder="asdfasdfasdfasdf"
      options={['', 'One option', 'Other option']}
    />
  </Fragment>
);
const buttonRow = (resetButton: boolean) => (
  <Fragment>
    <ButtonPrimary>Sækja fundargerðir</ButtonPrimary>
    {resetButton && <ButtonTertiary disabled>Hreinsa</ButtonTertiary>}
  </Fragment>
);

const footnote = lorem.medium;
export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      {' '}
      <PageFilter
        title="Short title"
        summary={summary}
        filters={filters(false)}
        buttonRow={buttonRow(false)}
        footnote={footnote}
        startSeen
      />
      <PageFilter
        title="A title that's a little longer"
        summary={summary}
        filters={filters(true)}
        buttonRow={buttonRow(true)}
        startSeen
      />
      <PageFilter
        title="This title is longer than the previous one"
        summary={summary}
        filters={filters(true)}
        buttonRow={buttonRow(true)}
        footnote={footnote}
        startSeen
      />
      <PageFilter
        title="Title"
        summary={summary}
        filters={filters(true)}
        buttonRow={buttonRow(false)}
        underlap={true}
        startSeen
      />
      <HiddenTiger
        style={{
          backgroundColor: 'rgba(0, 0 ,0, .05',
          marginLeft: '25%',
          padding: '7.5% 5%',
        }}
      >
        <p>
          <strong>NOTE:</strong> This textbox is here to show <strong>underlap.</strong>{' '}
          {lorem.short}
        </p>
      </HiddenTiger>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
