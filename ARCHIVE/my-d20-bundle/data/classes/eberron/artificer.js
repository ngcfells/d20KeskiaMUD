// bundles/my-d20-bundle/data/classes/pc/artificer.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const { Broadcast } = src;

  // Infusion lists tiered by level access (similar to warlock invocation tiers)
  const infusionList = require('../../infusions/artificer_infusions');

  return {
    id: 'artificer',
    name: 'Artificer',
    description: 'A master of magical mechanics who does not cast spells, but imbues items with arcane essence.',
    hitDie: 6,

    classSkills: [
      'appraise', 'concentration', 'craft', 'decipher_script', 'disable_device', 
      'knowledge_arcana', 'knowledge_architecture', 'open_lock', 'profession', 
      'search', 'spellcraft', 'use_magic_device'
    ],

    abilities: {
      1: ['artificer_knowledge', 'artisan_bonus', 'trapfinding', 'scribe_scroll', 'infusion_tier_1'],
      2: ['brew_potion'],
      3: ['craft_wondrous_item', 'infusion_tier_2'],
      4: ['bonus_feat_artificer_1', 'craft_homunculus'],
      5: ['craft_magic_arms_and_armor', 'retain_essence', 'infusion_tier_3'],
      6: ['metamagic_spell_trigger'],
      7: ['craft_wand', 'infusion_tier_4'],
      8: ['bonus_feat_artificer_2'],
      9: ['craft_rod', 'infusion_tier_5'],
      11: ['metamagic_spell_completion', 'infusion_tier_6'],
      12: ['bonus_feat_artificer_3', 'craft_staff'],
      13: ['skill_mastery_artificer'],
      14: ['forge_ring'],
      16: ['bonus_feat_artificer_4'],
      20: ['bonus_feat_artificer_5']
    },

    // Artificers do NOT use traditional spell slots in this configuration
    spellcasting: null,

    infusions: {
      list: infusionList,
      tiers: ['1st_level', '2nd_level', '3rd_level', '4th_level', '5th_level', '6th_level']
    },

    setup: player => {
      Broadcast.sayAt(player, 'You begin your journey as an Artificer, learning to weave magic into the very fabric of objects.');
      player.setMeta('class', 'artificer');

      player.setMeta('training_progress', {
        skills: {},
        attributes: {},
        feats: { exp: 0, goal: 2500 },
        masteries: {},
        // 3.5 Specific Craft Reserve
        craft_reserve: 20 
      });

      // Track known infusions by tier
      if (!player.getMeta('infusions')) {
        player.setMeta('infusions', {
          '1st_level': [],
          '2nd_level': [],
          '3rd_level': [],
          '4th_level': [],
          '5th_level': [],
          '6th_level': []
        });
      }

      // Track active item enhancements
      if (!player.getMeta('active_enhancements')) {
        player.setMeta('active_enhancements', []);
      }
    }
  };
};
