import React from 'react';
import range from '@hugsmidjan/qj/range';
import {
  ExtraLinks,
  ExtraLinksCardProps,
  RelatedLink,
} from '@reykjavik/hanna-react/ExtraLinks';
import { Meta, StoryObj } from '@storybook/react';

import { themeArgTypes, ThemeControlProps } from '../utils/knobs.js';

type ControlProps = {
  showRelatedLinks: boolean;
} & ThemeControlProps;

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

const ExtraLinksStory = (props: ControlProps) => {
  const showRel = props.showRelatedLinks || undefined;
  return (
    <ExtraLinks
      title={TITLE}
      cards={CARDS}
      relatedTitle={showRel && RELATED_TITLE}
      relatedLinks={showRel && RELATED_LINKS}
    />
  );
};

export const _ExtraLinks: StoryObj<ControlProps> = {
  render: (args) => <ExtraLinksStory {...args} />,
  argTypes: {
    showRelatedLinks: { name: 'Show "related" links' },
    ...themeArgTypes,
  },
  args: {
    showRelatedLinks: false,
  },
};
