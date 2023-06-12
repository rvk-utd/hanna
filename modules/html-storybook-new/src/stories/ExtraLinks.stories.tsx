import React from 'react';
import range from '@hugsmidjan/qj/range';
import { ThemeOption, themeOptions } from '@reykjavik/hanna-react/constants';
import {
  ExtraLinks,
  ExtraLinksCardProps,
  RelatedLink,
} from '@reykjavik/hanna-react/ExtraLinks';
import { Meta, StoryObj } from '@storybook/react';

type ControlProps = {
  theme: ThemeOption;
  showRelatedLinks: boolean;
};

type Story = StoryObj<ControlProps>;

const meta: Meta<ControlProps> = {
  title: 'ExtraLinks',
};
export default meta;

const TITLE = 'Extra links top';
const CARDS = range(1, 8).map(
  (): ExtraLinksCardProps => ({
    title: 'Eignaskiptayfirlýsing',
    href: '',
    summary: 'Lögboðinn skriflegur gerningur um skiptingu fjöleignarhúss.',
  })
);

const relatedTypes = ['pdf', 'text', 'link'] as const;
const RELATED_TITLE = 'Tengt efni';
const RELATED_LINKS = range(1, 6).map(
  (n): RelatedLink => ({
    label: 'Stefna í málefnum eldri borgara til ársins 2022 ' + n,
    href: '',
    type: relatedTypes[(n - 1) % 4],
  })
);

const ExtraLinksStory: React.FC<ControlProps> = ({ showRelatedLinks }) => {
  const showRel = showRelatedLinks || undefined;
  return (
    <ExtraLinks
      title={TITLE}
      cards={CARDS}
      relatedTitle={showRel && RELATED_TITLE}
      relatedLinks={showRel && RELATED_LINKS}
      startSeen
    />
  );
};

export const _ExtraLinks: Story = {
  render: (args: ControlProps) => <ExtraLinksStory {...args} />,
  argTypes: {
    theme: {
      control: 'select',
      options: themeOptions,
    },
    showRelatedLinks: {
      control: 'boolean',
      name: 'Show "related" links',
    },
  },
  args: {
    theme: 'trustworthy',
    showRelatedLinks: false,
  },
};
