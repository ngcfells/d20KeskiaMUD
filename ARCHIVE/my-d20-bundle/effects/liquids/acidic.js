'use strict';

const { ACID } = require('../../lib/combat/damage-types');

/**
 * Effect: Acidic
 * Purpose: Handles ongoing corrosion from liquid acid exposure.
 */
module.exports = {
  config: {
    name: "Acidic",
    description: "You are drenched in a corrosive substance that eats through flesh and gear.",
    type: "liquid_hazard",
    family: "corrosion",
    tier: 1,
    maxTier: 3,
    duration: 12000 // 2 rounds default
  },

  state: {
    damagePerTick: '1d6',
    attacker: null
  },

  listeners: {
    effectActivated() {
      const target = this.target;
      target.say("<bold><green>The acid clings to you, hissing as it eats into your skin!</green></bold>");
    },

    effectDeactivated() {
      const target = this.target;
      target.say("<cyan>The acid finally neutralizes, leaving behind scorched remains.</cyan>");
    },

    /**
     * Standard Ranvier effect tick - occurs every few seconds.
     */
    updateTick() {
      const target = this.target;
      const state = this.gameState;
      
      // Roll for ongoing damage
      const damageAmount = state.Dice.roll(this.state.damagePerTick);
      
      // Apply damage to the character
      state.Damage.apply({
        amount: damageAmount,
        type: ACID,
        attacker: this.state.attacker,
        target: target,
        source: "Corrosion"
      });

      // Perspective Emotes
      target.say("<red>You cry out as the acid continues to burn!</red>");
      target.room.emitExcept(target, `<green>Acid continues to smoke and hiss on ${target.name}'s body.</green>`);

      // ─────────────────────────────────────────────────────────────
      // EQUIPMENT CORROSION
      // ─────────────────────────────────────────────────────────────
      // Logic: Acid has a 20% chance to damage a random equipped item per tick
      if (Math.random() < 0.20) {
        const equipment = Array.from(target.equipment.values());
        if (equipment.length > 0) {
          const randomItem = equipment[Math.floor(Math.random() * equipment.length)];
          
          if (randomItem.applyDamage) {
            randomItem.applyDamage(Math.floor(damageAmount / 2), ACID);
            target.say(`<yellow>You hear a sickening hiss as your ${randomItem.name} begins to pit and corrode!</yellow>`);
          }
        }
      }
    }
  }
};
