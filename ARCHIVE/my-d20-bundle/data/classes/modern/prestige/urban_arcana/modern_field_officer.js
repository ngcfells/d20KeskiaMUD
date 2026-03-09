// bundles/my-d20-bundle/lib/classes/modern/prestige/urban_arcana/modern_field_officer.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_field_officer',
    name: 'Field Officer (Urban Arcana Prestige)',
    origin: 'modern',
    description: 'A tactical leader who coordinates allies, directs battlefield operations, and inspires superior performance.',

    hitDie: 8,
    maxLevel: 5,

    prerequisites: {
      skills: {
        diplomacy: 6,
        sense_motive: 6,
        knowledge_tactics: 4
      },
      feats: ['leadership'],
      special: 'Must have commanded a team in a dangerous or combat situation.'
    },

    classSkills: [
      'athletics',
      'bluff',
      'diplomacy',
      'gather_information',
      'intimidate',
      'knowledge_tactics',
      'knowledge_civics',
      'perception',
      'profession',
      'sense_motive',
      'treat_injury'
    ],

    abilities: {
      1: ['officer_path_feature_1', 'command_training_1'],
      2: ['officer_technique_1'],
      3: ['officer_path_feature_2'],
      4: ['officer_technique_2'],
      5: ['master_field_officer']
    },

    // Prestige-class talent trees → MU‑D20 PATHS
    paths: {
      tactician: {
        id: 'tactician',
        name: 'Tactician Path',
        description: 'Masters of battlefield strategy, positioning, and coordinated maneuvers.'
      },
      commander: {
        id: 'commander',
        name: 'Commander Path',
        description: 'Leaders who inspire allies, boost morale, and maintain unit cohesion.'
      },
      coordinator: {
        id: 'coordinator',
        name: 'Coordinator Path',
        description: 'Experts at logistics, communication, and multi‑team operational control.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You take command as a Field Officer.');
      player.setMeta('class', 'modern_field_officer');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('officer_path')) {
        player.setMeta('officer_path', null);
      }

      // Command training
      if (!player.getMeta('command_training')) {
        player.setMeta('command_training', {
          bonus: 0
        });
      }

      // Officer techniques
      if (!player.getMeta('officer_technique')) {
        player.setMeta('officer_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
