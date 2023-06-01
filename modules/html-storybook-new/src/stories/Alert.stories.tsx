import React, { Fragment } from 'react';
import { Alert } from '@reykjavik/hanna-react/Alert';
import { ObjectEntries } from '@reykjavik/hanna-utils';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

import { disableControlProps } from '../utils/disableControlTypes.js';

const meta: Meta<typeof Alert> = {
  title: 'Alert',
  component: Alert,
};
export default meta;

type Story = StoryObj<typeof Alert>;

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

const AlertStory = () => {
  const closable = boolean('Closable alert', true);
  const closeLink = closable && boolean('Server-side close buttons', false);
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

export const _Alert: Story = {
  render: () => <AlertStory />,
  argTypes: {
    closable: {
      control: 'boolean',
      name: 'Closable alert',
    },
    ...disableControlProps([
      'type',
      'childrenHTML',
      'closeUrl',
      'texts',
      'lang',
      'ssr',
      'autoClose',
      'onClose',
      'onClosed',
    ]),
  },
  args: {
    closable: true,
  },
};
