import { css, hannaVars as vars } from '@reykjavik/hanna-css';

export default css`
  .ReviewShot {
    position: relative;
    margin: ${vars.space_2} 0;
    border-top: ${vars.border_default};
    padding-top: ${vars.space_3};
  }
  .ReviewShot::before {
    content: attr(data-mode);
  }

  .ReviewShot__meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .ReivewShot__modes {
    display: flex;
    align-items: center;
  }
  .ReviewShot__modebutton {
    padding: ${vars.space_0$5} ${vars.space_1};
    border: 1px solid ${vars.color_suld_75};
    vertical-align: top;
    margin-right: ${vars.space_1};
    margin-bottom: ${vars.space_2};
    color: ${vars.color_suld_150};
  }
  .ReviewShot__modebutton:hover {
    border-color: ${vars.color_suld_150};
    color: ${vars.color_suld_200};
  }
  .ReviewShot__modebutton--diff {
  }
  .ReviewShot__modebutton--flip {
  }
  .ReviewShot__modebutton--zoom {
  }

  .ReviewShot__actions {
  }
  .ReviewShot__actionbutton[class] {
    padding: ${vars.space_1} ${vars.space_2};
    border: 1px solid ${vars.color_suld_75};
    margin-left: ${vars.space_1};
    margin-bottom: ${vars.space_2};
    /* link style overriding */
    color: inherit;
    font-weight: ${vars.font_weight__normal};
  }
  span.ReviewShot__actionbutton {
    opacity: 0.5;
  }
  .ReviewShot__actionbutton:hover:not(span) {
    border-color: ${vars.color_suld_150};
  }
  .ReviewShot__actionbutton:disabled {
    opacity: 0.33;
    pointer-events: none;
  }

  .ReviewShot__actionbutton--accept {
    background-color: ${vars.color_ellidaardalur_50};
  }
  .ReviewShot__actionbutton--reject {
    background-color: ${vars.color_heidmork_25};
  }

  .ReviewShot__actionbutton--goto--prev[class],
  .ReviewShot__actionbutton--goto--next[class] {
    padding: ${vars.space_1};
  }

  .ReviewShot__actionbutton > strong,
  .ReviewShot__modebutton > strong {
    padding: 0 0.05em 0 0.1em;
    border: 1px dashed rgba(0, 0, 0, 0.2);
    border-radius: 0.25em;
    margin-right: 0.05em;
    line-height: 1em;
  }

  .ReviewShot__shots {
    position: relative;
    cursor: zoom-in;
    text-align: center;
    padding: ${vars.space_1$5} 0;
    margin-top: ${vars.space_1$5__neg};
  }
  .ReviewShot__shots[data-mode='difference'] {
  }
  .ReviewShot__shots[data-mode='actual'] {
  }
  .ReviewShot__shots[data-mode='expected'] {
  }
  .ReviewShot__shots[data-zoomed] {
    display: flex;
    cursor: zoom-out;
    width: 100vw;
    overflow-x: auto;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    padding-left: calc(50vw - 50%);
    padding-right: calc(50vw - 50%);
  }
  .ReviewShot__shots[data-zoomed]::after {
    content: '';
    width: 50px;
  }

  .ReviewShot__shot {
    outline: ${vars.border_default};
    /* outline-offset: ${vars.space_1}; */
    outline-width: ${vars.space_1};
    width: auto;
    max-width: 100%;
    object-fit: scale-down;
  }
  [data-zoomed] > .ReviewShot__shot {
    max-width: none;
  }
  .ReviewShot__shot:not(:first-child) {
  }

  .ReviewShot__shot--diff {
  }
  .ReviewShot__shot--actual {
    outline-color: ${vars.color_heidmork_25};
  }
  .ReviewShot__shot--expected {
    outline-color: ${vars.color_ellidaardalur_25};
  }
  [data-mode='difference'] > .ReviewShot__shot--actual {
    position: absolute;
    opacity: 0.5;
    box-shadow: 0 1000px 0 1020px white;
  }
  [data-mode='difference'] > .ReviewShot__shot--expected {
    margin-bottom: 500px;
  }

  .ReviewShot__primed {
    position: fixed;
    top: 25%;
    left: 50%;
    background-color: ${vars.color_suld_50};
    border: ${vars.border_dark};
    box-shadow: 0 0 1rem 0.5rem white, 0 0 4rem white;
    text-align: center;
    font-size: 1.5em;
    padding: 0.5em 1.5em;
    max-width: 90%;
    transform: translate(-50%, -50%);
    line-height: 2em;
    pointer-events: none;
    transition: opacity 300ms ease-in-out;
  }
  .ReviewShot__primed--accept {
    background-color: ${vars.color_ellidaardalur_50};
  }
  .ReviewShot__primed--reject {
    background-color: ${vars.color_heidmork_25};
  }

  .ReviewShot__primed[hidden] {
    display: block;
    opacity: 0;
  }
`;
