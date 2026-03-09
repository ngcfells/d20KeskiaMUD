// bundles/my-d20-bundle/lib/classes/modern/prestige/menace_manual/modern_blood_witch.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const bloodWitchSpells = require('../../../data/spells/modern_blood_witch_spells');

  return {
    id: 'modern_blood_witch',
    name: 'Blood Witch (Menace Manual Prestige)',
    origin: 'modern',
    description: 'A dark ritualist who manipulates blood, life force, and forbidden vampiric magic.',

    hitDie: 6,
    maxLevel: 5,

    prerequisites: {
      skills: {
        knowledge_arcana: 6,
        knowledge_shadow: 4,
        concentration: 4
      },
      feats: ['ritual_caster'],
      special: 'Must have performed a blood ritual or survived an encounter with a vampiric creature.'
    },

    classSkills: [
      'concentration',
      'craft',
      'decipher_script',
      'diplomacy',
      'gather_information',
      'heal',
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
      1: ['blood_path_feature_1', 'blood_magic_1'],
      2: ['blood_technique_1'],
      3: ['blood_path_feature_2'],
      4: ['blood_technique_2'],
      5: ['master_blood_witch']
    },

    // Blood magic subsystem (MU‑D20 normalized)
    spellcasting: {
      mode: 'prepared',
      ability: 'constitution',
      spellList: bloodWitchSpells,

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
      sanguine_ritualist: {
        id: 'sanguine_ritualist',
        name: 'Sanguine Ritualist Path',
        description: 'Blood witches who specialize in rites, sacrifices, and life‑force manipulation.'
      },
      crimson_hexer: {
        id: 'crimson_hexer',
        name: 'Crimson Hexer Path',
        description: 'Casters who inflict curses, bleeding afflictions, and vampiric debilitation.'
      },
      life_drain_mystic: {
        id: 'life_drain_mystic',
        name: 'Life Drain Mystic Path',
        description: 'Practitioners who siphon vitality, heal through harm, and channel stolen life.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'A chill runs through your veins as you embrace the path of the Blood Witch.');
      player.setMeta('class', 'modern_blood_witch');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('blood_path')) {
        player.setMeta('blood_path', null);
      }

      // Blood magic progression
      if (!player.getMeta('blood_magic')) {
        player.setMeta('blood_magic', {
          bonus: 0
        });
      }

      // Blood witch techniques
      if (!player.getMeta('blood_technique')) {
        player.setMeta('blood_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
