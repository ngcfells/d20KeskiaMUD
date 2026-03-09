'use strict';

/**
 * Savant Spell List
 * D&D 3.5 official list (Dragon Magazine #332)
 *
 * Exported as:
 *   { [spellLevel: number]: string[] }
 */
module.exports = {
  0: [
    'arcane_mark', 'dancing_lights', 'daze', 'detect_magic', 'detect_poison',
    'flare', 'ghost_sound', 'light', 'mage_hand', 'mending', 'open_close',
    'prestidigitation', 'ray_of_frost', 'read_magic', 'resistance',
    'create_water', 'cure_minor_wounds', 'guidance', 'know_direction',
    'purify_food_and_drink', 'virtue'
  ],

  1: [
    'alarm', 'charm_person', 'comprehend_languages', 'detect_secret_doors',
    'detect_undead', 'erase_identity', 'expeditious_retreat', 'hypnotism',
    'identify', 'magic_aura', 'obscuring_mist', 'sleep', 'true_strike',
    'unseen_servant', 'calm_animals', 'cure_light_wounds', 'detect_animals_or_plants',
    'detect_snares_and_pits', 'goodberry', 'pass_without_trace', 'speak_with_animals'
  ],

  2: [
    'arcane_lock', 'blindness_deafness', 'blur', 'daze_monster', 'detect_thoughts',
    'fog_cloud', 'glitterdust', 'hypnotic_pattern', 'invisibility', 'locate_object',
    'magic_mouth', 'mirror_image', 'misdirection', 'see_invisibility', 'touch_of_idiocy',
    'barkskin', 'cure_moderate_wounds', 'delay_poison', 'fog_cloud', 'lesser_restoration',
    'remove_paralysis', 'resist_energy', 'speak_with_plants'
  ],

  3: [
    'arcane_sight', 'clairaudience_clairvoyance', 'deep_slumber', 'dispel_magic',
    'displacement', 'haste', 'illusory_script', 'invisibility_sphere', 'nondetection',
    'secret_page', 'sepia_snake_sigil', 'slow', 'suggestion', 'tongues',
    'cure_serious_wounds', 'neutralize_poison', 'remove_blindness_deafness',
    'remove_curse', 'remove_disease', 'water_breathing'
  ],

  4: [
    'arcane_eye', 'charm_monster', 'confusion', 'detect_scrying', 'dimension_door',
    'greater_invisibility', 'hallucinatory_terrain', 'lesser_geas', 'locate_creature',
    'minor_creation', 'modify_memory', 'rainbow_pattern', 'scrying', 'solid_fog',
    'cure_critical_wounds', 'death_ward', 'freedom_of_movement', 'restoration'
  ]
};
