'use strict';

/**
 * Canonical Damage Type Registry
 * Used by:
 *  - damage packets
 *  - resistances / vulnerabilities / immunities
 *  - DR subtypes
 *  - armor layers
 *  - traits
 *  - effects
 */

module.exports = {
  // ─────────────────────────────────────────────
  // PHYSICAL DAMAGE TYPES
  // ─────────────────────────────────────────────
  physical: {
    slashing:   { id: 'slashing',   category: 'physical', isPhysical: true },
    piercing:   { id: 'piercing',   category: 'physical', isPhysical: true },
    bludgeoning:{ id: 'bludgeoning',category: 'physical', isPhysical: true }
  },

  // ─────────────────────────────────────────────
  // MODERN / SCI-FI PHYSICAL TYPES
  // ─────────────────────────────────────────────
  modern: {
    kinetic:    { id: 'kinetic',    category: 'physical', isPhysical: true, mapsToAttribute: 'armorKinetic' },
    ballistic:  { id: 'ballistic',  category: 'physical', isPhysical: true, mapsToAttribute: 'armorBallistic' }
  },

  // ─────────────────────────────────────────────
  // ENERGY DAMAGE TYPES
  // ─────────────────────────────────────────────
  energy: {
    energy:     { id: 'energy',     category: 'energy', isEnergy: true, mapsToAttribute: 'armorEnergy' },
    fire:       { id: 'fire',       category: 'energy', isEnergy: true },
    cold:       { id: 'cold',       category: 'energy', isEnergy: true },
    electricity:{ id: 'electricity',category: 'energy', isEnergy: true },
    acid:       { id: 'acid',       category: 'energy', isEnergy: true },
    sonic:      { id: 'sonic',      category: 'energy', isEnergy: true },
    radiation:  { id: 'radiation',  category: 'energy', isEnergy: true }
  },

  // ─────────────────────────────────────────────
  // PURE MAGICAL / EXOTIC DAMAGE TYPES
  // ─────────────────────────────────────────────
  exotic: {
    force:      { id: 'force',      category: 'exotic', isExotic: true },
    mind:       { id: 'mind',       category: 'exotic', isExotic: true }
  },

  // ─────────────────────────────────────────────
  // ALIGNMENT DAMAGE TYPES
  // ─────────────────────────────────────────────
  alignment: {
    good:       { id: 'good',       category: 'alignment', isAlignment: true },
    evil:       { id: 'evil',       category: 'alignment', isAlignment: true },
    law:        { id: 'law',        category: 'alignment', isAlignment: true },
    chaos:      { id: 'chaos',      category: 'alignment', isAlignment: true }
  },

  // ─────────────────────────────────────────────
  // MATERIAL SUBTYPES (for DR bypass)
  // ─────────────────────────────────────────────
  materials: {
    adamantine: { id: 'adamantine', category: 'material', isMaterial: true },
    cold_iron:  { id: 'cold_iron',  category: 'material', isMaterial: true },
    silver:     { id: 'silver',     category: 'material', isMaterial: true }
  },

  // ─────────────────────────────────────────────
  // UTILITY
  // ─────────────────────────────────────────────
  /**
   * Flatten all damage types into a single map.
   */
  all() {
    return {
      ...this.physical,
      ...this.modern,
      ...this.energy,
      ...this.exotic,
      ...this.alignment,
      ...this.materials
    };
  }
};
