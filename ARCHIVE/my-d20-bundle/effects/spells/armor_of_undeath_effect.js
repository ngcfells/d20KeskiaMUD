// path: ./bundles/my-d20-bundle/effects/spells/armor_of_undeath_effect.js
'use strict';

module.exports = {
  config: {
    name: "Armor of Undeath",
    description: "Wrapped in a corpse; +8 Armor Bonus and DR 10/Magic and Bludgeoning.",
    type: "spell_effect",
    family: "protection",
    tier: 3,
    maxTier: 5
  },

  state: {
    casterLevel: 1
  },

  modifiers: {
    attributes: {
      armorKinetic: 8,
      damageReduction: 10,
      appearance: -4 // Necromantic disfigurement
    }
  },

  listeners: {
    effectActivated() {
      // Visual flair/Logic for blending with undead
      this.target.addTag('detect_as_undead');
    },

    effectDeactivated() {
      const player = this.target;
      player.removeTag('detect_as_undead');
      player.say("<yellow>The necrotic energies binding the armor to your skin dissolve. The remains crumble into fine, grey ash and blow away.</yellow>");
      player.room.broadcastExcept(player, `<yellow>The grisly armor covering ${player.name} turns to ash, revealing them once more.</yellow>`);
    },

    /**
     * Custom behavior: Mindless undead (Zombies/Skeletons) 
     * ignore the caster unless attacked.
     */
    incomingAttack(attack) {
      if (attack.attacker.hasTag('mindless_undead')) {
         // Logic here to force a Will save or cancel attack
      }
    }
  }
};
