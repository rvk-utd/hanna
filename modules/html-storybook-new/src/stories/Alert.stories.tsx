import React, { Fragment } from 'react';
import { Alert } from '@reykjavik/hanna-react/Alert';
import { ObjectEntries } from '@reykjavik/hanna-utils';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

type ControlProps = {
  closable: boolean;
  ssr: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'Alert',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  } as StoryParameters,
};
export default meta;

const alertDemos = {
  info: () => (
    <>
      Information -
      <br /> Lorem ipsum <a href="">dolor sit amet</a> consectetur adipisicing elit. Ipsum
      officia itaque odit necessitatibus soluta dolorum error deleniti rerum reiciendis
      assumenda!
    </>
  ),
  success: () => (
    <>
      Success - <a href="">Bein útsending frá fundi borgarstjórnar</a> í Ráðhúsi
      Reykjavíkur <strong>hefst kl. 14:00</strong>
    </>
  ),
  warning: () => (
    <>
      Warning - Kosningar í fullum gangi. <a href="">Flettu upp þínum kosningarstað</a>
    </>
  ),
  error: () => <>Error - Þú slóst eitthvað rangt inn, kjánaprik.</>,
  critical: () => (
    <>
      Critical - Veðurviðvörun fyrir höfuðborgarsvæðið.{' '}
      <a href="">Sjá nánar á vedur.is</a>
    </>
  ),
};

const AlertStory = (props: ControlProps) => {
  const closable = props.closable;
  const closeLink = props.ssr && closable;

  return (
    <Fragment key={'' + closable + closeLink}>
      {ObjectEntries(alertDemos).map(([type, contentFn], i) => (
        <Alert
          key={type}
          type={type}
          closable={closable}
          closeUrl={closeLink ? '?closeAlert=' + (i + 1) : undefined}
        >
          {contentFn()}
        </Alert>
      ))}
    </Fragment>
  );
};

export const _Alert: StoryObj<ControlProps> = {
  render: (args) => <AlertStory {...args} />,
  argTypes: {
    closable: { name: 'Closable alert' },
    ssr: { name: 'Server-side close buttons' },
  },
  args: {
    closable: true,
    ssr: false,
  },
};
