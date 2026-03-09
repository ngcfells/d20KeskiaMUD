// bundles/my-d20-bundle/data/classes/oriental/shugenja.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  // Hybrid spell list (SRD + PF + 5E + homebrew)
  const shugenjaSpellList = require('../../spelllists/shugenja');

  return {
    id: 'shugenja',
    name: 'Shugenja',
    origin: 'rokugan',
    description: 'A divine spellcaster who channels the elemental kami, specializing in one elemental affinity.',
    hitDie: 6,

    classSkills: [
      'concentration',
      'craft',
      'diplomacy',
      'knowledge_arcana',
      'knowledge_religion',
      'knowledge_nature',
      'profession',
      'sense_motive',
      'spellcraft'
    ],

    abilities: {
      1: ['elemental_affinity', 'sense_elements'],
      2: ['kami_whisper'],
      3: ['elemental_focus_1'],
      5: ['spirit_ward_1'],
      7: ['elemental_focus_2'],
      9: ['spirit_ward_2'],
      11: ['elemental_focus_3'],
      13: ['spirit_ward_3'],
      15: ['elemental_mastery'],
      17: ['spirit_ward_4'],
      20: ['perfect_elemental_harmony']
    },

    spellcasting: {
      mode: 'spontaneous',
      ability: 'charisma',

      // Shugenja uses Sorcerer-like progression (full spontaneous caster)
      spellSlots: {
        1:  { 0: 4, 1: 2 },
        2:  { 0: 5, 1: 3 },
        3:  { 0: 5, 1: 4, 2: 2 },
        4:  { 0: 6, 1: 5, 2: 3 },
        5:  { 0: 6, 1: 5, 2: 4, 3: 2 },
        6:  { 0: 6, 1: 5, 2: 5, 3: 3 },
        7:  { 0: 6, 1: 6, 2: 5, 3: 4, 4: 2 },
        8:  { 0: 6, 1: 6, 2: 5, 3: 5, 4: 3 },
        9:  { 0: 6, 1: 6, 2: 6, 3: 5, 4: 4, 5: 2 },
        10: { 0: 6, 1: 6, 2: 6, 3: 5, 4: 4, 5: 3 },
        11: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 5, 5: 4, 6: 2 },
        12: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 5, 5: 4, 6: 3 },
        13: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 5, 6: 4, 7: 2 },
        14: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 5, 6: 4, 7: 3 },
        15: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 5, 7: 4, 8: 2 },
        16: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 5, 7: 4, 8: 3 },
        17: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 5, 8: 4, 9: 2 },
        18: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 5, 8: 4, 9: 3 },
        19: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 6, 8: 5, 9: 4 },
        20: { 0: 6, 1: 6, 2: 6, 3: 6, 4: 6, 5: 6, 6: 6, 7: 6, 8: 6, 9: 6 }
      },

      spellList: shugenjaSpellList
    },

    setup: player => {
      Broadcast.sayAt(player, 'You attune your spirit to the elemental kami as a Shugenja.');
      player.setMeta('class', 'shugenja');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Known spells (spontaneous caster)
      if (!player.getMeta('knownSpells')) {
        player.setMeta('knownSpells', {});
      }

      // Elemental affinity (Air, Earth, Fire, Water, Void)
      if (!player.getMeta('elemental_affinity')) {
        player.setMeta('elemental_affinity', null);
      }

      // Kami whisper / spirit interactions
      if (!player.getMeta('kami_blessings')) {
        player.setMeta('kami_blessings', []);
      }
    }
  };
};
