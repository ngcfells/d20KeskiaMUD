// bundles/my-d20-bundle/data/classes/starwars/sw_fringer.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'sw_fringer',
    name: 'Fringer (Star Wars)',
    genre: 'star_wars',
    origin: 'starwars',
    description: 'A rugged wanderer who survives on the fringes of civilization through adaptability, resourcefulness, and grit.',

    hitDie: 8,

    classSkills: [
      'athletics',
      'climb',
      'craft',
      'drive',
      'gambling',
      'knowledge_galactic',
      'knowledge_technology',
      'listen',
      'mechanics',
      'perception',
      'pilot',
      'profession',
      'repair',
      'ride',
      'search',
      'survival'
    ],

    abilities: {
      1: ['improvisation_1', 'fringer_path_feature_1'],
      2: ['jury_rig_1'],
      3: ['survivor_1'],
      4: ['improvisation_2'],
      5: ['fringer_path_feature_2'],
      6: ['jury_rig_2'],
      7: ['survivor_2'],
      8: ['improvisation_3'],
      9: ['fringer_path_feature_3'],
      10: ['jury_rig_3'],
      11: ['survivor_3'],
      12: ['improvisation_4'],
      13: ['fringer_path_feature_4'],
      14: ['jury_rig_4'],
      15: ['survivor_4'],
      16: ['improvisation_5'],
      17: ['fringer_path_feature_5'],
      18: ['jury_rig_5'],
      19: ['survivor_5'],
      20: ['perfect_fringer']
    },

    // Hybrid model: Star Wars uses PATHS
    paths: {
      spacer: {
        id: 'spacer',
        name: 'Spacer Path',
        description: 'Experts in starship life, zero‑G operations, and long‑haul travel.'
      },
      wanderer: {
        id: 'wanderer',
        name: 'Wanderer Path',
        description: 'Nomads who thrive in unfamiliar environments and adapt to any world.'
      },
      scavenger: {
        id: 'scavenger',
        name: 'Scavenger Path',
        description: 'Masters of salvage, repair, and making the most of limited resources.'
      },
      survivalist: {
        id: 'survivalist',
        name: 'Survivalist Path',
        description: 'Hardened explorers who excel in harsh terrain and extreme conditions.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You take to the galactic frontier as a Star Wars Fringer.');
      player.setMeta('class', 'sw_fringer');
      player.setMeta('origin', 'starwars');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('fringer_path')) {
        player.setMeta('fringer_path', null);
      }

      // Improvisation bonuses
      if (!player.getMeta('improvisation')) {
        player.setMeta('improvisation', {
          bonus: 0
        });
      }

      // Jury‑rig bonuses
      if (!player.getMeta('jury_rig')) {
        player.setMeta('jury_rig', {
          bonus: 0
        });
      }

      // Survivor bonuses
      if (!player.getMeta('survivor')) {
        player.setMeta('survivor', {
          bonus: 0
        });
      }
    }
  };
};
