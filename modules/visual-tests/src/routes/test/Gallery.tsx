import React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { Gallery } from '@reykjavik/hanna-react/Gallery';

import { Minimal } from '../../layout/Minimal.js';
import { lorem, photo } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';

export const meta: V2_MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
// export const handle = cssTokens('Token');

export default function () {
  return (
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
  extras: async ({ page, pageScreenshot, expandViewport }) => {
    // scroll to 3rd item and hover it.
    await page.locator('.CarouselStepper__button >> nth=2').click();
    await page.locator('.GalleryItem__button >> nth=2').hover();
    await pageScreenshot('scrolled');

    const viewportMinHeight = Math.max(500, 0.9 * page.viewportSize()!.width);
    const customScrollElement = page.locator('.GalleryModalItem >> scrollContainer=');

    // click 3rd item and hover the modal's close button
    await page.locator('.GalleryItem__button >> nth=2').click();
    await page.waitForTimeout(200);
    await page.waitForTimeout(100);
    await expandViewport(viewportMinHeight, customScrollElement);
    await page.locator('.GalleryModal__closebutton').hover();
    await pageScreenshot('modal-nocaption-closebtn-hover');

    const prevButton = page.locator('.GalleryModalPager__button--prev');

    // navigate back (to 2nd item) and hover the prev button
    await prevButton.click();
    await page.waitForTimeout(100);
    await expandViewport(viewportMinHeight, customScrollElement);
    await prevButton.hover();
    await pageScreenshot('modal-description-portrait-prev-hover');

    // navigate back (to 1st item) and hover the next button
    await prevButton.click();
    await page.waitForTimeout(100);
    await expandViewport(viewportMinHeight, customScrollElement);
    await page.locator('.GalleryModalPager__button--next').hover();
    await pageScreenshot('modal-caption-next-hover');

    // NOTE: The `--goleft` and `--goright` mouse-navigation buttons
    // are tested as part of the ArticleCarousel test
  },
};
