'use strict';

const { Broadcast: B } = require('ranvier');

/**
 * SNEAK — Move while attempting to maintain stealth.
 *
 * Usage:
 *   sneak <direction>
 *
 * Behavior:
 *   - Moves the player in a direction.
 *   - Attempts to maintain or slightly reduce stealth level.
 *   - Opposed by creature perception in the destination room.
 *   - Interacts with traps via TrapManager (avoidance bonus from stealth).
 */

module.exports = {
  aliases: [ 'sneak' ],
  usage: 'sneak <direction>',
  command: state => (args, player) => {
    const direction = args.trim();
    if (!direction) {
      return B.sayAt(player, "Sneak where?");
    }

    const room = player.room;
    if (!room) {
      return B.sayAt(player, "You can't sneak anywhere from here.");
    }

    const exit = room.getExits().find(e => e.direction === direction);
    if (!exit) {
      return B.sayAt(player, "You can't go that way.");
    }

    const dest = state.RoomManager.getRoom(exit.roomId);
    if (!dest) {
      return B.sayAt(player, "You can't seem to sneak that way.");
    }

    const SkillCheck = state.SkillCheck;
    const Synergy = state.Synergy;
    const TrapManager = state.TrapManager;

    // --- Current stealth level ---
    let level = player.getMeta('stealth.level') || 0;
    let stateName = player.getMeta('stealth.state') || 'visible';

    // If not already hidden, treat this as a weaker hide attempt
    const baseDC = state.DCTables.getDC('stealth', ['sneak'], 'moderate');
    let circumstance = 0;

    // Synergy: Survival (camouflage) while moving
    const survivalSynergy = Synergy.getBonus(player, 'survival', ['camouflage']);
    circumstance += survivalSynergy;

    // Movement is inherently risky: small penalty
    circumstance -= 2;

    // Buffs from spells, feats, items, etc.
    circumstance += getStealthBuffsFromEffects(player);

    const result = SkillCheck.check(player, 'stealth', ['sneak'], baseDC, {
      circumstance
    });

    // Adjust stealth level based on success/failure
    if (!result.success) {
      // Failure: drop stealth level
      level = Math.max(0, level - 1);
    } else {
      // Success: maintain or slightly improve if already decent
      if (level === 0) level = 1;
      else if (level === 1 && result.total >= 15) level = 2;
      // Levels 2+ mostly maintained while sneaking
    }

    stateName = getStealthStateName(level);
    player.setMeta('stealth.level', level);
    player.setMeta('stealth.state', stateName);
    player.setMeta('stealth.lastAction', Date.now());

    // --- Move the player ---
    B.sayAt(player, `You sneak ${direction}, trying to remain ${stateName}.`);
    room.removePlayer(player);
    dest.addPlayer(player);
    state.CommandManager.get('look').execute('', player);

    // --- Opposed detection in destination room ---
    for (const npc of dest.npcs) {
      attemptDetection(state, player, npc, level);
    }
    for (const other of dest.players) {
      if (other === player) continue;
      attemptDetection(state, player, other, level);
    }

    // --- Trap interaction: avoidance bonus from stealth ---
    const traps = TrapManager.getTraps(dest);
    for (const trap of Object.values(traps)) {
      if (!trap.armed) continue;

      const avoidanceBonus = level * 2;
      const avoidanceResult = SkillCheck.check(player, 'survival', ['trapping', 'avoidance'], trap.triggerDC, {
        circumstance: avoidanceBonus
      });

      if (!avoidanceResult.success) {
        TrapManager.triggerTrap(player, trap);
      }
    }
  }
};

function getStealthStateName(level) {
  switch (level) {
    case 1: return 'concealed';
    case 2: return 'hidden';
    case 3: return 'deeply_hidden';
    case 4: return 'perfectly_hidden';
    default: return 'visible';
  }
}

function getStealthBuffsFromEffects(player) {
  let bonus = 0;

  const effects = player.effects || [];
  for (const effect of effects) {
    const id = effect.id || effect.config && effect.config.id;
    if (!id) continue;

    if (id === 'spell_invisibility') bonus += 10;
    if (id === 'spell_greater_invisibility') bonus += 15;
    if (id === 'spell_pass_without_trace') bonus += 5;
    if (id === 'power_psionic_chameleon') bonus += 5;
    if (id === 'force_cloak') bonus += 10;
    if (id === 'feat_stealthy') bonus += 2;
    if (id === 'item_cloak_of_elvenkind') bonus += 5;
    if (id === 'item_stealth_field_generator') bonus += 8;
  }

  const armorPenalty = player.getMeta('armor_check_penalty') || 0;
  bonus -= Math.abs(armorPenalty);

  return bonus;
}

/**
 * Opposed detection roll: creature tries to notice the sneaking player.
 */
function attemptDetection(state, player, observer, stealthLevel) {
  const SkillCheck = state.SkillCheck;
  const Synergy = state.Synergy;

  // Observer rolls perception
  const perceptionDC = 10 + (stealthLevel * 5);

  let circumstance = 0;

  // Synergy: Survival (tracking) for observers
  const trackingSynergy = Synergy.getBonus(observer, 'survival', ['tracking']);
  circumstance += trackingSynergy;

  // Hooks for observer buffs (darkvision, blindsense, etc.) can go here

  const result = SkillCheck.check(observer, 'perception', [], perceptionDC, {
    circumstance
  });

  if (result.success) {
    observer.say(`You notice someone trying to move quietly nearby.`);
    // You can add more detailed messaging / targeting here.
  }
}
