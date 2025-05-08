/**
 * @deprecated  No longer required by Hanna's base CSS  (Will be remove in v0.3)
 *
 * Returns the outermost scrollable element (as defined by the active CSS) —
 * either `<html/>` or `<body/>`.
 *
 * Prefers `<body />` if both are scrollable.
 *
 * Use this helper when you want to reliably scroll the whole page.
 */
/*#__NO_SIDE_EFFECTS__*/
export const getPageScrollElm = (customWindow: Window = window) => {
  const { body, documentElement } = customWindow.document;
  if (body.clientHeight !== body.scrollHeight) {
    return body;
  }
  return documentElement;
};
