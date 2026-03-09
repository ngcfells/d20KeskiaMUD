'use strict';

/**
 * EffectHooks
 *
 * Centralized hook dispatch system for effects.
 *
 * Effects may implement any of the following:
 *
 *   onApply(target, isLoad)
 *   onRemove(target)
 *   onTick(target)
 *   onEvent(eventName, payload, target)
 *   onDamage(damage, attacker, defender)
 *   onMove(target, fromRoom, toRoom)
 *   onSkillCheck(skillId, rollData, target)
 *   onSave(saveType, rollData, target)
 *   onAttack(attackData, attacker, defender)
 *
 * This file ensures that ANY effect can respond to ANY event
 * without requiring the engine or behaviors to know about it.
 */

class EffectHooks {
  constructor(state) {
    this.state = state;
  }

  /**
   * Dispatch a named event to all effects on a target.
   *
   * @param {Object} target
   * @param {string} eventName
   * @param {Object} payload
   */
  dispatch(target, eventName, payload = {}) {
    if (!target.effects) return;

    for (const effect of target.effects) {
      if (typeof effect.onEvent === 'function') {
        try {
          effect.onEvent(eventName, payload, target);
        } catch (e) {
          console.error(`Effect ${effect.id} onEvent error:`, e);
        }
      }
    }
  }

  /**
   * Damage hook
   */
  onDamage(damage, attacker, defender) {
    if (!defender.effects) return damage;

    let modified = damage;

    for (const effect of defender.effects) {
      if (typeof effect.onDamage === 'function') {
        try {
          modified = effect.onDamage(modified, attacker, defender) ?? modified;
        } catch (e) {
          console.error(`Effect ${effect.id} onDamage error:`, e);
        }
      }
    }

    return modified;
  }

  /**
   * Movement hook
   */
  onMove(target, fromRoom, toRoom) {
    if (!target.effects) return;

    for (const effect of target.effects) {
      if (typeof effect.onMove === 'function') {
        try {
          effect.onMove(target, fromRoom, toRoom);
        } catch (e) {
          console.error(`Effect ${effect.id} onMove error:`, e);
        }
      }
    }
  }

  /**
   * Skill check hook
   */
  onSkillCheck(skillId, rollData, target) {
    if (!target.effects) return rollData;

    let modified = rollData;

    for (const effect of target.effects) {
      if (typeof effect.onSkillCheck === 'function') {
        try {
          modified = effect.onSkillCheck(skillId, modified, target) ?? modified;
        } catch (e) {
          console.error(`Effect ${effect.id} onSkillCheck error:`, e);
        }
      }
    }

    return modified;
  }

  /**
   * Saving throw hook
   */
  onSave(saveType, rollData, target) {
    if (!target.effects) return rollData;

    let modified = rollData;

    for (const effect of target.effects) {
      if (typeof effect.onSave === 'function') {
        try {
          modified = effect.onSave(saveType, modified, target) ?? modified;
        } catch (e) {
          console.error(`Effect ${effect.id} onSave error:`, e);
        }
      }
    }

    return modified;
  }

  /**
   * Attack hook
   */
  onAttack(attackData, attacker, defender) {
    if (!attacker.effects) return attackData;

    let modified = attackData;

    for (const effect of attacker.effects) {
      if (typeof effect.onAttack === 'function') {
        try {
          modified = effect.onAttack(modified, attacker, defender) ?? modified;
        } catch (e) {
          console.error(`Effect ${effect.id} onAttack error:`, e);
        }
      }
    }

    return modified;
  }
}

module.exports = EffectHooks;
