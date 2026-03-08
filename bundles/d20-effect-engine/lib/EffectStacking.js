'use strict';

const Categories = require('./EffectCategories');

/**
 * EffectStacking
 *
 * Centralized logic for determining whether two effects stack,
 * replace each other, or suppress each other.
 *
 * This is the canonical d20 stacking ruleset.
 */
class EffectStacking {

  /**
   * Determine if a new effect can stack with an existing effect.
   *
   * @param {EffectBase} newEffect
   * @param {EffectBase} existingEffect
   * @return {boolean} true if they stack, false if they conflict
   */
  static canStack(newEffect, existingEffect) {
    const newCat = Categories[newEffect.category] || Categories.untyped;
    const oldCat = Categories[existingEffect.category] || Categories.untyped;

    // If categories differ → they stack (except special cases)
    if (newEffect.category !== existingEffect.category) {
      return true;
    }

    // Same category → follow category rules
    return newCat.stacks;
  }

  /**
   * Determine which effect should win when two effects conflict.
   *
   * @param {EffectBase} newEffect
   * @param {EffectBase} existingEffect
   * @return {EffectBase} the effect that should remain active
   */
  static chooseWinner(newEffect, existingEffect) {
    const newCat = Categories[newEffect.category] || Categories.untyped;
    const oldCat = Categories[existingEffect.category] || Categories.untyped;

    // If categories differ, they stack → no winner/loser
    if (newEffect.category !== existingEffect.category) {
      return null;
    }

    // If category stacks → no winner/loser
    if (newCat.stacks) {
      return null;
    }

    // Same category, does NOT stack → compare magnitude
    if (newEffect.magnitude > existingEffect.magnitude) {
      return newEffect;
    }
    if (existingEffect.magnitude > newEffect.magnitude) {
      return existingEffect;
    }

    // If equal magnitude → use priority
    if (newCat.priority > oldCat.priority) {
      return newEffect;
    }
    if (oldCat.priority > newCat.priority) {
      return existingEffect;
    }

    // If equal priority → newest effect wins
    return newEffect;
  }

  /**
   * Apply stacking logic when adding a new effect to a target.
   *
   * @param {Object} target
   * @param {EffectBase} newEffect
   * @return {EffectBase|null} effect to remove (if any)
   */
  static resolve(target, newEffect) {
    const existing = target.effects.getByCategory(newEffect.category);

    // No existing effect of this category → no conflict
    if (!existing) {
      return null;
    }

    // If they stack → no conflict
    if (this.canStack(newEffect, existing)) {
      return null;
    }

    // They conflict → choose winner
    const winner = this.chooseWinner(newEffect, existing);

    if (winner === newEffect) {
      return existing; // remove old
    }

    if (winner === existing) {
      return newEffect; // ignore new
    }

    return null;
  }
}

module.exports = EffectStacking;
