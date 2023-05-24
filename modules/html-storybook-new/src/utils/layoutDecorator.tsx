import React from 'react';
import type { StoryContext } from '@storybook/react';

export const layoutDecorator = (story: () => React.ReactNode, context: StoryContext) => {
  console.log('context: ', context);
  const componentName = context.name;
  return <>{story()}</>;
};
