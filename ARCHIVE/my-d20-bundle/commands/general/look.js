'use strict';

const humanize = (sec) => require('humanize-duration')(sec, { round: true });
const sprintf = require('sprintf-js').sprintf;
const {
  Broadcast: B,
  Room,
  Item,
  ItemType,
  Logger,
  Player
} = require('ranvier');

const ArgParser = require('../../lib/ArgParser');
const ItemUtil = require('../../lib/ItemUtil');

module.exports = {
  usage: "look [target]",
  command: state => (args, player) => {
    const room = player.room;

    if (!room || !(room instanceof Room)) {
      Logger.error(`${player.name} is in limbo.`);
      return B.sayAt(player, 'You are in a deep, dark void.');
    }

    // Darkness check
    if (room.getMeta('is_dark') && !player.getMeta('has_light')) {
      return B.sayAt(player, "<black>It is pitch black. You are likely to be eaten by a grue.</black>");
    }

    // Passive trap detection (easy traps only)
    const TrapManager = state.TrapManager;
    const traps = TrapManager.getTraps(room);
    for (const trap of Object.values(traps)) {
      if (trap.detectDC <= 10) {
        TrapManager.detectTrap(player, trap, false);
      }
    }

    if (args) {
      return lookEntity(state, player, args);
    }

    lookRoom(state, player);
  }
};

function lookRoom(state, player) {
  const room = player.room;

  // Header with compass
  if (room.coordinates) {
    B.sayAt(player, '<yellow><b>' + sprintf('%-65s', room.title) + '</b></yellow>');
    B.sayAt(player, B.line(60));
  } else {
    const [line1, line2, line3] = getCompass(player);
    B.sayAt(player, '<yellow><b>' + sprintf('%-65s', room.title) + line1 + '</b></yellow>');
    B.sayAt(player, B.line(60) + B.line(5, ' ') + line2);
    B.sayAt(player, B.line(65, ' ') + '<yellow><b>' + line3 + '</b></yellow>');
  }

  // Description + first entry flavor
  if (!player.getMeta('config.brief')) {
    let desc = room.description;
    if (room.getMeta('first_entry') && !player.getMeta(`visited_${room.area.name}_${room.id}`)) {
      desc += `\n\n<magenta>${room.getMeta('first_entry')}</magenta>`;
      player.setMeta(`visited_${room.area.name}_${room.id}`, true);
    }
    B.sayAt(player, desc, 80);
  }

  if (player.getMeta('config.minimap')) {
    B.sayAt(player, '');
    state.CommandManager.get('map').execute(4, player);
  }

  B.sayAt(player, '');

  // Players
  room.players.forEach(otherPlayer => {
    if (otherPlayer === player) return;
    let combatDisplay = otherPlayer.isInCombat() ? getCombatantsDisplay(otherPlayer) : '';
    B.sayAt(player, `[Player] ${otherPlayer.name}${combatDisplay}`);
  });

  // Items
  room.items.forEach(item => {
    const typeLabel = item.hasBehavior('resource') ? 'Resource' : 'Item';
    B.sayAt(player, `[${ItemUtil.qualityColorize(item, typeLabel)}] <magenta>${item.roomDesc || item.name}</magenta>`);
  });

  // NPCs
  room.npcs.forEach(npc => {
    let questStr = '';
    if (npc.quests) {
      const hasNew = npc.quests.find(q => state.QuestFactory.canStart(player, q));
      const hasReady = npc.quests.find(q => player.questTracker.isActive(q) && player.questTracker.get(q).getProgress().percent >= 100);
      const hasActive = npc.quests.find(q => player.questTracker.isActive(q) && player.questTracker.get(q).getProgress().percent < 100);

      if (hasNew) questStr += '[<b><yellow>!</yellow></b>]';
      if (hasActive) questStr += '[<b><yellow>%</yellow></b>]';
      if (hasReady) questStr += '[<b><yellow>?</yellow></b>]';
    }

    let npcLabel = 'NPC';
    const diff = npc.level - player.level;
    if (diff < -4) npcLabel = '<cyan>NPC</cyan>';
    else if (diff > 9) npcLabel = '<b><black>NPC</black></b>';
    else if (diff > 5) npcLabel = '<red>NPC</red>';
    else if (diff > 3) npcLabel = '<yellow>NPC</yellow>';
    else npcLabel = '<green>NPC</green>';

    let combatDisplay = npc.isInCombat() ? getCombatantsDisplay(npc) : '';
    B.sayAt(player, `${questStr}[${npcLabel}] ${npc.name}${combatDisplay}`);
  });

  // --- Trap Visibility Integration ---
  const TrapManager = state.TrapManager;
  const visibleTraps = TrapManager.getVisibleTraps(room, player);

  if (visibleTraps.length > 0) {
    B.sayAt(player, '');
    B.sayAt(player, '<yellow><b>Traps:</b></yellow>');
    for (const trap of visibleTraps) {
      const status = trap.armed ? 'armed' : 'disarmed';
      const kind = trap.wildlifeTrap ? 'wildlife' : 'combat';
      const dir = trap.direction ? `, direction: ${trap.direction}` : '';
      const tgt = trap.target ? `, target: ${trap.target}` : '';

      B.sayAt(
        player,
        ` - <red>${trap.type}</red> trap (${status}, ${kind}${dir}${tgt})`
      );
    }
  }

  // Exits
  B.at(player, '\n[<yellow><b>Exits</yellow></b>: ');
  const exits = room.getExits();
  const exitOutput = exits.map(exit => {
    const exitRoom = state.RoomManager.getRoom(exit.roomId);
    const door = room.getDoor(exitRoom) || (exitRoom && exitRoom.getDoor(room));
    return (door && (door.locked || door.closed)) ? `(${exit.direction})` : exit.direction;
  }).join(' ');

  B.sayAt(player, (exitOutput || 'none') + ']');
}

function lookEntity(state, player, args) {
  const room = player.room;
  const target = args.toLowerCase();

  // Extra descriptions
  const extras = room.getMeta('extra_descriptions');
  if (extras && extras[target]) {
    return B.sayAt(player, `<cyan>${extras[target]}</cyan>`);
  }

  // Standard entity parsing
  let search = args.split(' ')[0] === 'in' ? args.split(' ')[1] : args.split(' ')[0];
  let entity = ArgParser.parseDot(search, room.items) ||
               ArgParser.parseDot(search, room.players) ||
               ArgParser.parseDot(search, room.npcs) ||
               ArgParser.parseDot(search, player.inventory);

  if (!entity) return B.sayAt(player, "You don't see that here.");

  // Trap inspection (room traps)
  const TrapManager = state.TrapManager;
  const traps = room.getMeta('traps') || {};
  for (const trap of Object.values(traps)) {
    const isOwner = trap.owner === player.uuid;
    const isSpotter = (trap.spottedBy || []).includes(player.uuid);

    if ((isOwner || isSpotter) && trap.type === target) {
      B.sayAt(player, `<yellow>You examine the ${trap.type} trap:</yellow>`);
      B.sayAt(player, ` - Status: ${trap.armed ? 'armed' : 'disarmed'}`);
      B.sayAt(player, ` - Type: ${trap.wildlifeTrap ? 'wildlife' : 'combat'}`);
      if (trap.direction) B.sayAt(player, ` - Direction: ${trap.direction}`);
      if (trap.target) B.sayAt(player, ` - Target: ${trap.target}`);
      B.sayAt(player, ` - Detect DC: ${trap.detectDC}`);
      B.sayAt(player, ` - Disarm DC: ${trap.disarmDC}`);
      B.sayAt(player, ` - Trigger DC: ${trap.triggerDC}`);
      return;
    }
  }

  // Standard descriptions
  if (entity instanceof Player) {
    B.sayAt(player, `You see fellow player ${entity.name}.`);
  } else {
    B.sayAt(player, entity.description || "There is nothing special about it.", 80);
  }

  if (entity.timeUntilDecay) {
    B.sayAt(player, `You estimate ${entity.name} will rot away in ${humanize(entity.timeUntilDecay)}.`);
  }

  // Usable items
  const usable = entity.getBehavior('usable');
  if (usable) {
    if (usable.spell) {
      const spell = state.SpellManager.get(usable.spell);
      if (spell) B.sayAt(player, spell.info(player));
    }
    if (usable.config && usable.config.description) B.sayAt(player, usable.config.description);
    if (usable.charges) B.sayAt(player, `Charges: ${usable.charges}`);
  }

  // Item specifics
  if (entity instanceof Item) {
    if ([ItemType.WEAPON, ItemType.ARMOR].includes(entity.type)) {
      B.sayAt(player, ItemUtil.renderItem(state, entity, player));
    } else if (entity.type === ItemType.CONTAINER) {
      if (entity.closed) return B.sayAt(player, "It is closed.");
      B.at(player, `Contents:`);
      for (const [, item] of entity.inventory) {
        B.sayAt(player, '  ' + ItemUtil.display(item));
      }
    }
  }
}

function getCompass(player) {
  const room = player.room;
  const exitMap = { east: 'E', west: 'W', south: 'S', north: 'N', up: 'U', down: 'D', southwest: 'SW', southeast: 'SE', northwest: 'NW', northeast: 'NE' };
  const avail = room.exits.map(e => exitMap[e.direction]);
  const exits = Object.values(exitMap).map(dir => {
    if (avail.includes(dir)) return dir;
    return dir.length === 2 ? (dir.includes('E') ? ' -' : '- ') : '-';
  });

  let [E, W, S, N, U, D, SW, SE, NW, NE] = exits;
  U = U === 'U' ? '<yellow><b>U</b></yellow>' : U;
  D = D === 'D' ? '<yellow><b>D</b></yellow>' : D;

  return [
    `${NW}     ${N}     ${NE}`,
    `<yellow><b>${W}</b></yellow> <-${U}-(@)-${D}-> <yellow><b>${E}</b></yellow>`,
    `${SW}     ${S}     ${SE}\r\n`
  ];
}

function getCombatantsDisplay(entity) {
  const names = [...entity.combatants.values()].map(c => c.name);
  return `, <red>fighting </red>${names.join("<red>,</red> ")}`;
}
