// path: ./bundles/my-d20-bundle/data/spelllists/shaman_domains.js
'use strict';

/**
 * Shaman Domain Spell Lists (Expanded by Clan)
 * Format: uncapitalized_snake_case_with_possessives_using_a_seperated_s
 */
module.exports = {
  // --- Standard Shaman Domains ---
  ancestor: {
    1: 'bless', 2: 'aid', 3: 'speak_with_dead', 4: 'restoration',
    5: 'commune', 6: 'legend_lore', 7: 'greater_restoration',
    8: 'discern_location', 9: 'astral_projection'
  },
  spirit: {
    1: 'spirit_shield', 2: 'ghostbane_dirge', 3: 'invisibility_purge',
    4: 'spiritual_ally', 5: 'spirit_self', 6: 'ethereal_jaunt',
    7: 'spirit_sight', 8: 'etherealness', 9: 'astral_projection'
  },
  void: {
    1: 'hypnotism', 2: 'silence', 3: 'deep_slumber', 4: 'dismissal',
    5: 'feeblemind', 6: 'antimagic_field', 7: 'plane_shift',
    8: 'moment_of_prescience', 9: 'overwhelming_presence'
  },
  fury: {
    1: 'doom', 2: 'bull_s_strength', 3: 'bestow_curse', 4: 'fear',
    5: 'righteous_might', 6: 'tenser_s_transformation', 7: 'blasphemy',
    8: 'unholy_aura', 9: 'implosion'
  },

  // --- Great Clan Assignments ---
  crab_clan: {
    available_domains: ['earth', 'protection', 'war', 'grave'],
    // Specialized Kuni Spirit-Binding
    4: 'detect_taint', 5: 'dispel_taint', 8: 'greater_spirit_binding'
  },
  crane_clan: {
    available_domains: ['air', 'ancestor', 'hero', 'meditation'],
    // Specialized Asahina Wards
    1: 'protection_from_evil', 4: 'spell_immunity', 9: 'greater_spell_immunity'
  },
  dragon_clan: {
    available_domains: ['fire', 'knowledge', 'meditation', 'void'],
    // Specialized Togashi Mysticism
    2: 'augury', 4: 'divination', 9: 'foresight'
  },
  lion_clan: {
    available_domains: ['ancestor', 'hero', 'war', 'fury'],
    // Specialized Kitsu Communication
    3: 'speak_with_dead', 5: 'commune_with_spirit', 7: 'resurrection'
  },
  phoenix_clan: {
    available_domains: ['air', 'earth', 'fire', 'water', 'void'],
    // Elemental Mastery
    1: 'endure_elements', 5: 'commune_with_nature', 9: 'elemental_swarm'
  },
  scorpion_clan: {
    available_domains: ['knowledge', 'trickery', 'shadow', 'grave'],
    // Specialized Kuroiban Infiltration
    2: 'detect_thoughts', 4: 'invisibility', 6: 'greater_dispelling'
  },
  unicorn_clan: {
    available_domains: ['animal', 'nature', 'travel', 'spirit'],
    // Specialized Iuchi Wayfinding
    1: 'know_direction', 4: 'air_walk', 7: 'find_the_path'
  },

  // --- Minor Clan Highlights ---
  fox_clan: {
    available_domains: ['animal', 'nature', 'spirit'],
    specialty: 'kitsune_kinship'
  },
  falcon_clan: {
    available_domains: ['divination', 'grave', 'spirit'],
    specialty: 'ghost_hunting'
  },
  mantis_clan: {
    available_domains: ['river', 'storm', 'water', 'wealth'],
    specialty: 'weather_navigation'
  },
  dragonfly_clan: {
    available_domains: ['air', 'divination', 'meditation'],
    specialty: 'fate_weaving'
  }
};
