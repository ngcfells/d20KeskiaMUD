/**
 * BUNDLE: skills
 * PATH: bundles/skills/skills/ride.js
 * PURPOSE: Umbrella skill definition for Ride with nested specialties.
 */

'use strict';

module.exports = {
  id: 'ride',
  name: 'Ride',
  ability: 'dexterity',
  hasSpecialties: true,

  specialties: {
    // --- FANTASY RIDING ---
    horse: {
      light_horse: {},
      heavy_horse: {},
      warhorse: {},
      pony: {}
    },

    griffon: {},
    dragon: {},
    dire_wolf: {},
    giant_lizard: {},
    warg: {},
    giant_spider: {},

    // --- JRPG / FINAL FANTASY RIDING ---
    chocobo: {
      standard: {},
      armored: {},
      fat_chocobo: {},
      racing: {}
    },

    // --- SCI-FI RIDING ---
    alien_mounts: {
      quadrapeds: {},
      insectoids: {},
      reptilian: {},
      avian: {}
    },

    hover_mounts: {
      hover_bike: {},
      hover_beast: {}
    },

    bioengineered_mounts: {
      vatgrown_beasts: {},
      symbiotic_mounts: {}
    },

    // --- STAR WARS RIDING ---
    tauntaun: {},
    dewback: {},
    varactyl: {},
    bantha: {},
    eopie: {},

    // --- POST-APOC RIDING ---
    mutant_beasts: {
      rad_stag: {},
      giant_mole_rat: {},
      feral_hound: {}
    },

    giant_insects: {
      rad_scorpion: {},
      beetle_mount: {}
    },

    wasteland_predators: {
      deathclaw_tamed: {},
      razorback: {}
    },

    // --- CYBERPUNK RIDING ---
    cyber_mounts: {
      cyber_horse: {},
      mech_beast: {},
      synthetic_mount: {}
    },

    // --- SUPERHERO / SCI-FANTASY RIDING ---
    power_beasts: {
      elemental_mount: {},
      shadow_steed: {},
      celestial_stag: {}
    },

    dimensional_mounts: {
      phase_beast: {},
      astral_serpent: {}
    },

    // --- NOIR / PULP ERA RIDING ---
    police_horse: {},
    circus_animals: {
      elephant: {},
      tiger: {}
    },

    // --- CTHULHU / MYTHOS RIDING ---
    eldritch_mounts: {
      nightgaunt: {},
      shantak: {}
    }
  }
};
