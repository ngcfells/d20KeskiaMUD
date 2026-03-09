/**
 * Paper Cuts Bleed Effect
 * ----------------------
 * 1. Deals 1d4 bleed damage per round (Force/Kinetic).
 * 2. -2 Penalty to Dexterity-based checks and attacks.
 * 3. Concentration DC increased by +5 due to the distracting, sword-like stings.
 */
module.exports = {
  config: {
    name: "Thousand Paper Cuts",
    description: "Hundreds of microscopic jian blades are methodically flaying your skin.",
    type: "spell_effect",
    family: "bleed",
    tier: 1, 
    isMagical: true
  },
  state: {
      casterId: null,
      dexPenalty: -2
  },
  modifiers: {
    attributes: {
      dexterity: -2
    }
  },
  listeners: {
    onTick: state => function () {
        const target = this.target;
        const DamageTypes = require('../../../lib/combat/damage-types');
        const spellDef = state.SpellManager.get('liang_s_paper_cuts');

        const damage = Math.floor(Math.random() * 4) + 1;
        target.takeDamage(damage, DamageTypes.KINETIC, this.state.casterId);
        
        if (spellDef.emotes.bleedTick) spellDef.emotes.bleedTick(target);
    },

    onCalculateConcentrationDC: state => function (data) {
        data.dc += 5;
    },

    effectDeactivated() {
      this.target.say("<cyan>The high-pitched hum of the tiny swords ceases. They dissolve back into harmless paper dust, leaving you covered in a thousand fine red lines.</cyan>");
    }
  }
};
