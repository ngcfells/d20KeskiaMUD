// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/11.js
'use strict';

module.exports = {
  listeners: {

    // --- Magical Silence Enforcement ---
    command: state => function (commandName, args, player) {
      const room = this;
      const target = args ? args.toLowerCase() : '';

      const silenced = ['say', 'yell', 'chat', 'shout', 'tell'];

      // Block all speech-based commands
      if (silenced.includes(commandName)) {
        player.say("<blue>You open your mouth to speak, but the sound dies in your throat. The silence here is absolute.</blue>");
        room.broadcastExcept(player, "<blue>A faint movement of lips—yet no sound escapes.</blue>");
        return true;
      }

      // --- LIFT THE BAR ---
      if (commandName === 'lift' && target.includes('bar')) {

        // Prevent double-lifting
        if (room.getMeta('bar_lifted')) {
          player.say("The bar has already been lifted.");
          return true;
        }

        player.say("<yellow>You heave the iron bar upward. It falls with a heavy thud, and the confessional door creaks open.</yellow>");
        room.broadcastExcept(player, `<yellow>${player.name} lifts the iron bar, releasing whatever was trapped inside the booth.</yellow>`);

        room.setMeta('bar_lifted', true);

        // Trigger Martha's reveal if she exists
        const martha = [...room.npcs].find(n => n.id.includes('martha'));
        if (martha) {
          // Give her a moment before speaking
          setTimeout(() => {
            martha.say("<cyan>“...thank you. I have been trapped in that silence for so long.”</cyan>");
          }, 1500);
        }

        return true;
      }
    },

    // --- Ambient Confessional Horror ---
    updateTick: state => function () {
      const room = this;

      if (room.players.size === 0) return;

      if (Math.random() < 0.05) {
        room.broadcast("<italic>The frantic scratching from inside the booth grows louder… then stops abruptly.</italic>");
      }
    }
  }
};
