import React from 'react';
import range from '@hugsmidjan/qj/range';
import ExtraLinks, {
  ExtraLinksCardProps,
  RelatedLink,
} from '@reykjavik/hanna-react/ExtraLinks';
import { boolean } from '@storybook/addon-knobs';

import { StoryComponent, StoryParameters } from './storytypes';

export default {
  title: 'ExtraLinks',
  parameters: {
    knobs: {
      disabled: false,
      theming: true,
    },
  } as StoryParameters,
};

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

export const _ExtraLinks: StoryComponent = () => {
  const showRel = boolean('Show "Related" links', false) || undefined;
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
