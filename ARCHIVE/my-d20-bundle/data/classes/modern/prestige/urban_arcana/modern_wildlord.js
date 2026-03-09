// bundles/my-d20-bundle/lib/classes/modern/prestige/urban_arcana/modern_wildlord.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const wildlordPowers = require('../../../data/powers/modern_wildlord_powers');

  return {
    id: 'modern_wildlord',
    name: 'Wildlord (Urban Arcana Prestige)',
    origin: 'modern',
    description: 'A primal champion who commands beasts, channels wild magic, and embodies the untamed power of nature.',

    hitDie: 8,
    maxLevel: 5,

    prerequisites: {
      skills: {
        survival: 6,
        handle_animal: 6,
        knowledge_nature: 4
      },
      feats: ['animal_affinity'],
      special: 'Must have befriended or calmed a hostile animal through nonviolent means.'
    },

    classSkills: [
      'athletics',
      'balance',
      'climb',
      'concentration',
      'handle_animal',
      'heal',
      'intimidate',
      'jump',
      'knowledge_nature',
      'listen',
      'perception',
      'profession',
      'ride',
      'sense_motive',
      'survival',
      'swim'
    ],

    abilities: {
      1: ['wildlord_path_feature_1', 'primal_bond_1'],
      2: ['wildlord_technique_1'],
      3: ['wildlord_path_feature_2'],
      4: ['wildlord_technique_2'],
      5: ['master_wildlord']
    },

    // Primal magic subsystem (MU‑D20 normalized)
    powers: {
      mode: 'per_day',
      ability: 'wisdom',
      powerList: wildlordPowers,

      usesPerDay: {
        1: 1,
        2: 2,
        3: 2,
        4: 3,
        5: 3
      }
    },

    // Prestige-class talent trees → MU‑D20 PATHS
    paths: {
      beastmaster: {
        id: 'beastmaster',
        name: 'Beastmaster Path',
        description: 'Wildlords who command, befriend, and fight alongside powerful animals.'
      },
      feral_avatar: {
        id: 'feral_avatar',
        name: 'Feral Avatar Path',
        description: 'Primal warriors who channel animalistic strength, speed, and resilience.'
      },
      nature_mystic: {
        id: 'nature_mystic',
        name: 'Nature Mystic Path',
        description: 'Mystics who wield wild magic, commune with spirits, and shape natural forces.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'The wild answers your call as you become a Wildlord.');
      player.setMeta('class', 'modern_wildlord');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('wildlord_path')) {
        player.setMeta('wildlord_path', null);
      }

      // Primal bond progression
      if (!player.getMeta('primal_bond')) {
        player.setMeta('primal_bond', {
          bonus: 0
        });
      }

      // Wildlord techniques
      if (!player.getMeta('wildlord_technique')) {
        player.setMeta('wildlord_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
