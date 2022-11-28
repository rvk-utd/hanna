import { css } from 'es-in-css';

import { cols_px } from '../lib/grid';
import { hannaVars as vars } from '../lib/hannavars';
import { iconStyle } from '../lib/icons';
import { WARNING__ } from '../lib/WARNING__';

import { ButtonTertiaryStyle } from './styles/buttons';
import { prem } from './utils/miscUtils';

export default css`
  @media screen {
    .NameCard {
      border: ${vars.border_default};
      padding: ${vars.space_3};
      display: flex;
      flex-flow: column;
      min-height: ${prem(230)};
      // for standalone-display
      max-width: ${cols_px(4)};
      flex-grow: 1;
      margin-bottom: ${vars.grid_gutter};
    }
    .NameCard > :last-child {
      margin-bottom: 0;
    }

    .NameCard__name {
      width: 100%;
      font: ${vars.font_bd_l};
      font-weight: ${vars.font_weight__bold};
      margin-bottom: ${vars.space_1};
    }

    .NameCard__contactinfo {
      margin-bottom: ${vars.space_2};
      display: flex;
      flex-flow: row wrap;
      margin-right: ${vars.space_1__neg};
    }
    span.NameCard__contactinfo__item {
      ${ButtonTertiaryStyle(true)}
      margin-right: ${vars.space_1};
    }
    .NameCard__tel__number, // @deprecated (remove in v0.9)
	  a.NameCard__contactinfo__item,
	  button.NameCard__contactinfo__item {
      ${ButtonTertiaryStyle()}
      margin-right: ${vars.space_1};
    }

    .NameCard__location,
    .NameCard__hours {
      margin-bottom: ${vars.space_1};
      padding-left: ${vars.space_4};
    }
    .NameCard__location:before,
    .NameCard__hours::before {
      ${iconStyle(vars.icon__location)}
      float: left;
      margin-left: ${vars.space_4__neg};
      width: ${vars.space_3};
      color: ${vars.color_suld_150};
    }
    .NameCard__hours:before {
      content: ${vars.icon__time};
    }

    .NameCard__abouttext {
      margin-bottom: ${vars.space_1};
    }
    .NameCard__location + .NameCard__abouttext,
    .NameCard__hours + .NameCard__abouttext {
      margin-top: ${vars.space_2};
    }

    .NameCard__meta {
      margin-top: auto;
      padding-top: ${vars.space_1};
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: flex-end;
    }

    .NameCard__vacancy, // @deprecated (remove in v0.9)
	.NameCard__availability {
      color: ${vars.color_suld_150};
      --led-color: ${vars.color_suld_150};
      margin-top: ${vars.space_1};
      margin-right: ${vars.space_2};
    }
    .NameCard__vacancy--vacany, // @deprecated (remove in v0.9)
	.NameCard__availability--available {
      color: ${vars.color_suld_200};
      --led-color: ${vars.color_ellidaardalur_100};
    }
    .NameCard__vacancy::before, // @deprecated (remove in v0.9)
	.NameCard__availability::before {
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: ${prem(8)};
      height: ${prem(8)};
      margin-right: ${vars.space_1};
      border-radius: 50%;
      background-color: var(--led-color);
    }

    .NameCard__updated {
      font: ${vars.font_label};
      color: ${vars.color_suld_150};
      margin-left: auto;
      align-self: flex-end;
      margin-top: ${vars.space_1};
    }
  }

  .NameCard__location,
  .NameCard__hours,
  .NameCard__aboutText {
    p,
    div,
    ul {
      ${WARNING__('Only use simple, inline HTML element inside this field.')};
    }
  }
`;
