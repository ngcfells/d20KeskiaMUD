// path: ./bundles/my-d20-bundle/effects/spells/adhesion_effect.js
'use strict';

module.exports = {
  config: {
    name: "Adhered",
    description: "You are bonded to a surface. Requires a Strength check to break free.",
    type: "condition",
    family: "binding",
    tier: 1,
    maxTier: 5
  },

  state: {
    breakDC: 20
  },

  modifiers: {
    attributes: {
      dexterity: -4,
      reflex: -2
    }
  },

  listeners: {
    effectActivated() {
      this.target.addTag('entangled');
      this.target.addTag('anchored');
    },

    effectDeactivated() {
      this.target.removeTag('entangled');
      this.target.removeTag('anchored');
      this.target.say("<cyan>The magical bond snaps, the surfaces sliding apart once more.</cyan>");
    },

    /**
     * Hook: Intercept movement or escape attempts
     */
    onAttemptMove(action) {
      const player = this.target;
      const strScore = player.getAttribute('strength') || 10;
      const strMod = Math.floor((strScore - 10) / 2);
      const roll = Math.floor(Math.random() * 20) + 1;

      if (roll + strMod < this.state.breakDC) {
        player.say("<red>You strain against the magical bond, but you are stuck fast!</red>");
        action.cancel();
      } else {
        player.say("<green>With a mighty heave, you tear yourself free of the adhesion!</green>");
        this.remove();
      }
    }
  }
};
