// path: ./bundles/my-d20-bundle/effects/spells/breathing_effects.js
'use strict';

/**
 * Combined helper for Air/Water Breathing.
 * These listeners interact with your MUD's environment/suffocation logic.
 */

module.exports = {
  // Logic for Air Breathing
  air_breathing_effect: {
    config: { name: "Air Breathing", type: "buff", family: "adaptation", tier: 3 },
    listeners: {
      onCheckSuffocation(checkData) {
        if (checkData.environment === 'air') {
          checkData.canBreathe = true;
          checkData.bypassMessage = "Magical energy allows your gills to process the dry air.";
        }
      },
      effectDeactivated() {
        this.target.say("<red>The magical adaptation fades. The air feels thin and suffocating once more.</red>");
      }
    }
  },

  // Logic for Water Breathing
  water_breathing_effect: {
    config: { name: "Water Breathing", type: "buff", family: "adaptation", tier: 3 },
    listeners: {
      onCheckSuffocation(checkData) {
        if (checkData.environment === 'water') {
          checkData.canBreathe = true;
          checkData.bypassMessage = "Your lungs easily extract oxygen from the surrounding water.";
        }
      },
      effectDeactivated() {
        this.target.say("<red>The heavy weight in your chest vanishes. You must find air immediately!</red>");
      }
    }
  }
};
