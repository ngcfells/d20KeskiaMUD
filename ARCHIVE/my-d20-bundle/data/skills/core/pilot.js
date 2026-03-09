/**
 * BUNDLE: skills
 * PATH: bundles/skills/skills/pilot.js
 * PURPOSE: Umbrella skill definition for Pilot with nested specialties.
 */

'use strict';

module.exports = {
  id: 'pilot',
  name: 'Pilot',
  ability: 'dexterity',
  hasSpecialties: true,

  specialties: {
    // --- MODERN PILOTING ---
    automobile: {},
    motorcycle: {},
    truck: {},
    boat: {},
    helicopter: {},
    airplane: {},

    // --- CYBERPUNK PILOTING ---
    av4_vtol: {},          // AV-4 / VTOL aircraft
    combat_bike: {},
    hovercar: {},
    drone_rigging: {},     // remote drone piloting
    corporate_flyer: {},

    // --- SCI-FI PILOTING ---
    starship: {
      light_freighter: {},
      heavy_freighter: {},
      exploration_vessel: {},
      science_vessel: {},
      capital_ship: {}
    },

    fighter_craft: {
      interceptor: {},
      bomber: {},
      gunship: {}
    },

    mech: {
      light_mech: {},
      medium_mech: {},
      heavy_mech: {},
      exosuit: {}
    },

    dropship: {},
    shuttle: {},

    // --- STAR WARS PILOTING ---
    starfighter: {
      x_wing: {},
      tie_fighter: {},
      a_wing: {},
      b_wing: {},
      y_wing: {}
    },

    freighter: {
      yt_series: {},       // Millennium Falcon class
      corellian_freighter: {}
    },

    capital_ship: {
      star_destroyer: {},
      mon_calamari_cruiser: {}
    },

    podracer: {},
    speeder_bike: {},
    landspeeder: {},

    // --- POST-APOC PILOTING ---
    jury_rigged_vehicle: {},
    armored_transport: {},
    scavenged_aircraft: {},
    wasteland_buggy: {},

    // --- SUPERHERO / SCI-FANTASY PILOTING ---
    power_armor_flight: {},
    anti_grav_vehicle: {},
    dimensional_skimmer: {},

    // --- NOIR / PULP ERA PILOTING ---
    biplane: {},
    zeppelin: {},
    seaplane: {},

    // --- CTHULHU / MYTHOS ERA PILOTING ---
    twenties_aircraft: {},
    steamship: {},
    expedition_plane: {}
  }
};
