'use strict';

/**
 * Wu Jen Taboos
 * Path: ./bundles/my-d20-bundle/data/rules/wu_jen_taboos.js
 */
module.exports = {
  // --- Standard/Classic Taboos ---
  physical_restrictions: [
    'cannot_eat_meat_or_animal_products',
    'cannot_bathe',
    'cannot_cut_hair_or_fingernails',
    'cannot_touch_a_dead_body',
    'cannot_drink_alcoholic_beverages',
    'cannot_wear_footwear',
    'cannot_handle_precious_metals_with_bare_skin',
    'cannot_own_more_than_one_can_carry'
  ],

  // --- Ritual & Behavioral Taboos ---
  ceremonial_requirements: [
    'must_make_daily_offering_to_spirit_patrons',
    'must_bathe_at_least_once_per_day',
    'must_sit_facing_a_specific_cardinal_direction_to_meditate',
    'cannot_speak_after_sunset_except_to_cast_spells',
    'cannot_light_a_fire',
    'cannot_sleep_on_anything_but_the_bare_earth',
    'must_wear_a_mask_in_public',
    'cannot_look_directly_at_the_full_moon',
    'must_bow_to_every_shrine_passed'
  ],

  // --- Chronomancy & Arcane Specialized Taboos ---
  mystic_constraints: [
    'cannot_use_the_same_spell_twice_in_a_row',
    'cannot_sleep_in_the_same_location_twice',
    'cannot_step_on_a_flower',
    'cannot_intentionally_harm_an_insect',
    'cannot_cross_running_water_without_a_prayer',
    'cannot_refer_to_self_in_the_first_person',
    'cannot_use_hostile_magic_against_the_elderly',
    'cannot_open_a_door_without_a_minor_incantation',
    'must_never_forgive_a_formal_insult'
  ],

  // --- Elemental & Clan Specific Taboos ---
  elemental_prohibitions: {
    fire: ['cannot_extinguish_a_candle_manually', 'cannot_use_water_magic'],
    water: ['cannot_touch_dry_sand', 'cannot_travel_by_boat_at_night'],
    earth: ['cannot_dig_a_hole', 'cannot_use_bladed_weapons'],
    air: ['cannot_stay_underground_for_more_than_one_hour', 'cannot_wear_heavy_furs']
  }
};
