// bundles/my-d20-bundle/data/classes/al_qadim/sha_ir.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'shair',
    name: "Sha'ir",
    origin: "al_qadim",
    description: 'A master of genie-magic who sends a small elemental familiar to fetch spells from the inner planes.',
    hitDie: 4,

    classSkills: [
      'bluff', 'concentration', 'craft', 'decipher_script', 'diplomacy',
      'knowledge_arcana', 'knowledge_planes', 'listen', 'profession',
      'sense_motive', 'spellcraft'
    ],

    abilities: {
      1: ['gen_familiar', 'summon_gen', 'spell_retrieval'],
      5: ['elemental_protection_1'],
      7: ['call_janni'],
      9: ['elemental_travel_1'],
      11: ['call_genie'],
      13: ['elemental_travel_2'],
      15: ['elemental_protection_2'],
      17: ['call_noble_genie'],
      19: ['elemental_travel_3']
    },

    spellcasting: {
      mode: 'retrieval', // Unique mode: Spells are "fetched" and held for (Class Level) hours
      ability: 'charisma',
      // Sha'ir spell slots per day (roughly equivalent to a specialist wizard)
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
        14: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 3, 3: 3, 7: 2 },
        15: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 3, 7: 2, 8: 1 },
        16: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 3, 7: 3, 8: 2 },
        17: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 3, 8: 2, 9: 1 },
        18: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 3, 8: 3, 9: 2 },
        19: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 3, 9: 3 },
        20: { 0: 4, 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4 }
      },
      // Accesses full Sorcerer/Wizard list PLUS specific Divine Domains
      spellList: 'arcane_and_limited_divine' 
    },

    setup: player => {
      Broadcast.sayAt(player, "You are a Sha'ir. Your power is not your own, but a gift retrieved from the courts of the Genies.");
      player.setMeta('class', 'shair');
      player.setMeta('training_progress', {
        retrieved_spells: [], // Spells currently "held" in mind
        gen_familiar: { type: 'air', state: 'present' }
      });
    }
  };
};
