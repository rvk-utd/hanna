import React from 'react';
import { getAssetUrl } from '@reykjavik/hanna-utils/assets';

export type IframeBlockClientScriptProps = {
  /**
   * Restricts the domain of the parent page, to prevent unknown sites
   * from recieving the benefits of automated resizing.
   *
   * Default: `'*'` (resizable on any domain)
   */
  targetOrigin?: string;
};

/**
 * Drop this component into the iframed page to enable auto-resizing of the
 * `<iframe/>` on the parent pages's `IframeBlock` component.
 */
export const IframeBlockClientScript = (props: IframeBlockClientScriptProps) => {
  const { targetOrigin } = props;
  return (
    <>
      {!!targetOrigin && (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.iFrameResizer=${JSON.stringify({ targetOrigin })}`,
          }}
        />
      )}
      <script src={getAssetUrl('scripts/iframeResizer.contentWindow@4.js')} />
    </>
  );
};
