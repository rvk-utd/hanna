import React from 'react';
import { CenterColumn } from '@reykjavik/hanna-react/CenterColumn';
import { RelatedLinkItem, RelatedLinks } from '@reykjavik/hanna-react/RelatedLinks';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';

type ControlProps = {
  title: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'RelatedLinks',
  parameters: {
    css: { tokens: 'RelatedLinks,CenterColumn' },
  },
};
export default meta;

const TITLE = 'Tengt efni';

const LINKS: Array<RelatedLinkItem> = [
  {
    href: 'https://abendingar.reykjavik.is',
    label: 'Ábendingavefur',
    type: 'external',
  },
  {
    href: 'https://abendingar.reykjavik.is',
    label: 'Ábendingavefur',
    target: '_blank',
  },
  {
    href: '/files/somepdfFile',
    label: 'Eitthvað PDF skjal',
    type: 'pdf',
  },
  {
    href: '/files/some.pdf',
    label: 'Eitthvað PDF skjal',
  },
  {
    href: '/files/someOtherDocument',
    label: 'Annars konar Skjal með afar langan titil sem brotnar milli lína',
    type: 'document',
  },
  {
    href: '/normal/link',
    label: 'Vefsíða með tengdu efni',
  },
];

const RelatedLinksStory: React.FC<ControlProps> = ({ title }) => {
  const displayTitle = title ? TITLE : undefined;
  const children = <RelatedLinks title={displayTitle} links={LINKS} />;

  return (
    <HiddenTiger
      serverSide={children}
      clientSide={<CenterColumn>{children}</CenterColumn>}
    />
  );
};

export const _RelatedLinks: StoryObj<ControlProps> = {
  render: (args) => <RelatedLinksStory {...args} />,
  argTypes: {
    title: { name: 'Title' },
  },
  args: {
    title: true,
  },
};
