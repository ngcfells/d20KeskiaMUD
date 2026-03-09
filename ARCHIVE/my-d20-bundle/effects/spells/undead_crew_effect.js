// path: ./bundles/my-d20-bundle/effects/spells/undead_crew_effect.js
// tied to the create_sailors spell
'use strict';

module.exports = {
  config: {
    name: "Undead Crew",
    description: "A crew of skeletal sailors operating the ship under concentration.",
    type: "buff",
    family: "summoning",
    tier: 3
  },

  state: {
    crewCount: 5
  },

  listeners: {
    effectActivated() {
      const ship = this.target;
      ship.addTag('automated_sailing');
      ship.setMeta('profession_sailor_bonus', 5);
    },

    /**
     * Logic for operating machinery (Ballistae/Catapults)
     */
    onFireMachinery(weapon, target) {
      // Crew fires as 1st-level warriors (+1 BAB)
      const roll = Math.floor(Math.random() * 20) + 1 + 1;
      // ... logic for machinery damage
    },

    effectDeactivated() {
      const ship = this.target;
      ship.removeTag('automated_sailing');
      ship.setMeta('profession_sailor_bonus', 0);
      ship.room.broadcast("The skeletal sailors dissolve back into sea-mist and salt.");
    }
  }
};
