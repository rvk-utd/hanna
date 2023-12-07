import { MouseEventHandler } from 'react';
import { focusElement } from '@reykjavik/hanna-utils';

export const handleAnchorLinkClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
  e.preventDefault();
  const targetId = e.currentTarget.hash.slice(1);
  const targetElm = targetId && document.getElementById(targetId);
  if (!targetElm) {
    return;
  }
  targetElm.tabIndex = -1;
  focusElement(targetElm);
};
