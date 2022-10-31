import { Locator } from '@playwright/test';

export const keyboardFocus = async (loc: Locator, back?: boolean) => {
  await loc.focus();
  const key = loc.page().keyboard;
  if (back) {
    await key.press('Shift+Tab');
    await key.press('Tab');
    return;
  }
  await key.press('Tab');
  await key.press('Shift+Tab');
};
