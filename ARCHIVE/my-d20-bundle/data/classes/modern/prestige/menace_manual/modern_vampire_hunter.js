// bundles/my-d20-bundle/lib/classes/modern/prestige/menace_manual/modern_vampire_hunter.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const vampireHunterPowers = require('../../../data/powers/modern_vampire_hunter_powers');

  return {
    id: 'modern_vampire_hunter',
    name: 'Vampire Hunter (Menace Manual Prestige)',
    origin: 'modern',
    description: 'A specialized slayer trained to track, fight, and destroy vampires using knowledge, tactics, and supernatural defenses.',

    hitDie: 10,
    maxLevel: 5,

    prerequisites: {
      skills: {
        survival: 6,
        perception: 6,
        knowledge_religion: 4
      },
      feats: ['track'],
      special: 'Must have survived an encounter with a vampire or vampiric creature.'
    },

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'climb',
      'escape_artist',
      'gather_information',
      'intimidate',
      'knowledge_religion',
      'knowledge_shadow',
      'listen',
      'move_silently',
      'perception',
      'profession',
      'search',
      'sense_motive',
      'survival',
      'tumble'
    ],

    abilities: {
      1: ['vampire_hunter_path_feature_1', 'anti_vampire_training_1'],
      2: ['vampire_hunter_technique_1'],
      3: ['vampire_hunter_path_feature_2'],
      4: ['vampire_hunter_technique_2'],
      5: ['master_vampire_hunter']
    },

    // Anti‑vampire subsystem (MU‑D20 normalized)
    powers: {
      mode: 'per_encounter',
      ability: 'wisdom',
      powerList: vampireHunterPowers,

      usesPerEncounter: {
        1: 1,
        2: 1,
        3: 2,
        4: 2,
        5: 3
      }
    },

    // Prestige-class talent trees → MU‑D20 PATHS
    paths: {
      slayer: {
        id: 'slayer',
        name: 'Slayer Path',
        description: 'Hunters who excel in direct combat against vampires, exploiting their weaknesses.'
      },
      warder: {
        id: 'warder',
        name: 'Warder Path',
        description: 'Defenders who specialize in resisting charm, drain, and supernatural domination.'
      },
      tracker: {
        id: 'tracker',
        name: 'Tracker Path',
        description: 'Experts in locating, identifying, and pursuing undead across urban and rural environments.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Your resolve hardens as you take up the mantle of Vampire Hunter.');
      player.setMeta('class', 'modern_vampire_hunter');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('vampire_hunter_path')) {
        player.setMeta('vampire_hunter_path', null);
      }

      // Anti‑vampire training progression
      if (!player.getMeta('anti_vampire_training')) {
        player.setMeta('anti_vampire_training', {
          bonus: 0
        });
      }

      // Vampire hunter techniques
      if (!player.getMeta('vampire_hunter_technique')) {
        player.setMeta('vampire_hunter_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
