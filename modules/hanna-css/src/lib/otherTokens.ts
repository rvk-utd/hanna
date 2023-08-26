import { buildVariables } from './cssutils.js';

export const FormFieldVariables = /*@__PURE__*/ buildVariables(
  [
    'input__background_color',
    'input__border_color',
    'input__border_radius',
    'input__border_inner_radius',
    'input__height',
    'input__height_inner',
    'input__padding_top',
    'input__padding_bottom',
    'input__font_size',
    'input__color',
    'input__color_placeholder',
    'input__line_height',
    'input__paddingH',
  ],
  'FormField'
);

// Using destructuring, rather than direct assignment, as it seems to reduce
// the chance of bundlers (e.g. Rollup) treating getting the methods on
// `makeVariables` as a side-effect
const { vars: formFieldVars } = FormFieldVariables;

export { formFieldVars };
