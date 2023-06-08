import React, { Fragment } from 'react';
import { Attention } from '@reykjavik/hanna-react/Attention';
import { LabeledTextBlock } from '@reykjavik/hanna-react/LabeledTextBlock';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

type LabeledTextBlockControlProps = {
  button: boolean;
  wideFormat: boolean;
};

const meta: Meta<LabeledTextBlockControlProps> = {
  title: 'LabeledTextBlock',
  parameters: {
    css: { tokens: 'LabeledTextBlock,Attention' },
    knobs: { disabled: false },
  } as StoryParameters,
};
export default meta;

type Story = StoryObj<LabeledTextBlockControlProps>;

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

const LabeledTextBlockStory: React.FC<LabeledTextBlockControlProps> = ({
  button,
  wideFormat,
}) => {
  const showButtons = button || undefined;
  const wide = wideFormat || undefined;
  return (
    <LabeledTextBlock
      label={LABEL_TEXT}
      summary={SUMMARY_HTML()}
      buttons={showButtons && buttons}
      wide={wide}
      startSeen
    />
  );
};

export const _LabeledTextBlock: Story = {
  render: (args: LabeledTextBlockControlProps) => <LabeledTextBlockStory {...args} />,
  argTypes: {
    button: {
      control: 'boolean',
      name: 'Button',
    },
    wideFormat: {
      control: 'boolean',
      name: 'Wide format',
    },
  },
  args: {
    button: false,
    wideFormat: false,
  },
};

// ===========================================================================

const combos: Array<{ button?: true; wide?: true; html?: true }> = [
  {},
  { button: true },
  { wide: true, button: true },
  { wide: true, html: true },
];

const LabeledTextBlockExamplesStory = () => {
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
  render: () => <LabeledTextBlockExamplesStory />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};