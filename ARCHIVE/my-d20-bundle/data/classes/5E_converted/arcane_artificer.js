// bundles/my-d20-bundle/data/classes/pc/arcane_artificer.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const arcaneArtificerSpellList = require('../../spelllists/arcane_artificer');

  return {
    id: 'arcane_artificer',
    name: 'Arcane Artificer',
    description: 'A 5E-inspired specialist who blends arcane spellcasting with the ability to infuse mundane items with permanent-like power.',
    hitDie: 8,

    classSkills: [
      'appraise', 'concentration', 'craft', 'decipher_script', 'disable_device', 
      'knowledge_arcana', 'knowledge_architecture', 'knowledge_history', 
      'open_lock', 'profession', 'search', 'spellcraft', 'use_magic_device'
    ],

    abilities: {
      1: ['magical_tinkering', 'trapfinding'],
      2: ['infuse_item_2_slots'],
      3: ['artificer_specialist', 'right_tool_for_the_job'],
      6: ['infuse_item_3_slots', 'tool_expertise'],
      7: ['flash_of_genius'],
      10: ['infuse_item_4_slots', 'magic_item_adept'],
      11: ['spell_storing_item'],
      14: ['infuse_item_5_slots', 'magic_item_savant'],
      18: ['infuse_item_6_slots', 'magic_item_master'],
      20: ['soul_of_artifice']
    },

    spellcasting: {
      mode: 'prepared',
      ability: 'intelligence',
      // 5E Half-caster progression converted to 3.5e Spell Levels (1st - 5th)
      spellSlots: {
        1:  { 1: 2 },
        2:  { 1: 2 },
        3:  { 1: 3 },
        4:  { 1: 3 },
        5:  { 1: 4, 2: 2 },
        6:  { 1: 4, 2: 2 },
        7:  { 1: 4, 2: 3 },
        8:  { 1: 4, 2: 3 },
        9:  { 1: 4, 2: 3, 3: 2 },
        10: { 1: 4, 2: 3, 3: 2 },
        11: { 1: 4, 2: 3, 3: 3 },
        12: { 1: 4, 2: 3, 3: 3 },
        13: { 1: 4, 2: 3, 3: 3, 4: 1 },
        14: { 1: 4, 2: 3, 3: 3, 4: 1 },
        15: { 1: 4, 2: 3, 3: 3, 4: 2 },
        16: { 1: 4, 2: 3, 3: 3, 4: 2 },
        17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
        18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
        19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
        20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 }
      },
      spellList: arcaneArtificerSpellList
    },

    setup: player => {
      Broadcast.sayAt(player, 'You have mastered the path of the Arcane Artificer, bridging the gap between invention and evocation.');
      player.setMeta('class', 'arcane_artificer');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        active_infusions: { current: 0, max: 2 }, // Scales with levels (see abilities)
        masteries: {}
      });

      if (!player.getMeta('preparedSpells')) {
        player.setMeta('preparedSpells', {});
      }
    }
  };
};
