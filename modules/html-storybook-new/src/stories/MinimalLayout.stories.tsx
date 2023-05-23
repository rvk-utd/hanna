import React from 'react';
import { Layout } from '@reykjavik/hanna-react/Layout';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Layout> = {
  title: 'Layout/MinimalLayout',
  component: Layout,
};
export default meta;

type Story = StoryObj<typeof Layout>;

const Component = () => {
  const globalAlerts = boolean('Global alerts container', false);
  const navChildren = boolean('Page has no menu or navigation', false) ? undefined : ' ';
  return (
    <Layout
      key={'' + globalAlerts + navChildren}
      globalAlerts={globalAlerts && ' '}
      navChildren={navChildren}
      ssr="ssr-only"
      mainChildren=""
    />
  );
};

export const _MinimalLayout: Story = {
  render: () => <Component />,
};
