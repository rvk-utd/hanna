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
  target: string | HTMLElement
): ReturnType<typeof setTimeout> =>
  setTimeout(() => {
    const elm =
      typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
    if (elm) {
      elm.focus();
    }
  }, 0);
