'use strict';

const { COLD, KINETIC } = require('../../../lib/combat/damage-types');

module.exports = {
  config: {
    name: "Undead Familiar",
    description: "Animated via the Negative Material Plane; resistant to physical harm and immune to biological needs.",
    type: "condition",
    unique: true,
    persists: true
  },

  state: { masterUuid: null, masterLevel: 1 },

  modifiers: {
    attributes: {
      // Immune to Cold
      armorEnergy: (curr) => curr + 100, // Logic for total immunity
    }
  },

  listeners: {
    effectActivated() {
      const target = this.target;
      target.addTag('immune_sleep');
      target.addTag('immune_charm');
      target.addTag('immune_poison');
      target.addTag('immune_paralysis');
      target.addTag('immune_level_drain');
    },

    /**
     * Damage Mitigation: Silver/Magic required. 1/2 from Piercing.
     */
    onTakeDamage(damage) {
      // Resistance to normal weapons (Not silver, Not magic)
      if (!damage.metadata.isSilver && !damage.metadata.isMagical) {
        damage.amount = Math.floor(damage.amount * 0.5);
        this.target.say("<white>The weapon passes through your emaciated flesh with little effect.</white>");
      }

      // 1/2 Damage from Piercing
      if (damage.metadata.subType === 'piercing') {
        damage.amount = Math.floor(damage.amount * 0.5);
      }
    },

    /**
     * Infectious Bite: 10% chance to cause disease
     */
    onAttack(attack) {
      if (Math.random() < 0.10) {
        const target = attack.target;
        const disease = this.gameState.EffectFactory.create('giant_rat_fever', { duration: 86400000 });
        target.addEffect(disease);
        target.say("<red>The undead familiar's bite feels foul and unsanitary!</red>");
      }
    },

    /**
     * Turning Logic: Handled via master's level
     */
    onBeingTurned(turner) {
      const turnDC = 10 + Math.floor(this.state.masterLevel);
      // Logic: Familiar uses Master's level as effective HD for Turning.
      return turnDC;
    }
  }
};
