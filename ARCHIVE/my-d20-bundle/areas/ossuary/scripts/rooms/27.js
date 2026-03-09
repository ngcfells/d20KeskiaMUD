// bundles/my-d20-bundle/areas/ossuary/scripts/rooms/27.js
'use strict';

/**
 * Room 27: The Flooded Crypts
 * Hazards:
 *  - Waist-deep water (movement + stealth penalties)
 *  - Cold water chip damage over time
 *  - Dire rat ambush with disease hook (filth_fever)
 */

module.exports = {
  listeners: {
    playerEnter: state => function (player) {
      player.say("<blue>The icy black water closes around your waist, stealing the warmth from your legs.</blue>");
    },

    updateTick: state => function () {
      const room = this;
      if (room.players.size === 0) return;

      // Ambient cold chip + flavor
      if (Math.random() < 0.10) {
        for (const p of room.players) {
          p.mutateAttribute('stamina', -1);
          p.say("<white>The stagnant water leeches heat and strength from your limbs.</white>");
        }
      }

      // Occasional sarcophagus bump flavor
      if (Math.random() < 0.05) {
        room.broadcast("<italic>A drifting stone sarcophagus bumps into another with a hollow, echoing knock.</italic>");
      }
    },

    command: state => function (commandName, args, player) {
      const room = this;
      const target = (args || '').toLowerCase();

      // Searching sarcophagi
      if (commandName === 'search' &&
          (target.includes('sarcophagus') || target.includes('coffin') || target.includes('crypt'))) {

        player.say("<yellow>You wade through the black water, pushing aside a drifting sarcophagus to peer inside...</yellow>");

        const roll = Math.random();

        if (roll < 0.4) {
          player.say("<red>A bloated corpse rolls toward you, its empty eye sockets staring. You recoil in disgust.</red>");
          player.mutateAttribute('sanity', -1);
        } else if (roll < 0.8) {
          player.say("<green>You find a few loose coins wedged in a stone seam.</green>");
          const coins = state.ItemFactory.create(room.area, 'ossuary:gold_coins');
          if (coins) coins.moveTo(player);
        } else {
          player.say("<white>This one is empty, its occupant long since claimed by the water.</white>");
        }

        return true;
      }

      // Dire rat ambush trigger: splashing / noise
      if (['splash', 'kick', 'disturb'].includes(commandName) &&
          target.includes('water')) {

        player.say("<yellow>You churn the black water into froth...</yellow>");

        const existing = [...room.npcs].find(n => n.id.includes('dire_rat'));
        if (existing) {
          player.say("<red>Something already lurks in the water. It circles closer.</red>");
          return true;
        }

        const rat = state.MobManager.create(room.area, 'ossuary:dire_rat');
        if (rat) {
          rat.moveTo(room);
          rat.initiateCombat(player);
          player.say("<red>A filth-caked dire rat bursts from the water, teeth bared!</red>");
        }

        return true;
      }
    }
  }
};
