import React from 'react';
import { CenterColumn } from '@reykjavik/hanna-react/CenterColumn';
import { PageHeading } from '@reykjavik/hanna-react/PageHeading';
import { TextBlock } from '@reykjavik/hanna-react/TextBlock';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTiger.js';

const meta: Meta = {
  title: 'Grid',
};
export default meta;

const CenterColumnStory = () => {
  return (
    <CenterColumn>
      <PageHeading>
        <HiddenTiger htmlDemo="...">This is the page heading</HiddenTiger>
      </PageHeading>
      <TextBlock>
        <HiddenTiger htmlDemo="...">
          <p>
            The <code>CenterColumn</code> is for simple "article" layout.
          </p>
          <p>
            Wrap it around <strong>plain</strong> <code>TextBlock</code> and{' '}
            <code>PageHeading</code> (or <code>Heading</code>) components only.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <h2>Lorem ipsum H2 title</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </HiddenTiger>
      </TextBlock>
    </CenterColumn>
  );
};

export const _CenterColumn: StoryObj = {
  render: () => <CenterColumnStory />,
  parameters: {
    controls: { hideNoControlsWarning: true },
    css: { tokens: 'CenterColumn,PageHeading,TextBlock' },
  },
};
