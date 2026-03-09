// bundles/my-d20-bundle/data/classes/npc/expert.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'expert',
    name: 'Expert',
    description: 'A skilled professional with mastery in chosen fields.',
    hitDie: 6,

    classSkills: [
      // Experts can choose ANY 10 skills as class skills.
      // For MU‑D20, we treat all skills as class skills.
      '*'
    ],

    abilities: {
      1: ['expertise_focus']
    },

    setup: player => {
      Broadcast.sayAt(player, 'You take up the path of the Expert.');
      player.setMeta('class', 'expert');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });
    }
  };
};
