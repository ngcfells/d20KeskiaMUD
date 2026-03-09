// bundles/my-d20-bundle/lib/classes/modern/prestige/urban_arcana/modern_shadow_adept.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const shadowSpells = require('../../../data/spells/modern_shadow_spells');

  return {
    id: 'modern_shadow_adept',
    name: 'Shadow Adept (Urban Arcana Prestige)',
    origin: 'modern',
    description: 'A spellcaster who draws power from the extradimensional Shadow, mastering darkness, illusion, and supernatural distortion.',

    hitDie: 6,
    maxLevel: 5,

    prerequisites: {
      skills: {
        knowledge_arcana: 6,
        knowledge_shadow: 6,
        concentration: 4
      },
      spellcasting: true // must be able to cast arcane spells
    },

    classSkills: [
      'concentration',
      'craft',
      'decipher_script',
      'diplomacy',
      'gather_information',
      'intimidate',
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
      1: ['shadow_path_feature_1', 'shadow_attunement_1'],
      2: ['shadow_technique_1'],
      3: ['shadow_path_feature_2'],
      4: ['shadow_technique_2'],
      5: ['master_shadow_adept']
    },

    // Spellcasting subsystem (MU‑D20 normalized)
    spellcasting: {
      mode: 'prepared',
      ability: 'intelligence',
      spellList: shadowSpells,

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
      shadowcaster: {
        id: 'shadowcaster',
        name: 'Shadowcaster Path',
        description: 'Masters of darkness, concealment, and extradimensional manipulation.'
      },
      illusionist: {
        id: 'illusionist',
        name: 'Illusionist Path',
        description: 'Adept spellcasters who bend perception, create phantasms, and distort reality.'
      },
      voidcaller: {
        id: 'voidcaller',
        name: 'Voidcaller Path',
        description: 'Casters who channel the deeper, more dangerous aspects of the Shadow.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'The Shadow answers your call as a Shadow Adept.');
      player.setMeta('class', 'modern_shadow_adept');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('shadow_path')) {
        player.setMeta('shadow_path', null);
      }

      // Shadow attunement
      if (!player.getMeta('shadow_attunement')) {
        player.setMeta('shadow_attunement', {
          bonus: 0
        });
      }

      // Shadow techniques
      if (!player.getMeta('shadow_technique')) {
        player.setMeta('shadow_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
