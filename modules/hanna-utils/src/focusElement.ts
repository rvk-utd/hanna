export const focusElement = (target: string | HTMLElement): NodeJS.Timeout =>
  setTimeout(() => {
    const elm =
      typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
    if (elm && 'focus' in elm) {
      elm.focus();
    }
  }, 0);
