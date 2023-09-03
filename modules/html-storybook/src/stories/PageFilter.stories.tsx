import React, { Fragment } from 'react';
import { BlockBreak } from '@reykjavik/hanna-react/BlockBreak';
import { ButtonPrimary } from '@reykjavik/hanna-react/ButtonPrimary';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';
import { PageFilter } from '@reykjavik/hanna-react/PageFilter';
import { Selectbox } from '@reykjavik/hanna-react/Selectbox';
import { TextInput } from '@reykjavik/hanna-react/TextInput';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';

type ControlProps = {
  summaryText: boolean;
  resetButton: boolean;
  footnote: boolean;
  lineBreakInputs: boolean;
  underlapNextSibling: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'PageFilter',
};
export default meta;

const PageFilterStory: React.FC<ControlProps> = ({
  summaryText,
  resetButton,
  footnote,
  lineBreakInputs,
  underlapNextSibling,
}) => {
  const summary = summaryText
    ? 'Veldu þér dagsetningu sem og frá hvaða ráði fundargerðin er'
    : undefined;
  const footnoteContent = footnote ? (
    <>
      ATH: Allar Fundargerðir byggingarfulltrúa og skipulagsfulltrúa má nálgast{' '}
      <a href="">hér</a>.
    </>
  ) : undefined;

  const br = lineBreakInputs;
  const underlap = underlapNextSibling;
  return (
    <Fragment key={'' + summary + resetButton + footnoteContent + underlap + br}>
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
        footnote={footnoteContent}
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

export const _PageFilter: StoryObj<ControlProps> = {
  render: (args) => <PageFilterStory {...args} />,
  argTypes: {
    summaryText: { name: 'Summary text' },
    resetButton: { name: 'Reset button' },
    footnote: { name: 'Footnote' },
    lineBreakInputs: { name: 'Line break inputs' },
    underlapNextSibling: { name: 'Underlap next sibling' },
  },
  args: {
    summaryText: true,
    resetButton: false,
    footnote: false,
    lineBreakInputs: false,
    underlapNextSibling: false,
  },
};
