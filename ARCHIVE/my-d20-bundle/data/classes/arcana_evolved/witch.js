// bundles/my-d20-bundle/data/classes/arcana_evolved/witch.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  // Hybrid spell list (Arcana Evolved + SRD + PF + 5E + homebrew)
  const witchSpellList = require('../../spelllists/witch');

  return {
    id: 'witch',
    name: 'Witch',
    description: 'A spellcaster who blends primal magic, charms, curses, and ritual lore, drawing power from ancient traditions.',
    hitDie: 6,

    classSkills: [
      'concentration',
      'craft',
      'diplomacy',
      'heal',
      'knowledge_arcana',
      'knowledge_nature',
      'knowledge_religion',
      'profession',
      'sense_motive',
      'spellcraft'
    ],

    abilities: {
      1: ['witch_tradition', 'familiar_bond', 'hex_1'],
      2: ['ritual_magic_1'],
      3: ['hex_2'],
      4: ['witch_lore_1'],
      5: ['ritual_magic_2'],
      6: ['hex_3'],
      7: ['witch_lore_2'],
      8: ['ritual_magic_3'],
      9: ['hex_4'],
      10: ['witch_lore_3'],
      11: ['ritual_magic_4'],
      12: ['hex_5'],
      13: ['witch_lore_4'],
      14: ['ritual_magic_5'],
      15: ['hex_6'],
      16: ['witch_lore_5'],
      17: ['ritual_magic_6'],
      18: ['hex_7'],
      19: ['witch_lore_6'],
      20: ['perfect_witchcraft']
    },

    spellcasting: {
      mode: 'prepared',
      ability: 'intelligence',

      // Witch uses a full-caster progression (Wizard-like)
      spellSlots: {
        1:  { 0: 3, 1: 1 },
        2:  { 0: 4, 1: 2 },
        3:  { 0: 4, 1: 2, 2: 1 },
        4:  { 0: 4, 1: 3, 2: 2 },
        5:  { 0: 4, 1: 3, 2: 2, 3: 1 },
        6:  { 0: 4, 1: 3, 2: 3, 3: 2 },
        7:  { 0: 4, 1: 4, 2: 3, 3: 2, 4: 1 },
        8:  { 0: 4, 1: 4, 2: 3, 3: 3, 4: 2 },
        9:  { 0: 4, 1: 4, 2: 4, 3: 3, 4: 2, 5: 1 },
        10: { 0: 4, 1: 4, 2: 4, 3: 3, 4: 3, 5: 2 },
        11: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 3, 5: 2, 6: 1 },
        12: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 3, 5: 3, 6: 2 },
        13: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 3, 6: 2, 7: 1 },
        14: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 3, 6: 3, 7: 2 },
        15: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 3, 7: 2, 8: 1 },
        16: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 3, 7: 3, 8: 2 },
        17: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 3, 8: 2, 9: 1 },
        18: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 3, 8: 3, 9: 2 },
        19: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 3, 9: 3 },
        20: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4 }
      },

      spellList: witchSpellList
    },

    setup: player => {
      Broadcast.sayAt(player, 'You bind yourself to ancient traditions and hidden lore as a Witch.');
      player.setMeta('class', 'witch');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Prepared spells
      if (!player.getMeta('preparedSpells')) {
        player.setMeta('preparedSpells', {});
      }

      // Witch tradition (Green, Black, White, Rune, etc.)
      if (!player.getMeta('witch_tradition')) {
        player.setMeta('witch_tradition', null);
      }

      // Familiar bond
      if (!player.getMeta('familiar')) {
        player.setMeta('familiar', {
          type: null,
          bonuses: {}
        });
      }

      // Hexes known
      if (!player.getMeta('witch_hexes')) {
        player.setMeta('witch_hexes', {
          known: [],
          active: [],
          passive: []
        });
      }

      // Ritual magic
      if (!player.getMeta('ritual_magic')) {
        player.setMeta('ritual_magic', {
          known: [],
          bonuses: {}
        });
      }
    }
  };
};

