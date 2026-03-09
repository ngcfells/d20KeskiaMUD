// bundles/my-d20-bundle/lib/classes/modern/prestige/urban_arcana/modern_shadow_hunter.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const shadowHunterPowers = require('../../../data/powers/modern_shadow_hunter_powers');

  return {
    id: 'modern_shadow_hunter',
    name: 'Shadow Hunter (Urban Arcana Prestige)',
    origin: 'modern',
    description: 'A supernatural tracker and slayer of creatures from the Shadow, blending stealth, senses, and extradimensional pursuit.',

    hitDie: 8,
    maxLevel: 5,

    prerequisites: {
      skills: {
        survival: 6,
        perception: 6,
        knowledge_shadow: 4
      },
      feats: ['track'],
      special: 'Must have defeated or tracked a Shadow creature of CR 3+.'
    },

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'escape_artist',
      'gather_information',
      'hide',
      'intimidate',
      'knowledge_shadow',
      'listen',
      'move_silently',
      'perception',
      'profession',
      'search',
      'sense_motive',
      'survival'
    ],

    abilities: {
      1: ['hunter_path_feature_1', 'shadow_tracking_1'],
      2: ['hunter_technique_1'],
      3: ['hunter_path_feature_2'],
      4: ['hunter_technique_2'],
      5: ['master_shadow_hunter']
    },

    // Hybrid supernatural tracking subsystem (MU‑D20 normalized)
    powers: {
      mode: 'per_day',
      ability: 'wisdom',
      powerList: shadowHunterPowers,

      usesPerDay: {
        1: 1,
        2: 2,
        3: 2,
        4: 3,
        5: 3
      }
    },

    // Prestige-class talent trees → MU‑D20 PATHS
    paths: {
      stalker: {
        id: 'stalker',
        name: 'Stalker Path',
        description: 'Hunters who excel in stealth, ambush, and silent pursuit.'
      },
      seeker: {
        id: 'seeker',
        name: 'Seeker Path',
        description: 'Trackers who perceive extradimensional traces and follow Shadow‑born trails.'
      },
      banisher: {
        id: 'banisher',
        name: 'Banisher Path',
        description: 'Slayers who specialize in disrupting, weakening, and destroying Shadow creatures.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Your senses sharpen as you become a Shadow Hunter.');
      player.setMeta('class', 'modern_shadow_hunter');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('hunter_path')) {
        player.setMeta('hunter_path', null);
      }

      // Shadow tracking progression
      if (!player.getMeta('shadow_tracking')) {
        player.setMeta('shadow_tracking', {
          bonus: 0
        });
      }

      // Hunter techniques
      if (!player.getMeta('hunter_technique')) {
        player.setMeta('hunter_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
