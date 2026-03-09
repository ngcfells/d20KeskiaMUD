// path: ./bundles/my-d20-bundle/effects/spells/draining_mist_aura.js
'use strict';

module.exports = {
  config: {
    name: "Draining Mist",
    description: "Cold mist draining 1d3 health and 5 stamina per round.",
    type: "environmental",
    family: "necromancy",
    tier: 2
  },

  state: {
    casterId: null,
    cl: 1
  },

  listeners: {
    /**
     * Logic: Every round, drain living creatures in the room.
     */
    updateTick() {
      const room = this.target; // Room effect
      const caster = room.findPlayerById(this.state.casterId);
      const dc = 10 + 2 + D20Utils.getModifier(caster ? caster.getAttribute('intelligence') : 10);

      room.characters.forEach(char => {
        // Only affects living creatures; ignore undead/constructs/caster
        if (char.id === this.state.casterId || char.hasTag('undead') || char.hasTag('construct')) return;

        const save = Math.floor(Math.random() * 20) + 1 + (char.getMeta('save_fortitude') || 0);
        
        if (save < dc) {
          const healthDrain = Math.floor(Math.random() * 3) + 1; // 1d3
          const staminaDrain = 5;

          char.receiveDamage('cold', healthDrain, caster);
          char.setAttribute('stamina', Math.max(0, char.getAttribute('stamina') - staminaDrain));
          
          char.say("<red>The mist clings to your skin like ice, leeching the very strength from your limbs.</red>");
          
          // Bolster the caster (optional mechanic based on "morsel" flavor)
          if (caster) {
            caster.setAttribute('stamina', Math.min(caster.getMaxAttribute('stamina'), caster.getAttribute('stamina') + 1));
          }
        }
      });
    },

    effectDeactivated() {
      this.target.broadcast("<yellow>The pale mists dissipate, leaving the air strangely stagnant and dry.</yellow>");
    }
  }
};
