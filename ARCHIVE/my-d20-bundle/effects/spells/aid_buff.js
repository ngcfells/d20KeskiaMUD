// path: ./bundles/my-d20-bundle/effects/spells/aid_buff.js
'use strict';

module.exports = {
  config: {
    name: "Aid",
    description: "+1 morale bonus to attack/fear saves; carries temporary hit points.",
    type: "buff",
    family: "hope",
    tier: 2
  },

  state: {
    tempHP: 0
  },

  modifiers: {
    attributes: {
      // +1 Morale bonus (Note: Logic should check if 'Bless' is active to prevent stacking)
      attack: (target, current) => {
        return target.hasEffect('bless_buff') ? current : current + 1;
      },
      will: (target, current) => {
        // Specifically for fear saves, but simplified here to general Will for MUD flow
        return current + 1;
      }
    }
  },

  listeners: {
    /**
     * Temporary HP Interception
     */
    incomingDamage(damage) {
      if (this.state.tempHP <= 0) return;

      const absorbed = Math.min(damage.amount, this.state.tempHP);
      this.state.tempHP -= absorbed;
      damage.amount -= absorbed;

      this.target.say(`<cyan>[Aid] Your divine shield absorbs ${absorbed} damage! (${this.state.tempHP} remaining)</cyan>`);
      
      if (this.state.tempHP <= 0) {
        this.target.say("<yellow>The golden light around you shatters as your temporary vitality is spent.</yellow>");
      }
    },

    updateTick() {
      if (Math.random() > 0.9) {
        this.target.say("<white>A lingering warmth in your chest reminds you of the divine favor watching over you.</white>");
      }
    },

    effectDeactivated() {
      this.target.say("<red>The divine bolstering fades, leaving you to rely on your own strength once more.</red>");
      this.target.room.broadcastExcept(this.target, `<grey>The golden aura around ${this.target.name} flickers and vanishes.</grey>`);
    }
  }
};
