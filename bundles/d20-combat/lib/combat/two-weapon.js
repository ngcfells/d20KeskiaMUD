'use strict';

/**
 * Two-Weapon Fighting Modifier Engine
 * ---------------------------------------------------------
 * Handles:
 *  - Primary/offhand attack penalties
 *  - Light offhand reduction
 *  - Double weapons
 *  - Trait-based reductions (TWF, Improved TWF, Greater TWF)
 *  - Effect-based reductions
 *  - Offhand STR scaling (½ STR)
 */

class TwoWeapon {

  /**
   * Build dual-wield attack modifiers.
   * @param {Character} attacker
   * @returns {object} { primaryMods, offhandMods, damageMods }
   */
  static getModifiers(attacker) {
    const primaryMods = [];
    const offhandMods = [];
    const damageMods = [];

    const mainhand = attacker.equipment.get('wield');
    const offhand = attacker.equipment.get('offhand');

    // If no offhand weapon, no penalties
    if (!offhand || !offhand.getMeta('isWeapon')) {
      return { primaryMods, offhandMods, damageMods };
    }

    // ─────────────────────────────────────────────
    // 1. Base penalties
    // RAW: -6 primary / -10 offhand
    // ─────────────────────────────────────────────
    let primaryPenalty = -6;
    let offhandPenalty = -10;

    // ─────────────────────────────────────────────
    // 2. Two-Weapon Fighting trait reduces penalties
    // ─────────────────────────────────────────────
    if (attacker.hasTrait('two_weapon_fighting')) {
      primaryPenalty = -4;
      offhandPenalty = -4;
    }

    // ─────────────────────────────────────────────
    // 3. Light offhand reduces penalties by 2
    // ─────────────────────────────────────────────
    const isLightOffhand =
      offhand.getMeta('isLight') ||
      offhand.getMeta('weaponType') === 'light' ||
      offhand.getMeta('doubleWeapon') === true;

    if (isLightOffhand) {
      primaryPenalty += 2;
      offhandPenalty += 2;
    }

    // ─────────────────────────────────────────────
    // 4. Effect-based penalty reductions
    // (e.g., magical balance, tech stabilizers)
    // ─────────────────────────────────────────────
    const effectMods = attacker.getEffectModifiers?.('two_weapon_penalty') || [];
    for (const mod of effectMods) {
      if (typeof mod.flat === 'number') {
        primaryPenalty += mod.flat;
        offhandPenalty += mod.flat;
      }
    }

    // ─────────────────────────────────────────────
    // 5. Build modifier objects
    // ─────────────────────────────────────────────
    primaryMods.push({
      flat: primaryPenalty,
      reason: 'two-weapon fighting (primary)'
    });

    offhandMods.push({
      flat: offhandPenalty,
      reason: 'two-weapon fighting (offhand)'
    });

    // ─────────────────────────────────────────────
    // 6. Offhand STR scaling (½ STR)
    // ─────────────────────────────────────────────
    damageMods.push({
      multiplier: 0.5,
      stat: 'strength',
      reason: 'offhand STR scaling'
    });

    return { primaryMods, offhandMods, damageMods };
  }
}

module.exports = TwoWeapon;
