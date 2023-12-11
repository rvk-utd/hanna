import React from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { EitherObj } from '@reykjavik/hanna-utils';

import { ScrollWrapper } from './_abstract/_ScrollWrapper.js';
import { Table, TableProps } from './_abstract/_Table.js';
import { DeprecatedSeenProp } from './utils/seenEffect.js';
import { HTMLProps, WrapperElmProps } from './utils.js';

type TableType = 'text' | 'number';
const tableTypes = {
  text: '',
  number: 'data--number',
} satisfies Record<TableType, string>;

export type {
  TableBody,
  TableCell,
  TableCellData,
  TableCellMeta,
  TableCols,
  TableFoot,
  TableHead,
  TableRow,
} from './_abstract/_Table.js';

export type BasicTableProps = {
  compact?: boolean;
  /**
   * The main/default cell-data type of the table
   *
   * Defaults to 'text'
   */
  type?: TableType;
  /**
   * Custom HTML attributes for the component's `<table/>` element.
   *
   * Note, however, that some props may be intentionally
   * excluded from the list.
   *
   * __WARNING:__
   * In some cases props added this way can break the component, og hurt its
   * accessibility.  Also, some props may get ignored, or over-ridden by the
   * component. User discretion is advised.
   */
  tableProps?: HTMLProps<'table'>;
  /** @deprecated Use `wrapperProps={{ className }}` and `tableProps={{ className }}` instead (Will be removed in v0.11) */
  modifier?: string;
} & EitherObj<{ fullWidth?: boolean }, { align?: 'right' }> &
  WrapperElmProps &
  DeprecatedSeenProp &
  TableProps;

export const BasicTable = (props: BasicTableProps) => {
  const {
    align,
    fullWidth,
    type,
    tbody,
    tbodies,
    modifier,
    thead,
    tfoot,
    tableProps,
    caption,
    rowProps,
    compact,
    cols,
    wrapperProps,
  } = props;

  return (
    <ScrollWrapper
      bem="TableWrapper"
      modifier={[
        'BasicTable',
        modifier && `BasicTable--${modifier}`,
        fullWidth
          ? 'BasicTable--fullwidth'
          : align === 'right'
          ? `BasicTable--align--${align}`
          : undefined,
      ]}
      wrapperProps={wrapperProps}
    >
      <Table
        className={modifiedClass('BasicTable', [
          compact && 'compact',
          type && tableTypes[type],
          modifier,
        ])}
        cols={cols}
        caption={caption}
        thead={thead}
        tfoot={tfoot}
        {...(tbody ? { tbody } : { tbodies })}
        rowProps={rowProps}
        wrapperProps={tableProps}
      />
    </ScrollWrapper>
  );
};

export default BasicTable;
