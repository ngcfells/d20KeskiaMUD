'use strict';

/**
 * Effect: Major Ability Damage (Tier 2)
 * A significant temporary reduction to a core ability score.
 */
module.exports = {
  config: {
    name: "Major Ability Damage",
    description: "A significant temporary weakening of one of your core abilities.",
    type: "condition",
    family: "ability_damage",
    tier: 2,
    maxTier: 3,
    duration: 45000,
    unique: false,
    persists: false
  },

  state: {
    ability: "strength",
    amount: 2
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
      this.target.say(`<red>Your ${this.state.ability} is significantly weakened.</red>`);
    },

    effectDeactivated() {
      this.target.say("<cyan>Your strength returns.</cyan>");
    }
  }
};
