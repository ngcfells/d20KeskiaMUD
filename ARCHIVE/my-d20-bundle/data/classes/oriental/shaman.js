// bundles/my-d20-bundle/data/classes/oriental/shaman.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  // Hybrid spell list (SRD + PF + 5E + homebrew)
  const shamanSpellList = require('../../spelllists/shaman');
  const shamanDomains = require('../../spelllists/shaman_domains');

  return {
    id: 'shaman',
    name: 'Shaman',
    origin: 'rokugan',
    description: 'A divine spellcaster who communes with ancestral and nature spirits, drawing power from spirit domains.',
    hitDie: 8,

    classSkills: [
      'concentration',
      'craft',
      'diplomacy',
      'handle_animal',
      'heal',
      'knowledge_nature',
      'knowledge_religion',
      'profession',
      'sense_motive',
      'spellcraft',
      'survival'
    ],

    abilities: {
      1: ['spirit_guide', 'spirit_domain_1'],
      2: ['spirit_sight'],
      3: ['spirit_domain_2'],
      5: ['spirit_boost_1'],
      7: ['spirit_walk'],
      9: ['spirit_boost_2'],
      11: ['spirit_domain_3'],
      13: ['greater_spirit_sight'],
      15: ['spirit_boost_3'],
      17: ['spirit_merge'],
      20: ['perfect_spirit_harmony']
    },

    spellcasting: {
      mode: 'prepared',
      ability: 'wisdom',

      // Shaman uses Cleric-like progression (full divine caster)
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

      spellList: shamanSpellList,
      domainList: shamanDomains
    },

    setup: player => {
      Broadcast.sayAt(player, 'You open your senses to the spirit world as a Shaman.');
      player.setMeta('class', 'shaman');

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

      // Spirit domains (Shaman chooses 1 at level 1, more later)
      if (!player.getMeta('spirit_domains')) {
        player.setMeta('spirit_domains', []);
      }

      // Spirit guide (flavor + mechanical bonuses)
      if (!player.getMeta('spirit_guide')) {
        player.setMeta('spirit_guide', null);
      }
    }
  };
};
