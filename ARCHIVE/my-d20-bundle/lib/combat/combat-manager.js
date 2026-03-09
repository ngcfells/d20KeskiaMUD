'use strict';

const { Combat } = require('ranvier');
const Initiative = require('./initiative');
const AttackRoll = require('./attack-roll');
const Damage = require('./damage');
const Flurry = require('./flurry');

class D20CombatManager extends Combat {
  /**
   * Main Round Heartbeat
   */
  static updateRound(state, room) {
    const combatants = [...room.players, ...room.npcs].filter(c => c.isInCombat());
    
    // Sort by Initiative (High to Low)
    combatants.sort((a, b) => (b.getMeta('initiative') || 0) - (a.getMeta('initiative') || 0));

    for (const attacker of combatants) {
      if (!attacker.isInCombat()) continue;
      const target = attacker.combatData.target;
      if (!target) continue;

      // --- 1. MONK FLURRY CHECK ---
      const flurryData = Flurry.getModifiers(attacker);

      if (flurryData) {
        // Resolve Main Flurry Attack
        this.resolveSwing(state, attacker, target, { 
          penalty: flurryData.penalty, 
          label: 'flurry' 
        });
        // Resolve Extra Flurry Attack
        this.resolveSwing(state, attacker, target, { 
          penalty: flurryData.penalty, 
          label: 'flurry extra' 
        });
      } else {
        // --- 2. STANDARD MAIN HAND ATTACK ---
        this.resolveSwing(state, attacker, target, { isOffhand: false });

        // --- 3. STANDARD OFF HAND ATTACK ---
        if (attacker.equipment.has('offhand')) {
          this.resolveSwing(state, attacker, target, { isOffhand: true });
        }
      }
    }
  }

  /**
   * @param {Object} options { isOffhand, penalty, label }
   */
  static resolveSwing(state, attacker, target, options = {}) {
    // Pass penalties (like Flurry's -2) into the AttackRoll engine
    const result = AttackRoll.resolve(attacker, target, options);
    
    const attackLabel = options.label || (options.isOffhand ? 'off-hand' : 'main-hand');

    if (result.hit) {
      const amount = Damage.calculate(attacker, target, result.crit, options.isOffhand);
      const dmg = new state.Damage({
        attribute: 'health',
        amount: amount,
        attacker,
        // Source is null for unarmed/flurry, or the specific weapon
        source: options.isOffhand ? attacker.equipment.get('offhand') : (attacker.equipment.get('mainhand') || null)
      });
      
      dmg.commit(target);
      attacker.say(`<green>You hit ${target.name} with your ${attackLabel} for ${amount} damage!</green>`);
    } else {
      attacker.say(`<red>You miss ${target.name} with your ${attackLabel}!</red>`);
    }
  }
}

module.exports = D20CombatManager;
