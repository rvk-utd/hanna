import React from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { EitherObj } from '@reykjavik/hanna-utils';
import IframeResizer, { type ResizerOptions } from 'iframe-resizer-react';

export type IframeBlockProps = {
  src: string;
  /** Accessible title attribute for the iframe (similar to alt="" on images) */
  title: string;
  framed?: boolean;
  compact?: boolean;
  align?: 'right';
} & EitherObj<
  {
    /** Default: `'auto'` ... which initializes "iframe-resizer" script */
    height?: 'auto';
    /** Default: `false` ... Set to `true` for same-site only, or provide array of allowed domain-names */
    checkOrigin?: ResizerOptions['checkOrigin'];
  },
  {
    height: number;
    scrolling?: boolean | 'no' | 'yes';
  }
>;

/**
 * When `height` is undefined or "auto", then Add the following code-snipped to the iframed page:
 *
 * ```js
 * <script> window.iFrameResizer = { targetOrigin: '*' }; </script>
 * <script src="https://styles.reykjavik.is/assets/scripts/iframeResizer.contentWindow@4.js"></script>
 * ```
 */

export const IframeBlock = (props: IframeBlockProps) => {
  const {
    title,
    src,
    framed,
    compact,
    scrolling,
    height = 'auto',
    align,
    checkOrigin = false,
  } = props;

  const className = modifiedClass('IframeBlock', [
    framed && 'framed',
    compact && 'compact',
    align === 'right' && 'align--' + align,
  ]);

  return height === 'auto' ? (
    <IframeResizer
      className={className}
      title={title}
      src={src}
      checkOrigin={checkOrigin}
    />
  ) : (
    <iframe
      className={className}
      title={title}
      src={src}
      // hidden tiger: pass negative height to disable iframe-resizer but not set height explicitly
      // (Silly hack, don't rely on this)
      height={height < 0 ? undefined : height}
      // allow undefined to suppress scrolling attribute
      scrolling={scrolling === true ? 'yes' : scrolling === false ? 'no' : scrolling}
    />
  );
};

export default IframeBlock;
