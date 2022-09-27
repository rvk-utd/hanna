import jsdom from 'jsdom';

if (!('window' in global)) {
  const window = new jsdom.JSDOM('<html/>').window;

  /* BEGIN: rAF polyfill */
  /* https://github.com/behnammodi/polyfill/blob/master/window.polyfill.js */
  /* (Recommended by https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) */
  window.requestIdleCallback = function (callback, options = {}) {
    const relaxation = 1;
    const timeout = options.timeout || relaxation;
    const start = performance.now();
    return window.setTimeout(function () {
      callback({
        get didTimeout() {
          return options.timeout
            ? false
            : performance.now() - start - relaxation > timeout;
        },
        timeRemaining: function () {
          return Math.max(0, relaxation + (performance.now() - start));
        },
      });
    }, relaxation);
  };
  window.cancelIdleCallback = function (id) {
    clearTimeout(id);
  };
  window.requestAnimationFrame = function (callback) {
    return window.setTimeout(function () {
      callback(Date.now());
    }, 1000 / 60);
  };
  window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
  /* END: rAF polyfill */

  // @ts-ignore  (we're willfully extending the global object)
  global.navigator = window.navigator;
  // @ts-ignore  (we're willfully extending the global object)
  global.window = window.window;
  // @ts-ignore  (we're willfully extending the global object)
  global.document = window.document;
  // @ts-ignore  (we're willfully extending the global object)
  global.Element = window.Element;
}
