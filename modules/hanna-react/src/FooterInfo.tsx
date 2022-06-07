import React from 'react';
import { BemPropsModifier } from '@hugsmidjan/react/types';
import getBemClass from '@hugsmidjan/react/utils/getBemClass';

export type FooterInfoGroup = {
  title: string;
  role?: JSX.IntrinsicElements['div']['role'];
  modifier?: string;
} & BemPropsModifier &
  ({ content: JSX.Element; html?: undefined } | { html: string; content?: undefined });

export type FooterInfoBoxes = Array<FooterInfoGroup>;

export type FooterInfoProps = {
  boxes: FooterInfoBoxes;
};

const FooterInfo = (props: FooterInfoProps) => {
  const { boxes } = props;

  return (
    <div className="FooterInfo">
      {boxes.map((group, i) => (
        <div
          className={getBemClass('FooterInfo__group', group.modifier)}
          role={group.role}
          key={i}
        >
          <h3 className="FooterInfo__grouptitle">{group.title}</h3>
          {group.content ? (
            <div className={getBemClass('FooterInfo__groupcontent', group.modifier)}>
              {group.content}
            </div>
          ) : (
            <div
              className={getBemClass('FooterInfo__groupcontent', group.modifier)}
              dangerouslySetInnerHTML={{ __html: group.html }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FooterInfo;
