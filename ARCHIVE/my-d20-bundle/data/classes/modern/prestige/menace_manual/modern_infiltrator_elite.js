// bundles/my-d20-bundle/lib/classes/modern/prestige/menace_manual/modern_infiltrator_elite.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const infiltratorPowers = require('../../../data/powers/modern_infiltrator_elite_powers');

  return {
    id: 'modern_infiltrator_elite',
    name: 'Infiltrator Elite (Menace Manual Prestige)',
    origin: 'modern',
    description: 'A master of stealth, disguise, and covert penetration operations, trained to bypass defenses and infiltrate secure locations.',

    hitDie: 8,
    maxLevel: 5,

    prerequisites: {
      skills: {
        hide: 6,
        move_silently: 6,
        disguise: 4,
        bluff: 4
      },
      feats: ['stealthy'],
      special: 'Must have successfully infiltrated a secure or hostile location.'
    },

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'bluff',
      'climb',
      'computers',
      'decipher_script',
      'diplomacy',
      'disable_device',
      'disguise',
      'escape_artist',
      'gather_information',
      'hide',
      'intimidate',
      'listen',
      'move_silently',
      'perception',
      'profession',
      'search',
      'sense_motive',
      'tumble'
    ],

    abilities: {
      1: ['infiltrator_path_feature_1', 'infiltration_training_1'],
      2: ['infiltrator_technique_1'],
      3: ['infiltrator_path_feature_2'],
      4: ['infiltrator_technique_2'],
      5: ['master_infiltrator_elite']
    },

    // Infiltration subsystem (MU‑D20 normalized)
    powers: {
      mode: 'per_encounter',
      ability: 'dexterity',
      powerList: infiltratorPowers,

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
      shadow_operator: {
        id: 'shadow_operator',
        name: 'Shadow Operator Path',
        description: 'Experts in stealth, silent movement, and bypassing physical security.'
      },
      impersonator: {
        id: 'impersonator',
        name: 'Impersonator Path',
        description: 'Masters of disguise, social infiltration, and identity manipulation.'
      },
      breach_specialist: {
        id: 'breach_specialist',
        name: 'Breach Specialist Path',
        description: 'Operatives who excel at defeating locks, traps, alarms, and digital security.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Your movements become precise and silent as you become an Infiltrator Elite.');
      player.setMeta('class', 'modern_infiltrator_elite');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('infiltrator_path')) {
        player.setMeta('infiltrator_path', null);
      }

      // Infiltration training progression
      if (!player.getMeta('infiltration_training')) {
        player.setMeta('infiltration_training', {
          bonus: 0
        });
      }

      // Infiltrator techniques
      if (!player.getMeta('infiltrator_technique')) {
        player.setMeta('infiltrator_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
