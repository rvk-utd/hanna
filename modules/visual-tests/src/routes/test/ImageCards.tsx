import React, { Fragment } from 'react';
import range from '@hugsmidjan/qj/range';
import type { V2_MetaFunction } from '@remix-run/node';
import { ButtonTertiary } from '@reykjavik/hanna-react/ButtonTertiary';
import { ImageCards, ImageCardsItemProps } from '@reykjavik/hanna-react/ImageCards';

import { Minimal } from '../../layout/Minimal.js';
import { lorem, photo } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export const imageCards = range(1, 5).map(
  (i): ImageCardsItemProps => ({
    title:
      [
        'Block Title',
        'Block title lorem ipsum dolor sit ament foobar',
        'Tré ársins er rauðgreni í Elliðaárhólma',
      ][i % 3] || '',
    href: '',
    image: photo.square,
    meta: i % 2 === 0 ? lorem.medium : '14. október',
    summary: i === 3 ? lorem.tiny : undefined,
  })
);

export default function () {
  return (
    <Minimal>
      <ImageCards
        title="Image Cards"
        summaryElement={
          <Fragment>
            <ButtonTertiary href="">Sjá yfirlit</ButtonTertiary>
            <div>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, in sequi?
              Autem suscipit accusantium doloribus, deserunt iste ratione fugit cumque
              eligendi impedit error eius exercitationem recusandae neque non maiores
              animi!
            </div>
          </Fragment>
        }
        background={true}
        cards={imageCards}
        startSeen
      />
      <ImageCards cards={imageCards} startSeen />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.ImageCards__card__title >> nth = 2',
};
