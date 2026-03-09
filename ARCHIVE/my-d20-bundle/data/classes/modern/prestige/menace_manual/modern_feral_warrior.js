// bundles/my-d20-bundle/lib/classes/modern/prestige/menace_manual/modern_feral_warrior.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const feralPowers = require('../../../data/powers/modern_feral_powers');

  return {
    id: 'modern_feral_warrior',
    name: 'Feral Warrior (Menace Manual Prestige)',
    origin: 'modern',
    description: 'A bestial combatant whose body has begun to transform, gaining claws, senses, and feral resilience.',

    hitDie: 10,
    maxLevel: 5,

    prerequisites: {
      skills: {
        athletics: 6,
        survival: 4,
        perception: 4
      },
      feats: ['toughness'],
      special: 'Must have survived a feral mutation event or exposure to a lycanthropic agent.'
    },

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'climb',
      'escape_artist',
      'intimidate',
      'jump',
      'listen',
      'move_silently',
      'perception',
      'profession',
      'sense_motive',
      'survival',
      'swim'
    ],

    abilities: {
      1: ['feral_path_feature_1', 'feral_mutation_1'],
      2: ['feral_technique_1'],
      3: ['feral_path_feature_2'],
      4: ['feral_technique_2'],
      5: ['perfect_feral_warrior']
    },

    // Feral mutation subsystem (MU‑D20 normalized)
    powers: {
      mode: 'per_encounter',
      ability: 'constitution',
      powerList: feralPowers,

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
      clawed_brute: {
        id: 'clawed_brute',
        name: 'Clawed Brute Path',
        description: 'Feral warriors who grow natural weapons and excel in brutal melee combat.'
      },
      primal_stalker: {
        id: 'primal_stalker',
        name: 'Primal Stalker Path',
        description: 'Stealthy hunters who rely on heightened senses and predatory instincts.'
      },
      beast_heart: {
        id: 'beast_heart',
        name: 'Beast Heart Path',
        description: 'Mutants who embrace their transformation, gaining resilience and feral endurance.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Your muscles tighten and instincts sharpen as you become a Feral Warrior.');
      player.setMeta('class', 'modern_feral_warrior');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('feral_path')) {
        player.setMeta('feral_path', null);
      }

      // Feral mutation progression
      if (!player.getMeta('feral_mutation')) {
        player.setMeta('feral_mutation', {
          bonus: 0
        });
      }

      // Feral techniques
      if (!player.getMeta('feral_technique')) {
        player.setMeta('feral_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
