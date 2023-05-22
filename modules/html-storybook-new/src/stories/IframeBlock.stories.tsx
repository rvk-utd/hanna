import React from 'react';
import { IframeBlock } from '@reykjavik/hanna-react/IframeBlock';
import { getAssetUrl } from '@reykjavik/hanna-utils/assets';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { HiddenTiger } from '../utils/HiddenTrigger.js';

const meta: Meta<typeof IframeBlock> = {
  title: 'components/IframeBlock',
  component: IframeBlock,
};
export default meta;

type Story = StoryObj<typeof IframeBlock>;

const src = getAssetUrl('scripts/iframeResizer.test@4.html');
const codeExample = `
<script> window.iFrameResizer = { targetOrigin: '*' }; </script>
<script src="https://styles.reykjavik.is/assets/scripts/iframeResizer.contentWindow@4.js"></script>
`.trim();

const Component = () => {
  const align = boolean('Right-aligned', false) ? 'right' : undefined;
  const fixedHeight = boolean('Fixed height', false)
    ? { scrolling: true, height: 350 }
    : undefined;
  const framed = boolean('Framed', false);
  const compact = boolean('Compact (no outside margins)', false);
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
            {...fixedHeight!} // weird TS bug/behavior requires this assertion
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
          {...(fixedHeight || { height: -1 })}
        />
      )}
    />
  );
};

export const _IframeBlock: Story = {
  render: () => <Component />,
};