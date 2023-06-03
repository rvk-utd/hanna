// Inlining this FOUC hack in the page itself is faster,
// and the preferred method. This is just a fallback.
((c, n) => {
  c.add(n);
  setTimeout(() => c.remove(n), 60000);
})(document.documentElement.classList, 'before-sprinkling');

!window.Hanna &&
  (() => {
    let path = '';
    let import_;
    let sprinklesURL = '';
    const fallbackSprinklesUrl = '${fallbackSprinklesUrl}';
    const scriptElm = document.currentScript;
    if (scriptElm) {
      /*
        NOTE: `document.currentScript` exists only if the script was loaded
        via a `<script/>` tag, and then only during the initial processing.
        @see https://deve`loper.mozilla.org/en-US/docs/Web/API/Document/currentScript

        For inlined scripts (without `.src`) we fall back on a default
        `fallbackSprinklesUrl` value.

        If the script was loaded, say, via dynamic `import()` then we
        can use a simple `"./"` relative path.
      */
      const src = scriptElm.src || fallbackSprinklesUrl;
      sprinklesURL = new URL('.', src).href;
    }

    try {
      import_ = new Function('url', 'return import(url)');
      import_('').catch(() => undefined);
      path = (sprinklesURL || './') + 'esm/';
    } catch (e) {
      path = (sprinklesURL || fallbackSprinklesUrl) + 'systemjs/';
      const sjs = new Promise((resolve) => {
        const s = document.createElement('script');
        s.onload = s.onerror = resolve;
        s.src = 'https://unpkg.com/systemjs@6/dist/s.min.js';
        document.head.append(s);
      });
      import_ = (url) => sjs.then(() => window.System.import(url));
    }

    const Hanna = (window.Hanna = {
      version: '${version}',
      sprinkles: {},
      refresh: () => Object.values(Hanna.sprinkles).forEach((sprinkle) => sprinkle()),
      import: (...args) =>
        Promise.all(
          args.map((module) =>
            import_(
              /^(?:\.|\/|https?:\/\/)/.test(module)
                ? module
                : path + module + (/\.js(?:$|\?)/.test(module) ? '' : '.js')
            )
          )
        ),
    });
    Hanna.loadSprinkles = Hanna.import;
  })();
