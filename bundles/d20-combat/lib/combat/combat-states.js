'use strict';

/**
 * Combat States Manager
 * -----------------------------------------
 * Tracks and resolves combat-relevant states:
 *  - flat-footed
 *  - flanked
 *  - surprised
 *  - engaged
 *  - prone
 *  - helpless
 *  - blinded
 *  - stunned
 *  - dazed
 *  - grappled
 *  - restrained
 *  - invisible (combat-relevant)
 *
 * States may come from:
 *  - traits
 *  - effects
 *  - conditions
 *  - combat events
 */

class CombatStates {
  constructor(character) {
    this.character = character;

    // Internal state map
    this.states = new Map();
  }

  // ─────────────────────────────────────────────
  // STATE MANAGEMENT
  // ─────────────────────────────────────────────

  /**
   * Apply a combat state.
   * @param {string} state
   * @param {object} source Optional metadata (effect, item, etc.)
   */
  add(state, source = null) {
    if (!this.states.has(state)) {
      this.states.set(state, []);
    }
    this.states.get(state).push(source);
  }

  /**
   * Remove a combat state.
   * @param {string} state
   */
  remove(state) {
    this.states.delete(state);
  }

  /**
   * Check if a state is active.
   * @param {string} state
   */
  has(state) {
    return this.states.has(state);
  }

  /**
   * Get all active states.
   */
  list() {
    return Array.from(this.states.keys());
  }

  // ─────────────────────────────────────────────
  // STATE RESOLUTION LOGIC
  // These functions define how states affect combat.
  // ─────────────────────────────────────────────

  isFlatFooted() {
    // Flat-footed if:
    //  - combat hasn't reached their first turn
    //  - they are surprised
    //  - an effect forces flat-footed
    if (this.has('flat_footed')) return true;
    if (this.has('surprised')) return true;

    // Traits may override flat-footed (e.g., uncanny_dodge)
    if (this.character.hasTrait('uncanny_dodge')) return false;

    return false;
  }

  isFlanked() {
    // Flanking is determined by combat positioning (AoO system)
    // but effects may force flanked
    if (this.has('flanked')) return true;

    // Traits may prevent flanking (improved uncanny dodge)
    if (this.character.hasTrait('improved_uncanny_dodge')) return false;

    return false;
  }

  isEngaged() {
    return this.has('engaged');
  }

  isProne() {
    return this.has('prone');
  }

  isHelpless() {
    return this.has('helpless');
  }

  isBlinded() {
    return this.has('blinded');
  }

  isStunned() {
    return this.has('stunned');
  }

  isDazed() {
    return this.has('dazed');
  }

  isGrappled() {
    return this.has('grappled');
  }

  isRestrained() {
    return this.has('restrained');
  }

  isInvisible() {
    // Invisibility is usually an effect, but we treat it as a combat state
    return this.has('invisible');
  }

  // ─────────────────────────────────────────────
  // COMBAT MODIFIER HOOKS
  // These are used by attack-roll.js and defense.js
  // ─────────────────────────────────────────────

  /**
   * Attack roll penalties/bonuses from states.
   */
  getAttackModifiers() {
    const mods = [];

    if (this.isBlinded()) {
      mods.push({ flat: -2, reason: 'blinded' });
    }

    if (this.isProne()) {
      mods.push({ flat: -4, reason: 'prone (melee)' });
    }

    if (this.isStunned()) {
      mods.push({ flat: -5, reason: 'stunned' });
    }

    return mods;
  }

  /**
   * AC modifiers from states.
   */
  getDefenseModifiers() {
    const mods = [];

    if (this.isFlatFooted()) {
      mods.push({ flat: -this.character.getAttribute('dexterity_mod') || 0, reason: 'flat-footed' });
    }

    if (this.isProne()) {
      mods.push({ flat: +4, reason: 'prone vs ranged' });
      mods.push({ flat: -4, reason: 'prone vs melee' });
    }

    if (this.isStunned()) {
      mods.push({ flat: -2, reason: 'stunned' });
    }

    if (this.isHelpless()) {
      mods.push({ flat: -5, reason: 'helpless' });
    }

    return mods;
  }
}

module.exports = CombatStates;
