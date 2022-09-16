import { TestEquals, TestExtends, TestNotExtends } from 'hanna-test-helpers';
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
      const t1: TestEquals<typeof newValue, string> = true;
      const t2: TestExtends<typeof newOption, _StringOption | 'two'> = true;
      const t3: TestNotExtends<typeof newOption, number> = true;
      const t3b: TestNotExtends<typeof newOption, _NumberOption> = true;
    },
  });

  const t1: TestEquals<SelectboxOptionList, SelectboxOptions> = true;

  const t2: TestEquals<SelectboxOptionList<string>[number], _StringOption> = undefined;
  const t2b: TestEquals<SelectboxOptionList<number>[number], _NumberOption> = true;
  const t3: TestEquals<_StringOption['value'], string> = true;
  const t4: TestEquals<SelectboxProps<string>['options'][number], string> = true;
  const t4b: TestEquals<
    NonNullable<SelectboxProps<string>['onSelected']>,
    (a: string, b: string) => void
  > = true;
  const t4c: TestEquals<
    NonNullable<SelectboxProps<_StringOption>['onSelected']>,
    (a: string, b: _StringOption) => void
  > = true;
  const t4d: TestEquals<SelectboxProps<number>['options'][number], number> = true;
  const t5: TestEquals<SelectboxProps<_StringOption>['options'][number], _StringOption> =
    true;
};
/* eslint-enable @typescript-eslint/no-unused-vars */
