// bundles/my-d20-bundle/data/classes/npc/commoner.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'commoner',
    name: 'Commoner',
    description: 'An untrained laborer or peasant with minimal combat ability.',
    hitDie: 4,

    classSkills: [
      'climb',
      'craft',
      'handle_animal',
      'jump',
      'listen',
      'profession',
      'ride',
      'spot',
      'swim'
    ],

    abilities: {
      // Commoners have no special abilities
    },

    setup: player => {
      Broadcast.sayAt(player, 'You take up the humble life of a Commoner.');
      player.setMeta('class', 'commoner');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });
    }
  };
};
