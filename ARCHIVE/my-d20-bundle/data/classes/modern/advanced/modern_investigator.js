// bundles/my-d20-bundle/lib/classes/modern/advanced/modern_investigator.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_investigator',
    name: 'Investigator (d20 Modern Advanced)',
    origin: 'modern',
    description: 'A skilled detective who excels in deduction, interrogation, forensics, and uncovering hidden truths.',

    hitDie: 8,
    maxLevel: 10,

    prerequisites: {
      skills: {
        investigate: 4,
        sense_motive: 2
      }
    },

    classSkills: [
      'bluff',
      'computers',
      'decipher_script',
      'disable_device',
      'disguise',
      'gather_information',
      'investigate',
      'knowledge_behavioral',
      'knowledge_civics',
      'knowledge_criminal',
      'knowledge_earth',
      'knowledge_life',
      'knowledge_physical',
      'listen',
      'perception',
      'profession',
      'research',
      'search',
      'sense_motive'
    ],

    abilities: {
      1: ['investigator_path_feature_1', 'casework_training_1'],
      2: ['bonus_feat_1'],
      3: ['investigation_technique_1'],
      4: ['casework_training_2'],
      5: ['investigator_path_feature_2'],
      6: ['bonus_feat_2'],
      7: ['investigation_technique_2'],
      8: ['casework_training_3'],
      9: ['investigator_path_feature_3'],
      10: ['perfect_investigator']
    },

    // d20 Modern "talent trees" → MU‑D20 PATHS
    paths: {
      detective: {
        id: 'detective',
        name: 'Detective Path',
        description: 'Experts in deduction, interrogation, and solving complex cases.'
      },
      forensic: {
        id: 'forensic',
        name: 'Forensic Path',
        description: 'Investigators skilled in evidence analysis, lab work, and crime scene processing.'
      },
      profiler: {
        id: 'profiler',
        name: 'Profiler Path',
        description: 'Specialists in behavioral analysis, motive identification, and psychological insight.'
      },
      surveillance: {
        id: 'surveillance',
        name: 'Surveillance Path',
        description: 'Operatives who excel in tracking, tailing, and remote observation.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You sharpen your instincts as an Investigator.');
      player.setMeta('class', 'modern_investigator');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 3000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('investigator_path')) {
        player.setMeta('investigator_path', null);
      }

      // Casework training
      if (!player.getMeta('casework_training')) {
        player.setMeta('casework_training', {
          bonus: 0
        });
      }

      // Investigation techniques
      if (!player.getMeta('investigation_technique')) {
        player.setMeta('investigation_technique', {
          known: [],
          active: null
        });
      }

      // Bonus feats
      if (!player.getMeta('bonus_feats')) {
        player.setMeta('bonus_feats', {
          count: 0
        });
      }
    }
  };
};
