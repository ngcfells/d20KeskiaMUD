'use strict';

/**
 * Effect: Minor Ability Damage (Tier 1)
 * Temporary reduction to a core ability score.
 */
module.exports = {
  config: {
    name: "Minor Ability Damage",
    description: "A temporary weakening of one of your core abilities.",
    type: "condition",
    family: "ability_damage",
    tier: 1,
    maxTier: 3,
    duration: 30000,
    unique: false,
    persists: false
  },

  state: {
    ability: "strength", // strength, dexterity, constitution, intelligence, wisdom, charisma, appearance
    amount: 1
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
      this.target.say(`<yellow>Your ${this.state.ability} is weakened.</yellow>`);
    },

    effectDeactivated() {
      this.target.say("<cyan>Your temporary weakness fades.</cyan>");
    }
  }
};
