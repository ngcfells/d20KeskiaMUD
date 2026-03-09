'use strict';

/**
 * decay :: onReady.js
 *
 * This listener replaces the old bundle.js initialization logic.
 * It is triggered by the `bundleReady` event declared in manifest.yml.
 *
 * Responsibilities:
 *   - Log that the decay bundle has loaded
 *
 * All actual decay logic lives in:
 *   - behaviors/decay-item.js
 *   - behaviors/decay-npc.js
 *   - behaviors/decay-corpse.js
 *   - DecayEngine.js (if present)
 */

module.exports = state => {
  state.Logger.info('[decay] Decay bundle loaded.');
};
