'use strict';

module.exports = {
  groups: {
    // Proficiency Groups
    simple: [
      'gauntlet', 'unarmed_strike', 'dagger', 'punching_dagger', 'gauntlet_spiked', 'mace_light', 'sickle', 'club', 'mace_heavy', 'morningstar', 'shortspear', 'longspear', 'quarterstaff', 'spear', 'crossbow_heavy', 'crossbow_light', 'dart', 'javelin', 'sling'
    ],
    martial: [
      'handaxe', 'hammer_light', 'kukri', 'pick_light', 'sap', 'shield_light', 'sword_short', 'battleaxe', 'flail', 'longsword', 'pick_heavy', 'rapier', 'scimitar', 'shield_heavy', 'trident', 'warhammer', 'falchion', 'glaive', 'greataxe', 'greatclub', 'greatsword', 'guisarme', 'halberd', 'lance', 'ranseur', 'scythe', 'longbow', 'composite_longbow', 'shortbow', 'composite_shortbow'
    ],
    exotic: [
      'kama', 'nunchaku', 'sai', 'siangham', 'bastard_sword', 'waraxe_dwarven', 'whip', 'axe_orc_double', 'chain_spiked', 'flail_dire', 'hammer_gnome_hooked', 'urgrosh_dwarven', 'sword_two_bladed', 'hand_crossbow', 'repeating_heavy_crossbow', 'repeating_light_crossbow', 'net', 'shuriken'
    ],
    // Mechanical Property Groups
    ranged: [
      'crossbow_heavy', 'crossbow_light', 'dart', 'javelin', 'sling', 'longbow', 'shortbow', 'hand_crossbow', 'shuriken', 'handaxe', 'hammer_light', 'net'
    ],
    polearm: [
      'glaive', 'guisarme', 'halberd', 'ranseur', 'longspear', 'trident', 'lance', 'spear'
    ],
    double: [
      'quarterstaff', 'axe_orc_double', 'flail_dire', 'hammer_gnome_hooked', 'urgrosh_dwarven', 'sword_two_bladed'
    ],
    reach: [
      'longspear', 'glaive', 'guisarme', 'ranseur', 'lance', 'chain_spiked', 'whip'
    ],
    thrown: [
      'dagger', 'shortspear', 'spear', 'dart', 'javelin', 'handaxe', 'hammer_light', 'trident', 'shuriken', 'net'
    ]
  },

  /**
   * Returns ALL groups a weapon belongs to (e.g., ['martial', 'polearm', 'reach']).
   * @param {string} weaponId 
   * @returns {string[]}
   */
  getWeaponGroups(weaponId) {
    return Object.keys(this.groups).filter(group => this.groups[group].includes(weaponId));
  },

  /**
   * Specifically returns the proficiency tier (simple, martial, exotic).
   * Useful for character sheet proficiency checks.
   * @param {string} weaponId 
   * @returns {string|null}
   */
  getProficiencyTier(weaponId) {
    const tiers = ['simple', 'martial', 'exotic'];
    return tiers.find(tier => this.groups[tier].includes(weaponId)) || null;
  },

  /**
   * Checks if a weapon has a specific property.
   * Example: isInGroup('longspear', 'reach') => true
   */
  isInGroup(weaponId, groupName) {
    if (!this.groups[groupName]) return false;
    return this.groups[groupName].includes(weaponId);
  }
};