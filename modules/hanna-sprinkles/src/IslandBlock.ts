import './initHannaNamespace.js';

import { inlineSVG } from './utils/inlineSVG.js';

window.Hanna.makeSprinkle({
  name: 'IslandBlock',

  init: (elm: Element) => {
    inlineSVG('.IslandBlock__image > img[src*=".svg"]', elm);
  },
});
