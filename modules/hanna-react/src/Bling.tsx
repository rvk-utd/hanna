import React from 'react';
import { modifiedClass } from '@hugsmidjan/qj/classUtils';
import { BlingType, getBlingUrl } from '@reykjavik/hanna-utils/assets';

import { useGetSVGtext } from './utils/useGetSVGtext.js';

const colors = {
  tertiary: true,
  secondary: true,
  primary: true,
};
export type BlingColor = keyof typeof colors;

const aligns = {
  left: true,
  'left-ish': true,
  'left-center': true,
  'right-center': true,
  'right-ish': true,
  right: true,
};
export type BlingAlignment = keyof typeof aligns;

const valigns = {
  up: true,
  'up-ish': true,
  center: true,
  'down-ish': true,
  down: true,
};
export type BlingVAlignment = keyof typeof valigns;

const parentOffset = {
  top: true,
  'top-ish': true,
  center: true,
  'bottom-ish': true,
  bottom: true,
};
export type BlingParentOffset = keyof typeof parentOffset;

export type BlingProps = {
  /**
   * Horizontal alignment relative to the bling container's
   * full width
   *
   * NOTE: Blings should always be placed in a layout context
   * where they can stretch to a full (12 columns) width
   */
  align?: BlingAlignment;
  /**
   * Vertical shift along the vertical insertion point
   *
   * Defult: `center`
   */
  vertical?: BlingVAlignment;
  /**
   * Vertical positioning of the insertion point within
   * the Bling's offset parent element.
   *
   * Default is the natural layout flow position of the
   * Bling element (no vertical re-positioning)
   */
  parent?: BlingParentOffset;
  /**
   * Theme color (combo) for the elelment
   *
   * Default: `tertiary`
   */
  color?: BlingColor;
  /**
   * Gives the Bling a positive `z-index` value.
   *
   * By default Blings layer themselves *underneath* other page content.
   */
  overlay?: boolean;
  /** Additional className (use sparingly) */
  className?: string;
} & (
  | {
      /** The name of the Bling shape to display */
      type: BlingType;
      /** Not allowed when `type` is set */
      blingUrl?: undefined;
    }
  | {
      type?: undefined;
      /** Custom SVG URL to load (use sparingly) */
      blingUrl: string;
    }
);

export const Bling = (props: BlingProps) => {
  const { align, vertical, color, overlay, type, blingUrl, parent, className } = props;
  const imageUrl = type ? getBlingUrl(type) : blingUrl;
  const inlineSvg = useGetSVGtext(imageUrl);

  return (
    <div
      className={modifiedClass(
        'Bling',
        [
          'align--' + (align && align in aligns ? align : 'left'),
          vertical && vertical in valigns && 'vertical--' + vertical,
          color && color in colors && 'color--' + color,
          parent && parent in parentOffset && 'parent--' + parent,
          overlay && 'overlay',
        ],
        className
      )}
      data-bling-type={type}
      data-bling-image={!type ? blingUrl : undefined}
      dangerouslySetInnerHTML={inlineSvg && { __html: inlineSvg.code }}
    />
  );
};

export default Bling;
