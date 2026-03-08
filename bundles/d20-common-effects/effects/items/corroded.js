'use strict';

/**
 * Effect: Corroded (Item)
 * Persistent corrosion that reduces an item's defensive properties.
 */
module.exports = {
  config: {
    name: "Corroded",
    description: "The surface is pitted and eaten away by caustic substances.",
    type: "item_condition",
    family: "item_corrosion",
    tier: 1,
    maxTier: 5,
    persists: true,
    unique: false
  },

  state: {
    penaltyPerTier: 1
  },

  modifiers: {
    attributes: {
      armorKinetic(current) {
        return current - (this.config.tier * this.state.penaltyPerTier);
      },
      armorEnergy(current) {
        return current - (this.config.tier * this.state.penaltyPerTier);
      },
      naturalArmor(current) {
        return current - (this.config.tier * this.state.penaltyPerTier);
      },
      damageReduction(current) {
        return current - (this.config.tier * this.state.penaltyPerTier);
      }
    }
  },

  listeners: {
    effectActivated() {
      const item = this.target;
      const owner = item.inventory?.owner;

      if (owner) {
        owner.say(`<yellow>Your ${item.name} hisses and pits as corrosion sets in.</yellow>`);
      }
    },

    effectDeactivated() {
      const item = this.target;
      const owner = item.inventory?.owner;

      if (owner) {
        owner.say(`<cyan>The corrosion on your ${item.name} has been meticulously scrubbed away and repaired.</cyan>`);
      }
    }
  }
};
