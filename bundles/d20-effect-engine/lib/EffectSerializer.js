'use strict';

/**
 * EffectSerializer
 *
 * Responsible for:
 *   - Converting active effects into JSON-safe data
 *   - Reconstructing effects from saved data
 *   - Ensuring effects survive logout, reboot, zone reload
 *   - Preserving duration, magnitude, category, config, and timestamps
 *
 * This is the canonical persistence layer for the d20-effect-engine.
 */

class EffectSerializer {
  constructor(state) {
    this.state = state;
    this.registry = state.EffectRegistry;
  }

  /**
   * Serialize all effects on a target.
   *
   * @param {EffectList} effectList
   * @return {Array<Object>}
   */
  serialize(effectList) {
    const out = [];

    for (const effect of effectList) {
      out.push({
        id: effect.id,
        category: effect.category,
        magnitude: effect.magnitude,
        duration: effect.duration,
        startTime: effect.startTime,
        config: effect.config || {}
      });
    }

    return out;
  }

  /**
   * Deserialize effects and reapply them to a target.
   *
   * @param {Object} target
   * @param {Array<Object>} savedEffects
   */
  deserialize(target, savedEffects) {
    if (!Array.isArray(savedEffects)) return;

    for (const data of savedEffects) {
      const EffectClass = this.registry.get(data.id);

      if (!EffectClass) {
        console.warn(`Unknown effect during load: ${data.id}`);
        continue;
      }

      // Rebuild effect instance
      const effect = new EffectClass(data.config || {}, this.state);

      effect.id = data.id;
      effect.category = data.category;
      effect.magnitude = data.magnitude;
      effect.duration = data.duration;
      effect.startTime = data.startTime;

      // Add to target
      target.effects.add(effect);

      // Re-run onApply so hooks reinitialize
      try {
        effect.onApply(target, true); // true = "loading from save"
      } catch (e) {
        console.error(`Error applying effect ${effect.id} on load:`, e);
      }
    }
  }
}

module.exports = EffectSerializer;
