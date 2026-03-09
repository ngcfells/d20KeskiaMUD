// bundles/my-d20-bundle/lib/classes/starwars/sw_scoundrel.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'sw_scoundrel',
    name: 'Scoundrel (Star Wars)',
    genre: 'star_wars',
    origin: 'starwars',
    description: 'A charming rogue who survives through wit, luck, deception, and underworld savvy.',

    hitDie: 8,

    classSkills: [
      'acrobatics',
      'appraise',
      'bluff',
      'computers',
      'craft',
      'deception',
      'disguise',
      'gambling',
      'hide',
      'intimidate',
      'knowledge_galactic',
      'listen',
      'move_silently',
      'perception',
      'pilot',
      'profession',
      'sleight_of_hand',
      'tumble',
      'use_magic_device'
    ],

    abilities: {
      1: ['scoundrel_luck_1', 'trick_attack_1', 'scoundrel_path_feature_1'],
      2: ['evasion'],
      3: ['streetwise_1'],
      4: ['scoundrel_luck_2'],
      5: ['scoundrel_path_feature_2'],
      6: ['trick_attack_2'],
      7: ['streetwise_2'],
      8: ['scoundrel_luck_3'],
      9: ['scoundrel_path_feature_3'],
      10: ['improved_evasion'],
      11: ['trick_attack_3'],
      12: ['streetwise_3'],
      13: ['scoundrel_path_feature_4'],
      14: ['scoundrel_luck_4'],
      15: ['trick_attack_4'],
      16: ['streetwise_4'],
      17: ['scoundrel_path_feature_5'],
      18: ['scoundrel_luck_5'],
      19: ['trick_attack_5'],
      20: ['perfect_scoundrel']
    },

    // Hybrid model: Star Wars uses PATHS
    paths: {
      gambler: {
        id: 'gambler',
        name: 'Gambler Path',
        description: 'Masters of luck manipulation, risk‑taking, and probability‑bending tricks.'
      },
      outlaw: {
        id: 'outlaw',
        name: 'Outlaw Path',
        description: 'Criminal operators skilled in smuggling, evasion, and underworld contacts.'
      },
      con_artist: {
        id: 'con_artist',
        name: 'Con Artist Path',
        description: 'Experts in deception, disguise, and social manipulation.'
      },
      gunslinger: {
        id: 'gunslinger',
        name: 'Gunslinger Path',
        description: 'Fast‑draw specialists who rely on precision, speed, and trick shots.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You embrace the life of a Star Wars Scoundrel.');
      player.setMeta('class', 'sw_scoundrel');
      player.setMeta('origin', 'starwars');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('scoundrel_path')) {
        player.setMeta('scoundrel_path', null);
      }

      // Scoundrel luck
      if (!player.getMeta('scoundrel_luck')) {
        player.setMeta('scoundrel_luck', {
          uses: 0,
          max: 0
        });
      }

      // Trick attack
      if (!player.getMeta('trick_attack')) {
        player.setMeta('trick_attack', {
          bonusDamage: 0
        });
      }

      // Streetwise
      if (!player.getMeta('streetwise')) {
        player.setMeta('streetwise', {
          bonus: 0
        });
      }
    }
  };
};
