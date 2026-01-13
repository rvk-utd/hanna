import range from '@hugsmidjan/qj/range';
import { css, ms } from 'es-in-css';

import { scale_container, scale_phone_netbook } from '../lib/between.js';
import { mq } from '../lib/breakpoints.js';
import { hannaVars as vars } from '../lib/hannavars.js';
import { iconContent, iconStyle, IconToken } from '../lib/icons.js';

import { Card_css, CardList_css, CardListTitle_css } from './styles/cards.js';
import {
  cols_pct,
  dataURI,
  extendBackgroundWithUnderlay,
  prem,
  px_pct,
} from './utils/miscUtils.js';
import {
  SeenEffect__fadein,
  SeenEffect__fadeup,
  SeenEffect__initial,
  SeenEffect__only,
  SeenEffect__resetDefault,
  SeenEffect__seen,
  SeenEffect__transition,
  Transition__long,
} from './utils/seenEffects.js';

// ---------------------------------------------------------------------------

export const ExtraLinks__seenEffects = (trigger?: null | string) => css`
  ${SeenEffect__only({ child: '.ExtraLinks:after', trigger })(css`
    content: '';
    position: absolute;
    left: ${vars.grid_margin__neg};
    top: 0;
    bottom: 0;
    border-left: ${scale_phone_netbook(8, 24)} solid ${vars.color_suld_25};
    transform: scaleY(0);
    transform-origin: 0 100%;
  `)}
  ${SeenEffect__initial({ child: '.ExtraLinks::after', trigger })(css`
    transform: scaleY(1);
  `)};
  ${SeenEffect__seen({ child: '.ExtraLinks::after', trigger })(css``)};
  ${SeenEffect__transition({ child: '.ExtraLinks::after', trigger })(css`
    ${Transition__long};
    transition-property: transform;
  `)};

  ${SeenEffect__fadeup({ child: '.ExtraLinks__title', trigger })};

  ${SeenEffect__fadein({ child: '.ExtraLinks__item', trigger })};
  ${range(1, 12).map((i) =>
    SeenEffect__transition({ child: `.ExtraLinks__item:nth-child(${i})`, trigger })(css`
      transition-delay: ${ms(i * 60 + 100)};
    `)
  )};
  // Default delay, applied to for items where n > 12
  ${SeenEffect__transition({ child: `.ExtraLinks__item`, trigger })(css`
    transition-delay: ${ms(13 * 60 + 100)};
  `)}
`;

// ---------------------------------------------------------------------------

const icon_indent = prem(26);
const iconList: Array<{ name: string; icon: IconToken }> = [
  { name: 'text', icon: 'notes' },
  { name: 'pdf', icon: 'picture_as_pdf' },
  { name: 'link', icon: 'link' },
];

export default css`
  @media screen {
    .ExtraLinks {
      background-color: ${vars.color_suld_25};
      padding: ${scale_container(30, 90)} 0;
      margin-bottom: ${scale_container(60, 100)};
      ${extendBackgroundWithUnderlay('both', 'before')}
    }

    * {
      ${SeenEffect__resetDefault('.ExtraLinks')}
      ${ExtraLinks__seenEffects()}
    }

    .ExtraLinks::before {
      border-left: ${scale_phone_netbook(8, 24)} solid ${vars.theme_color_primary};

      @media ${mq.wide} {
        border-width: ${prem(24)};
      }
    }

    .ExtraLinks__main {
    }

    .ExtraLinks__title {
      ${CardListTitle_css};

      margin-bottom: ${scale_phone_netbook(24, 57)};
      @media ${mq.wide} {
        margin-bottom: 57px;
      }
    }
    .ExtraLinks__list {
      ${CardList_css};
    }

    .ExtraLinks__card {
      ${Card_css};

      &[class] {
        // double strentgh selector to override defaut link :hover styling
        border: ${vars.border_default};
      }
    }
    .ExtraLinks__card:hover,
    .ExtraLinks__card:active {
      border-color: transparent;
      background-color: ${vars.theme_color_primary};
      color: ${vars.theme_color_primary__text};
      outline: none;
    }

    .ExtraLinks__related {
      background-color: ${vars.color_suld_50};
      padding-right: ${cols_pct(1, 0)};
      padding-left: ${cols_pct(1, 1)};
      margin-top: ${scale_phone_netbook(40, 90)};
      padding-top: ${scale_phone_netbook(32, 64)};
      padding-bottom: ${scale_phone_netbook(80, 130)};

      @media ${mq.wide} {
        margin-top: ${prem(90)};
        padding-top: ${prem(64)};
        padding-bottom: ${prem(130)};
      }

      @media ${mq.tablet} {
        margin-top: ${prem(32)};
      }
    }

    .ExtraLinks__related__title {
      font: ${vars.font_heading_m};
      margin-bottom: ${scale_phone_netbook(20, 53)};
    }

    .ExtraLinks__related__item {
      margin-left: ${icon_indent};
      position: relative;
    }
    .ExtraLinks__related__link {
      font: ${vars.font_body_l};
      color: ${vars.color_suld_200};
    }
    .ExtraLinks__related__link::before {
      ${iconStyle('remove', 'small')}
      position: absolute;
      top: 0;
      right: 100%;
      width: ${icon_indent};
      text-align: left;
      background: currentColor;
      mask: url(${dataURI('i/icons/dash.svg')}) 0% 50% / auto 1em no-repeat;
    }

    ${iconList.map(
      ({ name, icon }) => css`
        .ExtraLinks__related__link--${name}::before {
          ${iconContent(icon)}
          mask: none;
          background: none;
        }
      `
    )}
  }

  @media ${mq.tablet_up} {
    .ExtraLinks {
      position: relative;
      border: 0;
    }

    .ExtraLinks__related__list {
    }
    .ExtraLinks__related__item {
      margin-bottom: ${prem(19)};
    }
  }

  @media ${mq.netbook_up} {
    .ExtraLinks--related {
      display: flex;
      margin-bottom: ${px_pct(230)};
    }
    .ExtraLinks--related > .ExtraLinks__main {
      width: ${vars.grid_6};
    }
    .ExtraLinks--related > .ExtraLinks__main > .ExtraLinks__list {
      grid-template-columns: repeat(2, ${vars.grid_3});
    }

    .ExtraLinks__related {
      margin-bottom: ${px_pct(-210)};
      width: ${vars.grid_5};
      margin-left: auto;
    }
  }
`;
