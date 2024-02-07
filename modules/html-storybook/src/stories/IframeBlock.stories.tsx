import React from 'react';
import { IframeBlock } from '@reykjavik/hanna-react/IframeBlock';
import { getAssetUrl } from '@reykjavik/hanna-utils/assets';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTiger.js';

type ControlProps = {
  rightAligned: boolean;
  fixedHeight: boolean;
  framed: boolean;
  compact: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'IframeBlock',
};
export default meta;

const src = getAssetUrl('scripts/iframeResizer.test@4.html');
const codeExample = `
<script> window.iFrameResizer = { targetOrigin: '*' }; </script>
<script src="https://styles.reykjavik.is/assets/scripts/iframeResizer.contentWindow@4.js"></script>
`.trim();

const IframeBlockStory: React.FC<ControlProps> = ({
  fixedHeight,
  rightAligned,
  framed,
  compact,
}) => {
  const align = rightAligned ? 'right' : undefined;
  const onFixedHeight = fixedHeight ? { scrolling: true, height: 350 } : undefined;
  return (
    <HiddenTiger
      visibleDemo={() => (
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
              (React applications can use <code>{'<IframeBlockClientScript />'}</code>.)
            </div>
          )}
        </>
      )}
      htmlDemo={() => (
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

export const _IframeBlock: StoryObj<ControlProps> = {
  render: (args) => <IframeBlockStory {...args} />,
  argTypes: {
    rightAligned: { name: 'Right-aligned' },
    fixedHeight: { name: 'Fixed height' },
    framed: { name: 'Framed' },
    compact: { name: 'Compact (no outside margins)' },
  },
  args: {
    rightAligned: false,
    fixedHeight: false,
    framed: false,
    compact: false,
  },
};
