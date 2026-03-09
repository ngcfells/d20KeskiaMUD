// path: ./bundles/my-d20-bundle/effects/spells/acid_symbol_effect.js
'use strict';

module.exports = {
  config: {
    name: "Acid Symbol",
    description: "Imbued with corrosive slime. Deals 1d6 acid damage on contact. Grants immunities.",
    type: "buff",
    family: "necromancy",
    tier: 4
  },

  state: {
    dissolveDC: 19
  },

  modifiers: {
    attributes: {
      // Immunity logic usually handled via listeners or tags
    }
  },

  listeners: {
    effectActivated() {
      const target = this.target;
      target.addTag('immune_acid');
      target.addTag('immune_cold');
      target.addTag('immune_fire');
      target.addTag('acid_symbol_active');
    },

    /**
     * Offensive Logic: Extra damage on natural weapon hits.
     */
    onMeleeHit(damage, target) {
      const acidDmg = Math.floor(Math.random() * 6) + 1;
      target.receiveDamage('acid', acidDmg, this.target);
      target.say("<green>The undead's slime-coated claws burn your flesh!</green>");
    },

    /**
     * Defensive Logic: Punish attackers and dissolve weapons.
     */
    incomingAttack(attack) {
      const attacker = attack.attacker;
      const weapon = attack.weapon;

      // 1. Contact Damage (Natural weapons or Unarmed)
      if (!weapon || weapon.hasTag('natural')) {
        const contactDmg = Math.floor(Math.random() * 6) + 1;
        attacker.receiveDamage('acid', contactDmg, this.target);
        attacker.say("<red>Striking the slime-covered creature sears your hands!</red>");
      }

      // 2. Weapon Dissolution (Wood or Metal)
      if (weapon && (weapon.hasTag('metal') || weapon.hasTag('wood'))) {
        const saveRoll = Math.floor(Math.random() * 20) + 1; // Simplified save check
        if (saveRoll < this.state.dissolveDC) {
          attacker.say(`<bold><red>Your ${weapon.name} hisses and dissolves into a useless puddle of slag!</red></bold>`);
          weapon.destroy(); // Engine command to remove/delete item
        }
      }
    },

    /**
     * Environmental/Object Damage
     */
    onTick() {
      // Logic for 20 damage/round to wood/metal objects 
      // if the undead is specifically instructed to 'destroy' an object.
    },

    effectDeactivated() {
      const target = this.target;
      target.removeTag('immune_acid');
      target.removeTag('immune_cold');
      target.removeTag('immune_fire');
      target.removeTag('acid_symbol_active');
    }
  }
};
