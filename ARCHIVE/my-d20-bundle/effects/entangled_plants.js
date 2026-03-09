/**
 * Path: bundles/my-d20-bundle/effects/entangled_plants.js
 */

'use strict';

module.exports = {
  config: {
    name: 'Entangled',
    description: 'Vines and weeds wrap around your limbs, hampering your movement.',
    type: 'entangled',
    tickInterval: 2 // Checks every 2 seconds (roughly one combat round)
  },

  state: {
    breakFreeDC: 20
  },

  listeners: {
    effectActivated: function () {
      this.target.say("Roots and vines coil around your legs, dragging at your every move!");
      this.target.addTemporaryAttributeModifier('dexterity', -4);
    },

    effectDeactivated: function () {
      this.target.say("The plants release their grip as the magic fades.");
      this.target.removeTemporaryAttributeModifier('dexterity', -4);
    },

    /**
     * The Break-Free Check
     * Occurs every tick while the effect is active.
     */
    updateTick: function () {
      const target = this.target;
      const state = this.state;

      // 3.5E Rules: DC 20 Strength check or DC 20 Escape Artist check
      const strMod = Math.floor((target.getAttribute('strength') - 10) / 2);
      const escapeArtistRank = target.getMeta('skill_escape_artist') || 0;
      
      const bestBonus = Math.max(strMod, escapeArtistRank);
      const roll = Math.floor(Math.random() * 20) + 1 + bestBonus;

      if (roll >= state.breakFreeDC) {
        state.Broadcast.sayAt(target, `With a surge of effort, you tear yourself free from the grasping vines! (Roll: ${roll} vs DC ${state.breakFreeDC})`);
        state.Broadcast.sayAtExcept(target.room, `${target.name} rips through the entangling plants and regains their footing.`, target);
        this.remove(); // End the effect early for this specific target
      } else {
        // Flavor text for failed attempts
        if (Math.random() > 0.5) {
          state.Broadcast.sayAt(target, "You struggle against the vegetation, but the thorns sink deeper into your armor.");
        }
      }
    },

    /**
     * Intercept Attack Rolls
     */
    evaluateAttack: function (currentBonus) {
      return currentBonus - 2;
    },

    /**
     * Movement Restriction
     */
    preMove: function (exit, cancel) {
      this.target.say("The vines and brush entangle your feet, making it impossible to move quickly!");
      cancel(); // In 3.5E, you are stuck until you break free or the spell ends.
    },

    /**
     * Concentration Check for Spellcasting
     */
    preCast: function (spell) {
      const dc = 15 + spell.level;
      const concentration = this.target.getMeta('skill_concentration') || 0;
      const roll = Math.floor(Math.random() * 20) + 1 + concentration;
      
      if (roll < dc) {
        this.target.say(`The vines jerk your arm, ruining your incantation! (Roll: ${roll} vs DC ${dc})`);
        return false; 
      }
    }
  }
};
