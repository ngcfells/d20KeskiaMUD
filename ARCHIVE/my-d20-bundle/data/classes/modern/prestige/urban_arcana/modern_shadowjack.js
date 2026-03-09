// bundles/my-d20-bundle/lib/classes/modern/prestige/urban_arcana/modern_shadowjack.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const shadowjackPowers = require('../../../data/powers/modern_shadowjack_powers');

  return {
    id: 'modern_shadowjack',
    name: 'Shadowjack (Urban Arcana Prestige)',
    origin: 'modern',
    description: 'A supernatural hacker who manipulates digital systems and the extradimensional Shadow to infiltrate, disrupt, and control.',

    hitDie: 6,
    maxLevel: 5,

    prerequisites: {
      skills: {
        computers: 6,
        knowledge_shadow: 6,
        gather_information: 4
      },
      feats: ['gearhead', 'shadow_sensitivity'],
      special: 'Must have successfully hacked a Shadow‑tainted or supernatural system.'
    },

    classSkills: [
      'computers',
      'concentration',
      'craft',
      'decipher_script',
      'disable_device',
      'escape_artist',
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
      1: ['shadowjack_path_feature_1', 'shadow_hacking_1'],
      2: ['shadowjack_technique_1'],
      3: ['shadowjack_path_feature_2'],
      4: ['shadowjack_technique_2'],
      5: ['master_shadowjack']
    },

    // Hybrid psionic/arcane/digital subsystem (MU‑D20 normalized)
    powers: {
      mode: 'power_points',
      ability: 'intelligence',
      powerList: shadowjackPowers,

      powerPoints: {
        1: 2,
        2: 4,
        3: 7,
        4: 11,
        5: 16
      }
    },

    // Prestige-class talent trees → MU‑D20 PATHS
    paths: {
      shadow_hacker: {
        id: 'shadow_hacker',
        name: 'Shadow Hacker Path',
        description: 'Experts at breaching systems infused with Shadow, bypassing both digital and magical security.'
      },
      ghost_coder: {
        id: 'ghost_coder',
        name: 'Ghost Coder Path',
        description: 'Hackers who become digital phantoms, leaving no trace and slipping through networks unseen.'
      },
      arcane_intruder: {
        id: 'arcane_intruder',
        name: 'Arcane Intruder Path',
        description: 'Operatives who blend spellcraft with intrusion, disrupting magical and technological systems alike.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You slip between data and darkness as you become a Shadowjack.');
      player.setMeta('class', 'modern_shadowjack');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('shadowjack_path')) {
        player.setMeta('shadowjack_path', null);
      }

      // Shadow hacking progression
      if (!player.getMeta('shadow_hacking')) {
        player.setMeta('shadow_hacking', {
          bonus: 0
        });
      }

      // Shadowjack techniques
      if (!player.getMeta('shadowjack_technique')) {
        player.setMeta('shadowjack_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
