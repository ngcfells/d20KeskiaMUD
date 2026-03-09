// bundles/my-d20-bundle/lib/classes/modern/prestige/menace_manual/modern_reptilian.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const reptilianPowers = require('../../../data/powers/modern_reptilian_powers');

  return {
    id: 'modern_reptilian',
    name: 'Reptilian (Menace Manual Prestige)',
    origin: 'modern',
    description: 'A hybridized character whose physiology has become reptilian, gaining scales, claws, venom, and predatory instincts.',

    hitDie: 10,
    maxLevel: 5,

    prerequisites: {
      skills: {
        athletics: 6,
        survival: 4,
        perception: 4
      },
      feats: ['toughness'],
      special: 'Must have undergone reptilian hybridization, genetic exposure, or supernatural transformation.'
    },

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'climb',
      'escape_artist',
      'intimidate',
      'jump',
      'knowledge_nature',
      'knowledge_technology',
      'listen',
      'move_silently',
      'perception',
      'profession',
      'sense_motive',
      'survival',
      'swim'
    ],

    abilities: {
      1: ['reptilian_path_feature_1', 'reptile_mutation_1'],
      2: ['reptilian_technique_1'],
      3: ['reptilian_path_feature_2'],
      4: ['reptilian_technique_2'],
      5: ['perfect_reptilian']
    },

    // Reptilian mutation subsystem (MU‑D20 normalized)
    powers: {
      mode: 'per_encounter',
      ability: 'constitution',
      powerList: reptilianPowers,

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
      scaled_brute: {
        id: 'scaled_brute',
        name: 'Scaled Brute Path',
        description: 'Hybrids who develop thick scales, natural armor, and powerful claws.'
      },
      venom_striker: {
        id: 'venom_striker',
        name: 'Venom Striker Path',
        description: 'Reptilians who develop venom glands, toxic bites, and paralytic attacks.'
      },
      cold_blooded_stalker: {
        id: 'cold_blooded_stalker',
        name: 'Cold‑Blooded Stalker Path',
        description: 'Stealthy hybrids who rely on silent movement, ambush tactics, and reptilian senses.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Your skin hardens and instincts sharpen as you become a Reptilian hybrid.');
      player.setMeta('class', 'modern_reptilian');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('reptilian_path')) {
        player.setMeta('reptilian_path', null);
      }

      // Reptile mutation progression
      if (!player.getMeta('reptile_mutation')) {
        player.setMeta('reptile_mutation', {
          bonus: 0
        });
      }

      // Reptilian techniques
      if (!player.getMeta('reptilian_technique')) {
        player.setMeta('reptilian_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
