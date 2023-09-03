declare module '@whitespace/storybook-addon-html/react' {
  import { DecoratorFunction } from '@storybook/addons';
  import { StoryFnReactReturnType } from '@storybook/react/dist/client/preview/types';

  export const withHTML: DecoratorFunction<StoryFnReactReturnType>;
}

declare module '@storybook/react/standalone' {
  export default function (...args: Array<any>): void;
}
