// path: ./bundles/my-d20-bundle/data/ki/dragon_tattoos.js
'use strict';

/**
 * Togashi Dragon Tattoos
 * Sources: Oriental Adventures, Way of the Dragon, Magic of Rokugan
 *
 * Exported as:
 *   { [tattooName: string]: { effect: string, duration: string } }
 */
module.exports = {
  arrow_tattoo: {
    effect: 'increases_base_speed_and_jump_distance',
    duration: '1_round_per_level'
  },
  bamboo_tattoo: {
    effect: 'grants_damage_reduction_against_physical_attacks',
    duration: '1_round_per_level'
  },
  bat_tattoo: {
    effect: 'allows_the_monk_to_fly_or_glide',
    duration: '1_minute_per_level'
  },
  bellflower_tattoo: {
    effect: 'grants_bonus_to_charisma_and_social_checks',
    duration: '1_hour_per_level'
  },
  butterfly_tattoo: {
    effect: 'allows_the_monk_to_teleport_short_distances',
    duration: 'instant'
  },
  centipede_tattoo: {
    effect: 'allows_climbing_on_any_surface_including_ceilings',
    duration: '1_minute_per_level'
  },
  chameleon_tattoo: {
    effect: 'grants_bonus_to_stealth_and_disguise_checks',
    duration: '1_minute_per_level'
  },
  cloud_tattoo: {
    effect: 'allows_the_monk_to_turn_into_mist_or_gas',
    duration: '1_round_per_level'
  },
  crab_tattoo: {
    effect: 'grants_immense_strength_and_grapple_bonuses',
    duration: '1_round_per_level'
  },
  crane_tattoo: {
    effect: 'grants_ac_bonuses_and_defensive_precognition',
    duration: '1_round_per_level'
  },
  dragon_tattoo: {
    effect: 'breath_weapon_of_fire_or_elemental_energy',
    duration: 'instant'
  },
  falcon_tattoo: {
    effect: 'grants_immunity_to_fear_and_intimidation',
    duration: '1_minute_per_level'
  },
  firefly_tattoo: {
    effect: 'emits_a_bright_light_that_blinds_enemies',
    duration: '1_round'
  },
  mountain_tattoo: {
    effect: 'monk_cannot_be_moved_or_knocked_down',
    duration: '1_round_per_level'
  },
  ocean_tattoo: {
    effect: 'monk_does_not_need_to_eat_drink_or_sleep',
    duration: 'permanent'
  },
  phoenix_tattoo: {
    effect: 'grants_spell_resistance_against_arcane_magic',
    duration: '1_round_per_level'
  },
  scorpion_tattoo: {
    effect: 'adds_poison_damage_to_unarmed_strikes',
    duration: '1_round_per_level'
  },
  spider_tattoo: {
    effect: 'allows_the_monk_to_drain_life_from_touched_foes',
    duration: 'instant'
  },
  sun_tattoo: {
    effect: 'infuses_strikes_with_holy_or_positive_energy',
    duration: '1_round_per_level'
  },
  tiger_tattoo: {
    effect: 'grants_bonus_to_attack_rolls_and_damage',
    duration: '1_round_per_level'
  },
  void_tattoo: {
    effect: 'allows_expending_void_points_for_extra_actions',
    duration: 'instant'
  },
  wasp_tattoo: {
    effect: 'grants_extra_attacks_during_a_full_round_action',
    duration: '1_round'
  },
  white_mask_tattoo: {
    effect: 'protects_the_monk_s_mind_from_detection_and_scrying',
    duration: 'permanent'
  }
};
