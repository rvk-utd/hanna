import React, { useEffect, useState } from 'react';
import { Progress } from '@reykjavik/hanna-react/Progress';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Progress',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: { defaultViewport: 'responsive' },
  },
};

export default meta;

const ProgressStory = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent(0);
    const startedAt = Date.now();
    const durationMs = 5000;

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const nextValue = Math.min(100, Math.round((elapsed / durationMs) * 100));

      setPercent(nextValue);

      if (nextValue >= 100) {
        window.clearInterval(interval);
      }
    }, 50);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div
        style={{
          width: 280,
          padding: '1rem',
          border: '1px dashed #A867FC',
          gridGap: 15,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2>Determinate state</h2>
        <Progress percent={percent} variant="spinner" />
        <Progress percent={percent} variant="bar" />
      </div>

      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: 280,
            padding: '1rem',
            border: '1px dashed #A867FC',
            gridGap: 15,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2>Indeterminate state</h2>
          <Progress variant="spinner" />
          <Progress variant="bar" />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div
          style={{
            width: 280,
            padding: '1rem',
            border: '1px dashed #A867FC',
            gridGap: 15,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2>Static state - bar</h2>
          <Progress percent={0} />
          <Progress percent={25} />
          <Progress percent={50} />
          <Progress percent={75} />
          <Progress percent={100} />
        </div>

        <div
          style={{
            width: 280,
            padding: '1rem',
            border: '1px dashed #A867FC',
            gridGap: 15,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2>Static state - spinner</h2>
          <Progress percent={0} variant="spinner" />
          <Progress percent={25} variant="spinner" />
          <Progress percent={50} variant="spinner" />
          <Progress percent={75} variant="spinner" />
          <Progress percent={100} variant="spinner" />
          <Progress percent={100} variant="spinner" done />
        </div>
      </div>
    </div>
  );
};

export const _Progress: StoryObj = {
  render: () => <ProgressStory />,
};
