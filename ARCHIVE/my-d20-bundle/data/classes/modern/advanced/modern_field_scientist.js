// bundles/my-d20-bundle/lib/classes/modern/advanced/modern_field_scientist.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  return {
    id: 'modern_field_scientist',
    name: 'Field Scientist (d20 Modern Advanced)',
    origin: 'modern',
    description: 'A hands-on researcher skilled in analysis, investigation, environmental science, and field operations.',

    hitDie: 8,
    maxLevel: 10,

    prerequisites: {
      skills: {
        investigate: 4,
        knowledge_life: 4
      }
    },

    classSkills: [
      'computers',
      'craft',
      'decipher_script',
      'demolitions',
      'disable_device',
      'electronics',
      'heal',
      'investigate',
      'knowledge_earth',
      'knowledge_life',
      'knowledge_physical',
      'knowledge_technology',
      'perception',
      'profession',
      'research',
      'search',
      'survival',
      'treat_injury'
    ],

    abilities: {
      1: ['scientist_path_feature_1', 'field_research_1'],
      2: ['bonus_feat_1'],
      3: ['analysis_technique_1'],
      4: ['field_research_2'],
      5: ['scientist_path_feature_2'],
      6: ['bonus_feat_2'],
      7: ['analysis_technique_2'],
      8: ['field_research_3'],
      9: ['scientist_path_feature_3'],
      10: ['perfect_field_scientist']
    },

    // d20 Modern "talent trees" → MU‑D20 PATHS
    paths: {
      forensic: {
        id: 'forensic',
        name: 'Forensic Path',
        description: 'Experts in crime scene analysis, evidence processing, and forensic deduction.'
      },
      environmental: {
        id: 'environmental',
        name: 'Environmental Path',
        description: 'Scientists who specialize in ecosystems, survival conditions, and environmental hazards.'
      },
      biomedical: {
        id: 'biomedical',
        name: 'Biomedical Path',
        description: 'Researchers focused on biology, medicine, pathogens, and chemical analysis.'
      },
      archaeological: {
        id: 'archaeological',
        name: 'Archaeological Path',
        description: 'Field researchers who study ancient sites, artifacts, and historical environments.'
      }
    },

    setup: player => {
      Broadcast.sayAt(player, 'You take your expertise into the field as a Field Scientist.');
      player.setMeta('class', 'modern_field_scientist');
      player.setMeta('origin', 'modern');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 3000 },
        masteries: {}
      });

      // Path selection
      if (!player.getMeta('scientist_path')) {
        player.setMeta('scientist_path', null);
      }

      // Field research
      if (!player.getMeta('field_research')) {
        player.setMeta('field_research', {
          bonus: 0
        });
      }

      // Analysis techniques
      if (!player.getMeta('analysis_technique')) {
        player.setMeta('analysis_technique', {
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
