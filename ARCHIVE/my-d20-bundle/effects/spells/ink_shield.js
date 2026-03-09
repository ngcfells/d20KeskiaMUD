'use strict';

/**
 * Living Ink Shield Effect
 * ------------------------
 * 1. +4 Shield Bonus to AC (does not stack with physical shields).
 * 2. 20% Concealment (Miss Chance) against all targeted attacks.
 * 3. Reactive emotes for combat feedback.
 */
module.exports = {
  config: {
    name: "Living Ink Shield",
    description: "A vortex of magical ink protects you, granting AC and concealment.",
    type: "spell_effect",
    unique: true,
    isMagical: true
  },
  state: {
    acBonus: 4,
    concealment: 20
  },
  listeners: {
    effectActivated() {
      // In a d20 system, Shield bonuses are distinct from Armor or Deflection.
      this.target.setMeta('shieldBonusMagic', this.state.acBonus);
    },

    effectDeactivated() {
      this.target.removeMeta('shieldBonusMagic');
      this.target.say("<yellow>The vortex loses its momentum; the ink rains down to the floor in a harmless, dark puddle.</yellow>");
    },

    /**
     * Miss Chance Logic
     * Triggered before the attack roll is finalized.
     */
    onBeforeAttack: state => function (attacker, action) {
      const roll = Math.floor(Math.random() * 100) + 1;
      if (roll <= this.state.concealment) {
        const spellDef = state.SpellManager.get('liang_s_ink_shield');
        if (spellDef.emotes.conceal) spellDef.emotes.conceal(this.target, attacker);
        
        // Signal to the combat engine that the attack missed due to concealment
        action.missed = true;
        action.missReason = 'concealment';
      }
    },

    /**
     * Hit Feedback: Shield Absorption
     */
    onMiss: state => function (attacker) {
      // Only show this if it was a close AC miss, signifying the 'shield' worked
      const spellDef = state.SpellManager.get('liang_s_ink_shield');
      if (spellDef.emotes.absorb) spellDef.emotes.absorb(this.target, attacker);
    }
  }
};
