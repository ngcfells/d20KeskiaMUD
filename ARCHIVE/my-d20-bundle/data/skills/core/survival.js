/**
 * BUNDLE: skills
 * PATH: bundles/skills/skills/survival.js
 * PURPOSE: Umbrella skill definition for Survival with nested specialties.
 */

'use strict';

module.exports = {
  id: 'survival',
  name: 'Survival',
  ability: 'wisdom',
  hasSpecialties: true,

  specialties: {
    // --- FANTASY SURVIVAL ---
    forest: {},
    mountain: {},
    desert: {},
    arctic: {},
    swamp: {},
    underdark: {},
    plains: {},
    jungle: {},

    tracking: {
      humanoids: {},
      beasts: {},
      magical_beasts: {},
      undead: {},
      aberrations: {}
    },

    foraging: {
      edible_plants: {},
      medicinal_plants: {},
      hunting: {}
    },

    // --- MODERN SURVIVAL ---
    urban: {
      streetwise: {},
      evasion: {},
      safehouse_finding: {}
    },

    wilderness: {
      navigation: {},
      shelter_building: {},
      firecraft: {}
    },

    disaster_response: {
      earthquake: {},
      flood: {},
      wildfire: {},
      storm: {}
    },

    // --- CYBERPUNK SURVIVAL ---
    megacity_survival: {
      gang_territories: {},
      corporate_zones: {},
      slums: {},
      black_market_routes: {}
    },

    net_survival: {
      avoiding_trace: {},
      evading_ice: {},
      ghosting: {}
    },

    // --- SCI-FI SURVIVAL ---
    alien_worlds: {
      toxic_atmosphere: {},
      high_gravity: {},
      low_gravity: {},
      extreme_radiation: {},
      hostile_ecosystems: {}
    },

    zero_g: {
      maneuvering: {},
      emergency_repair: {},
      vacuum_exposure: {}
    },

    space_derelict: {
      hull_breach_response: {},
      oxygen_management: {},
      alien_containment: {}
    },

    // --- STAR WARS SURVIVAL ---
    tatooine_desert: {},
    hoth_arctic: {},
    dagobah_swamp: {},
    endor_forest: {},
    mustafar_volcanic: {},

    // --- CTHULHU / MYTHOS SURVIVAL ---
    expedition: {
      arctic_expedition: {},
      jungle_expedition: {},
      desert_ruins: {}
    },

    sanity_preservation: {
      forbidden_sites: {},
      eldritch_presence: {},
      dreamlands_travel: {}
    },

    // --- NOIR SURVIVAL ---
    city_underbelly: {
      gang_avoidance: {},
      informant_networks: {},
      alley_navigation: {}
    },

    // --- SUPERHERO SURVIVAL ---
    cosmic: {
      vacuum: {},
      radiation_storms: {},
      dimensional_voids: {}
    },

    dimensional: {
      shadow_realms: {},
      astral_plane: {},
      chaotic_dimensions: {}
    },

    // --- POST-APOC SURVIVAL ---
    wasteland: {
      navigation: {},
      hazard_detection: {},
      ambush_avoidance: {}
    },

    radiation: {
      hot_zones: {},
      fallout: {},
      contaminated_ruins: {}
    },

    scavenging: {
      tech_scrap: {},
      food_scavenging: {},
      salvage_operations: {}
    },

    mutant_ecology: {
      predator_behavior: {},
      safe_routes: {},
      lair_identification: {}
    }
  }
};
