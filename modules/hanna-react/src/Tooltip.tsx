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
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { useCallbackOnEsc, useLaggedState } from '@hugsmidjan/react/hooks';

import { WrapperElmProps } from './utils.js';

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
} & WrapperElmProps<'details', 'open'>;

export const Tooltip = (props: TooltipProps) => {
  const { text, label, iconOnly, wrapperProps = {} } = props;
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
      {...props.wrapperProps}
      className={modifiedClass('Tooltip', getSide(placement), wrapperProps.className)}
      open={isOpen}
      onMouseEnter={(e) => {
        setIsOpen(true, 100);
        wrapperProps.onMouseEnter?.(e);
      }}
      onFocus={(e) => {
        if (isOpen) {
          setIsOpen(true, 0);
        }
        wrapperProps.onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsOpen(false);
        wrapperProps.onBlur?.(e);
      }}
      onClick={(e) => {
        e.preventDefault();
        setIsOpen(!isOpen, 0);
        wrapperProps.onClick?.(e);
      }}
      onMouseDown={(e) => {
        if (isOpen) {
          setTimeout(() => {
            setIsOpen(true, 0);
          }, 100);
        }
        wrapperProps.onMouseDown?.(e);
      }}
      onMouseLeave={(e) => {
        if ((e.currentTarget as TooltipElement).$contextClicked_firefox_fix) {
          return;
        }
        setIsOpen(false);
        wrapperProps.onMouseLeave?.(e);
      }}
      onContextMenu={(e) => {
        const elm = e.currentTarget as TooltipElement;
        clearTimeout(elm.$contextClicked_firefox_fix);
        elm.$contextClicked_firefox_fix = setTimeout(() => {
          delete elm.$contextClicked_firefox_fix;
        }, 300);
        wrapperProps.onContextMenu?.(e);
      }}
      style={
        x == null
          ? wrapperProps.style
          : ({
              ...wrapperProps.style,
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
