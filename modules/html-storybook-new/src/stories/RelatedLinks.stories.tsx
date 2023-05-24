import React from 'react';
import { CenterColumn } from '@reykjavik/hanna-react/CenterColumn';
import { RelatedLinkItem, RelatedLinks } from '@reykjavik/hanna-react/RelatedLinks';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';
import { StoryParameters } from '../utils/storytypes.js';

const meta: Meta<typeof RelatedLinks> = {
  title: 'RelatedLinks',
  component: RelatedLinks,
  parameters: {
    css: { tokens: 'RelatedLinks,CenterColumn' },
  } as StoryParameters,
};
export default meta;

type Story = StoryObj<typeof RelatedLinks>;

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

const Component = () => {
  const title = boolean('Title', true) ? TITLE : undefined;
  const children = <RelatedLinks title={title} links={LINKS} />;

  return (
    <HiddenTiger
      serverSide={children}
      clientSide={<CenterColumn>{children}</CenterColumn>}
    />
  );
};

export const _RelatedLinks: Story = {
  render: () => <Component />,
};
