import React, { useMemo } from 'react';
import { BreadCrumbs } from '@reykjavik/hanna-react/BreadCrumbs';
import { Meta, StoryObj } from '@storybook/react';

import { crumbTrail } from '../utils/_dummyData.js';

const lengthOptions = [1, 2, 3, 4] as const;
type Length = (typeof lengthOptions)[number];

type ControlProps = {
  length: Length;
  sparseLinks: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'Layout/BreadCrumbs',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const BreadCrumbsStory: React.FC<ControlProps> = ({ length, sparseLinks }) => {
  const links = useMemo(() => {
    const links = crumbTrail.slice(0, length);
    if (sparseLinks) {
      const i = Math.min(2, length - 1);
      links[i] = { label: links[i]!.label };
    }
    return links;
  }, [sparseLinks, length]);
  return <BreadCrumbs trail={links} />;
};

export const _BreadCrumbs: StoryObj<ControlProps> = {
  render: (args) => <BreadCrumbsStory {...args} />,
  argTypes: {
    length: {
      name: 'Length',
      options: lengthOptions,
      control: 'select',
    },
    sparseLinks: { name: 'Sparse links' },
  },
  args: {
    length: 3,
    sparseLinks: false,
  },
};
