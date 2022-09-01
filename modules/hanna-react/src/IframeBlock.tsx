import React from 'react';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';
import { EitherObj } from '@reykjavik/hanna-utils';
import IframeResizer, { ResizerOptions } from 'iframe-resizer-react';

export type IframeBlockProps = {
  src: string;
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

const IframeBlock = (props: IframeBlockProps) => {
  const {
    src,
    framed,
    compact,
    scrolling,
    height = 'auto',
    align,
    checkOrigin = false,
  } = props;

  const className = getBemClass('IframeBlock', [
    framed && 'framed',
    compact && 'compact',
    align === 'right' && 'align--' + align,
  ]);

  return height === 'auto' ? (
    <IframeResizer className={className} src={src} checkOrigin={checkOrigin} />
  ) : (
    <iframe
      className={className}
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
