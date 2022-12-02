import React, { Fragment } from 'react';
import BlockBreak from '@reykjavik/hanna-react/BlockBreak';
import ButtonPrimary from '@reykjavik/hanna-react/ButtonPrimary';
import ButtonTertiary from '@reykjavik/hanna-react/ButtonTertiary';
import PageFilter from '@reykjavik/hanna-react/PageFilter';
import Selectbox from '@reykjavik/hanna-react/Selectbox';
import TextInput from '@reykjavik/hanna-react/TextInput';
import { boolean } from '@storybook/addon-knobs';

import { HiddenTiger } from './utils/HiddenTiger';
import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'PageFilter',
  parameters: {
    knobs: { disabled: false },
  } as StoryParameters,
};

export const _PageFilter: StoryComponent = () => {
  const summary = boolean('Summary text', true)
    ? 'Veldu þér dagsetningu sem og frá hvaða ráði fundargerðin er'
    : undefined;
  const resetButton = boolean('Reset button', false);
  const footnote = boolean('Footnote', false) ? (
    <>
      ATH: Allar Fundargerðir byggingarfulltrúa og skipulagsfulltrúa má nálgast{' '}
      <a href="">hér</a>.
    </>
  ) : undefined;

  const br = boolean('Line break inputs', false);
  const underlap = boolean('Underlap next sibling', false);

  return (
    <Fragment key={'' + summary + resetButton + footnote + underlap + br}>
      <PageFilter
        title="Leita í fundargerðum"
        summary={summary}
        filters={
          <>
            <TextInput label="Search terms" />
            {br && <BlockBreak />}
            <TextInput label="Moar terms" />
            <Selectbox
              label="Optional"
              placeholder="asdfasdfasdfasdf"
              options={['', 'One option', 'Other option']}
            />
          </>
        }
        buttonRow={
          <>
            <ButtonPrimary>Sækja fundargerðir</ButtonPrimary>
            {resetButton && <ButtonTertiary disabled>Hreinsa</ButtonTertiary>}
          </>
        }
        footnote={footnote}
        underlap={underlap}
        startSeen
      />

      {/* --------------------------------------------------------------------------- */}

      <HiddenTiger
        style={{
          backgroundColor: 'rgba(0, 0 ,0, .05',
          marginLeft: '25%',
          padding: '7.5% 5%',
        }}
      >
        <p>
          <strong>NOTE:</strong> <code>.PageFilter__filters</code> accepts any of the
          normal form components such as <code>DatePicker</code>, <code>SearchInput</code>
          , etc.
        </p>

        {/* <p>0</p>
			{(new Array(36)).join('.').split('').map((x,i) => (
				<p key={i}>•<br />{i+1}</p>
			))} */}
      </HiddenTiger>
    </Fragment>
  );
};

// _PageFilter.story = {
// 	parameters: {
// 		knobs: { disabled: true },
// 	},
// };
