import type { ElementRef } from 'react';

export * from './utils/browserSide.js';
export * from './utils/config.js';
export { HannaUIState, useHannaUIState } from './utils/HannaUIState.js';
export * from './utils/useDidChange.js';
export * from './utils/useDomid.js';
export * from './utils/useFormatMonitor.js';
export * from './utils/useGetSVGtext.js';
export {
  /** @deprecated  (Will be removed in v0.11) */
  useMenuToggling,
} from './utils/useMenuToggling.js';
export * from './utils/useMixedControlState.js';
export * from './utils/useScrollbarWidthCSSVar.js';

/**
 * Helper type to add HTML element props to a component, __including__
 * `data-*` attributes.
 */
export type HTMLProps<
  TagName extends keyof JSX.IntrinsicElements | null = null,
  ExcludeProps extends string = never
> = Omit<
  JSX.IntrinsicElements[TagName extends null ? 'div' : TagName],
  'ref' | 'children' | 'dangerouslySetInnerHTML' | ExcludeProps
> & {
  ref?: React.RefObject<ElementRef<TagName extends null ? 'div' : TagName>>;
  [dataAttr: `data-${string}`]: unknown;
};

export type WrapperElmProps<
  TagName extends keyof JSX.IntrinsicElements | null = null,
  ExcludeProps extends string = never
> = {
  /**
   * Custom HTML attributes for the component's wrapper element.
   *
   * Note, however, that some props may be intentionally
   * excluded from the list.
   *
   * __WARNING:__
   * In some cases props added this way can break the component, og hurt its
   * accessibility.  Also, some props may get ignored, or over-ridden by the
   * component. User discretion is advised.
   */
  wrapperProps?: HTMLProps<TagName, ExcludeProps>;
};

export type MissingWrapperElmProps = {
  /**
   * This component does NOT allow `wrapperPRops` yet, but will do so
   * in a near-future version of the `@reykjavik/hanna-react` library.
   */
  wrapperProps?: undefined;
};
