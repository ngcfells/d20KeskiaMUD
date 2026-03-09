// bundles/my-d20-bundle/lib/classes/modern/prestige/urban_arcana/modern_shadow_warrior.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const shadowWarriorPowers = require('../../../data/powers/modern_shadow_warrior_powers');

  return {
    id: 'modern_shadow_warrior',
    name: 'Shadow Warrior (Urban Arcana Prestige)',
    origin: 'modern',
    description: 'A martial combatant who channels Shadow energy into supernatural agility, stealth, and devastating strikes.',

    hitDie: 10,
    maxLevel: 5,

    prerequisites: {
      skills: {
        hide: 6,
        move_silently: 6,
        knowledge_shadow: 4
      },
      feats: ['combat_reflexes'],
      special: 'Must have fought and survived an encounter with a Shadow creature.'
    },

    classSkills: [
      'acrobatics',
      'athletics',
      'balance',
      'escape_artist',
      'hide',
      'intimidate',
      'jump',
      'knowledge_shadow',
      'listen',
      'move_silently',
      'perception',
      'profession',
      'search',
      'sense_motive',
      'tumble'
    ],

    abilities: {
      1: ['shadow_warrior_path_feature_1', 'shadow_fury_1'],
      2: ['shadow_warrior_technique_1'],
      3: ['shadow_warrior_path_feature_2'],
      4: ['shadow_warrior_technique_2'],
      5: ['perfect_shadow_warrior']
    },

    // Shadow‑infused martial subsystem (MU‑D20 normalized)
    powers: {
      mode: 'per_encounter',
      ability: 'dexterity',
      powerList: shadowWarriorPowers,

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
      shadow_blade: {
        id: 'shadow_blade',
        name: 'Shadow Blade Path',
        description: 'Warriors who channel Shadow energy into their weapons and strikes.'
      },
      nightstalker: {
        id: 'nightstalker',
        name: 'Nightstalker Path',
        description: 'Stealthy fighters who move unseen and strike from darkness.'
      },
      void_dancer: {
        id: 'void_dancer',
        name: 'Void Dancer Path',
        description: 'Combatants who manipulate extradimensional space for agility and evasion.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Shadow flows through your movements as you become a Shadow Warrior.');
      player.setMeta('class', 'modern_shadow_warrior');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('shadow_warrior_path')) {
        player.setMeta('shadow_warrior_path', null);
      }

      // Shadow fury progression
      if (!player.getMeta('shadow_fury')) {
        player.setMeta('shadow_fury', {
          bonus: 0
        });
      }

      // Shadow warrior techniques
      if (!player.getMeta('shadow_warrior_technique')) {
        player.setMeta('shadow_warrior_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
