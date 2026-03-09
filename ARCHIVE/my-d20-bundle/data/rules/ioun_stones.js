/**
 * PATH: bundles/my-d20-bundle/data/rules/ioun_stones.js
 * SOURCE: PHB, Spell Compendium, Pathfinder SRD, Homebrew (Chris Fells 2026)
 */
'use strict';

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // RESONANCE HARMONIES: Set bonuses for paired orbitals
  // ─────────────────────────────────────────────────────────────
  harmonies: [
    {
      required: ['PALE_BLUE_RHOMBOID', 'SCARLET_BLUE_SPHERE'],
      bonus: { intelligence: 2, wisdom: 2 },
      name: "Mental Synchronicity",
      description: "Analytical logic and intuitive insight merge into a single stream of consciousness."
    },
    {
      required: ['PEARLY_WHITE_SPINDLE', 'PALE_GREEN_PRISM'],
      bonus: { healthRegen: 5, fortitude: 2 },
      name: "Eternal Vigor",
      description: "The body's cellular repair is accelerated by a rhythmic green pulse."
    },
    {
      required: ['ORANGE_PRISM', 'VIBRANT_PURPLE_PRISM'],
      bonus: { casterLevel: 1, spellDC: 1 },
      name: "Arcane Overclock",
      description: "The stones act as a dual-core processor for raw magical throughput."
    },
    {
      required: ['IRIDESCENT_SPINDLE', 'PALE_LAVENDER_ELLIPSOID'],
      bonus: { spellResistance: 5, armorEnergy: 2 },
      name: "Void Shield",
      description: "Incoming magical energies are refracted into the Ethereal Plane."
    },
    {
      required: ['DUSTY_ROSE_PRISM', 'DEEP_RED_SPHERE'],
      bonus: { dexterity: 2, reflex: 1 },
      name: "Taiji Flow",
      description: "Specifically tuned for Liang Chou; enhances the fluid redirection of momentum."
    },
    {
      required: ['CLEAR_SPINDLE', 'DARK_BLUE_RHOMBOID'],
      bonus: { sanity: 10, perceptionSight: 5 },
      name: "Unblinking Archive",
      description: "Mental fatigue is erased, and the visual spectrum expands into the infrared."
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // INDIVIDUAL STONE DEFINITIONS (Data for Item Generation)
  // ─────────────────────────────────────────────────────────────
  definitions: {
    PALE_BLUE_RHOMBOID:    { name: "Pale Blue Rhomboid",    bonus: { strength: 2 } },
    SCARLET_BLUE_SPHERE:   { name: "Scarlet & Blue Sphere", bonus: { intelligence: 2 } },
    INCANDESCENT_BLUE_SPHERE:{ name: "Incandescent Blue Sphere", bonus: { wisdom: 2 } },
    DEEP_RED_SPHERE:       { name: "Deep Red Sphere",       bonus: { dexterity: 2 } },
    PINK_RHOMBOID:         { name: "Pink Rhomboid",         bonus: { constitution: 2 } },
    PINK_AND_GREEN_SPHERE: { name: "Pink & Green Sphere",  bonus: { charisma: 2 } },
    
    PALE_GREEN_PRISM:      { name: "Pale Green Prism",      bonus: { attackBonus: 1, saveAll: 1, skillAll: 1 } },
    ORANGE_PRISM:          { name: "Orange Prism",          bonus: { casterLevel: 1 } },
    DUSTY_ROSE_PRISM:      { name: "Dusty Rose Prism",      bonus: { acDeflection: 1 } },
    
    PEARLY_WHITE_SPINDLE:  { name: "Pearly White Spindle",  bonus: { regen: 1 } }, // 1hp per hour
    CLEAR_SPINDLE:         { name: "Clear Spindle",         bonus: { sustain: "no_food_water" } },
    IRIDESCENT_SPINDLE:    { name: "Iridescent Spindle",    bonus: { sustain: "no_air" } },
    
    PALE_LAVENDER_ELLIPSOID:{ name: "Pale Lavender Ellipsoid", bonus: { absorbLevel: 4 } }, // Absorbs spells up to 4th
    LAVENDER_GREEN_ELLIPSOID:{ name: "Lavender & Green Ellipsoid", bonus: { absorbLevel: 8 } },
    
    VIBRANT_PURPLE_PRISM:  { name: "Vibrant Purple Prism",  bonus: { spellStore: 3 } }, // Stores 3 levels
    DARK_BLUE_RHOMBOID:    { name: "Dark Blue Rhomboid",    bonus: { feat: "alertness" } },
    
    // --- AEON / NETHERESE SPECIALS ---
    OBSIDIAN_CHIP:         { name: "Obsidian Aeon Stone",   bonus: { armorBallistic: 2, sanity: -5 } },
    GOLD_FLAKE:            { name: "Gold Flake Stone",      bonus: { luck: 2, appearance: 1 } },
    CRACKED_AMBER:         { name: "Cracked Amber Spindle", bonus: { reflex: 1, quickdraw: 1 } }
  },

  // ─────────────────────────────────────────────────────────────
  // SHAPE-BASED MULTIPLIERS (D20 Variant Scaling)
  // ─────────────────────────────────────────────────────────────
  shapes: {
    SPHERE:    { focusMod: 1,   description: "Balanced; affects core vitals." },
    PRISM:     { focusMod: 2,   description: "Refractive; boosts active abilities." },
    SPINDLE:   { focusMod: 0.5, description: "Narrow; provides constant passive utility." },
    RHOMBOID:  { focusMod: 1.5, description: "Angular; enhances physical martial prowess." },
    ELLIPSOID: { focusMod: 1.2, description: "Cyclical; interacts with incoming magic." }
  }
};
