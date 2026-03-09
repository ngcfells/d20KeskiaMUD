// tied to armor of darkness spell
'use strict';

/**
 * Darkness Shroud Effect
 * ----------------------
 * 1. +4 Deflection Bonus to AC.
 * 2. +2 Resistance Bonus on saves vs spells with the [Good] descriptor.
 * 3. Grants Darkvision (60ft).
 * 4. No penalty to the wearer from this darkness.
 */
module.exports = {
  config: {
    name: "Armor of Darkness",
    description: "You are encased in protective, magical shadows.",
    type: "spell_effect",
    unique: true,
    isMagical: true
  },
  state: {},
  modifiers: {
    attributes: {
      // Handled as meta-bonuses for the Defense Resolver
    }
  },
  listeners: {
    effectActivated() {
      const target = this.target;
      target.setMeta('deflectionBonus', (target.getMeta('deflectionBonus') || 0) + 4);
      target.setMeta('hasDarkvision', true);
    },

    effectDeactivated() {
      const target = this.target;
      const currentDef = target.getMeta('deflectionBonus') || 0;
      target.setMeta('deflectionBonus', Math.max(0, currentDef - 4));
      target.removeMeta('hasDarkvision');
      target.say("<yellow>The shadows clinging to your skin evaporate into the air; the heavy protection they afforded is gone.</yellow>");
    },

    /**
     * Bolster saves against [Good] descriptors
     */
    onSavingThrow: state => function (data) {
      if (data.descriptors && data.descriptors.includes('good')) {
        const spellDef = state.SpellManager.get('armor_of_darkness');
        if (spellDef.emotes.holyResist) spellDef.emotes.holyResist(this.target);
        data.bonus += 2;
      }
    },

    /**
     * Hook for Defense Resolver to show "Deflect" emotes
     */
    onMiss: state => function (attacker) {
        const spellDef = state.SpellManager.get('armor_of_darkness');
        if (spellDef.emotes.deflect) spellDef.emotes.deflect(this.target, attacker);
    }
  }
};
