// bundles/my-d20-bundle/data/classes/oriental/monk_rokugan.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  // Kiho and stances will be loaded from data files
  const kihoList = require('../../ki/kiho_powers');
  const stanceList = require('../../ki/monk_stances');
  const tattooList = require('../../ki/dragon_tattoos');

  return {
    id: 'monk_rokugan',
    name: 'Monk (Rokugan)',
    origin: 'rokugan',
    description: 'A disciplined ascetic who channels ki through martial arts, elemental stances, and sacred kiho techniques.',
    hitDie: 8,

    classSkills: [
      'balance',
      'climb',
      'concentration',
      'craft',
      'diplomacy',
      'escape_artist',
      'heal',
      'jump',
      'knowledge_religion',
      'listen',
      'profession',
      'sense_motive',
      'spot',
      'tumble'
    ],

    abilities: {
      1: ['ki_pool', 'unarmed_strike_1', 'monk_stance_1'],
      2: ['evasion'],
      3: ['kiho_1'],
      4: ['slow_fall_20'],
      5: ['unarmed_strike_2'],
      6: ['kiho_2'],
      7: ['wholeness_of_body'],
      8: ['monk_stance_2'],
      9: ['kiho_3'],
      10: ['unarmed_strike_3'],
      11: ['diamond_soul'],
      12: ['kiho_4'],
      13: ['monk_stance_3'],
      14: ['unarmed_strike_4'],
      15: ['kiho_5'],
      16: ['timeless_body'],
      17: ['monk_stance_4'],
      18: ['kiho_6'],
      19: ['perfect_self'],
      20: ['unarmed_strike_5']
    },

    // Optional Dragon Clan tattoo path
    tattooPaths: {
      dragon: {
        id: 'dragon',
        name: 'Dragon Tattooed Monk',
        description: 'A monk who bears sacred irezumi tattoos that channel mystical power.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You walk the disciplined path of the Rokugan Monk.');
      player.setMeta('class', 'monk_rokugan');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Ki pool
      if (!player.getMeta('ki_pool')) {
        player.setMeta('ki_pool', {
          max: 0,
          current: 0
        });
      }

      // Kiho techniques
      if (!player.getMeta('kiho')) {
        player.setMeta('kiho', {
          known: [],
          active: []
        });
      }

      // Elemental stances
      if (!player.getMeta('monk_stances')) {
        player.setMeta('monk_stances', {
          known: [],
          active: null
        });
      }

      // Tattoos (optional)
      if (!player.getMeta('monk_tattoos')) {
        player.setMeta('monk_tattoos', {
          enabled: false,
          known: []
        });
      }
    }
  };
};
