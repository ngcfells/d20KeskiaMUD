// bundles/my-d20-bundle/lib/classes/modern/prestige/menace_manual/modern_monster_hunter.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const monsterHunterPowers = require('../../../data/powers/modern_monster_hunter_powers');

  return {
    id: 'modern_monster_hunter',
    name: 'Monster Hunter (Menace Manual Prestige)',
    origin: 'modern',
    description: 'A generalist supernatural hunter trained to track, identify, and eliminate a wide range of monstrous threats.',

    hitDie: 10,
    maxLevel: 5,

    prerequisites: {
      skills: {
        survival: 6,
        perception: 6,
        knowledge_arcana: 4,
        knowledge_nature: 4
      },
      feats: ['track'],
      special: 'Must have survived an encounter with a supernatural or monstrous creature.'
    },

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'climb',
      'escape_artist',
      'gather_information',
      'intimidate',
      'knowledge_arcana',
      'knowledge_nature',
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
      1: ['monster_hunter_path_feature_1', 'hunter_training_1'],
      2: ['monster_hunter_technique_1'],
      3: ['monster_hunter_path_feature_2'],
      4: ['monster_hunter_technique_2'],
      5: ['master_monster_hunter']
    },

    // Universal monster-hunting subsystem (MU‑D20 normalized)
    powers: {
      mode: 'per_encounter',
      ability: 'wisdom',
      powerList: monsterHunterPowers,

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
      tracker_generalist: {
        id: 'tracker_generalist',
        name: 'Tracker Generalist Path',
        description: 'Hunters who excel at tracking and identifying a wide variety of monsters.'
      },
      weakness_exploiter: {
        id: 'weakness_exploiter',
        name: 'Weakness Exploiter Path',
        description: 'Experts who study monster weaknesses and use specialized tactics to exploit them.'
      },
      tactical_slayer: {
        id: 'tactical_slayer',
        name: 'Tactical Slayer Path',
        description: 'Combat-focused hunters who use precision, preparation, and specialized gear.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Your senses sharpen as you take up the mantle of Monster Hunter.');
      player.setMeta('class', 'modern_monster_hunter');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('monster_hunter_path')) {
        player.setMeta('monster_hunter_path', null);
      }

      // Hunter training progression
      if (!player.getMeta('hunter_training')) {
        player.setMeta('hunter_training', {
          bonus: 0
        });
      }

      // Monster hunter techniques
      if (!player.getMeta('monster_hunter_technique')) {
        player.setMeta('monster_hunter_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
