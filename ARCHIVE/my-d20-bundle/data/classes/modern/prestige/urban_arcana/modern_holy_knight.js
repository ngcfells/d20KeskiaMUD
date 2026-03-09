// bundles/my-d20-bundle/lib/classes/modern/prestige/urban_arcana/modern_holy_knight.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_holy_knight',
    name: 'Holy Knight (Urban Arcana Prestige)',
    origin: 'modern',
    description: 'A divinely empowered champion who smites evil, protects the innocent, and channels holy power.',

    hitDie: 10,
    maxLevel: 5,

    prerequisites: {
      alignment: 'good',
      skills: {
        knowledge_religion: 6,
        diplomacy: 4
      },
      feats: ['heroic_spirit'],
      divineCasting: true // must be able to cast divine spells
    },

    classSkills: [
      'athletics',
      'concentration',
      'diplomacy',
      'gather_information',
      'heal',
      'intimidate',
      'knowledge_religion',
      'knowledge_shadow',
      'perception',
      'profession',
      'sense_motive',
      'spellcraft',
      'treat_injury'
    ],

    abilities: {
      1: ['holy_path_feature_1', 'divine_champion_1'],
      2: ['holy_technique_1'],
      3: ['holy_path_feature_2'],
      4: ['holy_technique_2'],
      5: ['perfect_holy_knight']
    },

    // Prestige-class talent trees → MU‑D20 PATHS
    paths: {
      crusader: {
        id: 'crusader',
        name: 'Crusader Path',
        description: 'Holy warriors who smite evil and excel in righteous combat.'
      },
      guardian: {
        id: 'guardian',
        name: 'Guardian Path',
        description: 'Defenders who protect allies with divine shields and holy resilience.'
      },
      purifier: {
        id: 'purifier',
        name: 'Purifier Path',
        description: 'Champions who cleanse corruption, banish evil, and wield radiant power.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'A divine calling empowers you as a Holy Knight.');
      player.setMeta('class', 'modern_holy_knight');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('holy_path')) {
        player.setMeta('holy_path', null);
      }

      // Divine champion progression
      if (!player.getMeta('divine_champion')) {
        player.setMeta('divine_champion', {
          bonus: 0
        });
      }

      // Holy techniques
      if (!player.getMeta('holy_technique')) {
        player.setMeta('holy_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
