// path: bundles/my-d20-bundle/data/rules/terrain_types.js
'use strict';

module.exports = {
  // FORMAT: { cost: MoveMult, isDifficult: bool, dcMod: SkillPenalty, flavor: GenreOrigin }
  
  // --- CORE & FANTASY ---
  NONE:              { cost: 1, isDifficult: false, dcMod: 0,  flavor: "Open ground" },
  RUBBLE_LIGHT:      { cost: 2, isDifficult: true,  dcMod: 2,  flavor: "Debris/Broken stone" },
  RUBBLE_DENSE:      { cost: 4, isDifficult: true,  dcMod: 5,  flavor: "Collapsed masonry" },
  UNDERGROWTH_LIGHT: { cost: 2, isDifficult: true,  dcMod: 2,  flavor: "Tall grass/Vines" },
  UNDERGROWTH_HEAVY: { cost: 4, isDifficult: true,  dcMod: 5,  flavor: "Briars/Thickets" },
  BOG_SHALLOW:       { cost: 2, isDifficult: true,  dcMod: 2,  flavor: "Mud/Swamp" },
  ICE_SHEET:         { cost: 2, isDifficult: true,  dcMod: 5,  flavor: "Slippery frost" },
  STEEP_SLOPE:       { cost: 2, isDifficult: true,  dcMod: 0,  flavor: "Incline" },

  // --- URBAN, NOIR & CYBERPUNK ---
  CROWD_DENSE:       { cost: 2, isDifficult: true,  dcMod: 5,  flavor: "Pedestrians/Market" },
  INDUSTRIAL_CLUTTER:{ cost: 2, isDifficult: true,  dcMod: 2,  flavor: "Crates/Machinery" },
  SLICK_OIL:         { cost: 3, isDifficult: true,  dcMod: 10, flavor: "Chemical spill/Oil" },
  WIRES_EXPOSED:     { cost: 2, isDifficult: true,  dcMod: 4,  flavor: "Live cabling" },

  // --- SCI-FI & STARSHIP ---
  ZERO_G_DEBRIS:     { cost: 2, isDifficult: true,  dcMod: 5,  flavor: "Floating wreckage" },
  LOW_GRAVITY:       { cost: 0.5, isDifficult: false, dcMod: -2, flavor: "Enhanced leaps" },
  HIGH_GRAVITY:      { cost: 2, isDifficult: true,  dcMod: 5,  flavor: "Crushing weight" },
  MAGNETIC_FLUCTUATION: { cost: 2, isDifficult: true, dcMod: 0, flavor: "Armor drag" },

  // --- WESTERN & WASTELAND ---
  SAND_DEEP:         { cost: 3, isDifficult: true,  dcMod: 4,  flavor: "Dunes/Desert" },
  SCAVENGER_SCRAP:   { cost: 2, isDifficult: true,  dcMod: 3,  flavor: "Jagged metal/Waste" },
  QUICKSAND:         { cost: 4, isDifficult: true,  dcMod: 0,  flavor: "Hazardous sinkhole" },

  // --- ELDRITCH & PLANAR ---
  ECTOPLASMIC_RESIDUE:{ cost: 2, isDifficult: true, dcMod: 6,  flavor: "Ghostly viscid" },
  VOID_ESSENCE:      { cost: 2, isDifficult: true,  dcMod: 8,  flavor: "Soul-sapping cold" },
  BLOOD_SLICK:       { cost: 2, isDifficult: true,  dcMod: 4,  flavor: "Horror/Gore" }
};
