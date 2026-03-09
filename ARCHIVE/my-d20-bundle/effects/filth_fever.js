// path: bundles/my-d20-bundle/effects/filth_fever.js
'use strict';

/**
 * Effect: Filth Fever
 *
 * 3.5E Disease Logic:
 *  - Incubation: 1 day (we shorten for gameplay)
 *  - Damage: Dex + Con damage
 *  - Requires daily Fortitude saves to resist progression
 *
 * MU‑D20 Hybrid Implementation:
 *  - Applies periodic Constitution + Dexterity penalties
 *  - Requires periodic Fortitude saves
 *  - Can be cured by magic or medicine
 */

module.exports = {
  config: {
    name: "Filth Fever",
    description: "A painful infection that weakens your body and clouds your senses.",
    duration: 300000, // 5 minutes real-time (tunable)
    tickInterval: 60000 // Every 60 seconds
  },

  state: {
    stage: 1
  },

  modifiers: {},

  listeners: {

    effectActivated() {
      const player = this.target;
      player.say("<magenta>A feverish heat spreads from the wound. You feel weak and nauseated.</magenta>");
    },

    /**
     * Every tick, the disease attempts to progress.
     */
    effectTick() {
      const player = this.target;
      const state = this.state;

      const dc = 14; // 3.5E Filth Fever DC
      const fort = player.getAttribute('fortitude') || 0;
      const roll = Math.floor(Math.random() * 20) + 1;

      player.say(`<white>[ Fortitude Save vs Filth Fever: ${roll} + ${fort} vs DC ${dc} ]</white>`);

      if (roll + fort < dc) {
        // Disease worsens
        state.stage++;

        player.say("<red>Your fever worsens. Your limbs feel heavy and your breath shallow.</red>");

        // Apply ability damage
        player.mutateAttribute('constitution', -1);
        player.mutateAttribute('dexterity', -1);
      } else {
        player.say("<cyan>Your fever stabilizes for now.</cyan>");
      }
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<green>The fever breaks. You feel your strength slowly returning.</green>");
    }
  }
};
