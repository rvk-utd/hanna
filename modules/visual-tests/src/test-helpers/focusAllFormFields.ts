import { Page } from '@playwright/test';

/*+ Hack to screenshot all focus states at once */
export const focusAllFormFields = async (page: Page) => {
  await page.mouse.move(0, 0);
  await page.locator('.FormField:not(.FormField--disabled)').evaluateAll((elms) => {
    elms.forEach((elm) => {
      elm.classList.add('FormField--focused');
    });
  });
};
