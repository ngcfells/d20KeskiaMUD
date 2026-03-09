// bundles/my-d20-bundle/data/classes/pc/spirit-shaman.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const spiritShamanSpellList = require('../../spelllists/druid');

  return {
    id: 'spirit-shaman',
    name: 'Spirit Shaman',
    description: 'A master of the spirit world who retrieves spells from nature to cast them with spontaneous flexibility.',
    hitDie: 8,

    classSkills: [
      'concentration', 'craft', 'diplomacy', 'handle_animal', 'heal', 
      'knowledge_nature', 'knowledge_geography', 'knowledge_history', 
      'knowledge_local', 'listen', 'profession', 'ride', 'spellcraft', 
      'spot', 'survival', 'swim'
    ],

    abilities: {
      1: ['spirit_guide', 'wild_empathy'],
      2: ['chastise_spirits'],
      3: ['detect_spirits'],
      4: ['blessing_of_the_spirits'],
      5: ['follow_the_guide'],
      6: ['ghost_warrior'],
      7: ['ward_against_spirits'],
      9: ['spirit_form_1'],
      10: ['guide_magic']
    },

    spellcasting: {
      mode: 'retrieved', // Unique hybrid of prepared and spontaneous
      ability: 'wisdom', // High Wisdom required for spell levels/bonus slots
      secondaryAbility: 'charisma', // Used for Save DCs
      spellSlots: {
        // Format: { level: { spellLevel: slotsPerDay } }
        1:  { 0: 3, 1: 1 },
        2:  { 0: 4, 1: 2 },
        3:  { 0: 5, 1: 2, 2: 1 },
        4:  { 0: 6, 1: 3, 2: 2 },
        5:  { 0: 6, 1: 3, 2: 2, 3: 1 },
        6:  { 0: 6, 1: 3, 2: 3, 3: 2 },
        7:  { 0: 6, 1: 4, 2: 3, 3: 2, 4: 1 },
        8:  { 0: 6, 1: 4, 2: 3, 3: 3, 4: 2 },
        9:  { 0: 6, 1: 4, 2: 4, 3: 3, 4: 2, 5: 1 },
        10: { 0: 6, 1: 4, 2: 4, 3: 3, 4: 3, 5: 2 }
      },
      // retrievedSpells: The number of spells from the Druid list a Shaman can "know" each day.
      retrievedSpells: {
        1:  { 0: 3, 1: 1 },
        2:  { 0: 3, 1: 2 },
        3:  { 0: 3, 1: 2, 2: 1 },
        4:  { 0: 3, 1: 3, 2: 2 },
        10: { 0: 3, 1: 3, 2: 3, 3: 3, 4: 3, 5: 2 }
      },
      spellList: spiritShamanSpellList
    },

    setup: player => {
      Broadcast.sayAt(player, 'The spirits of the wild whisper to you. You are a Spirit Shaman.');
      player.setMeta('class', 'spirit-shaman');
      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      if (!player.getMeta('retrievedSpells')) {
        player.setMeta('retrievedSpells', {});
      }
    }
  };
};
