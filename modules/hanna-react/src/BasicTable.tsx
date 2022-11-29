import React from 'react';
import Table, { TableProps } from '@hugsmidjan/react/Table';
import TableWrapper from '@hugsmidjan/react/TableWrapper';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';
import { EitherObj } from '@reykjavik/hanna-utils';

import { SeenProp, useSeenEffect } from './utils/seenEffect';

export type BasicTableProps = {
  compact?: boolean;
  type?: 'text' | 'number';
  modifier?: string;
} & EitherObj<{ fullWidth?: boolean }, { align?: 'right' }> &
  SeenProp &
  Omit<TableProps, 'className' | 'children'>;

const BasicTable = (props: BasicTableProps) => {
  const { cols, caption, thead, tfoot, align, fullWidth, startSeen } = props;

  const tbodyProps = props.tbodies
    ? { tbodies: props.tbodies }
    : { tbody: props.tbody || [] };

  const modifier = props.modifier;

  const [ref] = useSeenEffect(startSeen);

  return (
    <TableWrapper
      modifier={[
        'BasicTable',
        modifier && 'BasicTable--' + modifier,
        fullWidth && 'BasicTable--fullwidth',
        align === 'right' && !fullWidth && 'BasicTable--align--' + align,
      ]}
      wrapperRef={ref}
    >
      <Table
        className={getBemClass('BasicTable', [
          props.compact && 'compact',
          modifier && modifier,
        ])}
        {...{
          cols,
          caption,
          thead,
          tfoot,
        }}
        {...tbodyProps}
      />
    </TableWrapper>
  );
};

export default BasicTable;
