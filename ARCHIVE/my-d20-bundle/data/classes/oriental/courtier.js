// bundles/my-d20-bundle/data/classes/oriental/courtier.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'courtier',
    name: 'Courtier',
    origin: 'rokugan',
    description: 'A master of diplomacy, etiquette, and political maneuvering, trained in the refined arts of Rokugan’s great clans.',
    hitDie: 6,

    classSkills: [
      'bluff',
      'diplomacy',
      'disguise',
      'gather_information',
      'knowledge_history',
      'knowledge_nobility',
      'knowledge_local',
      'listen',
      'perform',
      'profession',
      'sense_motive',
      'spot'
    ],

    abilities: {
      1: ['courtier_school', 'social_grace_1', 'etiquette'],
      2: ['favored_enemy_clan_1'],
      3: ['courtier_technique_1'],
      4: ['social_grace_2'],
      5: ['political_savvy'],
      6: ['favored_enemy_clan_2'],
      7: ['courtier_technique_2'],
      8: ['social_grace_3'],
      9: ['courtier_technique_3'],
      10: ['favored_enemy_clan_3'],
      11: ['social_grace_4'],
      12: ['courtier_technique_4'],
      13: ['favored_enemy_clan_4'],
      14: ['social_grace_5'],
      15: ['courtier_technique_5'],
      16: ['favored_enemy_clan_5'],
      17: ['social_grace_6'],
      18: ['courtier_technique_6'],
      19: ['favored_enemy_clan_6'],
      20: ['perfect_poise']
    },

    // Rokugan Courtier Schools
    schools: {
      crane: {
        id: 'crane',
        name: 'Crane Courtier School',
        description: 'Masters of diplomacy, etiquette, and subtle persuasion.'
      },
      scorpion: {
        id: 'scorpion',
        name: 'Scorpion Courtier School',
        description: 'Experts in manipulation, secrets, and social leverage.'
      },
      lion: {
        id: 'lion',
        name: 'Lion Courtier School',
        description: 'Honorable tacticians of politics and battlefield diplomacy.'
      },
      phoenix: {
        id: 'phoenix',
        name: 'Phoenix Courtier School',
        description: 'Scholarly diplomats with spiritual insight.'
      },
      unicorn: {
        id: 'unicorn',
        name: 'Unicorn Courtier School',
        description: 'Open-minded envoys skilled in foreign customs.'
      },
      crab: {
        id: 'crab',
        name: 'Crab Courtier School',
        description: 'Pragmatic negotiators hardened by duty and harsh realities.'
      },
      ronin: {
        id: 'ronin',
        name: 'Ronin Courtier Tradition',
        description: 'Independent negotiators relying on wit and adaptability.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You enter the refined and dangerous world of Rokugan politics as a Courtier.');
      player.setMeta('class', 'courtier');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Courtier school selection
      if (!player.getMeta('courtier_school')) {
        player.setMeta('courtier_school', null);
      }

      // Techniques known
      if (!player.getMeta('courtier_techniques')) {
        player.setMeta('courtier_techniques', {
          known: [],
          passive: [],
          active: []
        });
      }

      // Social grace bonuses
      if (!player.getMeta('social_grace')) {
        player.setMeta('social_grace', {
          diplomacy: 0,
          sense_motive: 0,
          bluff: 0
        });
      }

      // Favored enemy clans (political adversaries)
      if (!player.getMeta('favored_enemy_clans')) {
        player.setMeta('favored_enemy_clans', []);
      }
    }
  };
};
