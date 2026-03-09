// bundles/my-d20-bundle/lib/classes/modern/prestige/urban_arcana/modern_shadowmind.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  const shadowmindPowers = require('../../../data/powers/modern_shadowmind_powers');

  return {
    id: 'modern_shadowmind',
    name: 'Shadowmind (Urban Arcana Prestige)',
    origin: 'modern',
    description: 'A psionic adept who channels Shadow energy into mental powers, blending telepathy, clairvoyance, and extradimensional influence.',

    hitDie: 6,
    maxLevel: 5,

    prerequisites: {
      skills: {
        concentration: 6,
        knowledge_shadow: 6,
        autohypnosis: 4
      },
      feats: ['psionic_sensitivity'],
      psionics: true // must have psionic ability
    },

    classSkills: [
      'autohypnosis',
      'bluff',
      'concentration',
      'diplomacy',
      'gather_information',
      'intimidate',
      'knowledge_psionics',
      'knowledge_shadow',
      'linguistics',
      'perception',
      'profession',
      'research',
      'sense_motive'
    ],

    abilities: {
      1: ['shadowmind_path_feature_1', 'shadow_psionics_1'],
      2: ['shadowmind_technique_1'],
      3: ['shadowmind_path_feature_2'],
      4: ['shadowmind_technique_2'],
      5: ['master_shadowmind']
    },

    // Psionic subsystem (MU‑D20 normalized)
    psionics: {
      mode: 'power_points',
      ability: 'wisdom',
      powerList: shadowmindPowers,

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
      shadow_telepath: {
        id: 'shadow_telepath',
        name: 'Shadow Telepath Path',
        description: 'Psions who blend telepathy with Shadow influence to manipulate thoughts and emotions.'
      },
      void_seer: {
        id: 'void_seer',
        name: 'Void Seer Path',
        description: 'Mystics who perceive extradimensional truths and sense disturbances in the Shadow.'
      },
      mind_stalker: {
        id: 'mind_stalker',
        name: 'Mind Stalker Path',
        description: 'Infiltrators who use psionics and Shadow stealth to penetrate defenses and extract secrets.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'Your mind darkens and expands as you become a Shadowmind.');
      player.setMeta('class', 'modern_shadowmind');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('shadowmind_path')) {
        player.setMeta('shadowmind_path', null);
      }

      // Shadow psionics progression
      if (!player.getMeta('shadow_psionics')) {
        player.setMeta('shadow_psionics', {
          bonus: 0
        });
      }

      // Shadowmind techniques
      if (!player.getMeta('shadowmind_technique')) {
        player.setMeta('shadowmind_technique', {
          known: [],
          active: null
        });
      }
    }
  };
};
