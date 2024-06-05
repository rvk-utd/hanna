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
        let container: HTMLElement | null = e.currentTarget;
        let depth = Math.max(props.depth || 1, 1);
        while (depth-- && container) {
          container = container.parentElement;
        }
        if (!container) {
          return;
        }
        const focusables = container.querySelectorAll<FocusableElement>(
          'a, input, select, textarea, button, [tabindex]:not(.FocusTrap):not([tabindex="-1"])'
        );
        const targetIdx = props.atTop ? focusables.length - 1 : 0;
        focusables[targetIdx]?.focus();
      }}
    />
  );
};
