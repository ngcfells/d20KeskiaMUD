// bundles/my-d20-bundle/lib/classes/starwars/sw_tech_specialist.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'sw_tech_specialist',
    name: 'Tech Specialist (Star Wars)',
    genre: 'star_wars',
    origin: 'starwars',
    description: 'An engineer, slicer, mechanic, or inventor who excels at modifying technology, droids, and starships.',

    hitDie: 8,

    classSkills: [
      'appraise',
      'computers',
      'craft',
      'demolitions',
      'disable_device',
      'drive',
      'knowledge_galactic',
      'knowledge_technology',
      'linguistics',
      'mechanics',
      'perception',
      'pilot',
      'profession',
      'repair',
      'search'
    ],

    abilities: {
      1: ['tech_expertise_1', 'tech_path_feature_1'],
      2: ['device_modification_1'],
      3: ['jury_rig_1'],
      4: ['tech_expertise_2'],
      5: ['tech_path_feature_2'],
      6: ['device_modification_2'],
      7: ['jury_rig_2'],
      8: ['tech_expertise_3'],
      9: ['tech_path_feature_3'],
      10: ['device_modification_3'],
      11: ['jury_rig_3'],
      12: ['tech_expertise_4'],
      13: ['tech_path_feature_4'],
      14: ['device_modification_4'],
      15: ['jury_rig_4'],
      16: ['tech_expertise_5'],
      17: ['tech_path_feature_5'],
      18: ['device_modification_5'],
      19: ['jury_rig_5'],
      20: ['perfect_tech_specialist']
    },

    // Hybrid model: Star Wars uses PATHS
    paths: {
      engineer: {
        id: 'engineer',
        name: 'Engineer Path',
        description: 'Masters of starship systems, structural repair, and large‑scale engineering solutions.'
      },
      slicer: {
        id: 'slicer',
        name: 'Slicer Path',
        description: 'Experts in hacking, data infiltration, and electronic warfare.'
      },
      droidwright: {
        id: 'droidwright',
        name: 'Droidwright Path',
        description: 'Specialists in droid construction, modification, and AI behavior tuning.'
      },
      inventor: {
        id: 'inventor',
        name: 'Inventor Path',
        description: 'Tinkerers who create gadgets, prototypes, and experimental devices.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You take up the tools of a Tech Specialist.');
      player.setMeta('class', 'sw_tech_specialist');
      player.setMeta('origin', 'starwars');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('tech_path')) {
        player.setMeta('tech_path', null);
      }

      // Tech expertise
      if (!player.getMeta('tech_expertise')) {
        player.setMeta('tech_expertise', {
          bonus: 0
        });
      }

      // Device modification
      if (!player.getMeta('device_modification')) {
        player.setMeta('device_modification', {
          bonus: 0
        });
      }

      // Jury‑rig
      if (!player.getMeta('jury_rig')) {
        player.setMeta('jury_rig', {
          bonus: 0
        });
      }
    }
  };
};
