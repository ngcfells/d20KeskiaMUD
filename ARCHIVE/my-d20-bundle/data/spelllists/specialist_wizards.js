// path: ./bundles/my-d20-bundle/data/spelllists/specialist_wizards.js
'use strict';

/**
 * Specialist Wizard Schools
 * Format: { [schoolName: string]: { [spellLevel: number]: string[] } }
 */
module.exports = {
  abjuration: {
    0: ['resistance'],
    1: ['alarm', 'endure_elements', 'hold_portal', 'protection_from_alignment', 'shield'],
    2: ['arcane_lock', 'obscure_object', 'protection_from_arrows', 'resist_energy'],
    3: ['dispel_magic', 'explosive_runes', 'magic_circle_against_alignment', 'nondetection', 'protection_from_energy'],
    4: ['dimensional_anchor', 'fire_shield', 'lesser_globe_of_invulnerability', 'remove_curse', 'stoneskin'],
    5: ['break_enchantment', 'dismissal', 'mage_s_private_sanctum'],
    6: ['antimagic_field', 'greater_dispel_magic', 'globe_of_invulnerability', 'guards_and_wards', 'repulsion'],
    7: ['banishment', 'sequester', 'spell_turning'],
    8: ['dimensional_lock', 'mind_blank', 'protection_from_spells'],
    9: ['imprisonment', 'mage_s_disjunction', 'prismatic_sphere']
  },
  abyssal: {
    0: ['daze'],
    1: ['cause_fear', 'hypnotism', 'protection_from_good', 'protection_from_law', 'sleep', 'ray_of_enfeeblement'],
    2: ['blindness_deafness', 'darkness', 'daze_monster', 'ghoul_touch', 'scare', 'tashas_hideous_laughter', 'touch_of_idiocy'],
    3: ['blacklight', 'deep_slumber', 'magic_circle_against_good', 'magic_circle_against_law', 'suggestion', 'shivering_touch'],
    4: ['animate_dead', 'crushing_despair', 'confusion', 'contagion', 'enervation', 'fear', 'lesser_geas', 'phantasmal_killer'],
    5: ['dominate_person', 'feeblemind', 'hold_monster', 'mind_fog', 'nightmare', 'symbol_of_pain', 'symbol_of_sleep', 'waves_of_fatigue'],
    6: ['aura_of_terror', 'create_undead', 'eyebite', 'geas_quest', 'greater_heroism', 'mass_suggestion', 'symbol_of_fear', 'mass_contagion'],
    7: ['aberrate', 'ability_rip', 'control_undead', 'insanity', 'power_word_blind', 'symbol_of_hopelessness', 'symbol_of_stunning', 'waves_of_exhaustion'],
    8: ['create_greater_undead', 'demand', 'horrid_wilting', 'mass_charm_monster', 'otto_s_irresistible_dance', 'power_word_stun', 'symbol_of_death'],
    9: ['dominate_monster', 'energy_drain', 'power_word_kill', 'wail_of_the_banshee', 'abyssal_army', 'abyssal_rift']
  },
  blood_magic: {
    // Adds Mongoose "Blood Siphon" and "Life-Burn" spells
    1: ['blood_money', 'blood_transcription', 'cause_fear', 'false_life', 'ray_of_enfeeblement', 'blood_scent'],
    2: ['boiling_blood', 'death_knell', 'ghoul_touch', 'life_blood', 'spectral_hand', 'blood_bind'],
    3: ['blood_biography', 'vampiric_touch', 'halt_undead', 'bestow_curse', 'siphon_life'],
    4: ['animate_dead', 'blood_bolt', 'contagion', 'enervation', 'fear', 'blood_armor'],
    5: ['blood_boil', 'blood_vessel_constriction', 'magic_jar', 'symbol_of_pain', 'waves_of_fatigue', 'infuse_blood'],
    6: ['circle_of_death', 'eyebite', 'flesh_to_stone', 'harm', 'blood_puppet'],
    7: ['control_undead', 'finger_of_death', 'bloody_resurrection', 'waves_of_exhaustion', 'stanch_blood'],
    8: ['clone', 'horrid_wilting', 'symbol_of_death', 'blood_cloud'],
    9: ['energy_drain', 'power_word_kill', 'soul_bind', 'wail_of_the_banshee', 'eternal_blood_bond']
  },
  chaos_wild_magic: {
    // Adds Mongoose "Chaos Flow" mechanics
    0: ['dancing_lights', 'flare', 'ghost_sound', 'prestidigitation', 'wild_mote'],
    1: ['chaos_bolt', 'color_spray', 'entropic_shield', 'grease', 'random_action', 'unpredictable_strike'],
    2: ['blur', 'glitterdust', 'hypnotic_pattern', 'mirror_image', 'shatter', 'vortex_bolt', 'wild_armor'],
    3: ['blink', 'confusion_lesser', 'dispel_magic', 'displacement', 'haste', 'slow', 'chaos_shield'],
    4: ['chaos_hammer', 'confusion', 'otto_s_irresistible_dance_lesser', 'rainbow_pattern', 'wild_strike'],
    5: ['baleful_polymorph', 'chaos_step', 'mind_fog', 'random_teleport', 'seeming', 'chaotic_form'],
    6: ['chain_lightning', 'disintegrate', 'mislead', 'word_of_chaos', 'wild_teleport'],
    7: ['insanity', 'prism_spray', 'reverse_gravity', 'shadow_conjuration_greater', 'chaos_storm'],
    8: ['cloak_of_chaos', 'scintillating_pattern', 'wild_magic_surge_greater', 'greater_chaos_shield'],
    9: ['meteor_swarm', 'shapechange', 'weird', 'wish', 'unleash_chaos']
  },
  chronomancy: {
    // Adds Mongoose "Temporal Tides"
    0: ['guidance','mending','message','minor_chronomancy','preserve_food','temporal_flicker','tick_tock'],
    1: ['anticipate_peril','expeditious_retreat','feather_fall','identify','lesser_time_hop','longstrider','true_strike'],
    2: ['augury','decelerate','delay_poison','false_gravity','gentle_repose','levitate','mirror_image','misty_step','temporal_echo'],
    3: ['blink','dispel_magic','haste','nondetection','sands_of_time','slow','speed_of_thought','time_loop'],
    4: ['accelerate_age','death_ward','freedom_of_movement','greater_invisibility','resilient_sphere','scrying'],
    5: ['accelerate_animal_growth','contact_other_plane','dismissal','legend_lore','mass_haste','past_sight','permanency','reverse_animal_growth','temporal_shunting'],
    6: ['contingency','disintegrate','greater_dispel_magic','mislead','programmed_image','temporal_save','true_seeing'],
    7: ['ethereal_jaunt','greater_scrying','lesser_time_stop','limited_wish','plane_shift','reverse_gravity','sequester'],
    8: ['discern_location','greater_prying_eyes','maze','moment_of_prescience','temporal_reset','temporal_stasis'],
    9: ['astral_projection','chronos_judgment','foresight','gate','shapechange','time_stop','wish']
  },
  conjuration: {
    0: ['acid_splash'],
    1: ['grease', 'mage_armor', 'mount', 'obscuring_mist', 'summon_monster_i', 'unseen_servant'],
    2: ['fog_cloud', 'glitterdust', 'melf_s_acid_arrow', 'summon_monster_ii', 'summon_swarm', 'web'],
    3: ['phantom_steed', 'sepia_snake_sigil', 'sleet_storm', 'stinking_cloud', 'summon_monster_iii'],
    4: ['black_tentacles', 'dimension_door', 'minor_creation', 'solid_fog', 'summon_monster_iv'],
    5: ['cloudkill', 'lesser_planar_binding', 'mage_s_faithful_hound', 'major_creation', 'summon_monster_v', 'teleport', 'wall_of_stone'],
    6: ['acid_fog', 'planar_binding', 'summon_monster_vi', 'wall_of_iron'],
    7: ['greater_teleport', 'mage_s_magnificent_mansion', 'phase_door', 'plane_shift', 'summon_monster_vii'],
    8: ['greater_planar_binding', 'incendiary_cloud', 'maze', 'summon_monster_viii', 'trap_the_soul'],
    9: ['gate', 'summon_monster_ix', 'teleportation_circle']
  },
  divination: {
    0: ['detect_magic', 'detect_poison', 'read_magic'],
    1: ['comprehend_languages', 'detect_secret_doors', 'detect_undead', 'identify'],
    2: ['detect_thoughts', 'locate_object', 'see_invisibility'],
    3: ['arcane_sight', 'clairaudience_clairvoyance', 'tongues'],
    4: ['arcane_eye', 'detect_scrying', 'locate_creature', 'scrying'],
    5: ['contact_other_plane', 'prying_eyes', 'telepathic_bond'],
    6: ['analyze_dweomer', 'legend_lore', 'true_seeing'],
    7: ['greater_arcane_sight', 'greater_scrying', 'vision'],
    8: ['discern_location', 'greater_prying_eyes', 'moment_of_prescience'],
    9: ['foresight']
  },
  enchantment: {
    0: ['daze'],
    1: ['charm_person', 'hypnotism', 'sleep'],
    2: ['daze_monster', 'hideous_laughter', 'touch_of_idiocy'],
    3: ['deep_slumber', 'heroism', 'suggestion'],
    4: ['charm_monster', 'confusion', 'crushing_despair', 'lesser_geas'],
    5: ['dominate_person', 'feeblemind', 'hold_monster', 'mind_fog', 'symbol_of_sleep'],
    6: ['geas_quest', 'greater_heroism', 'mass_suggestion', 'symbol_of_persuasion'],
    7: ['insanity', 'mass_hold_person', 'symbol_of_stunning'],
    8: ['antipathy', 'binding', 'demand', 'mass_charm_monster', 'power_word_stun', 'symbol_of_insanity', 'sympathy'],
    9: ['dominate_monster', 'mass_hold_monster', 'power_word_kill']
  },
  evocation: {
    0: ['dancing_lights', 'flare', 'light', 'ray_of_frost'],
    1: ['burning_hands', 'floating_disk', 'magic_missile', 'shocking_grasp'],
    2: ['continual_flame', 'darkness', 'flaming_sphere', 'gust_of_wind', 'scorching_ray', 'shatter'],
    3: ['daylight', 'fireball', 'lightning_bolt', 'tiny_hut', 'wind_wall'],
    4: ['fire_shield', 'ice_storm', 'otiluke_s_resilient_sphere', 'shout', 'wall_of_fire', 'wall_of_ice'],
    5: ['cone_of_cold', 'interposing_hand', 'sending', 'wall_of_force'],
    6: ['chain_lightning', 'contingency', 'forceful_hand', 'freezing_sphere'],
    7: ['delayed_blast_fireball', 'forcecage', 'grasping_hand', 'mage_s_sword', 'prismatic_spray'],
    8: ['clenched_fist', 'greater_shout', 'polar_ray', 'sunburst'],
    9: ['crushing_hand', 'meteor_swarm']
  },
  illusion: {
    0: ['ghost_sound'],
    1: ['color_spray', 'disguise_self', 'magic_aura', 'silent_image', 'ventriloquism'],
    2: ['blur', 'hypnotic_pattern', 'invisibility', 'magic_mouth', 'mirror_image', 'misdirection', 'phantom_trap'],
    3: ['displacement', 'illusory_script', 'invisibility_sphere', 'major_image'],
    4: ['hallucinatory_terrain', 'illusory_wall', 'invisibility_greater', 'phantasmal_killer', 'rainbow_pattern', 'shadow_conjuration'],
    5: ['dream', 'false_vision', 'mirage_arcana', 'nightmare', 'persistent_image', 'seeming', 'shadow_evocation'],
    6: ['mislead', 'permanent_image', 'programmed_image', 'shadow_walk', 'veil'],
    7: ['greater_shadow_conjuration', 'project_image', 'simulacrum'],
    8: ['greater_shadow_evocation', 'scintillating_pattern', 'screen'],
    9: ['shades', 'weird']
  },
  necromancy: {
    0: ['disrupt_undead', 'touch_of_fatigue'],
    1: ['cause_fear', 'ray_of_enfeeblement'],
    2: ['blindness_deafness', 'command_undead', 'false_life', 'ghoul_touch', 'spectral_hand'],
    3: ['gentle_repose', 'halt_undead', 'ray_of_exhaustion', 'vampiric_touch'],
    4: ['animate_dead', 'bestow_curse', 'contagion', 'enervation', 'fear'],
    5: ['magic_jar', 'symbol_of_pain', 'waves_of_fatigue'],
    6: ['circle_of_death', 'create_undead', 'eyebite', 'symbol_of_fear'],
    7: ['control_undead', 'finger_of_death', 'symbol_of_weakness', 'waves_of_exhaustion'],
    8: ['clone', 'create_greater_undead', 'horrid_wilting', 'symbol_of_death'],
    9: ['astral_projection', 'energy_drain', 'soul_bind', 'wail_of_the_banshee']
  },
  transmutation: {
    0: ['mage_hand', 'mending', 'message', 'open_close'],
    1: ['animate_rope', 'enlarge_person', 'erase', 'expeditious_retreat', 'feather_fall', 'jump', 'reduce_person'],
    2: ['alter_self', 'bear_s_endurance', 'bull_s_strength', 'cat_s_grace', 'darkvision', 'eagle_s_splendor', 'fox_s_cunning', 'knock', 'levitate', 'owl_s_wisdom', 'pyrotechnics', 'rope_trick', 'spider_climb'],
    3: ['blink', 'flame_arrow', 'fly', 'gaseous_form', 'haste', 'keen_edge', 'secret_page', 'shrink_item', 'slow', 'water_breathing'],
    4: ['enlarge_person_mass', 'polymorph', 'reduce_person_mass'],
    5: ['animal_growth', 'baleful_polymorph', 'fabricate', 'overland_flight', 'passwall', 'telekinesis', 'transmute_mud_to_rock', 'transmute_rock_to_mud'],
    6: ['bear_s_endurance_mass', 'bull_s_strength_mass', 'cat_s_grace_mass', 'disintegrate', 'eagle_s_splendor_mass', 'flesh_to_stone', 'fox_s_cunning_mass', 'move_earth', 'owl_s_wisdom_mass', 'stone_to_flesh'],
    7: ['aberrate', 'control_weather', 'ethereal_jaunt', 'reverse_gravity', 'statue'],
    8: ['iron_body', 'polymorph_any_object', 'temporal_stasis'],
    9: ['etherealness', 'shapechange', 'time_stop']
  }
};
