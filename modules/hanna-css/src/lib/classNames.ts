/**
 * Collection of selectors/class-name states that the ´<html/>´ element can take.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-css#htmlcl
 */
export const htmlCl = {
  /** Indicates that the page has just been routed to, and that JavaScript is
   * running.
   *
   * Use this to suppress flicker of unstyled/unscripted content in your
   * server-rendered HTML, while you "progressively enhance" them after useEffect.
   *
   * @see https://www.npmjs.com/package/@reykjavik/hanna-css#htmlcl
   */
  beforeSprinkling: '.before-sprinkling',

  /* eslint-disable deprecation/deprecation */

  /**
   * @deprecated  Use `'.menu-is-active'` instead.  (Will be removed in v0.5)
   *
   * Indicates that a "mobile page menu" toggling behavior is enabled/initialized
   */
  menuIsActive: '.menu-is-active',
  /**
   * @deprecated  Use `'.menu-is-open'` instead.  (Will be removed in v0.5)
   *
   * Indicates that a "mobile page menu" is active and open
   */
  menuIsOpen: '.menu-is-open',
  /**
   * @deprecated  Use `'.menu-is-closed'` instead.  (Will be removed in v0.5)
   *
   * Indicates that a "mobile page menu" is active but closed
   */
  menuIsClosed: '.menu-is-closed',

  /* eslint-enable deprecation/deprecation */
} as const;
