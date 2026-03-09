// bundles/my-d20-bundle/data/classes/oriental/wu_jen.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  // Hybrid spell list (SRD + PF + 5E + homebrew)
  const wuJenSpellList = require('../../spelllists/wu_jen');

  return {
    id: 'wu_jen',
    name: 'Wu Jen',
    origin: 'rokugan',
    description: 'A disciplined arcane spellcaster who commands elemental forces through strict taboos and ritual purity.',
    hitDie: 4,

    classSkills: [
      'concentration',
      'craft',
      'knowledge_arcana',
      'knowledge_religion',
      'knowledge_planes',
      'profession',
      'spellcraft'
    ],

    abilities: {
      1: ['elemental_mastery', 'wu_jen_taboo'],
      2: ['watchful_spirit'],
      5: ['spell_secret_1'],
      10: ['spell_secret_2'],
      15: ['spell_secret_3'],
      20: ['spell_secret_4']
    },

    spellcasting: {
      mode: 'prepared',
      ability: 'intelligence',

      // Wu Jen uses Wizard‑style progression (full caster)
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

      spellList: wuJenSpellList
    },

    setup: player => {
      Broadcast.sayAt(player, 'You walk the path of the Wu Jen, master of elemental forces.');
      player.setMeta('class', 'wu_jen');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Prepared spells structure
      if (!player.getMeta('preparedSpells')) {
        player.setMeta('preparedSpells', {});
      }

      // Wu Jen taboos (player chooses at level 1)
      if (!player.getMeta('wu_jen_taboos')) {
        player.setMeta('wu_jen_taboos', []);
      }
    }
  };
};
