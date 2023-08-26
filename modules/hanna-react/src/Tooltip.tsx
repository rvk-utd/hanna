import React, { CSSProperties, useRef } from 'react';
import {
  arrow as arrowPlugin,
  autoUpdate,
  flip,
  offset,
  Placement,
  shift,
  Side,
  useFloating,
} from '@floating-ui/react';
import { useCallbackOnEsc, useLaggedState } from '@hugsmidjan/react/hooks';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';

type TooltipElement = HTMLDetailsElement & {
  $contextClicked_firefox_fix?: ReturnType<typeof setTimeout>;
  $hasFocus?: ReturnType<typeof setTimeout>;
};

type SideFromPlacement<place = Placement> = place extends `${infer side}-${string}`
  ? side
  : never;

const getSide = <P extends Placement>(placement: P): Side =>
  placement.split('-')[0] as SideFromPlacement<P>;

export type TooltipProps = {
  label: string;
  text: string | JSX.Element;
  iconOnly?: boolean;
};

export const Tooltip = (props: TooltipProps) => {
  const { text, label, iconOnly } = props;
  const arrowRef = useRef(null);
  const [isOpen, setIsOpen] = useLaggedState(false, 300);

  const { x, y, refs, middlewareData, placement } = useFloating({
    placement: 'top',
    middleware: [offset(10), flip(), shift(), arrowPlugin({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  });

  const { arrow } = middlewareData;
  const arrowX = arrow?.x;
  const arrowY = arrow?.y;

  useCallbackOnEsc(() => {
    setIsOpen(false);
  });

  return (
    <details
      className={`Tooltip Tooltip--${getSide(placement)}`}
      open={isOpen}
      onMouseEnter={() => setIsOpen(true, 100)}
      onFocus={() => {
        if (isOpen) {
          setIsOpen(true, 0);
        }
      }}
      onBlur={() => setIsOpen(false)}
      onClick={(e) => {
        e.preventDefault();
        setIsOpen(!isOpen, 0);
      }}
      onMouseDown={() => {
        if (isOpen) {
          setTimeout(() => {
            setIsOpen(true, 0);
          }, 100);
        }
      }}
      onMouseLeave={(e) => {
        if ((e.currentTarget as TooltipElement).$contextClicked_firefox_fix) {
          return;
        }
        setIsOpen(false);
      }}
      onContextMenu={(e) => {
        const elm = e.currentTarget as TooltipElement;
        clearTimeout(elm.$contextClicked_firefox_fix);
        elm.$contextClicked_firefox_fix = setTimeout(() => {
          delete elm.$contextClicked_firefox_fix;
        }, 300);
      }}
      style={
        x == null
          ? undefined
          : ({
              '--tooltip-content-pos-y': `${y}px`,
              '--tooltip-content-pos-x': `${x}px`,
              '--tooltip-arrow-pos-x': `${arrowX}px`,
              '--tooltip-arrow-pos-y': `${arrowY}px`,
            } as CSSProperties)
      }
    >
      <summary
        className={modifiedClass('Tooltip__trigger', iconOnly && 'icononly')}
        ref={refs.setReference}
      >
        {label}
      </summary>
      <div
        className="Tooltip__content"
        onClick={(e) => e.stopPropagation()}
        ref={refs.setFloating}
      >
        {/* implementation detail for floating-ui */}
        {x !== null && (
          <div
            data-floating-ui-hack-plz-ignore=""
            style={{ position: 'absolute', display: 'none' }}
            ref={arrowRef}
          />
        )}
        {text}
      </div>
    </details>
  );
};

export default Tooltip;
