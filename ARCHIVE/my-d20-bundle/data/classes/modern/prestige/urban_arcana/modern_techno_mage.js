// bundles/my-d20-bundle/lib/classes/modern/prestige/urban_arcana/modern_techno_mage.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const technoSpells = require('../../../data/spells/modern_techno_spells');

  return {
    id: 'modern_techno_mage',
    name: 'Techno Mage (Urban Arcana Prestige)',
    origin: 'modern',
    description: 'A spellcaster who fuses arcane magic with modern technology, creating technomantic devices and digital sorcery.',

    hitDie: 6,
    maxLevel: 5,

    prerequisites: {
      skills: {
        knowledge_arcana: 6,
        computers: 6,
        repair: 4
      },
      feats: ['gearhead'],
      spellcasting: true // must be able to cast arcane spells
    },

    classSkills: [
      'computers',
      'concentration',
      'craft',
      'decipher_script',
      'diplomacy',
      'gather_information',
      'knowledge_arcana',
      'knowledge_technology',
      'linguistics',
      'perception',
      'profession',
      'repair',
      'research',
      'sense_motive',
      'spellcraft'
    ],

    abilities: {
      1: ['techno_path_feature_1', 'technomancy_1'],
      2: ['techno_technique_1'],
      3: ['techno_path_feature_2'],
      4: ['techno_technique_2'],
      5: ['master_techno_mage']
    },

    // Spellcasting subsystem (MU‑D20 normalized)
    spellcasting: {
      mode: 'prepared',
      ability: 'intelligence',
      spellList: technoSpells,

      spellSlots: {
        1: { 1: 1 },
        2: { 1: 2 },
        3: { 1: 2, 2: 1 },
        4: { 1: 3, 2: 1 },
        5: { 1: 3, 2: 2 }
      }
    },

    // Prestige-class talent trees → MU‑D20 PATHS
    paths: {
      circuit_mage: {
        id: 'circuit_mage',
        name: 'Circuit Mage Path',
        description: 'Techno mages who weave magic into circuits, devices, and hardware.'
      },
      digital_sorcerer: {
        id: 'digital_sorcerer',
        name: 'Digital Sorcerer Path',
        description: 'Casters who manipulate data, networks, and digital systems with arcane power.'
      },
      arcane_engineer: {
        id: 'arcane_engineer',
        name: 'Arcane Engineer Path',
        description: 'Technomancers who build hybrid magical‑technological constructs and tools.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Circuits hum with arcane power as you become a Techno Mage.');
      player.setMeta('class', 'modern_techno_mage');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('techno_path')) {
        player.setMeta('techno_path', null);
      }

      // Technomancy progression
      if (!player.getMeta('technomancy')) {
        player.setMeta('technomancy', {
          bonus: 0
        });
      }

      // Techno techniques
      if (!player.getMeta('techno_technique')) {
        player.setMeta('techno_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
