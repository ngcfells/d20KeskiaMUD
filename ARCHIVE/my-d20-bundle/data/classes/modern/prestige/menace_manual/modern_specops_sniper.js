// bundles/my-d20-bundle/lib/classes/modern/prestige/menace_manual/modern_specops_sniper.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const sniperPowers = require('../../../data/powers/modern_specops_sniper_powers');

  return {
    id: 'modern_specops_sniper',
    name: 'SpecOps Sniper (Menace Manual Prestige)',
    origin: 'modern',
    description: 'A long-range precision shooter trained for covert operations, reconnaissance, and surgical elimination of high-value targets.',

    hitDie: 10,
    maxLevel: 5,

    prerequisites: {
      skills: {
        perception: 6,
        hide: 6,
        move_silently: 4
      },
      feats: ['far_shot', 'precise_shot'],
      special: 'Must have completed a long-range precision mission or equivalent covert operation.'
    },

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'climb',
      'computers',
      'diplomacy',
      'disable_device',
      'escape_artist',
      'gather_information',
      'hide',
      'intimidate',
      'knowledge_technology',
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
      1: ['sniper_path_feature_1', 'sniper_training_1'],
      2: ['sniper_technique_1'],
      3: ['sniper_path_feature_2'],
      4: ['sniper_technique_2'],
      5: ['master_specops_sniper']
    },

    // Sniper subsystem (MU‑D20 normalized)
    powers: {
      mode: 'per_encounter',
      ability: 'dexterity',
      powerList: sniperPowers,

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
      marksman: {
        id: 'marksman',
        name: 'Marksman Path',
        description: 'Snipers who excel in extreme-range precision fire and ballistic mastery.'
      },
      ghost_stalker: {
        id: 'ghost_stalker',
        name: 'Ghost Stalker Path',
        description: 'Stealth-focused snipers who specialize in concealment, infiltration, and silent elimination.'
      },
      overwatch_commander: {
        id: 'overwatch_commander',
        name: 'Overwatch Commander Path',
        description: 'Operatives who provide tactical overwatch, battlefield control, and counter-sniper support.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Your breathing steadies and your aim sharpens as you become a SpecOps Sniper.');
      player.setMeta('class', 'modern_specops_sniper');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('sniper_path')) {
        player.setMeta('sniper_path', null);
      }

      // Sniper training progression
      if (!player.getMeta('sniper_training')) {
        player.setMeta('sniper_training', {
          bonus: 0
        });
      }

      // Sniper techniques
      if (!player.getMeta('sniper_technique')) {
        player.setMeta('sniper_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
