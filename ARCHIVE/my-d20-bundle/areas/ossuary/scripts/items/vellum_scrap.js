// path: bundles\my-d20-bundle\areas\ossuary\scripts\items\vellum_scrap.js

'use strict';

module.exports = {
  listeners: {
    command: state => function (commandName, args, player) {
      if (commandName !== 'write') return;

      // Ensure the player is holding the vellum
      if (!player.hasItem(this)) {
        return player.say("You must be holding the vellum to write on it.");
      }

      // Ensure the vellum is blank
      if (this.metadata.is_blank === false) {
        return player.say("The vellum is already written on.");
      }

      if (!args || args.length === 0) {
        return player.say("What do you wish to write on the vellum?");
      }

      const limit = this.metadata.max_characters || 140;
      if (args.length > limit) {
        return player.say(`The scrap is too small. You can only fit ${limit} characters.`);
      }

      // Update the item description with the player's text
      this.description = `A small fragment of vellum. Scrawled upon it in ink is: "${args}"`;
      this.metadata.is_blank = false;
      this.metadata.written_text = args;

      player.say("<cyan>You carefully scribe your message onto the vellum.</cyan>");
    }
  }
};

