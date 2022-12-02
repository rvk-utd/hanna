import React, { useRef } from 'react';
import { SSRSupport, useDomid, useIsBrowserSide } from '@hugsmidjan/react/hooks';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { SeenProp, useSeenEffect } from './utils/seenEffect';
import { useMixedControlState } from './utils';

// ---------------------------------------------------------------------------

export type AccordionListItemProps = {
  title: string | JSX.Element;
  content: string | JSX.Element | undefined;
  id?: string;
  disabled?: boolean;
};

type _ALItemProps = AccordionListItemProps & {
  ssr?: SSRSupport;
  open?: boolean;
  onToggle: () => void;
  defaultOpen?: boolean;
};

const AccordionListItem = (props: _ALItemProps) => {
  const { title, content, id, disabled = false, ssr, open, onToggle } = props;

  const defaultOpen = useRef(props.defaultOpen);

  const domid = useDomid();
  const isBrowser = useIsBrowserSide(ssr);
  const itemDisabled = (isBrowser && disabled) || !content;

  return (
    <div
      className={getBemClass('AccordionList__item', [itemDisabled && 'disabled'])}
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
  ssr?: SSRSupport;
} & SeenProp;

export const AccordionList = (props: AccordionListProps) => {
  const { items, ssr, wide, startSeen, defaultOpen } = props;
  const [ref] = useSeenEffect(startSeen);
  const [open, setOpenArray, mode] = useMixedControlState(props, 'open', []);

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
    <div className={getBemClass('AccordionList', [wide && 'wide'])} ref={ref}>
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
