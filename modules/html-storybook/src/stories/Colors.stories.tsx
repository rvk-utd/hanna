import React from 'react';
import { colorFamilies, colors_raw, hannaVars } from '@reykjavik/hanna-css';
import { ObjectKeys } from '@reykjavik/hanna-utils';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Colors',
  parameters: {
    css: { tokens: '-basics', noLayout: true },
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

type ColorName = keyof typeof colors_raw;

const getShades = (family: string) =>
  ObjectKeys(colors_raw).filter((name) => name.startsWith(`${family}_`));

const getCssVarName = (name: ColorName) => hannaVars[`color_${name}`].cssName;

const Swatch = ({ name }: { name: ColorName }) => {
  const cssVarName = getCssVarName(name);
  return (
    <div style={{ width: 140, fontSize: 13, lineHeight: 1.4 }}>
      <div
        style={{
          height: 80,
          marginBottom: 8,
          borderRadius: 4,
          border: '1px solid rgba(0, 0, 0, .1)',
          background: colors_raw[name],
        }}
      />
      <strong>{name}</strong>
      <br />
      <code>{colors_raw[name]}</code>
      <br />
      <code style={{ fontSize: 11 }}>{cssVarName}</code>
    </div>
  );
};

const dividerStyle: React.CSSProperties = {
  margin: '32px 0',
  height: 2,
  border: 0,
  borderRadius: 1,
  background: `linear-gradient(to right, ${colors_raw.suld_100}, ${colors_raw.suld_50} 60%, transparent)`,
};

export const _Colors: StoryObj = {
  name: 'Colors',
  render: () => (
    <div style={{ padding: 24 }}>
      {ObjectKeys(colorFamilies).map((family, i) => (
        <React.Fragment key={family}>
          {i > 0 && <hr style={dividerStyle} />}
          <section>
            <h2
              style={{
                marginBottom: 12,
                textTransform: 'capitalize',
                fontWeight: 'bold',
                fontSize: 20,
              }}
            >
              {family}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {getShades(family).map((name) => (
                <Swatch key={name} name={name} />
              ))}
            </div>
          </section>
        </React.Fragment>
      ))}
    </div>
  ),
};
