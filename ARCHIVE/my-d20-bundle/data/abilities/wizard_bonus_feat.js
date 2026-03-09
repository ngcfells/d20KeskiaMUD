'use strict';

module.exports = {
  id: 'wizard_bonus_feat',
  name: 'Wizard Bonus Feat',

  run: (state, player) => {
    player.say('Use: choosefeat <featname>');
  }
};
