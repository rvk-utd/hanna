import { css } from 'es-in-css';

export const afterClear_css = () => css`
  &::after {
    content: ' ';
    clear: both;
    display: block;
    height: 0;
  }
`;
