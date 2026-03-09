'use strict';

const IounData = require('../../data/rules/ioun_stones');

module.exports = {
  /**
   * Scans a character's orbiting stones for resonant pairs and master-tier harmonies.
   * Optimized for High-Intelligence casters like Liang Chou.
   */
  calculateResonance(character) {
    const orbiting = character.equipment.get('ioun') || [];
    // Liang Chou's mastery allows resonance even with 1 stone if it's an Artifact tier,
    // but standard rules require 2.
    if (orbiting.length < 2) return [];

    // Map orbiting stones to their unique ID strings (e.g., 'PALE_BLUE_RHOMBOID')
    // Using item.getMeta for standard Ranvier metadata access
    const stoneIds = orbiting.map(item => item.getMeta('iounId'));
    
    const activeHarmonies = [];
    
    // 1. Standard Pair/Set Matching from Registry
    for (const harmony of IounData.harmonies) {
      const isMet = harmony.required.every(req => stoneIds.includes(req));
      if (isMet) {
        activeHarmonies.push(harmony);
      }
    }

    // 2. LIANG'S SPECIAL: THE ARCHIVIST'S TRIAD
    // Synergy: Orange Prism + Pale Green Prism + Vibrant Purple Prism
    const archivistRequired = ['ORANGE_PRISM', 'PALE_GREEN_PRISM', 'VIBRANT_PURPLE_PRISM'];
    const hasTriad = archivistRequired.every(req => stoneIds.includes(req));
    
    if (hasTriad) {
      activeHarmonies.push({
        id: 'archivist_triad',
        name: "Liang's Archivist Triad",
        bonus: { casterLevel: 2, skillCheck: 2, spellSlotExtra: 1 },
        description: "The stones pulse in a silver-ink rhythm, syncing your thoughts with the Archive."
      });
    }

    // 3. NETHERESE OVERLOAD MITIGATION
    // High INT characters (30+) mitigate the "Vision Blur" penalty from many stones.
    const intScore = character.getAttribute('intelligence') || 10;
    const maxSafeStones = 10 + (Math.floor((intScore - 10) / 2) * 2);
    
    if (orbiting.length > maxSafeStones) {
      character.setMeta('ioun_overload', true);
    } else {
      character.removeMeta('ioun_overload');
    }

    return activeHarmonies;
  }
};
