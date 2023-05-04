import './Bling.js';

const { makeSprinkle, sprinkles } = window.Hanna;

const alias = () => {
  sprinkles.Bling!();
};

makeSprinkle({
  name: 'InfoHero',
  init: alias,
  refresh: alias,
  unmount: alias,
});
