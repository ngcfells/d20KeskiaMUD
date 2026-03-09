// path: bundles/my-d20-bundle/areas/ossuary/scripts/npcs/dire_rat_logic.js
'use strict';

/**
 * Dire Rat Behavior Script
 * - Filth Fever on hit (10% chance)
 * - Friendly state (from feeding beetles)
 * - Ambient reaction on player entry
 */

module.exports = {
  listeners: {

    /**
     * HIT EVENT
     * Triggered when the rat successfully hits a target.
     * Signature: (damage, target, attacker)
     */
    hit: state => function (damage, target, attacker) {
      const rat = this;

      // Only apply disease when *this rat* is the attacker
      if (attacker !== rat) return;

      // Only infect players (not NPCs)
      if (!target.isPlayer) return;

      // 10% chance of Filth Fever
      if (Math.random() < 0.10) {
        target.say("<red>The rat's bite is filthy! A feverish heat spreads from the wound.</red>");

        if (state.EffectFactory.has('filth_fever')) {
          const effect = state.EffectFactory.create('filth_fever', {});
          target.addEffect(effect);
        }
      }
    },

    /**
     * PLAYER ENTER EVENT
     * Triggered when a player enters the rat's room.
     */
    playerEnter: state => function (player) {
      const rat = this;

      if (rat.getMeta('is_friendly')) {
        player.say("The dire rat chitters softly, watching you with curious, non-aggressive eyes.");
      } else {
        player.say("The dire rat hisses, baring yellowed incisors as it guards its nest.");
      }
    },

    /**
     * OPTIONAL: COMBAT START FLAVOR
     * Adds atmosphere when the rat initiates combat.
     */
    combatStart: state => function (target) {
      const rat = this;

      if (rat.getMeta('is_friendly')) return; // Friendly rats do not attack

      if (target && target.isPlayer) {
        target.say("<red>The dire rat lunges from the shadows, teeth snapping!</red>");
      }
    }
  }
};
