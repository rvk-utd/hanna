import './_/initHannaNamespace.js';

import type { iframeResizer as iFR } from 'iframe-resizer';
// @ts-expect-error  (reason: `iframe-resizer`'s exports are not treeshakeable, so we must target a source file directly)
import _iframeResizer from 'iframe-resizer/js/iframeResizer.js';

const iframeResizer = _iframeResizer as typeof iFR;

window.Hanna.makeSprinkle({
  name: 'IframeBlock',
  selector: 'iframe.IframeBlock',

  init: (elm: HTMLIFrameElement) => {
    if (!elm.height) {
      return iframeResizer({ checkOrigin: false }, elm)[0]!.iFrameResizer;
    }
  },
  unmount: (elm, resizer) => {
    if (resizer) {
      // @ts-expect-error  (@types/iframe-resizer@3.5.9 fails to declare the `removeListeners` method)
      resizer.removeListeners();
    }
  },
});
