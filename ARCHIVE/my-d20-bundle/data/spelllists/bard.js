'use strict';

/**
 * Bard Spell List
 * MU‑D20 Unified Hybrid List (SRD + Pathfinder + Mongoose + Green Ronin + Rite)
 *
 * Exported as:
 *   { [spellLevel: number]: string[] }
 */
module.exports = {
  0: [
    'amanuensis', 'dancing_lights', 'daze', 'detect_magic', 'flare',
    'ghost_sound', 'know_direction', 'light', 'lullaby', 'mage_hand',
    'mending', 'message', 'open_close', 'prestidigitation', 'read_magic',
    'resistance', 'songbird (mongoose)', 'summon_instrument', 'virtue'
  ],

  1: [
    'alarm', 'animate_rope', 'bane', 'cause_fear', 'charm_person', 'comprehend_languages',
    'confusion_lesser', 'cure_light_wounds', 'detect_secret_doors', 'disguise_self',
    'erase', 'expeditious_retreat', 'feather_fall', 'focus_mind (green_ronin)',
    'grease', 'hideous_laughter', 'hypnotism', 'identify', 'insidious_rhythm (mongoose)',
    'joyful_noise (spc)', 'magic_mouth', 'obscure_object', 'remove_fear', 'silent_image',
    'sleep', 'song_of_valor (aeg)', 'summon_monster_i', 'undetectable_alignment',
    'unseen_servant', 'ventriloquism'
  ],

  2: [
    'alter_self', 'animal_messenger', 'animal_trance', 'blindness_deafness', 'blur',
    'calm_emotions', 'cat_s_grace', 'cure_moderate_wounds', 'darkness', 'daze_monster',
    'delay_poison', 'detect_thoughts', 'eagle_s_splendor', 'enthrall', 'enticing_gift (rite)',
    'fox_s_cunning', 'glitterdust', 'harmonize (spc)', 'heroism', 'hypnotic_pattern',
    'invisibility', 'locate_object', 'minor_image', 'mirror_image', 'misdirection',
    'pyrotechnics', 'rage', 'scare', 'shatter', 'silence', 'sound_burst', 'suggestion',
    'summon_monster_ii', 'tongues_lesser', 'whispering_wind'
  ],

  3: [
    'blink', 'charm_monster', 'clairaudience_clairvoyance', 'confusion', 'crushing_despair',
    'cure_serious_wounds', 'daylight', 'deep_slumber', 'dispel_magic', 'displacement',
    'fear', 'gaseous_form', 'geas_lesser', 'glibness', 'good_hope', 'haste', 'illusory_script',
    'invisibility_sphere', 'major_image', 'phantom_steed', 'remove_curse', 'scrying',
    'sculpt_sound', 'secret_page', 'see_invisibility', 'slow', 'song_of_discord',
    'speak_with_animals', 'summon_monster_iii', 'tiny_hut', 'tongues'
  ],

  4: [
    'break_enchantment', 'cure_critical_wounds', 'detect_scrying', 'dimension_door',
    'dominate_person', 'freedom_of_movement', 'hallucinatory_terrain', 'hold_monster',
    'invisibility_greater', 'legend_lore', 'locate_creature', 'modify_memory',
    'neutralize_poison', 'rainbow_pattern', 'repel_vermin', 'resonance (mongoose)',
    'shadow_conjuration', 'shout', 'speak_with_plants', 'summon_monster_iv', 'zone_of_silence'
  ],

  5: [
    'cure_light_wounds_mass', 'dispel_magic_greater', 'dream', 'false_vision', 'heroism_greater',
    'mind_fog', 'mirage_arcana', 'mislead', 'nightmare', 'persistent_image', 'planar_binding_lesser',
    'seeming', 'shadow_evocation', 'song_of_lethargy (aeg)', 'suggestion_mass', 'summon_monster_v'
  ],

  6: [
    'analyze_dweomer', 'animate_objects', 'cat_s_grace_mass', 'charm_monster_mass',
    'cure_moderate_wounds_mass', 'eagle_s_splendor_mass', 'eyebite', 'find_the_path',
    'fox_s_cunning_mass', 'geas_quest', 'heroes_feast', 'irresistible_dance', 'otiluke_s_resilient_sphere',
    'permanent_image', 'programmed_image', 'project_image', 'scrying_greater', 'shout_greater',
    'summon_monster_vi', 'sympathetic_vibration', 'veil'
  ]
};
