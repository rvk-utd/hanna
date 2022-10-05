import { css } from 'es-in-css';

// reset <button> styles for easier custom styling
export const buttonReset = () => css`
  border: 0;
  border-radius: 0;
  padding: 0;
  background: transparent;
  font: inherit;
  text-align: inherit;
  color: inherit;
  cursor: pointer;
`;
