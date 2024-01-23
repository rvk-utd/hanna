import { efnistakn } from '@reykjavik/hanna-utils/assets';
import { css, str } from 'es-in-css';

export default css`
  ${efnistakn.map((icon) => {
    const path = `/assets/efnistakn/${icon}.svg`;
    return css`
      [data-efnistakn=${icon}] {
        --efnistakn: url(${str(path)});
      }
    `;
  })}
`;
