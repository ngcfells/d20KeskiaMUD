// bundles/my-d20-bundle/data/classes/oriental/sohei.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  // Hybrid spell list (SRD + PF + 5E + homebrew)
  const soheiSpellList = require('../../spelllists/sohei');

  return {
    id: 'sohei',
    name: 'Sohei',
    origin: 'rokugan',
    description: 'A warrior-monk devoted to discipline and martial focus, capable of entering a ki frenzy and wielding divine magic.',
    hitDie: 10,

    classSkills: [
      'climb',
      'concentration',
      'craft',
      'handle_animal',
      'heal',
      'intimidate',
      'jump',
      'knowledge_religion',
      'profession',
      'ride',
      'sense_motive',
      'swim'
    ],

    abilities: {
      1: ['ki_frenzy_1', 'weapon_focus_monk', 'sohei_mount'],
      2: ['deflect_arrows'],
      3: ['still_mind'],
      4: ['ki_frenzy_2'],
      5: ['divine_spellcasting_1'],
      6: ['bonus_feat_sohei'],
      7: ['ki_strike_magic'],
      8: ['ki_frenzy_3'],
      9: ['divine_spellcasting_2'],
      10: ['bonus_feat_sohei'],
      11: ['ki_strike_cold_iron'],
      12: ['ki_frenzy_4'],
      13: ['divine_spellcasting_3'],
      14: ['bonus_feat_sohei'],
      15: ['ki_strike_silver'],
      16: ['ki_frenzy_5'],
      17: ['divine_spellcasting_4'],
      18: ['bonus_feat_sohei'],
      19: ['ki_strike_adamantine'],
      20: ['perfect_ki_frenzy']
    },

    spellcasting: {
      mode: 'prepared',
      ability: 'wisdom',

      // Sohei is a half-caster (similar to Paladin/Ranger progression)
      spellSlots: {
        1:  {},
        2:  {},
        3:  { 1: 0 },
        4:  { 1: 1 },
        5:  { 1: 1 },
        6:  { 1: 1 },
        7:  { 1: 1, 2: 0 },
        8:  { 1: 1, 2: 1 },
        9:  { 1: 1, 2: 1 },
        10: { 1: 1, 2: 1 },
        11: { 1: 1, 2: 1, 3: 0 },
        12: { 1: 1, 2: 1, 3: 1 },
        13: { 1: 1, 2: 1, 3: 1 },
        14: { 1: 1, 2: 1, 3: 1 },
        15: { 1: 1, 2: 1, 3: 1, 4: 0 },
        16: { 1: 1, 2: 1, 3: 1, 4: 1 },
        17: { 1: 1, 2: 1, 3: 1, 4: 1 },
        18: { 1: 1, 2: 1, 3: 1, 4: 1 },
        19: { 1: 1, 2: 1, 3: 1, 4: 1 },
        20: { 1: 1, 2: 1, 3: 1, 4: 1 }
      },

      spellList: soheiSpellList
    },

    setup: player => {
      Broadcast.sayAt(player, 'You take up the disciplined path of the Sohei.');
      player.setMeta('class', 'sohei');

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

      // Ki Frenzy tracking
      if (!player.getMeta('ki_frenzy')) {
        player.setMeta('ki_frenzy', {
          uses: 0,
          max: 0,
          active: false
        });
      }

      // Sohei mount (similar to Paladin special mount)
      if (!player.getMeta('sohei_mount')) {
        player.setMeta('sohei_mount', {
          summoned: false,
          type: null,
          bonuses: {}
        });
      }
    }
  };
};
