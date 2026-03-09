// bundles/my-d20-bundle/lib/classes/modern/prestige/urban_arcana/modern_glamourist.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const glamourSpells = require('../../../data/spells/modern_glamour_spells');

  return {
    id: 'modern_glamourist',
    name: 'Glamourist (Urban Arcana Prestige)',
    origin: 'modern',
    description: 'A supernatural manipulator of appearance, charm, and illusion who bends perception and influences emotions.',

    hitDie: 6,
    maxLevel: 5,

    prerequisites: {
      skills: {
        bluff: 6,
        disguise: 6,
        diplomacy: 4
      },
      feats: ['charismatic'],
      spellcasting: true // must be able to cast arcane spells
    },

    classSkills: [
      'bluff',
      'concentration',
      'craft',
      'decipher_script',
      'diplomacy',
      'disguise',
      'gather_information',
      'intimidate',
      'knowledge_arcana',
      'knowledge_shadow',
      'linguistics',
      'perception',
      'profession',
      'research',
      'sense_motive',
      'spellcraft'
    ],

    abilities: {
      1: ['glamour_path_feature_1', 'glamour_training_1'],
      2: ['glamour_technique_1'],
      3: ['glamour_path_feature_2'],
      4: ['glamour_technique_2'],
      5: ['perfect_glamourist']
    },

    // Spellcasting subsystem (MU‑D20 normalized)
    spellcasting: {
      mode: 'prepared',
      ability: 'charisma',
      spellList: glamourSpells,

      spellSlots: {
        1: { 1: 1 },
        2: { 1: 2 },
        3: { 1: 2, 2: 1 },
        4: { 1: 3, 2: 1 },
        5: { 1: 3, 2: 2 }
      }
    },

    // Prestige-class talent trees → MU‑D20 PATHS
    paths: {
      enchanter: {
        id: 'enchanter',
        name: 'Enchanter Path',
        description: 'Masters of charm, persuasion, and emotional influence.'
      },
      illusion_weaver: {
        id: 'illusion_weaver',
        name: 'Illusion Weaver Path',
        description: 'Casters who reshape appearance, create phantasms, and manipulate perception.'
      },
      fae_touched: {
        id: 'fae_touched',
        name: 'Fae‑Touched Path',
        description: 'Glamourists with supernatural allure, beguilement, and otherworldly presence.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Your presence shimmers with supernatural allure as you become a Glamourist.');
      player.setMeta('class', 'modern_glamourist');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('glamour_path')) {
        player.setMeta('glamour_path', null);
      }

      // Glamour training
      if (!player.getMeta('glamour_training')) {
        player.setMeta('glamour_training', {
          bonus: 0
        });
      }

      // Glamour techniques
      if (!player.getMeta('glamour_technique')) {
        player.setMeta('glamour_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
