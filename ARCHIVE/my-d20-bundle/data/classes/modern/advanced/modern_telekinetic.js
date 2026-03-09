// bundles/my-d20-bundle/lib/classes/modern/advanced/modern_telekinetic.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const telekineticPowers = require('../../../data/powers/modern_telekinetic_powers');

  return {
    id: 'modern_telekinetic',
    name: 'Telekinetic (d20 Modern Advanced)',
    origin: 'modern',
    description: 'A psionic adept who manipulates physical forces, kinetic energy, and telekinetic power.',

    hitDie: 8,
    maxLevel: 10,

    prerequisites: {
      skills: {
        concentration: 4,
        knowledge_psionics: 6
      }
    },

    classSkills: [
      'autohypnosis',
      'athletics',
      'balance',
      'concentration',
      'escape_artist',
      'intimidate',
      'jump',
      'knowledge_psionics',
      'perception',
      'profession',
      'research',
      'sense_motive',
      'tumble'
    ],

    abilities: {
      1: ['telekinetic_path_feature_1', 'psionic_training_1'],
      2: ['bonus_feat_1'],
      3: ['kinetic_technique_1'],
      4: ['psionic_training_2'],
      5: ['telekinetic_path_feature_2'],
      6: ['bonus_feat_2'],
      7: ['kinetic_technique_2'],
      8: ['psionic_training_3'],
      9: ['telekinetic_path_feature_3'],
      10: ['perfect_telekinetic']
    },

    // Psionic subsystem (MU‑D20 normalized)
    psionics: {
      mode: 'power_points',
      ability: 'wisdom',
      powerList: telekineticPowers,

      powerPoints: {
        1: 2,
        2: 4,
        3: 7,
        4: 11,
        5: 16,
        6: 22,
        7: 29,
        8: 37,
        9: 46,
        10: 56
      }
    },

    // d20 Modern "talent trees" → MU‑D20 PATHS
    paths: {
      force_master: {
        id: 'force_master',
        name: 'Force Master Path',
        description: 'Telekinetics who manipulate raw force, push, pull, and kinetic projection.'
      },
      barrier_savant: {
        id: 'barrier_savant',
        name: 'Barrier Savant Path',
        description: 'Experts in telekinetic shields, walls, and protective force constructs.'
      },
      kinetic_blade: {
        id: 'kinetic_blade',
        name: 'Kinetic Blade Path',
        description: 'Telekinetics who shape force into cutting edges and melee constructs.'
      },
      gravity_bender: {
        id: 'gravity_bender',
        name: 'Gravity Bender Path',
        description: 'Psionics who manipulate weight, inertia, and gravitational distortion.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Physical forces bend to your will as a Telekinetic.');
      player.setMeta('class', 'modern_telekinetic');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 3500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('telekinetic_path')) {
        player.setMeta('telekinetic_path', null);
      }

      // Psionic training
      if (!player.getMeta('psionic_training')) {
        player.setMeta('psionic_training', {
          bonus: 0
        });
      }

      // Kinetic techniques
      if (!player.getMeta('kinetic_technique')) {
        player.setMeta('kinetic_technique', {
          known: [],
          active: null
        });
      }

      // Powers known
      if (!player.getMeta('powers_known')) {
        player.setMeta('powers_known', []);
      }

      // Bonus feats
      if (!player.getMeta('bonus_feats')) {
        player.setMeta('bonus_feats', {
          count: 0
        });
      }
    }
  };
};
