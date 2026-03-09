// bundles/my-d20-bundle/lib/classes/modern/prestige/menace_manual/modern_demonologist.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const demonologistPowers = require('../../../data/powers/modern_demonologist_powers');

  return {
    id: 'modern_demonologist',
    name: 'Demonologist (Menace Manual Prestige)',
    origin: 'modern',
    description: 'A summoner and binder of infernal entities who wields demonic power through dangerous pacts and rituals.',

    hitDie: 6,
    maxLevel: 5,

    prerequisites: {
      skills: {
        knowledge_arcana: 6,
        knowledge_religion: 6,
        concentration: 4
      },
      feats: ['ritual_caster'],
      special: 'Must have contacted, witnessed, or survived an encounter with a fiendish or infernal creature.'
    },

    classSkills: [
      'concentration',
      'craft',
      'decipher_script',
      'diplomacy',
      'intimidate',
      'gather_information',
      'knowledge_arcana',
      'knowledge_religion',
      'knowledge_shadow',
      'linguistics',
      'perception',
      'profession',
      'research',
      'sense_motive',
      'spellcraft'
    ],

    abilities: {
      1: ['demonologist_path_feature_1', 'infernal_pact_1'],
      2: ['demonologist_technique_1'],
      3: ['demonologist_path_feature_2'],
      4: ['demonologist_technique_2'],
      5: ['master_demonologist']
    },

    // Infernal summoning subsystem (MU‑D20 normalized)
    powers: {
      mode: 'per_day',
      ability: 'charisma',
      powerList: demonologistPowers,

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
      binder: {
        id: 'binder',
        name: 'Binder Path',
        description: 'Demonologists who specialize in binding circles, containment, and infernal control.'
      },
      summoner: {
        id: 'summoner',
        name: 'Summoner Path',
        description: 'Practitioners who call forth fiends to serve, fight, or negotiate.'
      },
      pact_maker: {
        id: 'pact_maker',
        name: 'Pact Maker Path',
        description: 'Ritualists who forge dangerous bargains with infernal powers for unique abilities.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Infernal whispers echo around you as you become a Demonologist.');
      player.setMeta('class', 'modern_demonologist');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('demonologist_path')) {
        player.setMeta('demonologist_path', null);
      }

      // Infernal pact progression
      if (!player.getMeta('infernal_pact')) {
        player.setMeta('infernal_pact', {
          bonus: 0
        });
      }

      // Demonologist techniques
      if (!player.getMeta('demonologist_technique')) {
        player.setMeta('demonologist_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
