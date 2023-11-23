import './_/initHannaNamespace.js';

import { autoSeenEffectPrepare, autoSeenEffectsRefresh } from './_/addSeenEffect.js';
import { detectEdgeScroll } from './_/detectEdgeScroll.js';

// ---------------------------------------------------------------------------

const normalizeWrappingMarkup = (tableElm: HTMLTableElement) => {
  tableElm.classList.add('BasicTable');
  const parentElm = tableElm.parentElement as HTMLElement;
  if (
    parentElm.classList.contains('TableWrapper__scroller') ||
    parentElm.classList.contains('TableWrapper--at')
  ) {
    return;
  }

  let wrapperElm = parentElm;
  if (!wrapperElm.classList.contains('TableWrapper')) {
    wrapperElm = document.createElement('div');
    wrapperElm.className = 'TableWrapper';
    tableElm.before(wrapperElm);
    wrapperElm.append(tableElm);
  }
  wrapperElm.classList.add('TableWrapper--BasicTable');
  return wrapperElm;
};

// ---------------------------------------------------------------------------

window.Hanna.makeSprinkle({
  name: 'BasicTable',
  selector: 'table',
  init: (tableElm: HTMLTableElement) => {
    const wrapperElm = normalizeWrappingMarkup(tableElm);
    if (!wrapperElm) {
      return;
    }
    const { unmount /* , checkScroll */ } = detectEdgeScroll({
      axis: 'horizontal',
      scrollerElm: wrapperElm,
      classedElm: wrapperElm,
      bem: 'TableWrapper',
    });
    autoSeenEffectPrepare(wrapperElm);
    autoSeenEffectsRefresh();

    return unmount;
  },
  unmount: (_, unmount) => {
    unmount && unmount();
    autoSeenEffectsRefresh();
  },
});
