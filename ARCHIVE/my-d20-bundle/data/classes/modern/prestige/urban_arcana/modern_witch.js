// bundles/my-d20-bundle/lib/classes/modern/prestige/urban_arcana/modern_witch.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const witchSpells = require('../../../data/spells/modern_witch_spells');

  return {
    id: 'modern_witch',
    name: 'Witch (Urban Arcana Prestige)',
    origin: 'modern',
    description: 'A ritual caster who blends intuition, curses, blessings, and folk magic into a potent supernatural practice.',

    hitDie: 6,
    maxLevel: 5,

    prerequisites: {
      skills: {
        knowledge_arcana: 6,
        knowledge_nature: 6,
        concentration: 4
      },
      feats: ['studious', 'ritual_caster'],
      spellcasting: true // must be able to cast arcane or divine spells
    },

    classSkills: [
      'concentration',
      'craft',
      'decipher_script',
      'diplomacy',
      'gather_information',
      'heal',
      'intimidate',
      'knowledge_arcana',
      'knowledge_nature',
      'knowledge_shadow',
      'linguistics',
      'perception',
      'profession',
      'research',
      'sense_motive',
      'spellcraft'
    ],

    abilities: {
      1: ['witch_path_feature_1', 'ritual_magic_1'],
      2: ['witch_technique_1'],
      3: ['witch_path_feature_2'],
      4: ['witch_technique_2'],
      5: ['master_witch']
    },

    // Ritual magic subsystem (MU‑D20 normalized)
    spellcasting: {
      mode: 'prepared',
      ability: 'wisdom',
      spellList: witchSpells,

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
      hex_caster: {
        id: 'hex_caster',
        name: 'Hex Caster Path',
        description: 'Witches who specialize in curses, hexes, and debilitating magic.'
      },
      white_witch: {
        id: 'white_witch',
        name: 'White Witch Path',
        description: 'Practitioners of blessings, healing rites, and protective rituals.'
      },
      hedge_mystic: {
        id: 'hedge_mystic',
        name: 'Hedge Mystic Path',
        description: 'Intuitive casters who rely on instinct, omens, and folk magic traditions.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'The old ways whisper to you as you become a Witch.');
      player.setMeta('class', 'modern_witch');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('witch_path')) {
        player.setMeta('witch_path', null);
      }

      // Ritual magic progression
      if (!player.getMeta('ritual_magic')) {
        player.setMeta('ritual_magic', {
          bonus: 0
        });
      }

      // Witch techniques
      if (!player.getMeta('witch_technique')) {
        player.setMeta('witch_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
