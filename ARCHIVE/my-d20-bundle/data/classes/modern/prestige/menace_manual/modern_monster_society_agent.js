// bundles/my-d20-bundle/lib/classes/modern/prestige/menace_manual/modern_monster_society_agent.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const monsterSocietyPowers = require('../../../data/powers/modern_monster_society_agent_powers');

  return {
    id: 'modern_monster_society_agent',
    name: 'Monster Society Agent (Menace Manual Prestige)',
    origin: 'modern',
    description: 'An operative who works with or within the Monster Society, specializing in supernatural diplomacy, manipulation, and covert influence.',

    hitDie: 8,
    maxLevel: 5,

    prerequisites: {
      skills: {
        diplomacy: 6,
        sense_motive: 6,
        knowledge_shadow: 4,
        gather_information: 4
      },
      feats: ['trustworthy'],
      special: 'Must have been contacted by or performed a mission for the Monster Society.'
    },

    classSkills: [
      'acrobatics',
      'bluff',
      'computers',
      'diplomacy',
      'disguise',
      'escape_artist',
      'gather_information',
      'intimidate',
      'knowledge_arcana',
      'knowledge_shadow',
      'linguistics',
      'listen',
      'move_silently',
      'perception',
      'profession',
      'research',
      'search',
      'sense_motive'
    ],

    abilities: {
      1: ['monster_society_path_feature_1', 'society_training_1'],
      2: ['monster_society_technique_1'],
      3: ['monster_society_path_feature_2'],
      4: ['monster_society_technique_2'],
      5: ['master_monster_society_agent']
    },

    // Monster-liaison subsystem (MU‑D20 normalized)
    powers: {
      mode: 'per_encounter',
      ability: 'charisma',
      powerList: monsterSocietyPowers,

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
      negotiator: {
        id: 'negotiator',
        name: 'Negotiator Path',
        description: 'Agents who specialize in diplomacy, supernatural negotiation, and cross-species mediation.'
      },
      manipulator: {
        id: 'manipulator',
        name: 'Manipulator Path',
        description: 'Operatives who excel in deception, influence, and political maneuvering among monstrous factions.'
      },
      shadow_liaison: {
        id: 'shadow_liaison',
        name: 'Shadow Liaison Path',
        description: 'Agents who act as intermediaries between human organizations and creatures of the Shadow.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You step into the shadows of supernatural politics as a Monster Society Agent.');
      player.setMeta('class', 'modern_monster_society_agent');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('monster_society_path')) {
        player.setMeta('monster_society_path', null);
      }

      // Society training progression
      if (!player.getMeta('society_training')) {
        player.setMeta('society_training', {
          bonus: 0
        });
      }

      // Monster Society techniques
      if (!player.getMeta('monster_society_technique')) {
        player.setMeta('monster_society_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
