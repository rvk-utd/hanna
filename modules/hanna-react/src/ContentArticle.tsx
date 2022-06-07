import React, { ReactNode } from 'react';

import { SeenProp, useSeenEffect } from './utils/seenEffect';
import ArticleMeta, { ArticleMetaProps } from './ArticleMeta';
import ContentImage, { ContentImageProps } from './ContentImage';
import Heading from './Heading';
import RelatedLinks, { RelatedLinksProps } from './RelatedLinks';
import TextBlock from './TextBlock';
import VSpacer from './VSpacer';

export type ContentArticleProps = {
  /** Date, author, etc. */
  meta: ArticleMetaProps['items'];
  headline: string;
  topImage?: ContentImageProps;
  body: ReactNode;
  relatedLinks?: RelatedLinksProps;
} & SeenProp;

const ContentArticle = (props: ContentArticleProps) => {
  const [ref] = useSeenEffect(props.startSeen);

  return (
    <div className="ContentArticle" ref={ref}>
      <ArticleMeta items={props.meta} />
      <Heading>{props.headline}</Heading>
      <TextBlock startSeen>
        {props.topImage && <ContentImage {...props.topImage} />}
        {props.body}
      </TextBlock>
      <VSpacer size="small">
        <hr />
      </VSpacer>
      {props.relatedLinks && <RelatedLinks {...props.relatedLinks} />}
    </div>
  );
};

export default ContentArticle;
