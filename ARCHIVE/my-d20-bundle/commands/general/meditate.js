/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/general/meditate.js
 */
'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  usage: 'meditate',
  command: state => (args, player) => {
    if (player.hasEffect('meditating')) {
      player.removeEffect('meditating');
      return B.sayAt(player, "You open your eyes, the world feeling slightly sharper.");
    }

    if (player.isInCombat()) {
      return B.sayAt(player, "Your mind is too clouded by the heat of battle to meditate!");
    }

    // d20 Skill Check (Wisdom/Concentration)
    const wisdom = player.getAttribute('wisdom') || 10;
    const wisdomMod = Math.floor((wisdom - 10) / 2);
    const roll = Math.floor(Math.random() * 20) + 1;
    const dc = 15;

    B.sayAt(player, "You close your eyes and begin to center your thoughts...");

    const success = (roll + wisdomMod) >= dc;

    const meditatingEffect = state.EffectFactory.create('meditating', {
      config: { name: 'Meditating' },
      state: { success }
    });

    if (player.addEffect(meditatingEffect)) {
      if (success) {
        B.sayAt(player, "<cyan>You find a point of perfect stillness within yourself.</cyan>");
      } else {
        B.sayAt(player, "<gray>Distractions dance at the edge of your mind, but you persist.</gray>");
      }
    }
  }
};
