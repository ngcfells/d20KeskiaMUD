// bundles/my-d20-bundle/lib/classes/modern/prestige/urban_arcana/modern_unholy_knight.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_unholy_knight',
    name: 'Unholy Knight (Urban Arcana Prestige)',
    origin: 'modern',
    description: 'A profane champion who channels dark power, spreads corruption, and crushes the forces of good.',

    hitDie: 10,
    maxLevel: 5,

    prerequisites: {
      alignment: 'evil',
      skills: {
        intimidate: 6,
        knowledge_religion: 6
      },
      feats: ['menacing_presence'],
      divineCasting: true // must be able to cast divine spells
    },

    classSkills: [
      'athletics',
      'concentration',
      'intimidate',
      'gather_information',
      'knowledge_religion',
      'knowledge_shadow',
      'perception',
      'profession',
      'sense_motive',
      'spellcraft',
      'treat_injury'
    ],

    abilities: {
      1: ['unholy_path_feature_1', 'profane_champion_1'],
      2: ['unholy_technique_1'],
      3: ['unholy_path_feature_2'],
      4: ['unholy_technique_2'],
      5: ['perfect_unholy_knight']
    },

    // Prestige-class talent trees → MU‑D20 PATHS
    paths: {
      desecrator: {
        id: 'desecrator',
        name: 'Desecrator Path',
        description: 'Unholy warriors who corrupt holy sites, weaken divine magic, and spread blight.'
      },
      tyrant: {
        id: 'tyrant',
        name: 'Tyrant Path',
        description: 'Cruel enforcers who dominate foes through fear, pain, and overwhelming presence.'
      },
      deathbound: {
        id: 'deathbound',
        name: 'Deathbound Path',
        description: 'Champions who channel necrotic power, resist death, and wield unholy vitality.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Dark power coils around you as you become an Unholy Knight.');
      player.setMeta('class', 'modern_unholy_knight');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('unholy_path')) {
        player.setMeta('unholy_path', null);
      }

      // Profane champion progression
      if (!player.getMeta('profane_champion')) {
        player.setMeta('profane_champion', {
          bonus: 0
        });
      }

      // Unholy techniques
      if (!player.getMeta('unholy_technique')) {
        player.setMeta('unholy_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
