import range from '@hugsmidjan/qj/range';
import { css, em, ms } from 'es-in-css';

import { between_cols, between_phone_netbook } from '../lib/between';
import { mq } from '../lib/breakpoints';
import { cols_pct, px_pct } from '../lib/grid';
import { hannaVars as vars } from '../lib/hannavars';
import { icons, iconStyle } from '../lib/icons';

import { Card_css, CardList_css, CardListTitle_css } from './styles/cards';
import { extendBackgroundWithUnderlay, prem } from './utils/miscUtils';
import {
  SeenEffect__delay,
  SeenEffect__fadein,
  SeenEffect__fadeup,
  SeenEffect__initial,
  SeenEffect__seen,
  SeenEffect__transition,
  Transition__long,
  Transition__properties,
} from './utils/seenEffects';

const icon_indent = prem(26);
const iconList = [
  { name: 'text', icon: icons.text },
  { name: 'pdf', icon: icons.file_pdf },
  { name: 'link', icon: icons.link },
];

export default css`
  @media screen {
    .ExtraLinks {
      background-color: ${vars.color_suld_25};
      padding: ${between_cols(30, 90)} 0;
      margin-bottom: ${between_cols(60, 100)};
      ${extendBackgroundWithUnderlay}
    }

    // strictly for transition effect
    .ExtraLinks {
      ${SeenEffect__fadein('.ExtraLinks__item')}
      ${SeenEffect__fadeup('.ExtraLinks__title')}
      ${extendBackgroundWithUnderlay('left', 'after')}

      ${SeenEffect__initial('::after')(css`
        border-left: ${between_phone_netbook(8, 24)} solid ${vars.color_suld_25};
      `)}

      ${SeenEffect__transition('::after')(css`
        ${Transition__long}
        ${Transition__properties('transform')}
      `)}

      ${SeenEffect__seen('::after')(css`
        transform: scaleY(0);
        transform-origin: 0 100%;
      `)}

      ${range(1, 12).map(
        (i) => css`
          ${SeenEffect__seen(`.ExtraLinks__item:nth-child(${i})`)(css`
            ${SeenEffect__delay(ms(i * 50 + 200))}
          `)}
        `
      )}
    }

    .ExtraLinks::before {
      border-left: ${between_phone_netbook(8, 24)} solid ${vars.theme_color_primary};

      @media ${mq.wide} {
        border-width: ${prem(24)};
      }
    }

    .ExtraLinks__main {
    }

    .ExtraLinks__title {
      ${CardListTitle_css}

      margin-bottom: ${between_phone_netbook(24, 57)};
      @media ${mq.wide} {
        margin-bottom: 57px;
      }
    }
    .ExtraLinks__list {
      ${CardList_css}
    }

    .ExtraLinks__card {
      ${Card_css}
      border: ${vars.border_default};
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
      margin-top: ${between_phone_netbook(40, 90)};
      padding-top: ${between_phone_netbook(32, 64)};
      padding-bottom: ${between_phone_netbook(80, 130)};

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
      font: ${vars.font_hd_s};
      margin-bottom: ${between_phone_netbook(20, 53)};
    }

    .ExtraLinks__related__item {
      margin-left: ${icon_indent};
      position: relative;
    }
    .ExtraLinks__related__link {
      font: ${vars.font_bd_l};
      color: ${vars.color_suld_200};
    }
    .ExtraLinks__related__link::before {
      ${iconStyle(vars.icon__dash)}
      position: absolute;
      top: 0;
      right: 100%;
      width: ${icon_indent};
      text-align: left;
      font-size: ${em(16 / 20)};
    }

    ${iconList.map(
      (item) => css`
        .ExtraLinks__related__link--${item.name}::before {
          content: ${item.icon};
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
