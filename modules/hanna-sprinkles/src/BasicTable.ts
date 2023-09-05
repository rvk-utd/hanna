import './initHannaNamespace.js';

import { detectEdgeScroll } from './utils/_detectEdgeScroll.js';
import { autoSeenEffectPrepare, autoSeenEffectsRefresh } from './utils/addSeenEffect.js';

// ---------------------------------------------------------------------------

const normalizeWrappingMarkup = (tableElm: HTMLTableElement) => {
  tableElm.classList.add('BasicTable');
  const parentElm = tableElm.parentElement as HTMLElement;
  if (parentElm.classList.contains('TableWrapper__scroller')) {
    return;
  }

  let wrapperElm = parentElm;
  if (!wrapperElm.classList.contains('TableWrapper')) {
    wrapperElm = document.createElement('div');
    wrapperElm.className = 'TableWrapper';
    tableElm.before(wrapperElm);
  }
  const scrollerElm = document.createElement('div');
  scrollerElm.className = 'TableWrapper__scroller';
  scrollerElm.append(tableElm);

  wrapperElm.append(scrollerElm);
  wrapperElm.classList.add('TableWrapper--BasicTable');

  return { wrapperElm, scrollerElm };
};

// ---------------------------------------------------------------------------

window.Hanna.makeSprinkle({
  name: 'BasicTable',
  selector: 'table',
  init: (tableElm: HTMLTableElement) => {
    const wrappers = normalizeWrappingMarkup(tableElm);
    if (!wrappers) {
      return;
    }
    const { wrapperElm, scrollerElm } = wrappers;

    const { unmount /* , checkScroll */ } = detectEdgeScroll({
      axis: 'horizontal',
      scrollerElm: scrollerElm,
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
