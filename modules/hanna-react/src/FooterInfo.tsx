import React from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { BemModifierProps } from './utils/types.js';

export type FooterInfoGroup = {
  title: string;
  modifier?: string;
  main?: boolean;
  /** @deprecated (Will be removed in v0.11) */
  role?: JSX.IntrinsicElements['div']['role'];
} & BemModifierProps &
  ({ content: JSX.Element; html?: undefined } | { html: string; content?: undefined });

export type FooterInfoBoxes = Array<FooterInfoGroup>;

export type FooterInfoProps = {
  boxes: FooterInfoBoxes;
};

export const FooterInfo = (props: FooterInfoProps) => {
  const { boxes } = props;

  return (
    <div className="FooterInfo">
      {boxes.map((group, i) => (
        <div
          className={modifiedClass('FooterInfo__group', [
            group.main && 'main',
            group.modifier,
          ])}
          key={i}
        >
          <h3 className="FooterInfo__grouptitle">{group.title}</h3>
          {group.content ? (
            <div className={modifiedClass('FooterInfo__groupcontent', group.modifier)}>
              {group.content}
            </div>
          ) : (
            <div
              className={modifiedClass('FooterInfo__groupcontent', group.modifier)}
              dangerouslySetInnerHTML={{ __html: group.html }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FooterInfo;
