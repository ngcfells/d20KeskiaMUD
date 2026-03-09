'use strict';

const LiquidEffects = require('../../effects/liquid-effects');

class LiquidManager {
  constructor(state) {
    this.state = state;

    // YAML-defined liquids
    this.liquids = new Map();

    // Effect registry (IDs → effect config)
    this.effects = LiquidEffects;
  }

  /**
   * Register a liquid definition from YAML.
   * Called automatically by the item loader.
   */
  register(id, config) {
    this.liquids.set(id, config);
  }

  /**
   * Retrieve a liquid definition.
   */
  get(id) {
    return this.liquids.get(id);
  }

  /**
   * Apply effects from Liquid Effects Pack 1.
   *
   * @param {GameState} state
   * @param {Player} player
   * @param {Item} item
   * @param {string} liquidId
   */
  applyEffects(state, player, item, liquidId) {
    const liquid = this.get(liquidId);
    if (!liquid) return;

    const effectIds = liquid.defaultEffects || [];
    if (!Array.isArray(effectIds)) return;

    for (const effectId of effectIds) {
      const effectConfig = this.effects[effectId];
      if (!effectConfig) continue;

      const effect = state.EffectFactory.create(
        effectConfig.effect,
        { duration: effectConfig.duration }
      );

      player.addEffect(effect);
    }
  }
}

module.exports = LiquidManager;
