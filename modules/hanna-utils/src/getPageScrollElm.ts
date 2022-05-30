/**
 * Returns the outermost scrollable element (as defined by the active CSS) —
 * either `<html/>` or `<body/>`.
 *
 * Prefers `<body />` if both are scrollable.
 *
 * Use this helper when you want to reliably scroll the whole page.
 *
 */
export const getPageScrollElm = (customWindow: Window = window) => {
  const { body, documentElement } = customWindow.document;
  if (body.clientHeight !== body.scrollHeight) {
    return body;
  }
  return documentElement;
};
