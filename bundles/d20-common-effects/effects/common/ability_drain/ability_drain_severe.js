'use strict';

/**
 * Effect: Severe Ability Drain (Tier 3)
 * A severe persistent drain on a core ability score.
 */
module.exports = {
  config: {
    name: "Severe Ability Drain",
    description: "A severe persistent drain hollows one of your core abilities.",
    type: "condition",
    family: "ability_drain",
    tier: 3,
    maxTier: 3,
    duration: 60000,
    unique: false,
    persists: true
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
      this.target.say(`<red><b>Your ${this.state.ability} is severely drained.</b></red>`);
    },

    effectDeactivated() {
      this.target.say("<cyan>Your drained ability is restored.</cyan>");
    }
  }
};
