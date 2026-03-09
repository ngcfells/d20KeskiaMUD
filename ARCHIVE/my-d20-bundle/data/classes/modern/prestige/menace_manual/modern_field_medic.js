// bundles/my-d20-bundle/lib/classes/modern/prestige/menace_manual/modern_field_medic.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const medicPowers = require('../../../data/powers/modern_field_medic_powers');

  return {
    id: 'modern_field_medic',
    name: 'Field Medic (Menace Manual Prestige)',
    origin: 'modern',
    description: 'A combat healer and trauma specialist trained to stabilize, treat, and save lives under extreme conditions.',

    hitDie: 8,
    maxLevel: 5,

    prerequisites: {
      skills: {
        treat_injury: 6,
        perception: 4,
        survival: 4
      },
      feats: ['medical_expert'],
      special: 'Must have provided emergency medical care in a dangerous or combat situation.'
    },

    classSkills: [
      'concentration',
      'craft',
      'diplomacy',
      'gather_information',
      'heal',
      'intimidate',
      'knowledge_life_sciences',
      'knowledge_technology',
      'perception',
      'profession',
      'research',
      'sense_motive',
      'survival',
      'treat_injury'
    ],

    abilities: {
      1: ['medic_path_feature_1', 'trauma_training_1'],
      2: ['medic_technique_1'],
      3: ['medic_path_feature_2'],
      4: ['medic_technique_2'],
      5: ['master_field_medic']
    },

    // Medical intervention subsystem (MU‑D20 normalized)
    powers: {
      mode: 'per_day',
      ability: 'wisdom',
      powerList: medicPowers,

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
      combat_medic: {
        id: 'combat_medic',
        name: 'Combat Medic Path',
        description: 'Medics who specialize in stabilizing allies under fire and performing rapid battlefield interventions.'
      },
      trauma_surgeon: {
        id: 'trauma_surgeon',
        name: 'Trauma Surgeon Path',
        description: 'Experts in advanced medical procedures, emergency surgery, and critical care.'
      },
      crisis_responder: {
        id: 'crisis_responder',
        name: 'Crisis Responder Path',
        description: 'Specialists in toxins, infections, environmental hazards, and mass‑casualty triage.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Your hands steady and your training sharpens as you become a Field Medic.');
      player.setMeta('class', 'modern_field_medic');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('medic_path')) {
        player.setMeta('medic_path', null);
      }

      // Trauma training progression
      if (!player.getMeta('trauma_training')) {
        player.setMeta('trauma_training', {
          bonus: 0
        });
      }

      // Medic techniques
      if (!player.getMeta('medic_technique')) {
        player.setMeta('medic_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
