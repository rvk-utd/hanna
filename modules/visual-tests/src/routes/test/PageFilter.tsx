import React, { Fragment } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { BlockBreak } from '@reykjavik/hanna-react/BlockBreak';
import { ButtonPrimary } from '@reykjavik/hanna-react/ButtonPrimary';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';
import { ImageCards } from '@reykjavik/hanna-react/ImageCards';
import { PageFilter } from '@reykjavik/hanna-react/PageFilter';
import { Selectbox } from '@reykjavik/hanna-react/Selectbox';
import { TextInput } from '@reykjavik/hanna-react/TextInput';

import { Minimal } from '../../layout/Minimal';
import { lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';
import { cssTokens } from '../../utils/route.server';

import { imageCards } from './ImageCards';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens('BlockBreak', 'ImageCards');

export default function () {
  return (
    <Minimal>
      {[1, 2, 3, 4].map((i) => (
        <PageFilter
          key={i}
          title={
            i === 1
              ? 'No placeholder in selectbox'
              : i === 2
              ? 'Page filter with a reset button and footnote ' // Page filter with a reset button and footnote
              : i === 3
              ? 'Hi! This title is a little bit longer than the previous one'
              : 'No line break'
          }
          summary={
            i === 1
              ? ' '
              : i === 4
              ? 'But has footnote and a reset button!'
              : 'With line break! ' + lorem.short
          }
          buttonRow={
            <Fragment>
              <ButtonPrimary>Sækja fundargerðir</ButtonPrimary>
              {i % 2 === 0 && <ButtonTertiary disabled>Hreinsa</ButtonTertiary>}
            </Fragment>
          }
          filters={
            <Fragment>
              <TextInput label="Search terms" />
              {i === 2 || i === 3 ? <BlockBreak /> : ''}
              <TextInput label="Moar terms" />
              {i === 1 || i === 3 ? <TextInput label="Even more terms" /> : ''}
              <Selectbox label="Optional" options={['', 'One option', 'Other option']} />
            </Fragment>
          }
          footnote={i % 3 === 0 ? lorem.medium : undefined}
          underlap={i === 4}
          startSeen
        />
      ))}
      <ImageCards cards={imageCards.slice(1, 3)} />
    </Minimal>
  );
}

export const testing: TestingInfo = {};
