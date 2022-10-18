import o from 'ospec';

import { buildVariables } from './cssutils';

o.spec('buildVariables helper', () => {
  o('works', () => {
    o(buildVariables(['foo']).vars.foo + '').equals('var(--foo)');
    // Check if it is the version specifically configured for Hanna's naming patterns.
    o(buildVariables(['a$b_c']).vars.a$b_c + '').equals('var(--a_b-c)')(
      'maps "_" to "\'" and "$" to "_"'
    );
    o(typeof buildVariables.isVar).equals('function');
    o(typeof buildVariables.join).equals('function');
  });

  o('accepts custom `namespace` parameter', () => {
    o(buildVariables(['bar_baz'], 'FOO').vars.bar_baz + '').equals('var(--FOO--bar-baz)')(
      'appends double-dash to namespace'
    );
    o(buildVariables(['bar_baz'], 'FOO----').vars.bar_baz + '').equals(
      'var(--FOO--bar-baz)'
    )('collapses multiple trailing dashes');
    o(buildVariables(['bar_baz'], 'FOO__').vars.bar_baz + '').equals(
      'var(--FOO__bar-baz)'
    )('accepts double-underscores as a suffix');
  });
});
