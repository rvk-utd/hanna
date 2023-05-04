import './initHannaNamespace.js';

import { getSVGtext } from '@reykjavik/hanna-utils';
import { BlingType, getBlingUrl } from '@reykjavik/hanna-utils/assets';

window.Hanna.makeSprinkle({
  name: 'Bling',

  init: (elm: HTMLElement) => {
    const { blingType, blingImage } = elm.dataset;
    const blingUrl = blingType ? getBlingUrl(blingType as BlingType) : blingImage;

    getSVGtext(blingUrl).then((svgText) => {
      if (svgText) {
        elm.innerHTML = svgText;
      }
    });
  },
});
