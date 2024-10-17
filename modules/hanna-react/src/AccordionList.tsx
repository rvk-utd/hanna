import React, { useRef } from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { DeprecatedSeenProp } from './utils/seenEffect.js';
import { useDomid } from './utils/useDomid.js';
import {
  SSRSupportProps,
  useIsBrowserSide,
  useMixedControlState,
  WrapperElmProps,
} from './utils.js';

// ---------------------------------------------------------------------------

export type AccordionListItemProps = {
  title: string | JSX.Element;
  content: string | JSX.Element | undefined;
  id?: string;
  disabled?: boolean;
};

type _ALItemProps = AccordionListItemProps & {
  open?: boolean;
  onToggle: () => void;
  defaultOpen?: boolean;
} & SSRSupportProps;

const AccordionListItem = (props: _ALItemProps) => {
  const { title, content, id, disabled = false, ssr, open, onToggle } = props;

  const defaultOpen = useRef(props.defaultOpen);

  const domid = useDomid();
  const isBrowser = useIsBrowserSide(ssr);
  const itemDisabled = (isBrowser && disabled) || !content;

  return (
    <div
      className={modifiedClass('AccordionList__item', [itemDisabled && 'disabled'])}
      id={id}
      data-start-open={defaultOpen.current}
      data-sprinkled={isBrowser}
    >
      <h3 className="AccordionList__title">
        {isBrowser ? (
          <button
            type="button"
            className="AccordionList__button"
            aria-controls={domid}
            aria-expanded={open || undefined}
            onClick={onToggle}
            disabled={itemDisabled}
          >
            {title}
          </button>
        ) : (
          title
        )}
      </h3>
      <div
        id={isBrowser && domid}
        className="AccordionList__content"
        hidden={isBrowser && (!open || itemDisabled)}
      >
        {content}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------

export type AccordionListProps = {
  items: Array<AccordionListItemProps>;
  /** Index of the currently open items (controlled use) */
  open?: Array<number>;
  /** Called whenever an AccodrionList item is toggled  */
  onToggle?: (data: { newOpen: Array<number>; index: number; opened: boolean }) => void;
  /** Index of those items that should start open (uncontrolled use) */
  defaultOpen?: Array<number>;
  wide?: boolean;
} & WrapperElmProps &
  SSRSupportProps &
  DeprecatedSeenProp;

export const AccordionList = (props: AccordionListProps) => {
  const { items, ssr, wide, defaultOpen, wrapperProps } = props;
  const [open, setOpenArray /*, mode */] = useMixedControlState(props, 'open', []);

  const onToggle = (index: number) => {
    setOpenArray((prevOpen) => {
      const opened = !prevOpen.includes(index);
      const newOpen = opened
        ? prevOpen.concat(index)
        : prevOpen.filter((idx) => idx !== index);
      props.onToggle && props.onToggle({ newOpen, index, opened });
      return newOpen;
    });
  };

  return (
    <div
      {...wrapperProps}
      className={modifiedClass(
        'AccordionList',
        [wide && 'wide'],
        (wrapperProps || {}).className
      )}
    >
      {items.map((item, i) => (
        <AccordionListItem
          key={i}
          {...item}
          ssr={ssr}
          open={open.includes(i)}
          onToggle={() => onToggle(i)}
          defaultOpen={defaultOpen && defaultOpen.includes(i)}
        />
      ))}
    </div>
  );
};

export default AccordionList;
