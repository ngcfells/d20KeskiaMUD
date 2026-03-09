// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/6.js
'use strict';

module.exports = {
  listeners: {

    // --- Movement Penalty: Bone-Ash Exhaustion ---
    playerEnter: state => function (player) {
      if (player.hasAttribute('stamina')) {
        player.say("<white>The deep bone-ash clings to your legs, making every movement an exhausting struggle.</white>");
        player.mutateAttribute('stamina', -2);

        if (player.getAttribute('stamina') <= 0) {
          player.say("<red>Your legs tremble under the weight of the ash.</red>");
        }
      }
    },

    // --- Ambient Ash Effects ---
    updateTick: state => function () {
      const room = this;

      if (room.players.size === 0) return;

      if (Math.random() < 0.1) {
        room.broadcast("<italic>A gust of stale air stirs the bone-ash, sending a pale cloud drifting across the corridor.</italic>");
      }
    },

    // --- Penance Ritual at the Spike ---
    command: state => function (commandName, args, player) {
      if (!['kneel', 'pray', 'press'].includes(commandName) || !args) return;

      const target = args.toLowerCase();

      if (target.includes('alcove') || target.includes('spike')) {
        player.say("\n<red>You kneel in the central alcove and press your palm against the rusted iron spike.</red>");

        // --- Damage: 1d4 + 1 ---
        const damage = Math.floor(Math.random() * 4) + 1;
        player.say(`<red>The iron pierces your skin! You lose ${damage} health.</red>`);
        player.mutateAttribute('health', -damage);

        // --- Reward: Penitent's Clarity ---
        player.say("<cyan>As your blood drips onto the ash, a grim clarity settles over your mind. Your resolve hardens.</cyan>");

        if (state.EffectFactory.has('penitents_clarity')) {
          const effect = state.EffectFactory.create('penitents_clarity', {
            duration: 600000, // 10 minutes
            name: "Penitent's Clarity",
            modifiers: {
              attributes: {
                will: 2,
                resolve: 5
              }
            }
          });

          player.addEffect(effect);
        }

        return true;
      }
    }
  }
};
