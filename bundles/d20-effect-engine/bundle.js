'use strict';

class EffectEngine {
  constructor(state) {
    this.state = state;
    this.registry = state.EffectRegistry;
  }

  /**
   * Apply an effect to a target.
   */
  apply(target, effectId, config = {}) {
    const EffectClass = this.registry.get(effectId);
    if (!EffectClass) {
      throw new Error(`Unknown effect: ${effectId}`);
    }

    const effect = new EffectClass(config, this.state);

    // stacking rules
    const existing = target.effects.getByCategory(effect.category);
    if (existing && !effect.stacksWith(existing)) {
      if (existing.magnitude >= effect.magnitude) {
        return existing; // ignore weaker effect
      }
      existing.remove(); // replace weaker effect
    }

    target.effects.add(effect);
    effect.onApply(target);

    return effect;
  }

  /**
   * Remove an effect by ID.
   */
  remove(target, effectId) {
    const effect = target.effects.get(effectId);
    if (effect) {
      effect.remove();
    }
  }

  /**
   * Tick all effects on a target.
   */
  tick(target) {
    for (const effect of target.effects) {
      effect.onTick(target);

      if (effect.isExpired()) {
        effect.remove();
      }
    }
  }
}

module.exports = EffectEngine;
