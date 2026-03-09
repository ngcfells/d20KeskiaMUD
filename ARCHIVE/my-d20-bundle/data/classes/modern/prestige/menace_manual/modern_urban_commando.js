// bundles/my-d20-bundle/lib/classes/modern/prestige/menace_manual/modern_urban_commando.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const commandoPowers = require('../../../data/powers/modern_urban_commando_powers');

  return {
    id: 'modern_urban_commando',
    name: 'Urban Commando (Menace Manual Prestige)',
    origin: 'modern',
    description: 'A heavy tactical operator specializing in urban warfare, breaching, CQB, and high-intensity operations in dense environments.',

    hitDie: 10,
    maxLevel: 5,

    prerequisites: {
      skills: {
        athletics: 6,
        perception: 6,
        survival: 4
      },
      feats: ['point_blank_shot', 'power_attack'],
      special: 'Must have participated in a tactical operation within an urban environment.'
    },

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'climb',
      'diplomacy',
      'escape_artist',
      'gather_information',
      'intimidate',
      'jump',
      'knowledge_tactics',
      'listen',
      'move_silently',
      'perception',
      'profession',
      'search',
      'sense_motive',
      'survival',
      'swim'
    ],

    abilities: {
      1: ['commando_path_feature_1', 'urban_combat_training_1'],
      2: ['commando_technique_1'],
      3: ['commando_path_feature_2'],
      4: ['commando_technique_2'],
      5: ['master_urban_commando']
    },

    // Urban combat subsystem (MU‑D20 normalized)
    powers: {
      mode: 'per_encounter',
      ability: 'strength',
      powerList: commandoPowers,

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
      breacher: {
        id: 'breacher',
        name: 'Breacher Path',
        description: 'Commandos who excel at forced entry, door breaching, and initiating CQB engagements.'
      },
      cqb_specialist: {
        id: 'cqb_specialist',
        name: 'CQB Specialist Path',
        description: 'Operators trained for close-quarters battle, room clearing, and confined-space combat.'
      },
      urban_tactician: {
        id: 'urban_tactician',
        name: 'Urban Tactician Path',
        description: 'Experts in movement, cover usage, vertical combat, and tactical positioning in dense environments.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Your stance steadies and your instincts sharpen as you become an Urban Commando.');
      player.setMeta('class', 'modern_urban_commando');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('commando_path')) {
        player.setMeta('commando_path', null);
      }

      // Urban combat training progression
      if (!player.getMeta('urban_combat_training')) {
        player.setMeta('urban_combat_training', {
          bonus: 0
        });
      }

      // Commando techniques
      if (!player.getMeta('commando_technique')) {
        player.setMeta('commando_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
