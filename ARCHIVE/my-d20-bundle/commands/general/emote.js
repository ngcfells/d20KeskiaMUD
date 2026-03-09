// path: bundles/my-d20-bundle/commands/general/emote.js

'use strict';

module.exports = {
  usage: 'emote <message>',
  aliases: [':' ],
  category: 'social',
  tags: ['roleplay', 'communication', 'emote'],
  requires: ['room'],

  command: state => (args, player) => {
    const Msg = state.Msg;
    const Errors = state.Errors;
    const Logger = state.CommandLogger;
    const Resolve = state.TargetResolver;

    Logger.log(player, 'emote', { args });

    args = args.trim();
    if (!args.length) {
      return Errors.notFound(player, 'anything to emote');
    }

    // Resolve ~targets in the emote
    const FIND_TARGETS = /~((?:\d+\.)?[^\s.,!?"']+)/gi;
    const REPLACE_TARGET = /~(?:\d+\.)?[^\s.,!?"']+/;

    let execResult;
    const matchedTargets = [];

    while ((execResult = FIND_TARGETS.exec(args)) !== null) {
      const targetName = execResult[1];

      const target = Resolve.resolve(player, targetName, {
        includeRoomPlayers: true,
        includeRoomNpcs: true,
        includeRoomItems: true,
        includeEquipment: true,
        includeInventory: true
      });

      if (!target) {
        return Errors.notFound(player, targetName);
      }

      matchedTargets.push(target);
    }

    // Replace ~targets with actual names
    let emoteMessage = matchedTargets
      .reduce((str, target) => str.replace(REPLACE_TARGET, target.name), `${player.name} ${args}`);

    // Improved punctuation logic
    if (!/[.?!]$/.test(emoteMessage.trim())) {
      emoteMessage += '.';
    }

    // Broadcast to room
    for (const present of player.room.players) {
      if (present === player) {
        Msg.info(player, `You emote "${emoteMessage}"`);
      } else {
        const pov = emoteMessage.replace(present.name, 'you');
        Msg.info(present, pov);
      }
    }

    // Emit social event
    state.PlayerEvents.emitAction(player, 'emote', { message: args });
  }
};
