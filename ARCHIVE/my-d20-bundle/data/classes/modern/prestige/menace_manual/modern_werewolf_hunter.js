// bundles/my-d20-bundle/lib/classes/modern/prestige/menace_manual/modern_werewolf_hunter.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const werewolfHunterPowers = require('../../../data/powers/modern_werewolf_hunter_powers');

  return {
    id: 'modern_werewolf_hunter',
    name: 'Werewolf Hunter (Menace Manual Prestige)',
    origin: 'modern',
    description: 'A specialist trained to track, fight, and destroy lycanthropes using silver tactics, regeneration suppression, and shapeshifter lore.',

    hitDie: 10,
    maxLevel: 5,

    prerequisites: {
      skills: {
        survival: 6,
        perception: 6,
        knowledge_nature: 4
      },
      feats: ['track'],
      special: 'Must have survived an encounter with a lycanthrope or shapeshifting creature.'
    },

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'climb',
      'escape_artist',
      'gather_information',
      'intimidate',
      'knowledge_nature',
      'knowledge_shadow',
      'listen',
      'move_silently',
      'perception',
      'profession',
      'search',
      'sense_motive',
      'survival',
      'tumble'
    ],

    abilities: {
      1: ['werewolf_hunter_path_feature_1', 'anti_lycan_training_1'],
      2: ['werewolf_hunter_technique_1'],
      3: ['werewolf_hunter_path_feature_2'],
      4: ['werewolf_hunter_technique_2'],
      5: ['master_werewolf_hunter']
    },

    // Anti‑lycanthrope subsystem (MU‑D20 normalized)
    powers: {
      mode: 'per_encounter',
      ability: 'wisdom',
      powerList: werewolfHunterPowers,

      usesPerEncounter: {
        1: 1,
        2: 1,
        3: 2,
        4: 2,
        5: 3
      }
    },

    // Prestige-class talent trees → MU‑D20 PATHS
    paths: {
      silver_slayer: {
        id: 'silver_slayer',
        name: 'Silver Slayer Path',
        description: 'Hunters who specialize in silvered weapons, regeneration bypass, and direct combat.'
      },
      moon_tracker: {
        id: 'moon_tracker',
        name: 'Moon Tracker Path',
        description: 'Experts in tracking shapeshifters, reading signs, and predicting transformation cycles.'
      },
      infection_warder: {
        id: 'infection_warder',
        name: 'Infection Warder Path',
        description: 'Hunters trained to resist lycanthropic infection and protect others from contamination.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Your instincts sharpen as you take up the hunt against lycanthropes.');
      player.setMeta('class', 'modern_werewolf_hunter');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('werewolf_hunter_path')) {
        player.setMeta('werewolf_hunter_path', null);
      }

      // Anti‑lycanthrope training progression
      if (!player.getMeta('anti_lycan_training')) {
        player.setMeta('anti_lycan_training', {
          bonus: 0
        });
      }

      // Werewolf hunter techniques
      if (!player.getMeta('werewolf_hunter_technique')) {
        player.setMeta('werewolf_hunter_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
