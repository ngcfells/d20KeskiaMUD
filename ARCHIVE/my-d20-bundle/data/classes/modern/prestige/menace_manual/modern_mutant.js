// bundles/my-d20-bundle/lib/classes/modern/prestige/menace_manual/modern_mutant.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const mutantPowers = require('../../../data/powers/modern_mutant_powers');

  return {
    id: 'modern_mutant',
    name: 'Mutant (Menace Manual Prestige)',
    origin: 'modern',
    description: 'A character whose DNA has been altered, granting extraordinary and often unstable powers.',

    hitDie: 8,
    maxLevel: 5,

    prerequisites: {
      skills: {
        concentration: 4,
        perception: 4,
        survival: 4
      },
      feats: ['toughness'],
      special: 'Must have undergone a mutation event, genetic exposure, or biological anomaly.'
    },

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'climb',
      'concentration',
      'escape_artist',
      'intimidate',
      'jump',
      'knowledge_nature',
      'knowledge_technology',
      'perception',
      'profession',
      'sense_motive',
      'survival',
      'swim'
    ],

    abilities: {
      1: ['mutant_path_feature_1', 'mutation_surge_1'],
      2: ['mutant_technique_1'],
      3: ['mutant_path_feature_2'],
      4: ['mutant_technique_2'],
      5: ['perfect_mutant']
    },

    // Mutation subsystem (MU‑D20 normalized)
    powers: {
      mode: 'per_encounter',
      ability: 'constitution',
      powerList: mutantPowers,

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
      physical_mutant: {
        id: 'physical_mutant',
        name: 'Physical Mutant Path',
        description: 'Mutants who develop claws, armor plating, enhanced strength, or other bodily changes.'
      },
      mental_mutant: {
        id: 'mental_mutant',
        name: 'Mental Mutant Path',
        description: 'Mutants who manifest psionic‑like abilities, heightened senses, or cognitive anomalies.'
      },
      aberrant_mutant: {
        id: 'aberrant_mutant',
        name: 'Aberrant Mutant Path',
        description: 'Mutants whose transformations defy biology, granting bizarre and unpredictable powers.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Your body twists with newfound power as you become a Mutant.');
      player.setMeta('class', 'modern_mutant');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('mutant_path')) {
        player.setMeta('mutant_path', null);
      }

      // Mutation surge progression
      if (!player.getMeta('mutation_surge')) {
        player.setMeta('mutation_surge', {
          bonus: 0
        });
      }

      // Mutant techniques
      if (!player.getMeta('mutant_technique')) {
        player.setMeta('mutant_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
