/**
 * Collection of selectors/class-name states that the ´<html/>´ element can take.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#htmlcl
 */
export const htmlCl = {
  /** Indicates that a "mobile page menu" toggling behavior is enabled/initialized */
  menuIsActive: 'html.menu-is-active',
  /** Indicates that a "mobile page menu" is active and open */
  menuIsOpen: 'html.menu-is-open',
  /** Indicates that a "mobile page menu" is active but closed */
  menuIsClosed: 'html.menu-is-closed',
  /** Indicates that the page has just been routed to, and that JavaScript is
   * running.
   *
   * Use this to suppress flicker of unstyled/unscripted content in your
   * server-rendered HTML, while you "progressively enhance" them after useEffect.
   *
   * @see https://www.npmjs.com/package/@reykjavik/hanna-css#htmlcl
   */
  beforeSprinkling: 'html.before-sprinkling',
} as const;
