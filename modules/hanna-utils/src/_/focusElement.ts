const keyboardFocusableSelector =
  'a[href],' +
  'button,' +
  'input,' +
  'select,' +
  'textarea,' +
  'summary,' +
  'iframe,' +
  '[tabindex]:not(.FocusTrap):not([tabindex="-1"])';

/**
 * Simplistic helper to move keyboard `.focus()` to a given element.
 *
 * If the element is not focusable (i.e. a `<div/>` without a `tabindex` attribute)
 * then this function has no effect.
 *
 * ```ts
 * import { focusElement } from '@reykjavik/hanna-utils';
 *
 * focusElement('.TextBlock a');
 * // same as:
 * // focusElement(document.querySelector('.TextBlock a'));
 * ```
 */
export const focusElement = (
  target: string | HTMLElement,
  forwardToFirstFocusable?: boolean
): ReturnType<typeof setTimeout> =>
  setTimeout(() => {
    let elm =
      typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
    if (!elm) {
      return;
    }
    if (forwardToFirstFocusable && elm.tabIndex === -1) {
      elm = elm.querySelector<HTMLElement>(keyboardFocusableSelector) || elm;
    }
    if (elm.tabIndex === -1) {
      elm.tabIndex = -1;
    }
    elm.focus();
  }, 0);

/**
 * A CSS selector used to find keyboard-focusable elements.
 * Tuned to work best in Hanna-based UIs.
 */
focusElement.keyboardFocusableSelector = keyboardFocusableSelector;
