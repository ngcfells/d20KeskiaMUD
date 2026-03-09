// bundles/my-d20-bundle/lib/classes/modern/prestige/menace_manual/modern_shadow_chaser_elite.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const shadowChaserPowers = require('../../../data/powers/modern_shadow_chaser_elite_powers');

  return {
    id: 'modern_shadow_chaser_elite',
    name: 'Shadow Chaser Elite (Menace Manual Prestige)',
    origin: 'modern',
    description: 'A supernatural investigator and defender trained to detect, resist, and combat creatures of the Shadow.',

    hitDie: 8,
    maxLevel: 5,

    prerequisites: {
      skills: {
        perception: 6,
        sense_motive: 6,
        knowledge_shadow: 4
      },
      feats: ['alertness'],
      special: 'Must have confronted or survived an encounter with a creature of the Shadow.'
    },

    classSkills: [
      'acrobatics',
      'athletics',
      'bluff',
      'computers',
      'concentration',
      'diplomacy',
      'escape_artist',
      'gather_information',
      'intimidate',
      'knowledge_arcana',
      'knowledge_shadow',
      'listen',
      'move_silently',
      'perception',
      'profession',
      'research',
      'search',
      'sense_motive',
      'survival'
    ],

    abilities: {
      1: ['shadow_chaser_path_feature_1', 'shadow_training_1'],
      2: ['shadow_chaser_technique_1'],
      3: ['shadow_chaser_path_feature_2'],
      4: ['shadow_chaser_technique_2'],
      5: ['master_shadow_chaser_elite']
    },

    // Shadow-response subsystem (MU‑D20 normalized)
    powers: {
      mode: 'per_encounter',
      ability: 'wisdom',
      powerList: shadowChaserPowers,

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
      shadow_tracker: {
        id: 'shadow_tracker',
        name: 'Shadow Tracker Path',
        description: 'Hunters who specialize in detecting, tracking, and identifying creatures of the Shadow.'
      },
      warded_defender: {
        id: 'warded_defender',
        name: 'Warded Defender Path',
        description: 'Defenders trained to resist supernatural fear, illusions, and corruptive influence.'
      },
      shadow_tactician: {
        id: 'shadow_tactician',
        name: 'Shadow Tactician Path',
        description: 'Operatives who excel in counter‑Shadow tactics, ambush disruption, and supernatural response.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'The shadows recoil as you rise as a Shadow Chaser Elite.');
      player.setMeta('class', 'modern_shadow_chaser_elite');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('shadow_chaser_path')) {
        player.setMeta('shadow_chaser_path', null);
      }

      // Shadow training progression
      if (!player.getMeta('shadow_training')) {
        player.setMeta('shadow_training', {
          bonus: 0
        });
      }

      // Shadow chaser techniques
      if (!player.getMeta('shadow_chaser_technique')) {
        player.setMeta('shadow_chaser_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
