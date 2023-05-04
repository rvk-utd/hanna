((c, n) => {
  c.add(n);
  setTimeout(() => c.remove(n), 60000);
})(document.documentElement.classList, 'before-sprinkling');

!window.Hanna &&
  (() => {
    let path = '';
    let import_;

    try {
      import_ = new Function('url', 'return import(url)');
      import_('').catch(() => undefined);
      path = './esm/';
    } catch (e) {
      path = '${sprinklesUrl}/systemjs/';
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
