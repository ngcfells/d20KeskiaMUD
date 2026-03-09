/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/commands/general/rest.js
 */
'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  usage: 'rest',
  aliases: ['sit', 'sleep'],
  command: state => (args, player) => {
    if (player.hasEffect('resting')) {
      player.removeEffect('resting');
      return B.sayAt(player, "You stand up and ready yourself for action.");
    }

    if (player.isInCombat()) {
      return B.sayAt(player, "You can't rest in the middle of a fight!");
    }

    // Apply the resting effect (doubles recovery in stamina-engine.js)
    const restingEffect = state.EffectFactory.create('resting', {
      config: { name: 'Resting' }
    });

    if (player.addEffect(restingEffect)) {
      B.sayAt(player, "You sit down and begin to rest, recovering your strength.");
    }
  }
};
