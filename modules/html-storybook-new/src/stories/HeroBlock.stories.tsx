import React, { Fragment } from 'react';
import { HeroBlock } from '@reykjavik/hanna-react/HeroBlock';
import { illustrations } from '@reykjavik/hanna-utils/assets';
import { select } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof HeroBlock> = {
  title: 'components/HeroBlock',
  component: HeroBlock,
};
export default meta;

type Story = StoryObj<typeof HeroBlock>;

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

const Component = () => {
  const illustration = select('Illustration', illustrations, illustrations[0]);
  return (
    <HeroBlock
      key={illustration}
      title={TITLE_TEXT}
      summary={SUMMARY_TEXT}
      illustration={illustration}
      primaryButton={{
        label: 'Primary button',
      }}
      secondaryButton={{
        href: '',
        label: 'Tertiary button',
      }}
      startSeen
    />
  );
};

const combos: Array<{
  buttons: 0 | 1 | 2;
  html: boolean;
}> = [
  { buttons: 2, html: false },
  { buttons: 1, html: false },
  { buttons: 0, html: false },
  { buttons: 0, html: true },
];

const HeroBlockExamplesComponent = () => {
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
              startSeen
            />
            {'\n\n'}
          </Fragment>
        );
      })}
    </>
  );
};

export const _HeroBlock: Story = {
  render: () => <Component />,
};

export const _HeroBlockExamples: Story = {
  render: () => <HeroBlockExamplesComponent />,
};
