/**
 * Returns the one of `<html/>` or `<body/>` which seems to be
 * responsible for "scrolling the page". Prefers `<body />`.
 */
export const getPageScrollElm = (customWindow: Window = window) => {
  const { body, documentElement } = customWindow.document;
  if (body.clientHeight !== body.scrollHeight) {
    return body;
  }
  return documentElement;
};
