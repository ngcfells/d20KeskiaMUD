// bundles/my-d20-bundle/lib/classes/modern/prestige/menace_manual/modern_department7_operative.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const dept7Powers = require('../../../data/powers/modern_department7_operative_powers');

  return {
    id: 'modern_department7_operative',
    name: 'Department-7 Operative (Menace Manual Prestige)',
    origin: 'modern',
    description: 'A cross-trained government agent specializing in supernatural investigation, tactical response, and anomaly containment.',

    hitDie: 8,
    maxLevel: 5,

    prerequisites: {
      skills: {
        gather_information: 6,
        sense_motive: 6,
        perception: 4,
        knowledge_arcana: 4
      },
      feats: ['alertness'],
      special: 'Must be recruited by or have worked with Department-7.'
    },

    classSkills: [
      'acrobatics',
      'athletics',
      'bluff',
      'computers',
      'concentration',
      'diplomacy',
      'disable_device',
      'escape_artist',
      'gather_information',
      'intimidate',
      'knowledge_arcana',
      'knowledge_psionics',
      'knowledge_technology',
      'knowledge_shadow',
      'listen',
      'move_silently',
      'perception',
      'profession',
      'research',
      'search',
      'sense_motive',
      'survival'
    ],

    abilities: {
      1: ['dept7_path_feature_1', 'agency_training_1'],
      2: ['dept7_technique_1'],
      3: ['dept7_path_feature_2'],
      4: ['dept7_technique_2'],
      5: ['master_department7_operative']
    },

    // Agency-training subsystem (MU‑D20 normalized)
    powers: {
      mode: 'per_encounter',
      ability: 'wisdom',
      powerList: dept7Powers,

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
      investigator: {
        id: 'investigator',
        name: 'Investigator Path',
        description: 'Agents who excel in research, interrogation, and supernatural investigation.'
      },
      tactical_responder: {
        id: 'tactical_responder',
        name: 'Tactical Responder Path',
        description: 'Operatives trained for rapid deployment, combat readiness, and threat neutralization.'
      },
      anomaly_specialist: {
        id: 'anomaly_specialist',
        name: 'Anomaly Specialist Path',
        description: 'Experts in identifying, containing, and countering magical, psionic, or extradimensional threats.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You are now an official Department-7 Operative, trained to face the unknown.');
      player.setMeta('class', 'modern_department7_operative');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('dept7_path')) {
        player.setMeta('dept7_path', null);
      }

      // Agency training progression
      if (!player.getMeta('agency_training')) {
        player.setMeta('agency_training', {
          bonus: 0
        });
      }

      // Department-7 techniques
      if (!player.getMeta('dept7_technique')) {
        player.setMeta('dept7_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
