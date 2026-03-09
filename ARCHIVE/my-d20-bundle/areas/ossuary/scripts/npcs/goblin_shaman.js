// path: bundles\my-d20-bundle\areas\ossuary\scripts\npcs\goblin_shaman.js

'use strict';

module.exports = {
  listeners: {
    playerEnter: state => function (player) {
      const npc = this;
      const completions = player.getMeta('completed_shaman_soup') || 0;

      const hasKey = player.inventory.find(i => i.id === 'ossuary:iron_gate_key');

      if (completions >= 3 && !hasKey) {
        player.say("<magenta>Gorguk glares at his empty pot. 'No more soup! All gone! You take this heavy bit of junk instead, leave Gorguk in peace!'</magenta>");
      } else if (!player.questTracker.isStarted('ossuary:shaman_soup')) {
        player.say("<magenta>Gorguk cackles. 'Soft-skin! Stir the pot? No! Bring BONES!'</magenta>");
      }
    },

    questComplete: state => function (player, quest) {
      if (quest.id !== 'ossuary:shaman_soup') return;

      let completions = player.getMeta('completed_shaman_soup') || 0;
      completions++;
      player.setMeta('completed_shaman_soup', completions);

      if (completions === 3) {
        player.say("<yellow>Gorguk reaches into the dregs of the cauldron and pulls out a heavy iron key, tossing it at your feet.</yellow>");
        const key = state.ItemManager.create(state.AreaManager.getArea('ossuary'), 'ossuary:iron_gate_key');
        key.moveTo(player);
      } else if (completions < 3) {
        player.say("<cyan>Gorguk ladles a steaming, foul-smelling liquid into a vial for you.</cyan>");
        const vial = state.ItemManager.create(state.AreaManager.getArea('ossuary'), 'ossuary:vial_of_sludge');
        vial.moveTo(player);
      }
    },

    combatStart: state => function (attacker) {
      const npc = this;
      const player = attacker;

      if (!player.isPlayer()) return;

      player.say("<red>Gorguk shrieks in rage, kicking over the cauldron! Scalding green sludge splashes everywhere!</red>");

      const dc = 15;
      const reflex = player.getAttribute('reflex') || 0;
      const roll = Math.floor(Math.random() * 20) + 1;

      if (roll + reflex < dc) {
        player.say("<red>The boiling soup sears your flesh!</red>");
        player.mutateAttribute('health', -5);
      }

      player.say("<magenta>Gorguk begins weaving a chaotic spell...</magenta>");
    }
  }
};
