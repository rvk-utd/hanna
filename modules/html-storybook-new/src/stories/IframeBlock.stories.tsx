import React from 'react';
import { IframeBlock, IframeBlockProps } from '@reykjavik/hanna-react/IframeBlock';
import { getAssetUrl } from '@reykjavik/hanna-utils/assets';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';

type IframeBlockPropsControlsProps = {
  rightAligned: boolean;
  fixedHeight: boolean;
};

type IframeBlockStoryProps = IframeBlockProps & IframeBlockPropsControlsProps;
type Story = StoryObj<IframeBlockStoryProps>;

const meta: Meta<IframeBlockStoryProps> = {
  title: 'IframeBlock',
};
export default meta;

const src = getAssetUrl('scripts/iframeResizer.test@4.html');
const codeExample = `
<script> window.iFrameResizer = { targetOrigin: '*' }; </script>
<script src="https://styles.reykjavik.is/assets/scripts/iframeResizer.contentWindow@4.js"></script>
`.trim();

const IframeBlockStory: React.FC<IframeBlockStoryProps> = ({
  fixedHeight,
  rightAligned,
  framed,
  compact,
}) => {
  const align = rightAligned ? 'right' : undefined;
  const onFixedHeight = fixedHeight ? { scrolling: true, height: 350 } : undefined;
  return (
    <HiddenTiger
      clientSide={() => (
        <>
          <IframeBlock
            title="Iframe example"
            src={src}
            align={align}
            framed={framed}
            compact={compact}
            {...onFixedHeight!} // weird TS bug/behavior requires this assertion
          />
          {fixedHeight ? (
            <p>
              Here's some text below the <code>{'<iframe/>'}</code>.
            </p>
          ) : (
            <div>
              <p>
                Add the following code-snipped into the ifram<strong>ed</strong> page:
              </p>
              <pre style={{ padding: '1em 1.5em', backgroundColor: '#00000011' }}>
                {codeExample}
              </pre>
            </div>
          )}
        </>
      )}
      serverSide={() => (
        <IframeBlock
          title="Iframe example"
          src={src}
          align={align}
          framed={framed}
          compact={compact}
          {...(onFixedHeight || { height: -1 })}
        />
      )}
    />
  );
};

export const _IframeBlock: Story = {
  render: (args: IframeBlockStoryProps) => <IframeBlockStory {...args} />,
  argTypes: {
    rightAligned: {
      control: 'boolean',
      name: 'Right-aligned',
    },
    fixedHeight: {
      control: 'boolean',
      name: 'Fixed height',
    },
    framed: {
      control: 'boolean',
      name: 'Framed',
    },
    compact: {
      control: 'boolean',
      name: 'Compact (no outside margins)',
    },
  },
  args: {
    rightAligned: false,
    fixedHeight: false,
    framed: false,
    compact: false,
  },
};
