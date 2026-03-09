// bundles/my-d20-bundle/data/classes/pc/savant.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const savantSpellList = require('../../spelllists/savant');

  return {
    id: 'savant',
    name: 'Savant',
    description: 'A master of all trades who systematically masters mundane skills before unlocking arcane and divine secrets.',
    hitDie: 8,

    classSkills: [
      'appraise', 'balance', 'bluff', 'climb', 'concentration', 'craft', 'decipher_script',
      'diplomacy', 'disable_device', 'disguise', 'escape_artist', 'forgery', 'gather_information',
      'handle_animal', 'heal', 'hide', 'intimidate', 'jump', 'knowledge_arcana', 'knowledge_architecture',
      'knowledge_dungeoneering', 'knowledge_geography', 'knowledge_history', 'knowledge_local',
      'knowledge_nature', 'knowledge_nobility', 'knowledge_religion', 'knowledge_planes', 'listen',
      'move_silently', 'open_lock', 'perform', 'profession', 'ride', 'search', 'sense_motive',
      'sleight_of_hand', 'spellcraft', 'spot', 'survival', 'swim', 'tumble', 'use_magic_device', 'use_rope'
    ],

    abilities: {
      1: ['skill_focus_savant', 'trapfinding'],
      2: ['academic_lore'],
      5: ['arcane_lore_i'],
      7: ['skill_focus_savant_2'],
      10: ['divine_lore_i'],
      15: ['arcane_lore_ii'],
      20: ['divine_lore_ii']
    },

    spellcasting: {
      mode: 'prepared',
      ability: 'intelligence', // Arcane relies on Int, Divine on Wis; Int is the primary Savant stat.
      spellSlots: {
        // Savant spells per day are based on 1/2 class level (Caster Level)
        5:  { 0: 2, 1: 0 },
        6:  { 0: 3, 1: 1 },
        7:  { 0: 3, 1: 1 },
        8:  { 0: 4, 1: 2, 2: 0 },
        9:  { 0: 4, 1: 2, 2: 1 },
        10: { 0: 5, 1: 3, 2: 1 },
        11: { 0: 5, 1: 3, 2: 2, 3: 0 },
        12: { 0: 6, 1: 4, 2: 2, 3: 1 },
        13: { 0: 6, 1: 4, 2: 3, 3: 1 },
        14: { 0: 7, 1: 5, 2: 3, 3: 2, 4: 0 },
        15: { 0: 7, 1: 5, 2: 4, 3: 2, 4: 1 },
        16: { 0: 8, 1: 6, 2: 4, 3: 3, 4: 1 },
        17: { 0: 8, 1: 6, 2: 5, 3: 3, 4: 2 },
        18: { 0: 9, 1: 7, 2: 5, 3: 4, 4: 2 },
        19: { 0: 9, 1: 7, 2: 6, 3: 4, 4: 3 },
        20: { 0: 9, 1: 8, 2: 6, 3: 5, 4: 3 }
      },
      spellList: savantSpellList
    },

    setup: player => {
      Broadcast.sayAt(player, 'You begin your journey as a Savant, seeking the common threads between all disciplines.');
      player.setMeta('class', 'savant');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      if (!player.getMeta('preparedSpells')) {
        player.setMeta('preparedSpells', {});
      }
    }
  };
};
