'use strict';

/**
 * d20-combat :: register.js
 *
 * This listener replaces the old bundle.js initialization logic.
 * It is triggered by the `stateReady` event declared in manifest.yml.
 *
 * Responsibilities:
 *   - Attach CombatManager to the game state
 *   - Register combat-related event hooks
 *   - Log successful initialization
 */

const CombatManager = require('../lib/combat-manager');

module.exports = state => {
  // Attach the combat manager
  state.CombatManager = new CombatManager(state);

  // Log initialization
  state.Logger.info('[d20-combat] Combat engine initialized (stateReady).');
};
