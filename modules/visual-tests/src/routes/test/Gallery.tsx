import React from 'react';
import type { MetaFunction } from '@remix-run/node';
import Gallery from '@reykjavik/hanna-react/Gallery';

import { Minimal } from '../../layout/Minimal';
import { lorem, photo } from '../../test-helpers/dummyData';
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
            ...photo.landscape,
            largeImageSrc: photo.landscape.src,
            caption: 'Elliðaárdalur',
          },
          {
            ...photo.portrait,
            largeImageSrc: photo.portrait.src,
            caption: 'long caption here to test how this can break the layout',
            description: lorem.short,
          },
          {
            ...photo.landscape,
            largeImageSrc: photo.landscape.src,
          },
          {
            ...photo.portrait,
            caption: 'This one has a caption',
          },
          {
            ...photo.landscape,
            largeImageSrc: photo.landscape.src,
          },
        ]}
      />
    </Minimal>
  );
}
export const testing: TestingInfo = {
  extras: async ({ page, pageScreenshot }) => {
    const opts = {
      viewportMinHeight: Math.max(500, 0.9 * page.viewportSize()!.width),
    };

    // scroll to 3rd item and hover it.
    await page.locator('.CarouselStepper__button >> nth=2').click();
    await page.locator('.GalleryItem__button >> nth=2').hover();
    await pageScreenshot('scrolled', opts);

    // click 3rd item and hover the modal's close button
    await page.locator('.GalleryItem__button >> nth=2').click();
    await page.waitForTimeout(200);
    await page.locator('.GalleryModal__closebutton').hover();
    await pageScreenshot('modal-nocaption-closebtn-hover', opts);

    const prevButton = page.locator('.GalleryModalPager__button--prev');

    // navigate back (to 2nd item) and hover the prev button
    await prevButton.click();
    await prevButton.hover();
    await pageScreenshot('modal-description-portrait-prev-hover', opts);

    // navigate back (to 1st item) and hover the next button
    await prevButton.click();
    await page.locator('.GalleryModalPager__button--next').hover();
    await pageScreenshot('modal-caption-next-hover', opts);

    // NOTE: The `--goleft` and `--goright` mouse-navigation buttons
    // are tested as part of the ArticleCarousel test
  },
};
