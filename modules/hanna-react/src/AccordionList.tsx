import React, { useRef, useState } from 'react';
import { SSRSupport, useDomid, useIsBrowserSide } from '@hugsmidjan/react/hooks';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

import { SeenProp, useSeenEffect } from './utils/seenEffect';

type AccordionListItemProps = {
  title: string | JSX.Element;
  content: string | JSX.Element | undefined;
  id?: string;
  disabled?: boolean;
};

export type AccordionListProps = {
  items: Array<AccordionListItemProps>;
  ssr?: SSRSupport;
  wide?: boolean;
  /** Index of those items that should start open */
  defaultOpen?: Array<number>;
} & SeenProp;

// ---------------------------------------------------------------------------

type _ALItemProps = {
  ssr?: SSRSupport;
  defaultOpen?: boolean;
};

const AccordionListItem = (props: AccordionListItemProps & _ALItemProps) => {
  const { title, content, id, disabled = false, ssr } = props;

  // TODO: Add controlled state support to this component, and then switch
  // to usw the hooks exported from `utils/useMixecControlState.ts`
  const [open, setOpen] = useState(props.defaultOpen);
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
            onClick={() => {
              setOpen(!open);
            }}
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

const AccordionList = (props: AccordionListProps) => {
  const { items, ssr, wide, defaultOpen, startSeen } = props;
  const [ref] = useSeenEffect(startSeen);

  return (
    <div className={getBemClass('AccordionList', [wide && 'wide'])} ref={ref}>
      {items.map((item, i) => (
        <AccordionListItem
          key={i}
          {...item}
          ssr={ssr}
          defaultOpen={defaultOpen && defaultOpen.includes(i)}
        />
      ))}
    </div>
  );
};

export default AccordionList;
