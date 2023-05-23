import React from 'react';
import { FooterBadges, FooterBadgesProps } from '@reykjavik/hanna-react/FooterBadges';
import { Meta, StoryObj } from '@storybook/react';

import dummyImage from '../example_assets/FooterBadges__image.jpg';

const meta: Meta<typeof FooterBadges> = {
  title: 'Layout/FooterBadges',
  component: FooterBadges,
};
export default meta;

type Story = StoryObj<typeof FooterBadges>;

const dummySubFooterLinks: FooterBadgesProps['badges'] = [
  {
    href: 'http://www.reykjavik.is',
    altText: 'Jafnlaunavottun 2020–2021',
    src: dummyImage,
  },
];

dummySubFooterLinks.push(...dummySubFooterLinks);

export const _FooterBadges: Story = {
  render: () => <FooterBadges badges={dummySubFooterLinks} />,
};
