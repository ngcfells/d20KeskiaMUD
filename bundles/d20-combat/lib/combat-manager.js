'use strict';

/**
 * D20CombatManager
 *
 * Round-based, class-agnostic d20 combat orchestrator.
 * - Builds attack sequences (iteratives, off-hand, haste, etc.)
 * - Runs event + method based modifiers
 * - Supports attack replacement
 * - Delegates hit + damage math to AttackRoll and Damage modules
 */

const AttackRoll = require('./combat/attack-roll');
const Damage = require('./damage/damage');

class D20CombatManager {
  /**
   * Main round heartbeat, called once per combat tick per room.
   */
  static updateRound(state, room) {
    const combatants = [...room.players, ...room.npcs].filter(c => c.isInCombat());

    // Sort by initiative (high to low)
    combatants.sort((a, b) => (b.getMeta('initiative') || 0) - (a.getMeta('initiative') || 0));

    for (const attacker of combatants) {
      if (!attacker.isInCombat()) continue;

      const target = attacker.combatData.target;
      if (!target || target.room !== attacker.room) continue;

      // Build base attack sequence (BAB, off-hand, haste, etc.)
      let sequence = this.buildBaseSequence(state, attacker);

      // Allow modifiers (class, feats, spells, traits, effects) to adjust sequence
      sequence = this.applySequenceModifiers(state, attacker, target, sequence);

      // Optional debug logging
      this.debugSequence(state, attacker, sequence);

      // Execute each attack step in sequence
      for (const step of sequence) {
        if (!attacker.isInCombat() || !target || target.room !== attacker.room) break;
        this.resolveStep(state, attacker, target, step);
      }
    }
  }

  /**
   * Build the base attack sequence from BAB, off-hand, haste, etc.
   * Returns an array of attack steps:
   * {
   *   hand: 'main' | 'offhand' | 'haste' | 'special',
   *   penalty: number,
   *   label: string,
   *   id: string,
   *   source: 'base' | 'feat' | 'class' | 'spell' | 'effect' | 'item'
   * }
   */
  static buildBaseSequence(state, attacker) {
    const sequence = [];

    const bab = attacker.getAttribute ? attacker.getAttribute('bab') || 0 : 0;
    const mainHand = attacker.equipment && attacker.equipment.has('wield');
    const offHand = attacker.equipment && attacker.equipment.has('offhand');
    const hasHaste = attacker.getMeta && attacker.getMeta('haste');

    // Main-hand iterative attacks from BAB
    if (mainHand || !offHand) {
      let penalty = 0;
      let currentBab = bab;

      while (currentBab >= 1) {
        sequence.push({
          hand: 'main',
          penalty,
          label: penalty === 0 ? 'main-hand' : 'iterative',
          id: penalty === 0 ? 'MAIN' : 'ITERATIVE',
          source: 'base'
        });

        currentBab -= 5;
        penalty -= 5;
      }
    }

    // Off-hand attack (basic TWF assumption; feats can adjust later)
    if (offHand) {
      sequence.push({
        hand: 'offhand',
        penalty: -2,
        label: 'off-hand',
        id: 'OFFHAND',
        source: 'base'
      });
    }

    // Haste extra attack (at full bonus)
    if (hasHaste) {
      sequence.push({
        hand: 'haste',
        penalty: 0,
        label: 'haste',
        id: 'HASTE',
        source: 'spell'
      });
    }

    return sequence;
  }

  /**
   * Allow modifiers to adjust the attack sequence.
   * - Event-based: attacker.emit('beforeAttackSequence', ...)
   * - Method-based: attacker.getAttackSequenceModifiers?.(...)
   */
  static applySequenceModifiers(state, attacker, target, sequence) {
    let seq = [...sequence];

    // Event-based modifiers
    const eventMods = attacker.emit
      ? attacker.emit('beforeAttackSequence', { attacker, target, sequence: seq }) || []
      : [];

    // Method-based modifiers
    const methodMods = typeof attacker.getAttackSequenceModifiers === 'function'
      ? attacker.getAttackSequenceModifiers(target, seq) || []
      : [];

    const allMods = [...eventMods, ...methodMods];

    for (const mod of allMods) {
      if (!mod) continue;

      // Replace entire sequence
      if (Array.isArray(mod.replaceSequence)) {
        seq = mod.replaceSequence;
        continue;
      }

      // Append steps
      if (Array.isArray(mod.addSteps)) {
        seq.push(...mod.addSteps);
      }

      // Filter/remove steps
      if (typeof mod.filter === 'function') {
        seq = seq.filter(step => mod.filter(step) !== false);
      }

      // Map/transform steps
      if (typeof mod.map === 'function') {
        seq = seq.map(step => mod.map(step) || step);
      }
    }

    return seq;
  }

  /**
   * Optional debug logging for attack sequences.
   */
  static debugSequence(state, attacker, sequence) {
    const cfg = state.Config && state.Config.get
      ? state.Config.get('combat.debugSequences')
      : false;

    if (!cfg || !sequence || !sequence.length) return;

    const logger = state.Logger || console;
    logger.info(`[Combat] Attack sequence for ${attacker.name}:`);
    sequence.forEach((step, idx) => {
      logger.info(
        `  ${idx + 1}. ${step.id} (${step.label}) ` +
        `hand=${step.hand} penalty=${step.penalty} source=${step.source || 'unknown'}`
      );
    });
  }

  /**
   * Resolve a single attack step.
   * Supports:
   * - Attack replacement (replaceAttack + handler)
   * - Normal attack roll + multi-packet damage
   */
  static resolveStep(state, attacker, target, step) {
    const options = {
      hand: step.hand,
      penalty: step.penalty,
      label: step.label,
      id: step.id,
      source: step.source
    };

    // Collect swing-level modifiers (beforeSwing)
    const swingEventMods = attacker.emit
      ? attacker.emit('beforeSwing', { attacker, target, options }) || []
      : [];

    const swingMethodMods = typeof attacker.getAttackModifiers === 'function'
      ? attacker.getAttackModifiers(target, options) || []
      : [];

    const swingMods = [...swingEventMods, ...swingMethodMods];

    // Check for attack replacement
    const replacement = swingMods.find(m => m && m.replaceAttack && typeof m.handler === 'function');
    if (replacement) {
      replacement.handler(state, attacker, target, options);
      return;
    }

    // Aggregate attack roll modifiers
    const rollMods = this.collectAttackRollModifiers(swingMods);

    // Resolve attack roll
    const rollResult = AttackRoll.resolve(attacker, target, {
      penalty: options.penalty + rollMods.penalty,
      bonus: rollMods.bonus,
      advantage: rollMods.advantage,
      disadvantage: rollMods.disadvantage,
      label: options.label,
      id: options.id
    });

    if (!rollResult.hit) {
      attacker.say(
        `<red>You miss ${target.name} with your ${options.label}!</red>`
      );
      return;
    }

    // Build base damage packets from weapon/unarmed/etc.
    let packets = Damage.buildBasePackets(attacker, target, {
      hand: options.hand,
      crit: rollResult.crit
    });

    // Allow modifiers to adjust damage packets (beforeDamage)
    packets = this.applyDamageModifiers(state, attacker, target, packets, swingMods, rollResult);

    // Apply packets using RAW d20 order inside Damage module
    const total = Damage.applyPackets(state, attacker, target, packets, rollResult);

    attacker.say(
      `<green>You hit ${target.name} with your ${options.label} for ${total} damage!</green>`
    );
  }

  /**
   * Collect attack roll modifiers from swing-level mods.
   */
  static collectAttackRollModifiers(mods) {
    const out = {
      bonus: 0,
      penalty: 0,
      advantage: false,
      disadvantage: false
    };

    for (const mod of mods) {
      if (!mod) continue;
      if (typeof mod.bonus === 'number') out.bonus += mod.bonus;
      if (typeof mod.penalty === 'number') out.penalty += mod.penalty;
      if (mod.advantage) out.advantage = true;
      if (mod.disadvantage) out.disadvantage = true;
    }

    return out;
  }

  /**
   * Apply damage modifiers from:
   * - swing-level mods (onHit/onCrit/addPacket/packet transforms)
   * - event-based: attacker.emit('beforeDamage', ...)
   * - method-based: attacker.getDamageModifiers?.(...)
   */
  static applyDamageModifiers(state, attacker, target, packets, swingMods, rollResult) {
    let outPackets = [...packets];

    // Swing-level packet additions / transforms
    for (const mod of swingMods) {
      if (!mod) continue;

      // Add a new packet
      if (mod.addPacket) {
        outPackets.push(mod.addPacket);
      }

      // Transform existing packets
      if (typeof mod.mapPacket === 'function') {
        outPackets = outPackets.map(p => mod.mapPacket(p, rollResult) || p);
      }

      // Filter/remove packets
      if (typeof mod.filterPacket === 'function') {
        outPackets = outPackets.filter(p => mod.filterPacket(p, rollResult) !== false);
      }
    }

    // Event-based damage modifiers
    const dmgEventMods = attacker.emit
      ? attacker.emit('beforeDamage', {
          attacker,
          target,
          packets: outPackets,
          rollResult
        }) || []
      : [];

    // Method-based damage modifiers
    const dmgMethodMods = typeof attacker.getDamageModifiers === 'function'
      ? attacker.getDamageModifiers(target, outPackets, rollResult) || []
      : [];

    const dmgMods = [...dmgEventMods, ...dmgMethodMods];

    // Apply damage-level modifiers
    for (const mod of dmgMods) {
      if (!mod) continue;

      if (mod.addPacket) {
        outPackets.push(mod.addPacket);
      }

      if (typeof mod.mapPacket === 'function') {
        outPackets = outPackets.map(p => mod.mapPacket(p, rollResult) || p);
      }

      if (typeof mod.filterPacket === 'function') {
        outPackets = outPackets.filter(p => mod.filterPacket(p, rollResult) !== false);
      }
    }

    return outPackets;
  }

    /**
   * Begin combat between two entities.
   */
  static startCombat(attacker, target) {
    if (!attacker || !target) return;

    // Initialize combatData if missing
    attacker.combatData = attacker.combatData || {};
    target.combatData = target.combatData || {};

    attacker.combatData.target = target;
    target.combatData.target = target.combatData.target || attacker;

    // Mark both as in combat
    attacker.setMeta('inCombat', true);
    target.setMeta('inCombat', true);

    // Roll initiative if not already set
    if (!attacker.getMeta('initiative')) {
      attacker.setMeta('initiative', Math.floor(Math.random() * 20) + 1);
    }
    if (!target.getMeta('initiative')) {
      target.setMeta('initiative', Math.floor(Math.random() * 20) + 1);
    }
  }

  /**
   * Stop combat for an entity.
   */
  static stopCombat(entity) {
    if (!entity) return;

    entity.setMeta('inCombat', false);
    entity.setMeta('initiative', null);

    if (entity.combatData) {
      entity.combatData.target = null;
    }
  }

  /**
   * Per-entity combat tick.
   * Behaviors call this, but it delegates to the room-level engine.
   */
  static updateCombatRound(entity) {
    if (!entity || !entity.room) return;

    const state = entity.room.area.state;
    this.updateRound(state, entity.room);
  }

  /**
   * Find a valid combat target in the room.
   */
  static findCombatant(player, args) {
    if (!player || !player.room) return null;

    const name = args.toLowerCase();

    // Search NPCs
    for (const [, npc] of player.room.npcs) {
      if (npc.name.toLowerCase().includes(name)) {
        return npc;
      }
    }

    // Search players
    for (const [, other] of player.room.players) {
      if (other === player) continue;
      if (other.name.toLowerCase().includes(name)) {
        return other;
      }
    }

    return null;
  }

}



module.exports = D20CombatManager;
