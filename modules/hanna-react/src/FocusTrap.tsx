import React from 'react';

type FocusableElement = Element & { focus: () => void };

export type FocusTrapProps = {
  /** The HTML tag to use for the trap element. (Default `<span />`) */
  Tag?: `span` | `li`;
  /** Set to `true` for focus traps positioned at the top of a container. */
  atTop?: boolean;
  /**
   * How deep the trap is placed in the DOM tree beneath its container element.
   *
   * Default: `1`
   */
  depth?: number;
};

/**
 * A focus trap element that can be used to keep keyboard focus within a
 * container block.
 *
 * Make sure you only trap focus when a modal or dialog is open
 */
export const FocusTrap = (props: FocusTrapProps) => {
  const Tag = props.Tag || 'span';

  return (
    <Tag
      className="FocusTrap"
      tabIndex={0}
      onFocus={(e) => {
        e.preventDefault();
        let container: HTMLElement | null = e.currentTarget;
        let depth = Math.max(props.depth || 1, 1);
        while (depth-- && container) {
          container = container.parentElement;
        }
        if (!container) {
          return;
        }
        const focusables = container.querySelectorAll<FocusableElement>(
          'a[href], input, select, textarea, button, summary, iframe, [tabindex]:not(.FocusTrap):not([tabindex="-1"])'
        );
        const delta = props.atTop ? -1 : 1;
        let i = delta < 0 ? focusables.length - 1 : 0;
        let newTarget;
        while ((newTarget = focusables[i])) {
          newTarget.focus();
          // See if the focus actually moved to newTarget
          if (document.activeElement === newTarget) {
            return;
          }
          i += delta;
        }
        // desperationLevel++; // We've failed to find a focusable element.
        // Let's see if we can find a non-interactive focusable to fall back on
        const fallbackFocusElm = container.matches('[tabindex]')
          ? container
          : container.querySelector('[tabindex="-1"]') || container.closest('[tabindex]');
        if (fallbackFocusElm) {
          (fallbackFocusElm as FocusableElement).focus();
        }
        // desperationLevel++; // Whatever, we tried. ¯\_(ツ)_/¯
      }}
    />
  );
};
