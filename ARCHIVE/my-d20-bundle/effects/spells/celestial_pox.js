// path: ./bundles/my-d20-bundle/effects/spells/celestial_pox.js
'use strict';

module.exports = {
  config: {
    name: "Celestial Pox",
    description: "Holy sores from the Affliction spell. Marks the soul as judged.",
    type: "condition",
    family: "disease", // Categorized as disease for 'Remove Disease' interaction
    tier: 3,
    maxTier: 5,
    duration: 60000 // Visual/Tag duration, though damage is instantaneous
  },

  state: {
    origin: 'celestial'
  },

  modifiers: {
    attributes: {
      appearance: -4, // Visible weeping sores
      charisma: -2    // The pain and scarring hamper social grace
    }
  },

  listeners: {
    effectActivated() {
      const target = this.target;
      // Perspective: Target
      target.say("<red><bold>White-hot agony flares as celestial pustules bubble up through your skin!</bold></red>");
      
      // Add a tag for other holy spells to potentially interact with
      target.addTag('afflicted_by_light');
    },

    effectDeactivated() {
      const target = this.target;
      target.removeTag('afflicted_by_light');
      target.say("<cyan>The divine heat in your blood cools, leaving only faint, silvery scars behind.</cyan>");
      
      // Perspective: Room
      target.room.broadcastExcept(target, `<white>The glowing sores on ${target.name} fade into dim, metallic-looking scars.</white>`);
    },

    /**
     * Optional logic: If a "Curse" or "Disease" removal is cast, 
     * this effect should be targeted.
     */
    onHeal(amount) {
      // Celestial diseases are notoriously hard to knit through standard means
      return Math.floor(amount * 0.75); 
    }
  }
};
