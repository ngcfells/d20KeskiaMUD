// bundles/my-d20-bundle/lib/classes/modern/advanced/modern_techie.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_techie',
    name: 'Techie (d20 Modern Advanced)',
    origin: 'modern',
    description: 'A technical specialist skilled in electronics, mechanics, hacking, robotics, and device mastery.',

    hitDie: 8,
    maxLevel: 10,

    prerequisites: {
      skills: {
        computers: 4,
        mechanics: 4
      }
    },

    classSkills: [
      'computers',
      'craft',
      'decipher_script',
      'demolitions',
      'disable_device',
      'electronics',
      'forgery',
      'investigate',
      'knowledge_technology',
      'mechanics',
      'perception',
      'profession',
      'repair',
      'research'
    ],

    abilities: {
      1: ['techie_path_feature_1', 'device_mastery_1'],
      2: ['bonus_feat_1'],
      3: ['technique_1'],
      4: ['device_mastery_2'],
      5: ['techie_path_feature_2'],
      6: ['bonus_feat_2'],
      7: ['technique_2'],
      8: ['device_mastery_3'],
      9: ['techie_path_feature_3'],
      10: ['perfect_techie']
    },

    // d20 Modern "talent trees" → MU‑D20 PATHS
    paths: {
      hacker: {
        id: 'hacker',
        name: 'Hacker Path',
        description: 'Experts in intrusion, digital infiltration, and bypassing electronic security.'
      },
      mechanic: {
        id: 'mechanic',
        name: 'Mechanic Path',
        description: 'Hands-on engineers who repair, modify, and optimize physical devices.'
      },
      gadgeteer: {
        id: 'gadgeteer',
        name: 'Gadgeteer Path',
        description: 'Inventors who build custom tools, jury-rig devices, and deploy specialized gear.'
      },
      roboticist: {
        id: 'roboticist',
        name: 'Roboticist Path',
        description: 'Specialists in drones, autonomous systems, and robotic engineering.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You refine your technical expertise as a Techie.');
      player.setMeta('class', 'modern_techie');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 3000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('techie_path')) {
        player.setMeta('techie_path', null);
      }

      // Device mastery
      if (!player.getMeta('device_mastery')) {
        player.setMeta('device_mastery', {
          bonus: 0
        });
      }

      // Techniques
      if (!player.getMeta('technique')) {
        player.setMeta('technique', {
          known: [],
          active: null
        });
      }

      // Bonus feats
      if (!player.getMeta('bonus_feats')) {
        player.setMeta('bonus_feats', {
          count: 0
        });
      }
    }
  };
};
