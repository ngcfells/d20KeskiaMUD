'use strict';

/**
 * d20 Damage Engine (Packet-Based)
 *
 * This module:
 * - Builds base damage packets (weapon, unarmed, spell, etc.)
 * - Allows modifiers to add/remove/transform packets
 * - Supports stacked multipliers (Option B)
 * - Applies RAW d20 damage order:
 *     1. Roll dice
 *     2. Add flat bonuses
 *     3. Apply multipliers
 *     4. Apply resistances
 *     5. Apply vulnerabilities
 *     6. Apply DR
 *     7. Apply immunities
 *     8. Apply effects
 *     9. Commit damage
 *
 * This file contains **no class/feat/spell logic**.
 * All such logic must be implemented via modifiers in bundles.
 */

module.exports = {
  /**
   * Build base damage packets for a given attack.
   * This is called BEFORE modifiers.
   *
   * @param {Character} attacker
   * @param {Character} target
   * @param {Object} options { hand, crit }
   * @returns {Array<DamagePacket>}
   */
  buildBasePackets(attacker, target, options = {}) {
    const { hand = 'main', crit = false } = options;

    const weapon = hand === 'offhand'
      ? attacker.equipment.get('offhand')
      : attacker.equipment.get('mainhand');

    // Default unarmed packet
    let dice = '1d3';
    let types = ['bludgeoning'];

    if (weapon) {
      dice = weapon.getMeta('damageDice') || '1d3';
      types = weapon.getMeta('damageTypes') || ['physical'];
    }

    return [
      {
        dice,
        flat: 0,
        types,
        label: weapon ? 'weapon' : 'unarmed',
        multiplier: 1,
        extraMultipliers: crit ? [weapon?.getMeta('critMultiplier') || 2] : []
      }
    ];
  },

  /**
   * Apply all damage packets using RAW d20 order.
   *
   * @param {Object} state
   * @param {Character} attacker
   * @param {Character} target
   * @param {Array} packets
   * @param {Object} rollResult
   * @returns {number} totalDamage
   */
  applyPackets(state, attacker, target, packets, rollResult) {
    let total = 0;

    for (const packet of packets) {
      let amount = this.rollDice(packet.dice);

      // Add flat bonuses
      amount += packet.flat;

      // Apply multipliers (stacked)
      let mult = packet.multiplier;
      for (const m of packet.extraMultipliers || []) {
        mult *= m;
      }
      amount *= mult;

      // Apply resistances
      amount = this.applyResistances(target, amount, packet.types);

      // Apply vulnerabilities
      amount = this.applyVulnerabilities(target, amount, packet.types);

      // Apply DR (only if physical)
      if (packet.types.includes('physical')) {
        amount = this.applyDR(target, amount);
      }

      // Apply immunities
      if (this.isImmune(target, packet.types)) {
        amount = 0;
      }

      // Allow effects to modify final packet damage
      const mods = attacker.emit
        ? attacker.emit('beforeDamageFinalize', {
            attacker,
            target,
            packet,
            amount,
            rollResult
          }) || []
        : [];

      for (const mod of mods) {
        if (typeof mod.modify === 'function') {
          amount = mod.modify(amount, packet, rollResult) || amount;
        }
      }

      total += Math.max(0, Math.floor(amount));
    }

    return total;
  },

  rollDice(diceStr) {
    const [count, sides] = diceStr.split('d').map(Number);
    let total = 0;
    for (let i = 0; i < count; i++) {
      total += Math.floor(Math.random() * sides) + 1;
    }
    return total;
  },

  applyResistances(target, amount, types) {
    const resist = target.getAttribute('resistances') || {};
    for (const t of types) {
      if (resist[t]) {
        amount -= resist[t];
      }
    }
    return amount;
  },

  applyVulnerabilities(target, amount, types) {
    const vuln = target.getAttribute('vulnerabilities') || {};
    for (const t of types) {
      if (vuln[t]) {
        amount *= vuln[t];
      }
    }
    return amount;
  },

  applyDR(target, amount) {
    const dr = target.getAttribute('damageReduction') || 0;
    return Math.max(0, amount - dr);
  },

  isImmune(target, types) {
    const imm = target.getAttribute('immunities') || {};
    return types.some(t => imm[t]);
  }
};
