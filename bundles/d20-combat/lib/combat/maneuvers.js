'use strict';

const D20Utils = require('../../../d20-core/d20/d20Utils');

/**
 * Combat Maneuver Engine (CMB vs CMD)
 * ---------------------------------------------------------
 * Handles:
 *  - Trip
 *  - Disarm
 *  - Grapple
 *  - Bull Rush
 *  - Size modifiers (trait-driven)
 *  - Weapon bonuses (trip/disarm weapons)
 *  - Trait bonuses (Improved Trip, etc.)
 *  - Effect bonuses
 *  - Combat state modifiers
 */

class Maneuvers {

  /**
   * Resolve a combat maneuver.
   * @param {Character} attacker
   * @param {Character} target
   * @param {string} type
   */
  static resolve(attacker, target, type) {
    const roll = Math.floor(Math.random() * 20) + 1;

    // ─────────────────────────────────────────────
    // 1. Build CMB
    // ─────────────────────────────────────────────
    const cmb =
      roll +
      this.getBAB(attacker) +
      this.getStrMod(attacker) +
      this.getSizeMod(attacker) +
      this.getWeaponBonus(attacker, type) +
      this.getTraitBonus(attacker, type) +
      this.getEffectBonus(attacker, type) +
      this.getStateBonus(attacker, type);

    // ─────────────────────────────────────────────
    // 2. Build CMD
    // ─────────────────────────────────────────────
    const cmd =
      10 +
      this.getBAB(target) +
      this.getStrMod(target) +
      this.getDexMod(target) +
      this.getSizeMod(target) +
      this.getTraitCMD(target, type) +
      this.getEffectCMD(target, type) +
      this.getStateCMD(target, type);

    const success = cmb >= cmd;

    return {
      success,
      roll,
      cmb,
      cmd,
      type
    };
  }

  // ─────────────────────────────────────────────
  // CMB COMPONENTS
  // ─────────────────────────────────────────────

  static getBAB(char) {
    return char.getMeta('baseAttackBonus') || 0;
  }

  static getStrMod(char) {
    return D20Utils.getModifier(char.getAttribute('strength') || 10);
  }

  static getDexMod(char) {
    return D20Utils.getModifier(char.getAttribute('dexterity') || 10);
  }

  static getSizeMod(char) {
    const sizeTrait = char.getTraitByFamily?.('size');
    return sizeTrait?.state?.cmb || 0; // our size traits define CMB/CMD mods
  }

  static getWeaponBonus(attacker, type) {
    const weapon = attacker.getEquippedWeapon?.();
    if (!weapon) return 0;

    if (type === 'trip' && weapon.getMeta('tripWeapon')) return +2;
    if (type === 'disarm' && weapon.getMeta('disarmWeapon')) return +2;

    return 0;
  }

  static getTraitBonus(attacker, type) {
    let bonus = 0;

    if (attacker.hasTrait(`improved_${type}`)) bonus += 2;
    if (attacker.hasTrait(`greater_${type}`)) bonus += 2;

    return bonus;
  }

  static getEffectBonus(attacker, type) {
    const mods = attacker.getEffectModifiers?.(`cmb_${type}`) || [];
    return mods.reduce((sum, m) => sum + (m.flat || 0), 0);
  }

  static getStateBonus(attacker, type) {
    const mods = attacker.combatStates?.getAttackModifiers() || [];
    return mods.reduce((sum, m) => sum + (m.flat || 0), 0);
  }

  // ─────────────────────────────────────────────
  // CMD COMPONENTS
  // ─────────────────────────────────────────────

  static getTraitCMD(target, type) {
    let bonus = 0;

    if (target.hasTrait(`greater_${type}`)) bonus += 2;
    if (target.hasTrait('stability')) bonus += 4; // dwarves, quadrupeds

    return bonus;
  }

  static getEffectCMD(target, type) {
    const mods = target.getEffectModifiers?.(`cmd_${type}`) || [];
    return mods.reduce((sum, m) => sum + (m.flat || 0), 0);
  }

  static getStateCMD(target, type) {
    const mods = target.combatStates?.getDefenseModifiers() || [];
    return mods.reduce((sum, m) => sum + (m.flat || 0), 0);
  }
}

module.exports = Maneuvers;
