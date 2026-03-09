/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/lib/d20/stamina-engine.js
 * PURPOSE: Logic for stamina recovery and exhaustion thresholds.
 */
'use strict';

const DimensionalInventory = require('./dimensional-inventory');

module.exports = {
  /**
   * Calculates the amount of stamina recovered in a single tick.
   */
  calculateRecovery(player) {
    const strength = player.getAttribute('strength') || 10;
    const weight = DimensionalInventory.getCarriedWeight(player);
    const maxLoad = strength * 15;
    const heavyLoad = strength * 10;

    // 1. OVERBURDENED: No recovery if carrying > Str x 15
    if (weight > maxLoad) return 0;

    // 2. BASE RECOVERY: Derived from Strength (d20 Standard: Str Mod + 1)
    let recovery = Math.max(1, Math.floor((strength - 10) / 2) + 1);

    // 3. ENCUMBRANCE PENALTY: Heavy loads (Str x 10) halve recovery
    if (weight > heavyLoad) {
      recovery = Math.max(1, Math.floor(recovery / 2));
    }

    // 4. STATE MODIFIERS
    if (player.hasEffect('resting')) recovery *= 2; // Double recovery while sitting/resting
    if (player.hasEffect('fatigued')) recovery = Math.max(1, Math.floor(recovery / 2));

    return recovery;
  },

  /**
   * Checks if the player is currently "Exhausted" (Stamina <= 0).
   * Exhausted characters move at half speed and take -6 to Str/Dex.
   */
  checkExhaustion(player) {
    const current = player.getAttribute('stamina');
    if (current <= 0 && !player.hasEffect('exhausted')) {
      const { Broadcast: B } = require('ranvier');
      B.sayAt(player, "<red>You have collapsed from exhaustion!</red>");
      
      // Standard d20 Exhaustion Effect
      player.addEffect(state.EffectFactory.create('exhausted', {
        config: { name: 'Exhausted' },
        state: { amount: 6 } // -6 penalty to Str/Dex
      }));
    }
  }
};
