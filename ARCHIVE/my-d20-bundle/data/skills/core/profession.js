/**
 * BUNDLE: skills
 * PATH: bundles/skills/skills/profession.js
 * PURPOSE: Umbrella skill definition for Profession with nested specialties.
 */

'use strict';

module.exports = {
  id: 'profession',
  name: 'Profession',
  ability: 'wisdom',
  hasSpecialties: true,

  specialties: {
    // --- FANTASY PROFESSIONS ---
    cook: {
      baking: {},
      brewing: {},
      butchering: {},
      pastry: {}
    },
    merchant: {
      appraiser: {},
      trader: {},
      negotiator: {}
    },
    sailor: {},
    miner: {},
    farmer: {},
    herbalist: {},
    hunter: {},
    brewer: {},
    scribe: {},

    // --- MODERN PROFESSIONS ---
    medic: {},
    paramedic: {},
    detective: {},
    journalist: {},
    lawyer: {},
    accountant: {},
    engineer: {},
    technician: {},
    hacker: {},      // if not treated purely as Computer Use
    pilot: {},       // if not under Pilot umbrella for your build

    // --- CYBERPUNK PROFESSIONS ---
    netrunner: {},   // if not purely Computer Use
    street_doc: {},
    fixer: {},
    solo: {},
    corporate_agent: {},
    ripperdoc: {},

    // --- SCI-FI PROFESSIONS ---
    starship_pilot: {},
    starship_engineer: {},
    xenobiologist: {},
    navigator: {},
    comms_officer: {},
    quartermaster: {},

    // --- STAR WARS PROFESSIONS ---
    bounty_hunter: {},
    smuggler: {},
    moisture_farmer: {},
    droid_mechanic: {},
    slicer: {},      // if not purely Computer Use

    // --- CTHULHU / MYTHOS PROFESSIONS ---
    antiquarian: {},
    occultist: {},
    private_investigator: {},
    academic: {},
    archaeologist: {},

    // --- NOIR PROFESSIONS ---
    gumshoe: {},
    reporter: {},
    bartender: {},
    enforcer: {},

    // --- SUPERHERO PROFESSIONS ---
    vigilante: {},
    scientist: {},
    inventor: {},
    industrialist: {},

    // --- POST-APOC PROFESSIONS ---
    scavenger: {},
    raider: {},
    mechanic: {},
    chemist: {},
    survivalist: {}
  }
};
