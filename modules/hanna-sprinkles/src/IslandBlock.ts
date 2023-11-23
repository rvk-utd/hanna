import './_/initHannaNamespace.js';

import { inlineSVG } from './_/inlineSVG.js';

window.Hanna.makeSprinkle({
  name: 'IslandBlock',

  init: (elm: Element) => {
    inlineSVG('.IslandBlock__image > img[src*=".svg"]', elm);
  },
});
