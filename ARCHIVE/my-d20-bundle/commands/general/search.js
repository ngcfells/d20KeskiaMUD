'use strict';

const { Broadcast: B } = require('ranvier');

/**
 * SEARCH — Actively search the room for hidden objects, traps, clues, or details.
 *
 * Usage:
 *   search
 *   search <target>
 *
 * Behavior:
 *   - Without a target: actively search the room.
 *   - With a target: search that object for hidden compartments, clues, or traps.
 *
 * Integrates with:
 *   - TrapManager (active trap detection)
 *   - Survival (detection specialty)
 *   - Spotter memory
 *   - Hybrid detection rules
 *   - Extra descriptions
 *   - Hidden items
 *   - Hidden compartments
 */

module.exports = {
  aliases: ['search'],
  usage: 'search [target]',
  command: state => (args, player) => {
    const room = player.room;
    const TrapManager = state.TrapManager;

    if (!room) {
      return B.sayAt(player, "You can't search anything here.");
    }

    // If a target is specified, search that entity
    if (args && args.trim().length > 0) {
      return searchTarget(state, player, args.trim());
    }

    // Otherwise, search the room
    return searchRoom(state, player, room, TrapManager);
  }
};

/**
 * SEARCH ROOM
 * Actively search the room for:
 *   - traps (active detection)
 *   - hidden items
 *   - hidden exits (future)
 *   - extra descriptions
 */
function searchRoom(state, player, room, TrapManager) {
  B.sayAt(player, "You carefully search the area...");

  let foundSomething = false;

  // 1. Extra Descriptions
  const extras = room.getMeta('extra_descriptions');
  if (extras) {
    for (const [key, desc] of Object.entries(extras)) {
      if (desc && desc.length > 0) {
        B.sayAt(player, `<cyan>You notice something: ${key}</cyan>`);
        foundSomething = true;
      }
    }
  }

  // 2. Trap Detection (active search)
  const traps = TrapManager.getTraps(room);
  for (const trap of Object.values(traps)) {
    const detected = TrapManager.detectTrap(player, trap, true);
    if (detected) {
      foundSomething = true;

      if (trap.wildlifeTrap) {
        B.sayAt(player, `<yellow>You spot a ${trap.type} trap hidden nearby!</yellow>`);
      } else if (trap.combatTrap) {
        B.sayAt(player, `<red>You detect a concealed ${trap.type} trap!</red>`);
      }
    }
  }

  // 3. Hidden items
  const hiddenItems = room.getMeta('hidden_items') || [];
  if (hiddenItems.length > 0) {
    for (const itemId of hiddenItems) {
      const item = state.ItemFactory.create(itemId);
      room.addItem(item);
      B.sayAt(player, `<green>You uncover ${item.name}!</green>`);
      foundSomething = true;
    }
    room.setMeta('hidden_items', []); // reveal once
  }

  // 4. Hidden exits (future expansion)
  const hiddenExits = room.getMeta('hidden_exits') || [];
  if (hiddenExits.length > 0) {
    for (const exit of hiddenExits) {
      B.sayAt(player, `<cyan>You discover a hidden exit: ${exit}</cyan>`);
      foundSomething = true;
    }
    // Do not auto-clear; hidden exits may remain hidden to others
  }

  if (!foundSomething) {
    B.sayAt(player, "You don't find anything unusual.");
  }
}

/**
 * SEARCH TARGET
 * Search a specific object for:
 *   - hidden compartments
 *   - hidden traps
 *   - hidden clues
 */
function searchTarget(state, player, targetName) {
  const room = player.room;
  const TrapManager = state.TrapManager;

  // Try to find the target in room or inventory
  const target =
    state.ArgParser.parseDot(targetName, room.items) ||
    state.ArgParser.parseDot(targetName, room.npcs) ||
    state.ArgParser.parseDot(targetName, room.players) ||
    state.ArgParser.parseDot(targetName, player.inventory);

  if (!target) {
    return B.sayAt(player, "You don't see that here.");
  }

  B.sayAt(player, `You search ${target.name} carefully...`);

  let foundSomething = false;

  // 1. Hidden compartments
  const hidden = target.getMeta('hidden_compartments');
  if (hidden && hidden.length > 0) {
    for (const itemId of hidden) {
      const item = state.ItemFactory.create(itemId);
      player.addItem(item);
      B.sayAt(player, `<green>You find a hidden compartment containing ${item.name}!</green>`);
      foundSomething = true;
    }
    target.setMeta('hidden_compartments', []); // emptied
  }

  // 2. Traps attached to the target
  const traps = target.getMeta('traps') || {};
  for (const trap of Object.values(traps)) {
    const detected = TrapManager.detectTrap(player, trap, true);
    if (detected) {
      foundSomething = true;
      B.sayAt(player, `<red>You detect a trap on ${target.name}!</red>`);
    }
  }

  // 3. Hidden clues (future expansion)
  const clues = target.getMeta('hidden_clues') || [];
  if (clues.length > 0) {
    for (const clue of clues) {
      B.sayAt(player, `<cyan>You discover a clue: ${clue}</cyan>`);
      foundSomething = true;
    }
    target.setMeta('hidden_clues', []);
  }

  if (!foundSomething) {
    B.sayAt(player, "You don't find anything unusual.");
  }
}
