import React, { Fragment } from 'react';
import { Attention } from '@reykjavik/hanna-react/Attention';
import { LabeledTextBlock } from '@reykjavik/hanna-react/LabeledTextBlock';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

const meta: Meta<typeof LabeledTextBlock> = {
  title: 'LabeledTextBlock',
  component: LabeledTextBlock,
  parameters: {
    css: { tokens: 'LabeledTextBlock,Attention' },
    knobs: { disabled: false },
  } as StoryParameters,
};
export default meta;

type Story = StoryObj<typeof LabeledTextBlock>;

const LABEL_TEXT = 'LabeledTextBlock title';
const SUMMARY_TEXT =
  'Gott er að athuga hvort þörf sé á byggingarleyfi fyrir áætluðum framkvæmdum. ' +
  'Húseigasdasdandi eða lóðarhafi getur lagt inn formlega fyrirspurn áður en hönnunarferli ' +
  'hefst til að kanna hvort líklegt sé að leyfi muni fást fyrir tiltekinni framkvæmd. ';

const SUMMARY_HTML = () => (
  <>
    <p>
      Gott er að athuga hvort þörf sé á byggingarleyfi fyrir áætluðum framkvæmdum.
      Húseigasdasdandi eða lóðarhafi getur lagt inn formlega fyrirspurn áður en
      hönnunarferli hefst
    </p>
    <Attention>
      <p>
        Það er til að kanna hvort líklegt sé að leyfi muni fást fyrir tiltekinni
        framkvæmd. Gott er að athuga hvort þörf sé á byggingarleyfi fyrir áætluðum
        framkvæmdum.
      </p>
    </Attention>
  </>
);

const buttons = [
  { href: '', label: 'See more' },
  { href: '', label: 'See more' },
];

const LabeledTextBlockComponent = () => {
  const button = boolean('Button', false) || undefined;
  const wide = boolean('Wide format', false) || undefined;
  return (
    <LabeledTextBlock
      label={LABEL_TEXT}
      summary={SUMMARY_HTML()}
      buttons={button && buttons}
      wide={wide}
      startSeen
    />
  );
};

export const _LabeledTextBlock: Story = {
  render: () => <LabeledTextBlockComponent />,
};

// ===========================================================================

const combos: Array<{ button?: true; wide?: true; html?: true }> = [
  {},
  { button: true },
  { wide: true, button: true },
  { wide: true, html: true },
];

const LabeledTextBlockExamplesComponent = () => {
  return (
    <>
      {combos.map(({ button, wide, html }, i) => (
        <Fragment key={i}>
          <LabeledTextBlock
            label={LABEL_TEXT}
            summary={html ? SUMMARY_HTML() : SUMMARY_TEXT}
            buttons={button && buttons}
            wide={wide}
            startSeen
          />
          {'\n\n'}
        </Fragment>
      ))}
    </>
  );
};

export const _LabeledTextBlockExamples: Story = {
  render: () => <LabeledTextBlockExamplesComponent />,
};
