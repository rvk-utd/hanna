import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import Gallery from '@reykjavik/hanna-react/Gallery';

import { Minimal } from '../../layout/Minimal';
import { photo } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = { cssTokens: [], };

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <Gallery
        items={[
          {
            caption: 'Elliðaárdalur',
            largeImageSrc: photo.landscape.src,
            src: photo.landscape.src,
          },
          {
            caption: 'long caption here to test how this can break the layout',
            largeImageSrc: photo.portrait.src,
            src: photo.portrait.src,
            altText: 'Elliðaárdalur alt text',
          },
          {
            largeImageSrc: photo.landscape.src,
            src: photo.landscape.src,
          },
          {
            caption: 'This one has a caption',
            src: photo.portrait.src,
          },
        ]}
      />
    </Minimal>
  );
}
export const testing: TestingInfo = {
  initialHover: '.CarouselStepper__button[aria-label="4"] ',

  extras: async ({ page, pageScreenshot }) => {
    // Click third carousel step button
    await page.locator('.CarouselStepper__button[aria-label="3"]').click();
    await pageScreenshot('carousel-stepper-click-third');

    const itemlist = page.locator('.Gallery__itemlist');

    // Go back to the first carousel step
    await page.locator('.CarouselStepper__button[aria-label="1"]').click();
    await pageScreenshot('carousel-stepper-click-first');

    // Hover go-left arrow
    await itemlist.hover();
    await page.locator('.Gallery__itemlist-goRight').hover();
    await pageScreenshot('go-right-hover');

    // Click go-left arrow
    await page.locator('.Gallery__itemlist-goRight').click();
    await pageScreenshot('go-right-click');

    // Click first photo and take a screenshot
    await page
      .locator('.GalleryItem__button[href="/media/photo-landscape.png"] >> nth=0')
      .click();
    await pageScreenshot('click-photo');
  },
};
