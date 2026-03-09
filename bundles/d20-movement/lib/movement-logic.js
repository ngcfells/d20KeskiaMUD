'use strict';

const DimensionalInventory = require('./dimensional-inventory');
const TerrainTypes = require('../terrain/terrain-types');
const Stamina = require('../stamina/stamina');

class MovementLogic {

  /**
   * Calculate stamina cost for movement.
   * @param {Character} character
   * @param {string} terrainKey
   */
  static calculateStaminaCost(character, terrainKey) {
    let cost = 0;

    const terrain = TerrainTypes[terrainKey] || TerrainTypes.NONE;

    // ─────────────────────────────────────────────
    // 1. Base terrain cost
    // ─────────────────────────────────────────────
    cost += terrain.staminaCost || 0;

    // ─────────────────────────────────────────────
    // 2. Encumbrance
    // ─────────────────────────────────────────────
    const weight = DimensionalInventory.getCarriedWeight(character);
    const strength = character.getAttribute('strength') || 10;

    const heavyLoad = strength * 10;
    const maxLoad = strength * 15;

    if (weight > maxLoad) {
      cost += 4; // barely able to move
    } else if (weight > heavyLoad) {
      cost += 2; // heavy load
    }

    // Traits that reduce encumbrance penalties
    if (character.hasTrait('endurance')) cost -= 1;
    if (character.hasTrait('tireless')) cost -= 1;

    // ─────────────────────────────────────────────
    // 3. Gravity modifiers
    // ─────────────────────────────────────────────
    if (terrain.gravity === 'high') {
      cost += 2;
      if (character.hasTrait('gravity_adapted')) cost -= 2;
    }

    // ─────────────────────────────────────────────
    // 4. Environmental movement traits
    // ─────────────────────────────────────────────
    if (terrain.environment === 'bog' && character.hasTrait('swamp_stride')) {
      cost -= 2;
    }

    // ─────────────────────────────────────────────
    // 5. Effects that modify stamina cost
    // ─────────────────────────────────────────────
    const effectMods = character.getEffectModifiers?.('movement_stamina') || [];
    for (const mod of effectMods) {
      if (typeof mod.flat === 'number') cost += mod.flat;
    }

    return Math.max(0, cost);
  }

  /**
   * Apply stamina cost using the stamina subsystem.
   */
  static applyMovementToll(character, staminaCost) {
    if (staminaCost <= 0) return;

    Stamina.spend(character, staminaCost);

    if (staminaCost >= 3) {
      character.say("That movement took a lot out of you.");
    }
  }
}

module.exports = MovementLogic;
