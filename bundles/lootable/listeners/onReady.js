'use strict';

/**
 * lootable :: onReady.js
 *
 * This listener replaces the old bundle.js initialization logic.
 * It is triggered by the `bundleReady` event declared in manifest.yml.
 *
 * Responsibilities:
 *   - Log that the lootable bundle has loaded
 *
 * All actual loot logic lives in:
 *   - behaviors/npc/lootable.js
 *   - behaviors/item/lootable.js
 *   - behaviors/room/lootable.js
 *   - lib/LootResolver.js
 *   - lib/tables/*.js
 */

module.exports = state => {
  state.Logger.info('[lootable] Loot system initialized.');
};
