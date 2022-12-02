import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { TextBlock } from '@reykjavik/hanna-react/TextBlock';

import { DummyBlock } from '../../layout/DummyBlock';
import { Minimal } from '../../layout/Minimal';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

const text = (headline: string) => {
  return (
    <Fragment>
      <h2>{headline}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quam voluptas
        necessitatibus <a href="">Text link demo</a> in beatae distinctio cum!
      </p>
      <h3>Test h3 title</h3>
      <ul>
        <li>Test bullet 1</li>
        <li>
          Test bullet 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
          dolores esse animi laboriosam!{' '}
        </li>
        <li>Test bullet 3</li>
      </ul>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo</p>
      <hr />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo</p>
      <h2>Testing a H2 headline</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo{' '}
        <a href="">text with line wrapping </a> quam voluptas necessitatibus in beatae
        distinctio cum!
      </p>
      <h4>Test h4 title!</h4>
      <blockquote>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo quam voluptas
        necessitatibus in beatae distinctio cum!
      </blockquote>
    </Fragment>
  );
};

export default function () {
  return (
    <Minimal>
      <TextBlock small={true} startSeen>
        {text('Left aligned with small text')}
      </TextBlock>
      <DummyBlock thin />
      <TextBlock align="right" small={false} startSeen>
        {text('Right aligned with regular text')}
      </TextBlock>
      <DummyBlock thin />
      <TextBlock wide={true} small={false} startSeen>
        {text('Wide with regular text')}
      </TextBlock>
      <DummyBlock thin />
      <TextBlock labelled={true} small={false} startSeen>
        {text('Labelled with regular text')}
      </TextBlock>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
