'use strict';

const { Broadcast } = require('ranvier');

/**
 * SETTRAP — Create and arm a persistent trap.
 *
 * Usage:
 *   settrap <type> [target] [direction]
 *
 * Examples:
 *   settrap snare deer
 *   settrap tripwire bandits north
 *   settrap pit here
 *
 * Trap types (examples):
 *   snare, pit, tripwire, spike, deadfall, alarm
 */

module.exports = {
  aliases: ['settrap'],
  usage: 'settrap <type> [target] [direction]',
  command: state => (player, args) => {
    const skillCheck = state.SkillCheck;
    const synergy = state.Synergy;
    const dcTables = state.DCTables;

    if (!args) {
      return Broadcast.sayAt(player, "Set what kind of trap?");
    }

    const parts = args.split(' ').map(s => s.trim()).filter(Boolean);
    const trapType = parts.shift()?.toLowerCase();
    if (!trapType) {
      return Broadcast.sayAt(player, "You must specify a trap type.");
    }

    const target = parts[0]?.toLowerCase() || null;
    const direction = parts[1]?.toLowerCase() || null;

    // Basic validation
    const validTypes = ['snare', 'pit', 'tripwire', 'spike', 'deadfall', 'alarm'];
    if (!validTypes.includes(trapType)) {
      return Broadcast.sayAt(player, "That is not a valid trap type.");
    }

    // Tool requirement (example: trap kit)
    if (!player.hasItem('tool_trap_kit')) {
      return Broadcast.sayAt(player, "You need a trap kit to set traps.");
    }

    // Determine skill + specialty
    const specialtyPath = ['trapping', trapType];

    // Difficulty based on type (you can tune these)
    const baseDifficulty = {
      snare: 'easy',
      pit: 'moderate',
      tripwire: 'moderate',
      spike: 'hard',
      deadfall: 'hard',
      alarm: 'moderate'
    }[trapType] || 'moderate';

    const dc = dcTables.getDC(player, 'survival', specialtyPath, baseDifficulty);

    // Trap‑setter bonuses (circumstance)
    let circumstance = 0;
    // Could be expanded later with feats, class abilities, etc.
    circumstance += 2; // baseline "you know what you're doing" bonus

    const synergyBonus = synergy.getBonus(player, 'survival', specialtyPath);
    const result = skillCheck.check(player, 'survival', specialtyPath, dc, {
      circumstance: circumstance + synergyBonus
    });

    Broadcast.sayAt(player, `You begin setting a ${trapType} trap...`);

    if (!result.success) {
      Broadcast.sayAt(player, "You fail to set the trap properly.");
      // Optional: minor mishap, but not full trigger
      return;
    }

    // Create persistent trap object as room metadata
    const traps = player.room.getMeta('traps') || {};
    const trapId = `trap_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    traps[trapId] = {
      id: trapId,
      type: trapType,
      owner: player.uuid,
      armed: true,
      target: target,        // 'deer', 'bandits', 'humanoid', etc.
      direction: direction,  // 'north', 'south', etc. or null
      pvp: true,             // actual PvP effect gated by zone rules
      difficulty: baseDifficulty,
      detectDC: dc + 2,      // slightly harder to detect than to set
      disarmDC: dc,          // same as set DC by default
      triggerDC: dc,         // used for avoidance rolls
      wildlifeTrap: ['snare', 'deadfall', 'pit'].includes(trapType),
      combatTrap: ['tripwire', 'spike', 'alarm'].includes(trapType),
      bait: null,
      spottedBy: []          // uuids of players who have detected it
    };

    player.room.setMeta('traps', traps);

    Broadcast.sayAt(player, `You successfully set a ${trapType} trap${direction ? ' to the ' + direction : ''}.`);
  }
};
