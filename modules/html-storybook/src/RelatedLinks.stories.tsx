import React from 'react';
import CenterColumn from '@reykjavik/hanna-react/CenterColumn';
import RelatedLinks, { RelatedLinkItem } from '@reykjavik/hanna-react/RelatedLinks';
import { boolean } from '@storybook/addon-knobs';

import { HiddenTiger } from './utils/HiddenTiger';
import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'RelatedLinks',
  component: RelatedLinks,
  parameters: {
    knobs: { disabled: false },
  } as StoryParameters,
};

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

export const _RelatedLinks: StoryComponent = () => {
  const title = boolean('Title', true) ? TITLE : undefined;

  const children = <RelatedLinks title={title} links={LINKS} />;

  return (
    <HiddenTiger
      serverSide={children}
      clientSide={<CenterColumn>{children}</CenterColumn>}
    />
  );
};

_RelatedLinks.story = {
  parameters: {
    css: { tokens: 'RelatedLinks,CenterColumn' },
  },
};
