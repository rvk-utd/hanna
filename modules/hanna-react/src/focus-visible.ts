// expose `focus-visible` to consumers of `@reykjavik/hanna-react`
// without requiring them to install it as a dependency in their project.
import '@reykjavik/hanna-utils/focus-visible';

/** @deprecated  This polyfill is not needed anymore  (Will be removed in v0.11) */
if (process.env.NODE_ENV !== 'production') {
  console.warn(
    'Deprecation Warning:\n' +
      'The `focus-visible` polyfill isn not needed anymore as browser support ' +
      '  is now widespread. You can safely remove all imports of the ' +
      '`@reykjavik/hanna-react/focus-visible` module from your project..\n' +
      '(This module will be removed in v0.11 of `@reykjavik/hanna-react`)'
  );
}
