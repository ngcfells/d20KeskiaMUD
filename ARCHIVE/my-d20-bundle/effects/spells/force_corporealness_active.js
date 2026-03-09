'use strict';

/**
 * Force Corporealness Effect
 * --------------------------
 * Strips the 'incorporeal' behavior and sets metadata to allow standard hits.
 */
module.exports = {
  config: {
    name: "Forced Corporealness",
    description: "Your essence has been anchored to the physical world.",
    type: "condition",
    family: "abjuration",
    tier: 1,
    maxTier: 1
  },
  listeners: {
    effectActivated() {
      const target = this.target;
      // Store original state to restore later
      this.state.wasIncorporeal = target.hasBehavior('incorporeal');
      
      if (this.state.wasIncorporeal) {
        target.removeBehavior('incorporeal');
        target.setMeta('isSubstantial', true);
        target.say("<yellow>Your spectral form hardens into vulnerable matter.</yellow>");
        target.room.broadcastExcept(target, `<white>${target.name} solidifies, their ghostly glow replaced by a dull, heavy reality.</white>`);
      }
    },

    effectDeactivated() {
      const target = this.target;
      if (this.state.wasIncorporeal) {
        target.addBehavior('incorporeal');
        target.setMeta('isSubstantial', false);
        target.say("<cyan>You feel the heavy weight of the world slide off as you become translucent once more.</cyan>");
      }
    }
  }
};
