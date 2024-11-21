import { MouseEvent as ReactMouseEvent } from 'react';
import { focusElement } from '@reykjavik/hanna-utils';

export const handleAnchorLinkClick = (
  e: ReactMouseEvent<HTMLAnchorElement>,
  forwardToFirstFocusable?: boolean
) => {
  e.preventDefault();
  const targetId = e.currentTarget.hash.slice(1);
  const targetElm = targetId && document.getElementById(targetId);
  if (!targetElm) {
    return;
  }
  focusElement(targetElm, forwardToFirstFocusable);
};
