import o from 'ospec';

import { buildVariables } from './cssutils';

o.spec('buildVariables helper', () => {
  o('works', () => {
    o(buildVariables(['foo']).vars.foo()).equals('var(--foo)');
    // Check if it is the version specifically configured for Hanna's naming patterns.
    o(buildVariables(['a$b_c']).vars.a$b_c()).equals('var(--a_b-c)')(
      'maps "_" to "\'" and "$" to "_"'
    );
    o(typeof buildVariables.isVar).equals('function');
    o(typeof buildVariables.join).equals('function');
  });
});
