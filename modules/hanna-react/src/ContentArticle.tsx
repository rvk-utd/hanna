import React, { ReactNode } from 'react';
import { modifiedClass } from '@reykjavik/hanna-utils';

import { DeprecatedSeenProp } from './utils/seenEffect.js';
import ArticleMeta, { ArticleMetaProps } from './ArticleMeta.js';
import ContentImage, { ContentImageProps } from './ContentImage.js';
import Heading from './Heading.js';
import RelatedLinks, { RelatedLinksProps } from './RelatedLinks.js';
import TextBlock from './TextBlock.js';
import { WrapperElmProps } from './utils.js';
import VSpacer from './VSpacer.js';

export type ContentArticleProps = {
  /** Date, author, etc. */
  meta?: ArticleMetaProps['items'];
  headline: string;
  headlineTag?: 'h1' | 'h2';
  topImage?: ContentImageProps;
  body: ReactNode;
  relatedLinks?: RelatedLinksProps;
} & WrapperElmProps &
  DeprecatedSeenProp;

export const ContentArticle = (props: ContentArticleProps) => {
  const { relatedLinks, wrapperProps } = props;

  const headingElm = (
    <Heading forceH1={props.headlineTag === 'h1'}>{props.headline}</Heading>
  );

  return (
    <div
      {...wrapperProps}
      className={modifiedClass('ContentArticle', null, (wrapperProps || {}).className)}
    >
      {props.meta ? (
        <div className="ContentArticle__header">
          {headingElm}
          <ArticleMeta items={props.meta} />
        </div>
      ) : (
        headingElm
      )}
      <TextBlock>
        {props.topImage && <ContentImage {...props.topImage} />}
        {props.body}
      </TextBlock>
      {relatedLinks && relatedLinks.links.length > 0 && (
        <VSpacer size="small">
          <hr />
        </VSpacer>
      )}
      {relatedLinks && <RelatedLinks {...relatedLinks} />}
    </div>
  );
};

export default ContentArticle;
