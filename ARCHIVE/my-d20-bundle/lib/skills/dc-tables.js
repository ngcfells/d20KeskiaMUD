/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/lib/skills/dc-tables.js
 */

'use strict';

const TerrainTypes = require('../../data/rules/terrain_types');

class DCTables {
  constructor() {
    this.universal = {
      trivial: 5, easy: 10, moderate: 15, hard: 20, 
      very_hard: 25, extreme: 30, legendary: 35, impossible: 40
    };

    this.skillSpecific = {
      disable_device: { easy: 15, moderate: 20, hard: 25, very_hard: 30, extreme: 35 },
      demolitions: { easy: 15, moderate: 20, hard: 25, very_hard: 30, extreme: 40 },
      spellcraft: { identify_spell: 15, counterspell: 20, decipher_scroll: 25, craft_magic_item: 30 },
      use_magic_device: { activate_wand: 20, emulate_class_feature: 25, emulate_alignment: 30 }
    };

    this.genre = {
      cyberpunk: { 
        hacking: { basic: 15, secure: 20, corporate: 25, black_ice: 30, military: 35 },
        netrunning: { ice_bypass: 20, system_infiltration: 25, data_extraction: 20, cybercombat: 25 }
      },
      scifi: {
        starship_systems: { navigation: 15, targeting: 20, power_management: 20, shield_control: 25, emergency_repair: 30 },
        robotics: { drone_control: 15, android_programming: 20, mech_ai: 25 }
      },
      star_wars: {
        slicing: { imperial: 25, rebel: 20, corporate: 22, encrypted_holonet: 30 },
        blaster_mods: { power_pack_tuning: 15, overcharge_modules: 20, cooling_jacket_upgrades: 18, focusing_crystals: 25 }
      }
    };
  }

  /**
   * Resolve a DC, factoring in character state and room terrain.
   */
  getDC(character, skillId, specialtyPath = [], difficulty = 'moderate', roomTerrain = 'NONE') {
    let baseDC = 15;

    // 1. Check Skill-Specific Overrides
    if (this.skillSpecific[skillId] && this.skillSpecific[skillId][difficulty] !== undefined) {
      baseDC = this.skillSpecific[skillId][difficulty];
    } else {
      // 2. Check Genre-Specific Tables
      const genreDC = this._resolveGenreDC(specialtyPath, difficulty);
      baseDC = genreDC !== null ? genreDC : (this.universal[difficulty] || this.universal.moderate);
    }

    // 3. Apply Terrain DC Modifiers (Movement Skills Only)
    const terrain = TerrainTypes[roomTerrain] || TerrainTypes.NONE;
    const movementSkills = ['tumble', 'acrobatics', 'balance', 'climb', 'stealth', 'pilot', 'drive'];

    if (terrain.dcMod !== 0 && movementSkills.includes(skillId)) {
      // Logic for Advanced Mobility: Ignore terrain DC penalties if effect is active
      const ignoreTerrain = character.getEffectValue('ignoreTerrain');
      if (!ignoreTerrain) {
        baseDC += terrain.dcMod;
      }
    }

    return baseDC;
  }

  _resolveGenreDC(path, difficulty) {
    if (!path || path.length === 0) return null;
    const joined = path.join('.');
    
    let table = null;
    if (joined.match(/cyberpunk|netrunning|hacking/)) table = this.genre.cyberpunk;
    else if (joined.match(/scifi|starship|robotics/)) table = this.genre.scifi;
    else if (joined.match(/star_wars|slicing/)) table = this.genre.star_wars;

    return table ? this._lookupNested(table, path, difficulty) : null;
  }

  _lookupNested(table, path, difficulty) {
    let node = table;
    for (const segment of path) { if (node[segment]) node = node[segment]; }
    return (typeof node === 'object' && node[difficulty] !== undefined) ? node[difficulty] : null;
  }
}

module.exports = DCTables;
