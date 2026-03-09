// bundles/my-d20-bundle/lib/classes/modern/prestige/urban_arcana/modern_arcane_arranger.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_arcane_arranger',
    name: 'Arcane Arranger (Urban Arcana Prestige)',
    origin: 'modern',
    description: 'A supernatural fixer who uses magic, influence, and connections to arrange deals and manipulate outcomes.',

    hitDie: 6,
    maxLevel: 5,

    prerequisites: {
      skills: {
        diplomacy: 6,
        gather_information: 6,
        knowledge_arcana: 6
      },
      feats: ['negotiator'],
      spellcasting: true // must be able to cast arcane spells
    },

    classSkills: [
      'bluff',
      'diplomacy',
      'disguise',
      'gather_information',
      'knowledge_arcana',
      'knowledge_shadow',
      'linguistics',
      'perception',
      'profession',
      'research',
      'sense_motive',
      'spellcraft'
    ],

    abilities: {
      1: ['arranger_path_feature_1', 'arcane_broker_1'],
      2: ['arranger_technique_1'],
      3: ['arranger_path_feature_2'],
      4: ['arranger_technique_2'],
      5: ['master_arranger']
    },

    // Prestige-class talent trees → MU‑D20 PATHS
    paths: {
      broker: {
        id: 'broker',
        name: 'Broker Path',
        description: 'Masters of magical negotiation, supernatural deals, and arcane contracts.'
      },
      fixer: {
        id: 'fixer',
        name: 'Fixer Path',
        description: 'Arrangers who specialize in contacts, networks, and supernatural favors.'
      },
      manipulator: {
        id: 'manipulator',
        name: 'Manipulator Path',
        description: 'Arcane influencers who subtly bend events, minds, and outcomes.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You step into the shadows of influence as an Arcane Arranger.');
      player.setMeta('class', 'modern_arcane_arranger');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('arranger_path')) {
        player.setMeta('arranger_path', null);
      }

      // Arcane broker progression
      if (!player.getMeta('arcane_broker')) {
        player.setMeta('arcane_broker', {
          bonus: 0
        });
      }

      // Techniques
      if (!player.getMeta('arranger_technique')) {
        player.setMeta('arranger_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
