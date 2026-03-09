'use strict';

/**
 * lifecycle :: onReady.js
 *
 * This listener replaces the old bundle.js initialization logic.
 * It is triggered by the `bundleReady` event declared in manifest.yml.
 *
 * Responsibilities:
 *   - Log that the lifecycle bundle has loaded
 *
 * All actual lifecycle logic lives in:
 *   - behaviors/npc/lifecycle.js
 *   - behaviors/room/lifecycle.js
 *   - behaviors/item/lifecycle.js
 *   - lib/resolvers/*.js
 */

module.exports = state => {
  state.Logger.info('[lifecycle] Lifecycle bundle loaded.');
};
