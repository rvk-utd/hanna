import React, { useMemo } from 'react';
import { BreadCrumbs } from '@reykjavik/hanna-react/BreadCrumbs';
import { Meta, StoryObj } from '@storybook/react';

import { crumbTrail } from '../utils/_dummyData.js';
import { StoryParameters } from '../utils/storytypes.js';

const lengthOptions = [1, 2, 3, 4] as const;
type Length = (typeof lengthOptions)[number];

type ControlProps = {
  length: Length;
  sparseLinks: boolean;
};

type Story = StoryObj<ControlProps>;

const meta: Meta<ControlProps> = {
  title: 'Layout/BreadCrumbs',
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  } as StoryParameters,
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

export const _BreadCrumbs: Story = {
  render: (args: ControlProps) => <BreadCrumbsStory {...args} />,
  argTypes: {
    length: {
      control: 'select',
      options: lengthOptions,
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
