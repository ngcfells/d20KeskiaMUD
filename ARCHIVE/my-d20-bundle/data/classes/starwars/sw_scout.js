// bundles/my-d20-bundle/lib/classes/starwars/sw_scout.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'sw_scout',
    name: 'Scout (Star Wars)',
    genre: 'star_wars',
    origin: 'starwars',
    description: 'A quick, perceptive explorer skilled in survival, stealth, and reconnaissance across alien worlds.',

    hitDie: 8,

    classSkills: [
      'acrobatics',
      'athletics',
      'climb',
      'craft',
      'drive',
      'hide',
      'jump',
      'knowledge_nature',
      'knowledge_galactic',
      'listen',
      'move_silently',
      'perception',
      'pilot',
      'profession',
      'ride',
      'search',
      'survival',
      'tumble'
    ],

    abilities: {
      1: ['trailblazer_1', 'scout_path_feature_1'],
      2: ['evasion'],
      3: ['keen_senses_1'],
      4: ['trailblazer_2'],
      5: ['scout_path_feature_2'],
      6: ['uncanny_dodge'],
      7: ['keen_senses_2'],
      8: ['trailblazer_3'],
      9: ['scout_path_feature_3'],
      10: ['improved_evasion'],
      11: ['keen_senses_3'],
      12: ['trailblazer_4'],
      13: ['scout_path_feature_4'],
      14: ['uncanny_dodge_2'],
      15: ['keen_senses_4'],
      16: ['trailblazer_5'],
      17: ['scout_path_feature_5'],
      18: ['improved_uncanny_dodge'],
      19: ['keen_senses_5'],
      20: ['perfect_scout']
    },

    // Hybrid model: Star Wars uses PATHS, not talent pools
    paths: {
      pathfinder: {
        id: 'pathfinder',
        name: 'Pathfinder Path',
        description: 'Masters of wilderness survival, alien environments, and overland navigation.'
      },
      infiltrator: {
        id: 'infiltrator',
        name: 'Infiltrator Path',
        description: 'Stealth specialists who excel at reconnaissance and silent entry.'
      },
      outrider: {
        id: 'outrider',
        name: 'Outrider Path',
        description: 'Fast‑moving scouts who rely on speed, mobility, and evasive tactics.'
      },
      xenobiologist: {
        id: 'xenobiologist',
        name: 'Xenobiologist Path',
        description: 'Experts in alien species, ecosystems, and environmental hazards.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You take your first steps into the galaxy as a Star Wars Scout.');
      player.setMeta('class', 'sw_scout');
      player.setMeta('origin', 'starwars');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('scout_path')) {
        player.setMeta('scout_path', null);
      }

      // Trailblazer bonuses
      if (!player.getMeta('trailblazer')) {
        player.setMeta('trailblazer', {
          bonus: 0
        });
      }

      // Keen senses
      if (!player.getMeta('keen_senses')) {
        player.setMeta('keen_senses', {
          bonus: 0
        });
      }
    }
  };
};
