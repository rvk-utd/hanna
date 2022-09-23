import type { Equals, Expect, Extends, NotExtends } from 'hanna-test-helpers';
import o from 'ospec';

import Selectbox_default, {
  SelectboxOption,
  SelectboxOptionList,
  SelectboxOptions,
  SelectboxProps,
} from './Selectbox';

o.spec('Selectbox', () => {
  o('is exported', () => {
    o(typeof Selectbox_default === 'function').equals(true);
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
const typeTests = () => {
  return;
  type _StringOption = SelectboxOption<string>;
  type _NumberOption = SelectboxOption<number>;

  const foo = Selectbox_default({
    label: 'asdf',
    options: [{ value: 'one' }, 'two'],
    onSelected: (newValue, newOption) => {
      type t1 = Expect<Equals<typeof newValue, string>>;
      type t2 = Expect<Extends<typeof newOption, _StringOption | 'two'>>;
      type t3 = Expect<NotExtends<typeof newOption, number>>;
      type t3b = Expect<NotExtends<typeof newOption, _NumberOption>>;
    },
  });

  type t1 = Expect<Equals<SelectboxOptionList, SelectboxOptions>>;

  type t2 = Expect<Equals<SelectboxOptionList<string>[number], _StringOption>>;
  type t2b = Expect<Equals<SelectboxOptionList<number>[number], _NumberOption>>;
  type t3 = Expect<Equals<_StringOption['value'], string>>;
  type t4 = Expect<Equals<SelectboxProps<string>['options'][number], string>>;
  type t4b = Expect<
    Equals<
      NonNullable<SelectboxProps<string>['onSelected']>,
      (a: string, b: string) => void
    >
  >;
  type t4c = Expect<
    Equals<
      NonNullable<SelectboxProps<_StringOption>['onSelected']>,
      (a: string, b: _StringOption) => void
    >
  >;
  type t4d = Expect<Equals<SelectboxProps<number>['options'][number], number>>;
  type t5 = Expect<
    Equals<SelectboxProps<_StringOption>['options'][number], _StringOption>
  >;
};
/* eslint-enable @typescript-eslint/no-unused-vars */
