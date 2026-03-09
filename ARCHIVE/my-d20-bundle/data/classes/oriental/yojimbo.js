// bundles/my-d20-bundle/data/classes/oriental/yojimbo.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'yojimbo',
    name: 'Yojimbo',
    origin: 'rokugan',
    description: 'A sworn bodyguard who interposes themselves between danger and their charge, mastering defensive techniques and unwavering loyalty.',
    hitDie: 10,

    classSkills: [
      'climb',
      'craft',
      'diplomacy',
      'handle_animal',
      'intimidate',
      'jump',
      'knowledge_nobility',
      'listen',
      'profession',
      'ride',
      'sense_motive',
      'spot'
    ],

    abilities: {
      1: ['designated_charge', 'intercept_1', 'loyalty_oath'],
      2: ['defensive_stance_1'],
      3: ['bodyguard_technique_1'],
      4: ['intercept_2'],
      5: ['shield_ally_1'],
      6: ['bodyguard_technique_2'],
      7: ['defensive_stance_2'],
      8: ['intercept_3'],
      9: ['shield_ally_2'],
      10: ['bodyguard_technique_3'],
      11: ['defensive_stance_3'],
      12: ['intercept_4'],
      13: ['shield_ally_3'],
      14: ['bodyguard_technique_4'],
      15: ['defensive_stance_4'],
      16: ['intercept_5'],
      17: ['shield_ally_4'],
      18: ['bodyguard_technique_5'],
      19: ['defensive_stance_5'],
      20: ['perfect_bodyguard']
    },

    // Clan traditions for defensive styles
    traditions: {
      lion: {
        id: 'lion',
        name: 'Lion Clan Yojimbo',
        description: 'Honorable guardians trained to protect their charge with fearless resolve.'
      },
      crane: {
        id: 'crane',
        name: 'Crane Clan Yojimbo',
        description: 'Elegant duelists who defend their charge with precision and grace.'
      },
      crab: {
        id: 'crab',
        name: 'Crab Clan Yojimbo',
        description: 'Stalwart defenders hardened by the Shadowlands, masters of endurance.'
      },
      dragon: {
        id: 'dragon',
        name: 'Dragon Clan Yojimbo',
        description: 'Unorthodox protectors who use unusual stances and redirection.'
      },
      scorpion: {
        id: 'scorpion',
        name: 'Scorpion Clan Yojimbo',
        description: 'Subtle guardians who protect through deception and misdirection.'
      },
      unicorn: {
        id: 'unicorn',
        name: 'Unicorn Clan Yojimbo',
        description: 'Swift cavalry guardians who defend their charge from horseback.'
      },
      ronin: {
        id: 'ronin',
        name: 'Ronin Yojimbo',
        description: 'Masterless warriors who protect for honor, coin, or personal code.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You swear your oath as a Yojimbo, protector of your chosen charge.');
      player.setMeta('class', 'yojimbo');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Designated charge (the person they protect)
      if (!player.getMeta('designated_charge')) {
        player.setMeta('designated_charge', null);
      }

      // Intercept tracking
      if (!player.getMeta('intercept')) {
        player.setMeta('intercept', {
          uses: 0,
          max: 0
        });
      }

      // Defensive stance bonuses
      if (!player.getMeta('defensive_stance')) {
        player.setMeta('defensive_stance', {
          ac: 0,
          dr: 0
        });
      }

      // Bodyguard techniques
      if (!player.getMeta('bodyguard_techniques')) {
        player.setMeta('bodyguard_techniques', {
          known: [],
          passive: [],
          active: []
        });
      }

      // Shield ally bonuses
      if (!player.getMeta('shield_ally')) {
        player.setMeta('shield_ally', {
          ac: 0,
          saves: 0
        });
      }
    }
  };
};
