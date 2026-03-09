'use strict';

/**
 * d20-traits :: register.js
 *
 * This listener replaces the old bundle.js initialization logic.
 * It is triggered by the `bundleReady` event declared in manifest.yml.
 *
 * Responsibilities:
 *   - Load all trait definitions from the bundle directory
 *   - Register traits with the Trait system
 *   - Log successful initialization
 *
 * All heavy logic remains in:
 *   - lib/loaders/trait-loader.js
 *   - lib/trait-manager.js
 *   - lib/trait-resolver.js
 */

const loadTraits = require('../lib/loaders/trait-loader');

module.exports = state => {
  // Load all traits from this bundle directory
  loadTraits(state, __dirname + '/..');

  state.Logger.info('[d20-traits] Traits loaded and registered (bundleReady).');
};
