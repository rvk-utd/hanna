import React, { Fragment } from 'react';
import { HeroBlock } from '@reykjavik/hanna-react/HeroBlock';
import { Illustration, illustrations } from '@reykjavik/hanna-utils/assets';
import { Meta, StoryObj } from '@storybook/react';

type ControlProps = {
  illustration: Illustration;
};

const meta: Meta<ControlProps> = {
  title: 'HeroBlock',
};
export default meta;

const TITLE_TEXT = 'HeroBlock title';
const SUMMARY_TEXT = 'HeroBlock summary text, lorem ipsum dolor sit ament foobar.';
const SUMMARY_HTML = () => (
  <>
    <p>
      HeroBlock summary text, lorem <a href="">ipsum dolor</a> sit ament foobar. Annoying
      but this might happen. Lots of HTML and text inside the Hero Block summary field.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua.
    </p>
    <p>
      Lots of HTML and text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
      do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </>
);

const combos: Array<{
  buttons: 0 | 1 | 2;
  html: boolean;
}> = [
  { buttons: 2, html: false },
  { buttons: 1, html: false },
  { buttons: 0, html: false },
  { buttons: 0, html: true },
];

const HeroBlockExamplesStory = () => {
  return (
    <>
      {combos.map(({ buttons, html }, i) => {
        const button1 = buttons > 0 || undefined;
        const button2 = buttons > 1 || undefined;
        return (
          <Fragment key={i}>
            <HeroBlock
              title={TITLE_TEXT}
              summary={html ? SUMMARY_HTML() : SUMMARY_TEXT}
              illustration={illustrations[10]}
              primaryButton={
                button1 && {
                  label: 'Primary button',
                }
              }
              secondaryButton={
                button2 && {
                  href: '',
                  label: 'Tertiary button',
                }
              }
            />
            {'\n\n'}
          </Fragment>
        );
      })}
    </>
  );
};

export const _HeroBlock: StoryObj<ControlProps> = {
  render: (args) => (
    <HeroBlock
      key={args.illustration}
      title={TITLE_TEXT}
      summary={SUMMARY_TEXT}
      illustration={args.illustration}
      primaryButton={{
        label: 'Primary button',
      }}
      secondaryButton={{
        href: '',
        label: 'Tertiary button',
      }}
    />
  ),
  argTypes: {
    illustration: {
      name: 'Illustration',
      options: illustrations,
      control: 'select',
    },
  },
  args: {
    illustration: illustrations[0],
  },
};

export const _HeroBlockExamples: StoryObj<ControlProps> = {
  render: () => <HeroBlockExamplesStory />,
  parameters: {
    css: { tokens: 'HeroBlock' },
    controls: { hideNoControlsWarning: true },
  },
};
