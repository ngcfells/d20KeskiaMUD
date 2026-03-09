'use strict';

const Attack = require('./attack');
const D20Utils = require('../../../d20-core/d20/d20Utils');

/**
 * Threat & Attacks of Opportunity Engine
 * ---------------------------------------------------------
 * RAW 3.5 / Pathfinder AoO rules.
 */

class Threat {

  /**
   * Determine a creature's reach.
   * @param {Character} character
   * @returns {number} reach in feet
   */
  static getReach(character) {
    // 1. Base reach from size trait
    const sizeTrait = character.getTraitByFamily?.('size');
    let reach = sizeTrait?.state?.reach || 5;

    // 2. Weapon reach (e.g., longspear)
    const weapon = character.getEquippedWeapon?.();
    if (weapon && weapon.getMeta('reach')) {
      reach = Math.max(reach, weapon.getMeta('reach'));
    }

    // 3. Effects that modify reach
    const effectMods = character.getEffectModifiers?.('reach') || [];
    for (const mod of effectMods) {
      if (typeof mod.flat === 'number') {
        reach += mod.flat;
      }
    }

    // 4. Traits that modify reach
    if (character.hasTrait('long_reach')) {
      reach += 5;
    }

    return reach;
  }

  /**
   * Determine if a target is within reach.
   */
  static isThreatened(attacker, target) {
    const reach = this.getReach(attacker);
    const distance = attacker.room.getDistance(attacker, target);
    return distance <= reach;
  }

  /**
   * Determine if movement provokes an AoO.
   */
  static movementProvokes(mover, threatener, movement) {
    // 5-foot step never provokes
    if (movement.isFiveFootStep) return false;

    // Withdraw: first square does not provoke
    if (movement.isWithdraw && movement.firstSquare === true) {
      return false;
    }

    // Mobility trait prevents provoking
    if (mover.hasTrait('mobility')) {
      return false;
    }

    // Effects that prevent provoking
    const mods = mover.getEffectModifiers?.('no_aoo') || [];
    if (mods.some(m => m.prevent === true)) {
      return false;
    }

    // Leaving a threatened square provokes
    const reach = this.getReach(threatener);
    const distFrom = threatener.room.getDistance(threatener, movement.from);
    const distTo = threatener.room.getDistance(threatener, movement.to);

    return distFrom <= reach && distTo > reach;
  }

  /**
   * Determine if an action provokes an AoO.
   */
  static actionProvokes(actor, actionType) {
    // Defensive casting avoids provoking
    if (actionType === 'cast_spell' && actor.hasTrait('defensive_casting')) {
      return false;
    }

    // Ranged attacks provoke
    if (actionType === 'ranged_attack') return true;

    // Casting a spell provokes
    if (actionType === 'cast_spell') return true;

    // Drinking a potion provokes
    if (actionType === 'drink_potion') return true;

    // Standing up provokes
    if (actionType === 'stand_up') return true;

    // Loading a crossbow provokes
    if (actionType === 'reload') return true;

    // Using certain skills provokes
    if (actionType === 'use_skill') return true;

    return false;
  }

  /**
   * Execute an AoO from attacker to target.
   */
  static executeAoO(attacker, target) {
    // Check if attacker has AoOs remaining
    const baseAoOs = 1;
    const dexMod = D20Utils.getModifier(attacker.getAttribute('dexterity') || 10);

    let maxAoOs = baseAoOs;

    // Combat Reflexes adds Dex mod to AoOs
    if (attacker.hasTrait('combat_reflexes')) {
      maxAoOs += Math.max(0, dexMod);
    }

    attacker._aooCount = attacker._aooCount || 0;

    if (attacker._aooCount >= maxAoOs) {
      return { skipped: true, reason: 'no_aoos_remaining' };
    }

    attacker._aooCount++;

    // Execute attack
    return Attack.resolve(attacker, target, { attackType: 'attack_of_opportunity' });
  }
}

module.exports = Threat;
