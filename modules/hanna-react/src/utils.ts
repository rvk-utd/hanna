export * from './utils/browserSide.js';
export * from './utils/config.js';
export * from './utils/HannaUIState.js';
export * from './utils/useDidChange.js';
export * from './utils/useFormatMonitor.js';
export * from './utils/useGetSVGtext.js';
export * from './utils/useMixedControlState.js';
export * from './utils/useScrollbarWidthCSSVar.js';

/**
 * Helper type to add HTML element props to a component, **including**
 * `data-*` attributes
 */
export type HTMLProps<T extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[T] & {
    [dataAttr: `data-${string}`]: unknown;
  };
