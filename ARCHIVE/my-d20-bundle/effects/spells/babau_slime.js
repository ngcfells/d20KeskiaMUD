'use strict';

/**
 * Effect: Babau Slime (Reactive Corrosive)
 * Any creature striking the target with natural weapons or unarmed 
 * strikes takes 1d8 acid damage. Manufactured weapons also take damage.
 */
module.exports = {
  config: {
    name: "Babau Slime",
    description: "Your skin secretes a thick, caustic layer of demon slime.",
    type: "buff",
    family: "acid",
    tier: 1,
    maxTier: 1
  },
  state: {
    casterLevel: 1,
    saveDC: 11
  },
  modifiers: {
    attributes: {
      // In some editions, slime grants a bonus to escape grapples.
      // escape_artist: 4 
    }
  },
  listeners: {
    effectActivated() {
      this.target.say("<green>A nauseating, gelatinous green slime oozes from your pores, coating your gear and skin.</green>");
      this.target.room.broadcastExcept(this.target, `<green>A foul, sulfurous stench erupts as ${this.target.name}'s skin begins to drip with caustic green slime.</green>`);
    },
    effectDeactivated() {
      this.target.say("<yellow>The green slime turns brittle and flakes away into harmless grey dust.</yellow>");
    },
    /**
     * Reflexive Damage Logic
     * Triggered by the combat engine when the target is struck.
     */
    onHit(attacker, weapon, damage) {
      const target = this.target;
      const state = this.state;
      
      // 3.5e Rule: Only natural weapons, unarmed strikes, or manufactured weapons take damage.
      const isNatural = !weapon || weapon.getMeta('isNatural');
      
      let damageRoll = Math.floor(Math.random() * 8) + 1; // 1d8
      
      // Fortitude Save for half
      const saveRoll = Math.floor(Math.random() * 20) + 1;
      const attackerFort = attacker.getAttribute('fortitude') || 0;
      if ((saveRoll + attackerFort) >= this.state.saveDC) {
        damageRoll = Math.floor(damageRoll / 2);
        attacker.say("<cyan>You recoil quickly from the slime, minimizing the caustic burn.</cyan>");
      }

      // Apply to attacker
      attacker.emit('damage', {
        amount: damageRoll,
        type: 'acid',
        attacker: target,
        source: this
      });

      // Perspective Emotes
      if (isNatural) {
        attacker.say(`<red>Your flesh hisses and smokes as it contacts ${target.name}'s acidic coating!</red>`);
        target.say(`<green>Your slime sears ${attacker.name}'s bare skin!</green>`);
      } else {
        attacker.say(`<yellow>Your ${weapon.name} sizzles as the green slime eats into the material!</yellow>`);
        // Logic for Item Damage (if implemented in your item system)
        if (weapon.hasAttribute('durability')) {
            weapon.emit('damage', damageRoll);
        }
      }
    }
  }
};
