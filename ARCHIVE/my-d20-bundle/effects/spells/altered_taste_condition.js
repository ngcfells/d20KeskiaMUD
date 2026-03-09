'use strict';

/**
 * Altered Taste Condition
 * -----------------------
 * Subjective illusory flavor profile.
 */
module.exports = {
  config: {
    name: "Altered Taste",
    description: "The object's flavor has been magically masked with a pleasant sensation.",
    type: "condition",
    family: "glamer",
    tier: 1,
    maxTier: 1,
    duration: -1 // Instantaneous on objects is permanent until consumption
  },
  state: {},
  modifiers: {
    attributes: {
      // No mechanical attribute changes per Rite Publishing source
    }
  },
  listeners: {
    effectActivated() {
      const item = this.target;

      // Listener for consumption trigger on the item
      item.on('consumed', (player) => {
        player.say("<green>As you taste the food, it is exactly what you find most pleasant—perfectly prepared and seasoned.</green>");
        player.say("<grey><i>(You are instantly aware of the spell's effect and may choose to disbelieve.)</i></grey>");
        
        // Mechanical Check: Spell does not alter quality/rot
        const isRotten = item.getMeta('isRotten');
        const isPoisoned = item.getMeta('isPoisoned');

        if (isRotten || isPoisoned) {
          player.say("<red>Despite the delicious taste, a cold feeling of dread settles in your stomach. Something is physically wrong with this meal.</red>");
        }
      });
    },
    effectDeactivated() {
      // Logic for when the item is fully consumed or dispelled
    }
  }
};
