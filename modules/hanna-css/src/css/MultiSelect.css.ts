import { css } from 'es-in-css';

export default css`
  /*!@deps
    Tagpill
    TextInput
    Checkbox
  */

  .Multiselect {
    border: 1px solid red;
  }

  .Multiselect__inputcontainer {
    display: flex;
    flex-wrap: wrap;
  }

  .Multiselect_input {
    flex: 1;
  }

  .Multiselect_inputButton {
    display: flex;
    align-items: center;
    align-self: stretch;
    flex-shrink: 0;
    box-sizing: border-box;
    padding: 0 0.5rem;
  }

  .Multiselect__options {
    border: 1px solid gray;
  }

  .Multiselect__option {
    padding: 0.5rem;
  }
`;
