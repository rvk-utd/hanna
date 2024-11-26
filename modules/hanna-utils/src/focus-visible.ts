// expose `focus-visible` (https://www.npmjs.com/package/focus-visible)
// as an optionally importable module to consumers of `@reykjavik/hanna-utils`,
// without requiring them to install it as a dependency in their project.
import 'focus-visible';

/** @deprecated  This polyfill is not needed anymore  (Will be removed in v0.3) */
if (process.env.NODE_ENV !== 'production') {
  console.warn(
    'Deprecation Warning:\n' +
      'The `focus-visible` polyfill isn not needed anymore as browser support ' +
      '  is now widespread. You can safely remove all imports of the ' +
      '`@reykjavik/hanna-utils/focus-visible` module from your project.\n' +
      '(This module will be removed in v0.3 of `@reykjavik/hanna-utils`)'
  );
}
