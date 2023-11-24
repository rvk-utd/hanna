import React, { Fragment } from 'react';
import { Alert } from '@reykjavik/hanna-react/Alert';
import { ObjectEntries } from '@reykjavik/hanna-utils';
import { Meta, StoryObj } from '@storybook/react';

type ControlProps = {
  ssr: boolean;
  closable: boolean;
  ssrButtons: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'Alert',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
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

export const _Alert: StoryObj<ControlProps> = {
  render: (args) => {
    const closable = args.closable;
    const closeLink = args.ssrButtons && closable;
    const ssr = args.ssr;

    return (
      <Fragment key={'' + closable + closeLink + ssr}>
        {ObjectEntries(alertDemos).map(([type, contentFn], i) => (
          <Alert
            key={type}
            type={type}
            closable={closable}
            closeUrl={closeLink ? '?closeAlert=' + (i + 1) : undefined}
            ssr={ssr ? 'ssr-only' : undefined}
          >
            {contentFn()}
          </Alert>
        ))}
      </Fragment>
    );
  },
  argTypes: {
    ssr: { name: 'Server-side Markup' },
    closable: { name: 'Closable alert' },
    ssrButtons: { name: 'Server-side close buttons' },
  },
  args: {
    ssr: true,
    closable: false,
    ssrButtons: false,
  },
};
