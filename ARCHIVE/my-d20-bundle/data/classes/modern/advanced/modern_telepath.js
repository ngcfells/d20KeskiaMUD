// bundles/my-d20-bundle/lib/classes/modern/advanced/modern_telepath.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const telepathPowers = require('../../../data/powers/modern_telepath_powers');

  return {
    id: 'modern_telepath',
    name: 'Telepath (d20 Modern Advanced)',
    origin: 'modern',
    description: 'A psionic adept who manipulates thoughts, emotions, and mental energies.',

    hitDie: 6,
    maxLevel: 10,

    prerequisites: {
      skills: {
        concentration: 4,
        knowledge_psionics: 6
      }
    },

    classSkills: [
      'autohypnosis',
      'bluff',
      'concentration',
      'diplomacy',
      'gather_information',
      'intimidate',
      'knowledge_psionics',
      'knowledge_behavioral',
      'perception',
      'profession',
      'research',
      'sense_motive'
    ],

    abilities: {
      1: ['telepath_path_feature_1', 'psionic_training_1'],
      2: ['bonus_feat_1'],
      3: ['telepathic_technique_1'],
      4: ['psionic_training_2'],
      5: ['telepath_path_feature_2'],
      6: ['bonus_feat_2'],
      7: ['telepathic_technique_2'],
      8: ['psionic_training_3'],
      9: ['telepath_path_feature_3'],
      10: ['perfect_telepath']
    },

    // Psionic subsystem (MU‑D20 normalized)
    psionics: {
      mode: 'power_points',
      ability: 'charisma',
      powerList: telepathPowers,

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
      empath: {
        id: 'empath',
        name: 'Empath Path',
        description: 'Telepaths who manipulate emotions and read subtle mental states.'
      },
      dominator: {
        id: 'dominator',
        name: 'Dominator Path',
        description: 'Telepaths who impose their will, command minds, and override thoughts.'
      },
      clairvoyant: {
        id: 'clairvoyant',
        name: 'Clairvoyant Path',
        description: 'Psychics who perceive distant places, hidden truths, and future possibilities.'
      },
      mindshield: {
        id: 'mindshield',
        name: 'Mindshield Path',
        description: 'Telepaths who specialize in mental defense, resistance, and psychic fortification.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Your mind awakens to psionic potential as a Telepath.');
      player.setMeta('class', 'modern_telepath');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 3500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('telepath_path')) {
        player.setMeta('telepath_path', null);
      }

      // Psionic training
      if (!player.getMeta('psionic_training')) {
        player.setMeta('psionic_training', {
          bonus: 0
        });
      }

      // Telepathic techniques
      if (!player.getMeta('telepathic_technique')) {
        player.setMeta('telepathic_technique', {
          known: [],
          active: null
        });
      }

      // Power list
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
