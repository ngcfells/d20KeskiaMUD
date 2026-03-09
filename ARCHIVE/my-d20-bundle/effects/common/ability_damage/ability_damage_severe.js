'use strict';

/**
 * Effect: Severe Ability Damage (Tier 3)
 * A severe temporary reduction to a core ability score.
 */
module.exports = {
  config: {
    name: "Severe Ability Damage",
    description: "A severe temporary weakening of one of your core abilities.",
    type: "condition",
    family: "ability_damage",
    tier: 3,
    maxTier: 3,
    duration: 60000,
    unique: false,
    persists: false
  },

  state: {
    ability: "strength",
    amount: 4
  },

  modifiers: {
    attributes: {
      strength(current) {
        return this.state.ability === "strength" ? current - this.state.amount : current;
      },
      dexterity(current) {
        return this.state.ability === "dexterity" ? current - this.state.amount : current;
      },
      constitution(current) {
        return this.state.ability === "constitution" ? current - this.state.amount : current;
      },
      intelligence(current) {
        return this.state.ability === "intelligence" ? current - this.state.amount : current;
      },
      wisdom(current) {
        return this.state.ability === "wisdom" ? current - this.state.amount : current;
      },
      charisma(current) {
        return this.state.ability === "charisma" ? current - this.state.amount : current;
      },
      appearance(current) {
        return this.state.ability === "appearance" ? current - this.state.amount : current;
      }
    }
  },

  listeners: {
    effectActivated() {
      this.target.say(`<red><b>Your ${this.state.ability} is severely weakened.</b></red>`);
    },

    effectDeactivated() {
      this.target.say("<cyan>Your severe weakness fades.</cyan>");
    }
  }
};
