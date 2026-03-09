/**
 * BUNDLE: skills
 * PATH: bundles/skills/skills/knowledge.js
 * PURPOSE: Umbrella skill definition for Knowledge with nested specialties.
 */

'use strict';

module.exports = {
  id: 'knowledge',
  name: 'Knowledge',
  ability: 'intelligence',
  hasSpecialties: true,

  specialties: {
    // --- FANTASY KNOWLEDGE ---
    arcana: {},
    religion: {},
    nature: {},
    planes: {},
    history: {},
    nobility: {},
    geography: {},
    dungeoneering: {},

    // Nested Local Knowledge (example cities)
    local: {
      waterdeep: {},
      baldur_gate: {},
      neverwinter: {},
      cormyr: {},
      calimport: {},
      // More can be added dynamically at runtime
    },

    // --- MODERN KNOWLEDGE ---
    engineering: {},
    medicine: {},
    psychology: {},
    sociology: {},
    law: {},
    politics: {},
    economics: {},
    criminology: {},

    science: {
      biology: {},
      chemistry: {},
      physics: {},
      astronomy: {},
      xenobiology: {},
      genetics: {},
      virology: {}
    },

    technology: {},
    cybernetics_theory: {},

    // --- CYBERPUNK KNOWLEDGE ---
    megacorp_profiles: {},
    net_architecture: {},
    ai_behavior: {},
    black_ice_systems: {},
    street_gangs: {},

    // --- SCI-FI KNOWLEDGE ---
    astrophysics: {},
    warp_theory: {},
    quantum_mechanics: {},
    xenology: {},
    starship_systems: {},
    ai_theory: {},
    nanotechnology: {},
    alien_cultures: {},

    // --- STAR WARS KNOWLEDGE ---
    jedi_lore: {},
    sith_lore: {},
    hyperspace_routes: {},
    galactic_history: {},
    alien_species: {},
    droid_programming_theory: {},

    // --- CTHULHU / MYTHOS KNOWLEDGE ---
    occultism: {},
    forbidden_lore: {},
    eldritch_entities: {},
    cults: {},
    ancient_civilizations: {},
    dreamlands: {},

    // --- NOIR KNOWLEDGE ---
    criminal_underworld: {},
    city_politics: {},
    organized_crime_families: {},
    detective_methodology: {},

    // --- SUPERHERO KNOWLEDGE ---
    mutations: {},
    super_science: {},
    villain_psychology: {},
    dimensional_rifts: {},

    // --- POST-APOC KNOWLEDGE ---
    wasteland_geography: {},
    mutant_ecology: {},
    radiation_zones: {},
    pre_war_technology: {},
    scavenger_routes: {}
  }
};
