// bundles/my-d20-bundle/lib/classes/modern/advanced/modern_acolyte.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const divineSpells = require('../../../data/spells/modern_divine_spells');

  return {
    id: 'modern_acolyte',
    name: 'Acolyte (d20 Modern Advanced)',
    origin: 'modern',
    description: 'A divine spellcaster who channels spiritual power for healing, protection, and supernatural insight.',

    hitDie: 8,
    maxLevel: 10,

    prerequisites: {
      skills: {
        knowledge_religion: 6,
        concentration: 4
      }
    },

    classSkills: [
      'concentration',
      'craft',
      'diplomacy',
      'gather_information',
      'heal',
      'knowledge_arcana',
      'knowledge_religion',
      'knowledge_shadow',
      'linguistics',
      'perception',
      'profession',
      'research',
      'sense_motive',
      'spellcraft',
      'treat_injury'
    ],

    abilities: {
      1: ['acolyte_path_feature_1', 'divine_training_1'],
      2: ['bonus_feat_1'],
      3: ['divine_technique_1'],
      4: ['divine_training_2'],
      5: ['acolyte_path_feature_2'],
      6: ['bonus_feat_2'],
      7: ['divine_technique_2'],
      8: ['divine_training_3'],
      9: ['acolyte_path_feature_3'],
      10: ['perfect_acolyte']
    },

    // Spellcasting subsystem (MU‑D20 normalized)
    spellcasting: {
      mode: 'prepared',
      ability: 'wisdom',
      spellList: divineSpells,

      spellSlots: {
        1: { 1: 1 },
        2: { 1: 2 },
        3: { 1: 2, 2: 1 },
        4: { 1: 3, 2: 1 },
        5: { 1: 3, 2: 2 },
        6: { 1: 3, 2: 2, 3: 1 },
        7: { 1: 4, 2: 2, 3: 1 },
        8: { 1: 4, 2: 3, 3: 2 },
        9: { 1: 4, 2: 3, 3: 2, 4: 1 },
        10: { 1: 4, 2: 3, 3: 3, 4: 2 }
      }
    },

    // d20 Modern "talent trees" → MU‑D20 PATHS
    paths: {
      healer: {
        id: 'healer',
        name: 'Healer Path',
        description: 'Acolytes who focus on restoration, curing ailments, and sustaining allies.'
      },
      protector: {
        id: 'protector',
        name: 'Protector Path',
        description: 'Divine guardians who specialize in wards, shields, and defensive blessings.'
      },
      visionary: {
        id: 'visionary',
        name: 'Visionary Path',
        description: 'Mystics who receive visions, omens, and supernatural insight.'
      },
      exorcist: {
        id: 'exorcist',
        name: 'Exorcist Path',
        description: 'Acolytes who banish, resist, and purify supernatural corruption.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Divine power answers your call as an Acolyte.');
      player.setMeta('class', 'modern_acolyte');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 3500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('acolyte_path')) {
        player.setMeta('acolyte_path', null);
      }

      // Divine training
      if (!player.getMeta('divine_training')) {
        player.setMeta('divine_training', {
          bonus: 0
        });
      }

      // Divine techniques
      if (!player.getMeta('divine_technique')) {
        player.setMeta('divine_technique', {
          known: [],
          active: null
        });
      }

      // Prayerbook (divine prepared spells)
      if (!player.getMeta('prayerbook')) {
        player.setMeta('prayerbook', {
          known: [],
          prepared: []
        });
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
