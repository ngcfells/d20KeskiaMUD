'use strict';

const Categories = require('./EffectCategories');

/**
 * EffectBase
 *
 * The parent class for ALL effects in the d20-effect-engine.
 *
 * Provides:
 *   - category & stacking metadata
 *   - duration logic
 *   - magnitude logic
 *   - immunity & resistance checks
 *   - suppression logic
 *   - dispel logic
 *   - concentration logic
 *   - aura logic
 *   - trait-aware integration
 *   - lifecycle/decay/terrain/stamina/stasis hooks
 *   - event routing helpers
 */

class EffectBase {
  constructor(config = {}, state) {
    this.state = state;
    this.config = config;

    this.id = config.id || null;
    this.category = config.category || 'untyped';
    this.magnitude = config.magnitude ?? 0;

    this.duration = config.duration || null; // ms
    this.startTime = config.startTime || Date.now();

    this.source = config.source || null; // spell, item, feat, class, etc.
    this.tags = config.tags || [];       // custom effect tags
    this.flags = config.flags || {};     // misc flags
  }

  /* -------------------------------------------------------------------------- */
  /*                               CORE LIFECYCLE                               */
  /* -------------------------------------------------------------------------- */

  onApply(target, isLoad = false) {
    // Override in child effects
  }

  onRemove(target) {
    // Override in child effects
  }

  onTick(target) {
    // Override in child effects
  }

  onEvent(eventName, payload, target) {
    // Override in child effects
  }

  onDamage(damage, attacker, defender) {
    return damage;
  }

  onMove(target, fromRoom, toRoom) {}

  onSkillCheck(skillId, rollData, target) {
    return rollData;
  }

  onSave(saveType, rollData, target) {
    return rollData;
  }

  onAttack(attackData, attacker, defender) {
    return attackData;
  }

  /* -------------------------------------------------------------------------- */
  /*                               DURATION LOGIC                               */
  /* -------------------------------------------------------------------------- */

  isExpired() {
    if (!this.duration) return false;
    return (Date.now() - this.startTime) >= this.duration;
  }

  remaining() {
    if (!this.duration) return Infinity;
    return Math.max(0, this.duration - (Date.now() - this.startTime));
  }

  /* -------------------------------------------------------------------------- */
  /*                               STACKING LOGIC                               */
  /* -------------------------------------------------------------------------- */

  stacksWith(other) {
    const cat = Categories[this.category] || Categories.untyped;
    const otherCat = Categories[other.category] || Categories.untyped;

    if (this.category !== other.category) return true;
    return cat.stacks;
  }

  /* -------------------------------------------------------------------------- */
  /*                               IMMUNITY LOGIC                               */
  /* -------------------------------------------------------------------------- */

  isImmune(target) {
    if (!this.state.hasBundle('d20-traits')) return false;

    const TQ = this.state.TraitQuery;

    // Example: undead immune to poison, disease, bleed
    if (this.tags.includes('poison') && TQ.has(target, 'undead.')) return true;
    if (this.tags.includes('disease') && TQ.has(target, 'undead.')) return true;
    if (this.tags.includes('bleed') && TQ.has(target, 'construct.')) return true;

    // Custom immunity traits
    if (TQ.has(target, `immune.${this.id}`)) return true;
    if (TQ.has(target, `immune.${this.category}`)) return true;

    return false;
  }

  /* -------------------------------------------------------------------------- */
  /*                              RESISTANCE LOGIC                              */
  /* -------------------------------------------------------------------------- */

  applyResistance(target, magnitude) {
    if (!this.state.hasBundle('d20-traits')) return magnitude;

    const TQ = this.state.TraitQuery;

    // Example: fire resistance reduces fire-tagged effects
    if (this.tags.includes('fire') && TQ.has(target, 'resist.fire')) {
      const amt = TQ.get(target, 'resist.fire') || 0;
      return Math.max(0, magnitude - amt);
    }

    // Example: psionic resistance
    if (this.tags.includes('psionic') && TQ.has(target, 'resist.psionic')) {
      const amt = TQ.get(target, 'resist.psionic') || 0;
      return Math.max(0, magnitude - amt);
    }

    return magnitude;
  }

  /* -------------------------------------------------------------------------- */
  /*                               SUPPRESSION LOGIC                            */
  /* -------------------------------------------------------------------------- */

  isSuppressed(target) {
    if (!this.state.hasBundle('d20-traits')) return false;

    const TQ = this.state.TraitQuery;

    // Example: antimagic field suppresses magical effects
    if (this.tags.includes('magical') && TQ.has(target.room, 'field.antimagic')) {
      return true;
    }

    // Example: psionic null zone
    if (this.tags.includes('psionic') && TQ.has(target.room, 'field.null_psionic')) {
      return true;
    }

    return false;
  }

  /* -------------------------------------------------------------------------- */
  /*                                 DISPEL LOGIC                               */
  /* -------------------------------------------------------------------------- */

  canBeDispelled() {
    return !this.flags.permanent && !this.flags.undispellable;
  }

  dispel(target) {
    if (!this.canBeDispelled()) return false;
    this.remove(target);
    return true;
  }

  /* -------------------------------------------------------------------------- */
  /*                              CONCENTRATION LOGIC                            */
  /* -------------------------------------------------------------------------- */

  requiresConcentration() {
    return this.flags.concentration === true;
  }

  breakConcentration(target) {
    if (!this.requiresConcentration()) return;
    this.remove(target);
  }

  /* -------------------------------------------------------------------------- */
  /*                                   AURA LOGIC                               */
  /* -------------------------------------------------------------------------- */

  isAura() {
    return this.flags.aura === true;
  }

  auraRadius() {
    return this.flags.radius || 0;
  }

  /* -------------------------------------------------------------------------- */
  /*                               REMOVAL LOGIC                                */
  /* -------------------------------------------------------------------------- */

  remove(target) {
    try {
      this.onRemove(target);
    } catch (e) {
      console.error(`Effect ${this.id} onRemove error:`, e);
    }

    target.effects.remove(this);
  }
}

module.exports = EffectBase;
