// bundles/my-d20-bundle/lib/classes/modern/prestige/urban_arcana/modern_speed_demon.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_speed_demon',
    name: 'Speed Demon (Urban Arcana Prestige)',
    origin: 'modern',
    description: 'A supernatural driver or pilot who channels arcane or infernal speed, performing impossible stunts and outrunning danger.',

    hitDie: 8,
    maxLevel: 5,

    prerequisites: {
      skills: {
        drive: 6,
        knowledge_technology: 4
      },
      feats: ['gearhead'],
      special: 'Must have performed a dangerous or supernatural driving stunt witnessed by at least one NPC.'
    },

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'drive',
      'escape_artist',
      'intimidate',
      'knowledge_technology',
      'perception',
      'profession',
      'repair',
      'tumble'
    ],

    abilities: {
      1: ['speed_path_feature_1', 'supernatural_speed_1'],
      2: ['speed_technique_1'],
      3: ['speed_path_feature_2'],
      4: ['speed_technique_2'],
      5: ['perfect_speed_demon']
    },

    // Prestige-class talent trees → MU‑D20 PATHS
    paths: {
      stunt_driver: {
        id: 'stunt_driver',
        name: 'Stunt Driver Path',
        description: 'Masters of impossible maneuvers, drifting, jumps, and vehicular acrobatics.'
      },
      infernal_rider: {
        id: 'infernal_rider',
        name: 'Infernal Rider Path',
        description: 'Drivers who channel dark or infernal power to enhance speed and aggression.'
      },
      arcane_racer: {
        id: 'arcane_racer',
        name: 'Arcane Racer Path',
        description: 'Speed demons who infuse vehicles with magical acceleration and supernatural control.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'The engine roars with supernatural power as you become a Speed Demon.');
      player.setMeta('class', 'modern_speed_demon');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('speed_path')) {
        player.setMeta('speed_path', null);
      }

      // Supernatural speed progression
      if (!player.getMeta('supernatural_speed')) {
        player.setMeta('supernatural_speed', {
          bonus: 0
        });
      }

      // Speed techniques
      if (!player.getMeta('speed_technique')) {
        player.setMeta('speed_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
