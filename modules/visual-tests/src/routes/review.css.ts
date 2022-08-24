import { css, hannaVarOverride, hannaVars as vars } from '@reykjavik/hanna-css';

export default css`
  code {
    font-size: 0.8em;
    background-color: ${vars.color_suld_50};
    padding: 2px ${vars.space_0$5};
  }

  .ReviewReport {
    margin: ${vars.space_2} 0;
    border-bottom: ${vars.border_default};
    padding-bottom: ${vars.space_3};
  }

  .ChangesList {
  }
  .ChangesList__item {
    margin-bottom: ${vars.space_1};
  }
  .ChangesList__item--bug {
    ${hannaVarOverride({
      link_color: vars.color_suld_150,
    })};
  }
  .ChangesList__item .TagPill {
    margin-bottom: 0;
  }
  .ChangesList__link[class] {
    display: flex;
    flex-flow: row wrap;
    border: 0;
  }
  .ChangesList__name {
    border-bottom: ${vars.link_underline};
  }
  .ChangesList__item--bug .ChangesList__name {
    text-decoration: line-through;
  }
  .ChangesList__name:not(:last-child) {
    margin-right: ${vars.space_2};
  }
  :hover > .ChangesList__name {
    border-bottom: ${vars.link_underline__hover};
  }
  .ChangesList__project {
    font-weight: ${vars.font_weight__normal};
  }
`;
