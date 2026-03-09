'use strict';

/**
 * Sha'ir Spell List (3.5 Standard)
 * Reference: Dragon Compendium / Dragon Magazine #315
 * 
 * Access: 
 * - Full Sorcerer/Wizard (Arcane)
 * - Specific Divine Domains (Air, Chaos, Earth, Fire, Knowledge, Law, Luck, Sun, Water)
 */
module.exports = {
  // Arcane Spells (Categorized by Level)
  arcane: require('./wizard_sorcerer_list'),

  // Divine Domain Access (The Sha'ir can "fetch" these with a higher DC)
  divine_domains: [
    'air', 'chaos', 'earth', 'fire', 'knowledge', 'law', 'luck', 'sun', 'water'
  ],

  // Common Retrieval Targets (Level 0-2 Examples)
  0: [
    'acid_splash', 'arcane_mark', 'dancing_lights', 'daze', 'detect_magic',
    'detect_poison', 'flare', 'ghost_sound', 'light', 'mage_hand',
    'mending', 'message', 'open_close', 'prestidigitation', 'ray_of_frost',
    'read_magic', 'resistance', 'touch_of_fatigue'
  ],

  1: [
    'alarm', 'burning_hands', 'cause_fear', 'charm_person', 'color_spray',
    'comprehend_languages', 'detect_secret_doors', 'detect_undead', 'disguise_self',
    'endure_elements', 'enlarge_person', 'expeditious_retreat', 'feather_fall',
    'grease', 'hold_portal', 'identify', 'mage_armor', 'magic_missile',
    'magic_weapon', 'mount', 'obscuring_mist', 'protection_from_chaos',
    'protection_from_evil', 'ray_of_enfeeblement', 'shield', 'shocking_grasp',
    'silent_image', 'sleep', 'true_strike', 'unseen_servant'
  ],

  2: [
    'alter_self', 'arcane_lock', 'bear_s_endurance', 'blindness_deafness',
    'blur', 'bull_s_strength', 'cat_s_grace', 'continual_flame', 'darkness',
    'darkvision', 'daze_monster', 'detect_thoughts', 'eagle_s_splendor',
    'false_life', 'flaming_sphere', 'fog_cloud', 'fox_s_cunning', 'glitterdust',
    'gust_of_wind', 'hypnotic_pattern', 'invisibility', 'knock', 'levitate',
    'locate_object', 'magic_mouth', 'mirror_image', 'melf_s_acid_arrow',
    'obscure_object', 'owl_s_wisdom', 'pyrotechnics', 'resist_energy',
    'rope_trick', 'scare', 'scorching_ray', 'see_invisibility', 'shatter',
    'spider_climb', 'summon_monster_ii', 'summon_swarm', 'touch_of_idiocy',
    'web', 'whispering_wind'
  ]
};
