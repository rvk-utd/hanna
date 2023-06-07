import React, { useMemo } from 'react';
import { BreadCrumbs } from '@reykjavik/hanna-react/BreadCrumbs';
import { Meta, StoryObj } from '@storybook/react';

import { crumbTrail } from '../utils/_dummyData.js';

type BreadCrumbsControlProps = {
  length: number;
  sparseLinks: boolean;
};

type Story = StoryObj<BreadCrumbsControlProps>;

const meta: Meta<BreadCrumbsControlProps> = {
  title: 'Layout/BreadCrumbs',
};
export default meta;

const BreadCrumbsStory: React.FC<BreadCrumbsControlProps> = ({ length, sparseLinks }) => {
  const links = useMemo(() => {
    const links = crumbTrail.slice(0, length);
    if (sparseLinks) {
      const i = Math.min(2, length - 1);
      links[i] = { label: links[i]!.label };
    }
    return links;
  }, [sparseLinks, length]);
  return <BreadCrumbs title="Þú ert hér" trail={links} />;
};

export const _BreadCrumbs: Story = {
  render: (args: BreadCrumbsControlProps) => <BreadCrumbsStory {...args} />,
  argTypes: {
    length: {
      control: 'number',
      name: 'Length',
    },
    sparseLinks: {
      control: 'boolean',
      name: 'Sparse links',
    },
  },
  args: {
    length: 3,
    sparseLinks: false,
  },
};
