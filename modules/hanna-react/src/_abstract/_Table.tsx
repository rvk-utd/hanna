import React, { memo, ReactNode, useMemo } from 'react';
import { classes } from '@hugsmidjan/qj/classUtils';
import { notNully } from '@reykjavik/hanna-utils';

import { HTMLProps, WrapperElmProps } from '../utils.js';

type SectionTag = 'thead' | 'tfoot' | 'tbody';

type RowPropsFunction = (
  rowIdx: number,
  section: SectionTag
) => HTMLProps<'tr'> | undefined;

export type TableCellMeta =
  | { className?: string; number?: false; tel?: false; text?: false } // Default
  | { className?: string; number: true | 'pos' | 'neg'; tel?: false; text?: false }
  | { className?: string; tel: true; number?: false; text?: false }
  | { className?: string; text: true | 'right' | 'center'; number?: false; tel?: false };

export type TableCellData = {
  value: ReactNode | ((rowIdx: number) => ReactNode);
  colSpan?: number;
  key?: string | number;
} & TableCellMeta;

type RowData = {
  cells: Array<TableCellData>;
  key: string | number | undefined;
};

export type TableCols = Array<TableCellMeta | null>;
export type TableCell = string | TableCellData;
export type TableRow =
  | Array<TableCell>
  | {
      cells: Array<TableCell>;
      /** Manual `key` prop for stable re-renders */
      key?: string | number;
    };
type TableSection = Array<TableRow>;
export type TableBody = TableSection;
export type TableHead = TableSection;
export type TableFoot = TableSection;
export type TableData = {
  caption?: ReactNode;
  thead: TableHead;
  tfoot?: TableFoot;
} & (
  | { tbody: TableBody; tbodies?: undefined }
  | { tbody?: undefined; tbodies: Array<TableBody> }
);

// ===========================================================================

type TableCellProps = {
  data: TableCellData;
  rowIdx: number;
  meta?: TableCellMeta;
  th?: boolean;
  rowScope?: boolean;
};
const TableCell = (props: TableCellProps) => {
  const { data, meta = {}, rowIdx, rowScope } = props;
  const Tag = props.th ? 'th' : 'td';

  const {
    className = meta.className || '',
    number = meta.number,
    text = meta.text,
    tel = meta.tel,
    value,
    colSpan,
  } = data;

  const numberClass = !number
    ? ''
    : number === true
    ? 'Cell--number'
    : 'Cell--number Cell--number--' + number;
  const textClass = !text
    ? ''
    : text === true
    ? 'Cell--text'
    : 'Cell--text Cell--text--' + text;
  const telClass = tel ? 'Cell--tel' : '';

  return (
    <Tag
      className={classes(numberClass || telClass || textClass, className)}
      colSpan={colSpan && colSpan > 1 ? colSpan : undefined}
      scope={rowScope ? 'row' : undefined}
    >
      {typeof value === 'function' ? value(rowIdx) : value}
    </Tag>
  );
};

// ===========================================================================

type TableSectionProps = {
  section: Array<RowData>;
  cols?: TableCols;
  Tag: SectionTag;
  getRowProps: RowPropsFunction;
};
const TableSection = ({ section, cols = [], Tag, getRowProps }: TableSectionProps) =>
  section.length ? (
    <Tag>
      {section.map(({ key, cells }, rowIdx) => {
        let colIdx = 0;
        return (
          <tr {...getRowProps(rowIdx, Tag)} key={key != null ? key : rowIdx}>
            {cells.map((cell, i) => {
              const rowScope = i === 0;
              const meta = cols[colIdx];
              colIdx += cell.colSpan || 1;
              return (
                <TableCell
                  key={cell.key || i}
                  th={Tag === 'thead' || rowScope}
                  data={cell}
                  meta={meta || undefined}
                  rowIdx={rowIdx}
                  rowScope={rowScope}
                />
              );
            })}
          </tr>
        );
      })}
    </Tag>
  ) : null;

// ===========================================================================

const normalizeTableSectData = (rows: Array<TableRow>): Array<RowData> | undefined =>
  !rows.length
    ? undefined
    : rows.map((row) => {
        const cells = 'cells' in row ? row.cells : row;
        return {
          cells: cells.map(
            (data): TableCellData => (typeof data === 'string' ? { value: data } : data)
          ),
          key: 'key' in row ? row.key : undefined,
        };
      });

// ===========================================================================

export type TableProps = TableData & {
  cols?: TableCols;
  rowProps?: HTMLProps<'tr'> | RowPropsFunction;
} & WrapperElmProps<'table'>;

export const Table = memo((props: TableProps & { className?: string }) => {
  const { caption, cols, className, rowProps, wrapperProps } = props;
  const getRowProps = typeof rowProps === 'function' ? rowProps : () => rowProps;
  const thead = useMemo(() => normalizeTableSectData(props.thead), [props.thead]);
  const tfoot = useMemo(
    () => props.tfoot && normalizeTableSectData(props.tfoot),
    [props.tfoot]
  );
  const tbodies = useMemo(
    () => (props.tbodies || [props.tbody]).map(normalizeTableSectData).filter(notNully),
    [props.tbody, props.tbodies]
  );
  return (
    <table {...wrapperProps} className={classes(className, wrapperProps?.className)}>
      {caption && <caption>{caption}</caption>}
      {thead && (
        <TableSection section={thead} cols={cols} Tag="thead" getRowProps={getRowProps} />
      )}
      {tfoot && (
        <TableSection section={tfoot} cols={cols} Tag="tfoot" getRowProps={getRowProps} />
      )}
      {tbodies.map((section, i) => (
        <TableSection
          key={i}
          section={section}
          cols={cols}
          Tag="tbody"
          getRowProps={getRowProps}
        />
      ))}
    </table>
  );
});
