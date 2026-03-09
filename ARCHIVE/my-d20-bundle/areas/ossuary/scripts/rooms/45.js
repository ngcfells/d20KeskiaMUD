// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/45.js
'use strict';

module.exports = {
  listeners: {

    updateTick: state => room => {
      if (!room || room.players.size === 0) return;

      // Blue flame flicker
      if (Math.random() < 0.06) {
        room.broadcast("<cyan>The blue flames gutter suddenly, casting long, writhing shadows along the walls.</cyan>");
      }

      // Shadow illusions
      if (Math.random() < 0.05) {
        room.players.forEach(p => {
          p.say("<magenta>For a moment, your own shadow seems to move out of sync with you.</magenta>");
          p.mutateAttribute && p.mutateAttribute('sanity', -1);
        });
      }

      // Stair slip hazard
      if (Math.random() < 0.03) {
        room.broadcast("<white>Loose dust shifts on the steps, threatening to send the unwary tumbling.</white>");
      }
    },

    playerEnter: state => player => {
      player.say("<white>The blue flames flicker as you enter, their cold light dancing across the spiral stairs.</white>");
    },

    command: state => (player, commandName, args) => {
      const room = player.room;
      const target = (args || '').toLowerCase().trim();

      const senseVerbs = [
        'examine','look','touch','feel','smell','sniff','taste','listen','search','climb','ascend'
      ];
      if (!senseVerbs.includes(commandName)) return false;

      const nouns = {
        stairs: "The black stone steps spiral upward, their edges rounded by countless feet.",
        staircase: "The staircase coils like a serpent, vanishing into the darkness above.",
        sconces: "Iron sconces jut from the walls, their surfaces pitted with rust.",
        torches: "Each torch burns with a steady blue flame that gives off little heat.",
        flame: "The blue fire flickers in strange patterns, casting long, twitching shadows.",
        shadows: "The shadows seem to move just out of sync with the flames, as if dancing to a different rhythm."
      };

      // LISTEN
      if (commandName === 'listen') {
        player.say("<white>You hear the faint crackle of the blue flames and the soft whisper of shifting dust.</white>");
        return true;
      }

      // SMELL
      if (commandName === 'smell' || commandName === 'sniff') {
        player.say("<white>The air smells faintly of cold stone and burnt minerals.</white>");
        return true;
      }

      // TASTE
      if (commandName === 'taste') {
        player.say("<white>The air tastes dry and metallic, like old stone.</white>");
        return true;
      }

      // SEARCH — find a dropped coin or relic
      if (commandName === 'search') {
        const perception = player.getSkill?.('perception') || 0;
        const roll = Math.floor(Math.random() * 20) + 1 + perception;
        const dc = 15;

        player.say("<yellow>You search the steps and the shadows cast by the blue flames...</yellow>");

        if (roll >= dc && !room.getMeta('ascent_loot_found')) {
          room.setMeta('ascent_loot_found', true);
          player.say("<green>You find a small silver coin wedged between two steps.</green>");
          const coin = state.ItemManager.create(room.area, 'ossuary:gold_coins');
          coin && coin.moveTo(player);
        } else {
          player.say("<white>You find nothing but dust and cold stone.</white>");
        }
        return true;
      }

      // CLIMB / ASCEND — risk of slipping
      if ((commandName === 'climb' || commandName === 'ascend') &&
          (target.includes('stairs') || target.includes('staircase') || !target)) {

        player.say("<yellow>You begin climbing the spiral staircase...</yellow>");

        if (Math.random() < 0.25) {
          player.say("<red>Your foot slips on loose dust and you slam into the stone railing!</red>");
          player.mutateAttribute('health', -3);
        } else {
          player.say("<green>You ascend carefully, keeping your balance despite the shifting shadows.</green>");
        }
        return true;
      }

      // TOUCH — blue flame hazard
      if ((commandName === 'touch' || commandName === 'feel') && target.includes('flame')) {
        player.say("<red>Your hand passes through the blue flame. It burns cold, numbing your fingers.</red>");
        player.mutateAttribute('health', -1);
        player.mutateAttribute('sanity', -1);
        return true;
      }

      // SENSORY INTERACTIONS FOR OTHER NOUNS
      if (!target) return false;
      const key = Object.keys(nouns).find(k => target.includes(k));
      if (!key) return false;

      player.say(`<white>${nouns[key]}</white>`);
      return true;
    }
  }
};
