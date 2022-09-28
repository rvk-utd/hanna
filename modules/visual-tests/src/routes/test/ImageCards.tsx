import React, { Fragment } from 'react';
import range from '@hugsmidjan/qj/range';
import type { MetaFunction } from '@remix-run/node';
import ButtonTertiary from '@reykjavik/hanna-react/ButtonTertiary';
import ImageCards, { ImageCardsItemProps } from '@reykjavik/hanna-react/ImageCards';

import { Minimal } from '../../layout/Minimal';
import { lorem, photo } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// Use `handle` if you're using multiple Hanna compnents
export const handle = { cssTokens: [] };

const imageCards = range(0, 5).map(
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
  })
);

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
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
      />
      <ImageCards cards={imageCards} />
    </Minimal>
  );
}

export const testing: TestingInfo = {
  initialHover: '.ImageCards__card__title >> nth = 0',
};
