'use strict';

const ArgParser = require('../lib/ArgParser');
const { Broadcast } = require('ranvier');

module.exports = {
  usage: 'npcstats <target>',
  aliases: ['ns', 'statnpc', 'npcstat'],
  command: state => (args, player) => {
    const targetName = args.trim();
    if (!targetName) {
      return Broadcast.sayAt(player, "Usage: npcstats <target>");
    }

    // Resolve NPC using our custom ArgParser
    const target = ArgParser.parseDot(targetName, player.room.npcs);
    if (!target) {
      return Broadcast.sayAt(player, "No such NPC here.");
    }

    Broadcast.sayAt(player, `\n=== NPC Stats: ${target.name} ===`);

    //
    // ATTRIBUTES
    //
    Broadcast.sayAt(player, "\n-- Attributes --");
    if (target.attributes) {
      for (const [key, val] of Object.entries(target.attributes)) {
        Broadcast.sayAt(player, `${key}: ${val}`);
      }
    } else {
      Broadcast.sayAt(player, "No attributes found.");
    }

    //
    // META
    //
    Broadcast.sayAt(player, "\n-- Meta --");
    if (target._meta) {
      for (const [key, val] of Object.entries(target._meta)) {
        Broadcast.sayAt(player, `${key}: ${val}`);
      }
    } else {
      Broadcast.sayAt(player, "No meta data.");
    }

    //
    // EFFECTS
    //
    Broadcast.sayAt(player, "\n-- Effects --");
    if (target.effects && target.effects.size > 0) {
      target.effects.forEach(effect => {
        const remaining = effect.remaining || effect.config?.duration || 'n/a';
        Broadcast.sayAt(player, `${effect.id} (remaining: ${remaining})`);
      });
    } else {
      Broadcast.sayAt(player, "None");
    }

    //
    // TRAITS
    //
    Broadcast.sayAt(player, "\n-- Traits --");
    if (target.traits && target.traits.size > 0) {
      for (const trait of target.traits) {
        Broadcast.sayAt(player, trait);
      }
    } else {
      Broadcast.sayAt(player, "None");
    }

    //
    // BEHAVIORS
    //
    Broadcast.sayAt(player, "\n-- Behaviors --");
    if (target.behaviors && Object.keys(target.behaviors).length > 0) {
      for (const [key, config] of Object.entries(target.behaviors)) {
        Broadcast.sayAt(player, `${key}: ${JSON.stringify(config)}`);
      }
    } else {
      Broadcast.sayAt(player, "None");
    }

    Broadcast.sayAt(player, "\n=====================\n");
  }
};
