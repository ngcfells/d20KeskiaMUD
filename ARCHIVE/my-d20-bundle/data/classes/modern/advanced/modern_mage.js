// bundles/my-d20-bundle/lib/classes/modern/advanced/modern_mage.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const arcaneSpells = require('../../../data/spells/modern_arcane_spells');

  return {
    id: 'modern_mage',
    name: 'Mage (d20 Modern Advanced)',
    origin: 'modern',
    description: 'An arcane spellcaster who studies magic, rituals, and supernatural forces in the modern world.',

    hitDie: 6,
    maxLevel: 10,

    prerequisites: {
      skills: {
        knowledge_arcana: 6,
        concentration: 4
      }
    },

    classSkills: [
      'concentration',
      'craft',
      'decipher_script',
      'diplomacy',
      'gather_information',
      'knowledge_arcana',
      'knowledge_religion',
      'knowledge_shadow',
      'linguistics',
      'perception',
      'profession',
      'research',
      'sense_motive',
      'spellcraft'
    ],

    abilities: {
      1: ['mage_path_feature_1', 'arcane_training_1'],
      2: ['bonus_feat_1'],
      3: ['arcane_technique_1'],
      4: ['arcane_training_2'],
      5: ['mage_path_feature_2'],
      6: ['bonus_feat_2'],
      7: ['arcane_technique_2'],
      8: ['arcane_training_3'],
      9: ['mage_path_feature_3'],
      10: ['perfect_mage']
    },

    // Spellcasting subsystem (MU‑D20 normalized)
    spellcasting: {
      mode: 'prepared',
      ability: 'intelligence',
      spellList: arcaneSpells,

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
      academic: {
        id: 'academic',
        name: 'Academic Path',
        description: 'Scholars of arcane theory, ritual magic, and magical research.'
      },
      battle_mage: {
        id: 'battle_mage',
        name: 'Battle Mage Path',
        description: 'Combat-focused mages who blend magic with battlefield tactics.'
      },
      ritualist: {
        id: 'ritualist',
        name: 'Ritualist Path',
        description: 'Masters of long-form magic, wards, bindings, and ceremonial spells.'
      },
      shadow_mage: {
        id: 'shadow_mage',
        name: 'Shadow Mage Path',
        description: 'Mages who specialize in Shadow magic and supernatural anomalies.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Arcane power flows through you as a Mage.');
      player.setMeta('class', 'modern_mage');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 3500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('mage_path')) {
        player.setMeta('mage_path', null);
      }

      // Arcane training
      if (!player.getMeta('arcane_training')) {
        player.setMeta('arcane_training', {
          bonus: 0
        });
      }

      // Arcane techniques
      if (!player.getMeta('arcane_technique')) {
        player.setMeta('arcane_technique', {
          known: [],
          active: null
        });
      }

      // Spellbook
      if (!player.getMeta('spellbook')) {
        player.setMeta('spellbook', {
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
