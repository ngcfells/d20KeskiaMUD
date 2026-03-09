// bundles/my-d20-bundle/lib/classes/modern/prestige/urban_arcana/modern_occultist.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const occultSpells = require('../../../data/spells/modern_occult_spells');

  return {
    id: 'modern_occultist',
    name: 'Occultist (Urban Arcana Prestige)',
    origin: 'modern',
    description: 'A ritualist and scholar of forbidden lore who wields esoteric magic and uncovers hidden truths.',

    hitDie: 6,
    maxLevel: 5,

    prerequisites: {
      skills: {
        knowledge_arcana: 6,
        knowledge_shadow: 6,
        research: 6
      },
      feats: ['studious'],
      spellcasting: true // must be able to cast arcane or divine spells
    },

    classSkills: [
      'concentration',
      'craft',
      'decipher_script',
      'diplomacy',
      'gather_information',
      'intimidate',
      'knowledge_arcana',
      'knowledge_shadow',
      'knowledge_religion',
      'linguistics',
      'perception',
      'profession',
      'research',
      'sense_motive',
      'spellcraft'
    ],

    abilities: {
      1: ['occult_path_feature_1', 'forbidden_lore_1'],
      2: ['occult_technique_1'],
      3: ['occult_path_feature_2'],
      4: ['occult_technique_2'],
      5: ['master_occultist']
    },

    // Spellcasting subsystem (MU‑D20 normalized)
    spellcasting: {
      mode: 'prepared',
      ability: 'intelligence',
      spellList: occultSpells,

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
      ritualist: {
        id: 'ritualist',
        name: 'Ritualist Path',
        description: 'Masters of long-form magic, ceremonial rites, and occult invocations.'
      },
      lorekeeper: {
        id: 'lorekeeper',
        name: 'Lorekeeper Path',
        description: 'Scholars who uncover forbidden knowledge and wield insight as a weapon.'
      },
      seer: {
        id: 'seer',
        name: 'Seer Path',
        description: 'Mystics who perceive hidden truths, omens, and supernatural patterns.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Ancient secrets whisper to you as you become an Occultist.');
      player.setMeta('class', 'modern_occultist');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('occult_path')) {
        player.setMeta('occult_path', null);
      }

      // Forbidden lore progression
      if (!player.getMeta('forbidden_lore')) {
        player.setMeta('forbidden_lore', {
          bonus: 0
        });
      }

      // Occult techniques
      if (!player.getMeta('occult_technique')) {
        player.setMeta('occult_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
