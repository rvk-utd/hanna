import './Bling.js';
import './ShareButtons.js';

const { makeSprinkle, sprinkles } = window.Hanna;

const alias = () => {
  sprinkles.Bling!();
  sprinkles.ShareButtons!();
};

makeSprinkle({
  name: 'NewsHero',
  init: alias,
  refresh: alias,
  unmount: alias,
});
