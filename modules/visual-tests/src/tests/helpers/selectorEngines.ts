import { selectors } from '@playwright/test';

export const registerCustomSelectorsEngines = () => {
  selectors.register(
    'closest',
    () => ({
      query: (root: HTMLElement, selector: string) => root.closest(selector),
      queryAll: (root: HTMLElement, selector: string) => {
        const closest = root.closest(selector);
        return closest ? [closest] : [];
      },
    }),
    { contentScript: true }
  );

  selectors.register(
    'scrollContainer',
    () => {
      const scrollable = { scroll: 1, auto: 1 };
      const query = (
        root: HTMLElement,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _selector: string
      ) => {
        let elm: HTMLElement | null = root;
        while (elm) {
          const overflowStyles = window.getComputedStyle(elm).overflow.split(/\s+/);
          if (overflowStyles.find((value) => value in scrollable)) {
            return elm;
          }
          elm = elm.parentElement;
        }
        return null;
      };
      return {
        query,
        queryAll: (root: HTMLElement, selector: string) => {
          const scrollParent = query(root, selector);
          return scrollParent ? [scrollParent] : [];
        },
      };
    },
    { contentScript: true }
  );
};
