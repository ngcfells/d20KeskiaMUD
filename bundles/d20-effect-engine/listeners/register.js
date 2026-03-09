'use strict';

/**
 * d20-effect-engine :: register.js
 *
 * This listener replaces the old bundle.js initialization logic.
 * It is triggered by the `stateReady` event declared in manifest.yml.
 *
 * Responsibilities:
 *   - Attach the EffectEngine instance to the game state
 *   - Ensure EffectRegistry exists
 *   - Log successful initialization
 *
 * This file MUST remain extremely small and stable.
 * All heavy logic lives in:
 *   - EffectEngine.js
 *   - EffectRegistry.js
 *   - EffectBase.js
 *   - EffectCategories.js
 *   - EffectStacking.js
 *   - EffectSerializer.js
 *   - EffectHooks.js
 */

const EffectEngine = require('../lib/EffectEngine');
const EffectRegistry = require('../lib/EffectRegistry');

module.exports = state => {
  // Ensure registry exists before engine
  if (!state.EffectRegistry) {
    state.EffectRegistry = new EffectRegistry(state);
  }

  // Create and attach the engine
  state.EffectEngine = new EffectEngine(state);

  state.Logger.info('[d20-effect-engine] Effect engine initialized (stateReady).');
};
