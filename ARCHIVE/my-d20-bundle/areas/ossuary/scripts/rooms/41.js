// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/41.js
'use strict';

module.exports = {
  listeners: {

    updateTick: state => room => {
      if (!room || room.players.size === 0) return;

      // Chanting sanity drain
      if (Math.random() < 0.05) {
        room.players.forEach(p => {
          p.say("<magenta>The low chanting vibrates through your bones, unsettling your thoughts.</magenta>");
          p.mutateAttribute && p.mutateAttribute('sanity', -1);
        });
      }

      // Spike glisten
      if (Math.random() < 0.04) {
        room.broadcast("<red>The oily residue on the spikes glistens as if freshly applied.</red>");
      }
    },

    playerEnter: state => player => {
      player.say("<white>The narrow corridor feels oppressive, the spikes seeming to lean inward as you pass.</white>");
    },

    command: state => (player, commandName, args) => {
      const room = player.room;
      const target = (args || '').toLowerCase().trim();

      const senseVerbs = [
        'examine','look','touch','feel','smell','sniff','taste','listen','search','squeeze','crawl'
      ];
      if (!senseVerbs.includes(commandName)) return false;

      const nouns = {
        spikes: "Rusted iron spikes jut from the walls, their tips stained with a dark, oily residue.",
        walls: "The stone walls are pitted and scarred, as if many have brushed too close to the spikes.",
        residue: "The oily residue smells faintly metallic and wrong, like old blood mixed with poison.",
        chanting: "A low, rhythmic chant thrums through the stone, just below the threshold of understanding.",
        air: "The air is thin and dry, making each breath feel like a test of will."
      };

      // LISTEN
      if (commandName === 'listen') {
        player.say("<white>The chanting grows louder the more you focus on it, though the words remain indistinct.</white>");
        return true;
      }

      // SMELL
      if (commandName === 'smell' || commandName === 'sniff') {
        player.say("<white>The air smells of rust, dust, and something faintly poisonous.</white>");
        return true;
      }

      // TOUCH spikes — hazard
      if ((commandName === 'touch' || commandName === 'feel') && target.includes('spike')) {
        player.say("<red>You brush a spike and feel a sharp sting!</red>");
        player.mutateAttribute('health', -2);
        if (Math.random() < 0.2 && state.EffectFactory.has('spore_sickness')) {
          const effect = state.EffectFactory.create('spore_sickness', {});
          player.addEffect(effect);
        }
        return true;
      }

      // SEARCH — find old prayer bead
      if (commandName === 'search') {
        const perception = player.getSkill?.('perception') || 0;
        const roll = Math.floor(Math.random() * 20) + 1 + perception;
        const dc = 16;

        player.say("<yellow>You carefully inspect the narrow corridor, mindful of the spikes...</yellow>");

        if (roll >= dc && !room.getMeta('ascetic_bead_found')) {
          room.setMeta('ascetic_bead_found', true);
          player.say("<green>You find a small prayer bead wedged between two stones.</green>");
          const bead = state.ItemManager.create(room.area, 'ossuary:funerary_charm');
          bead && bead.moveTo(player);
        } else {
          player.say("<white>You find nothing but dust and danger.</white>");
        }
        return true;
      }

      // CRAWL / SQUEEZE — avoid spike damage
      if ((commandName === 'crawl' || commandName === 'squeeze') &&
          (target.includes('hall') || target.includes('corridor'))) {

        player.say("<yellow>You lower yourself and carefully crawl beneath the worst of the spikes.</yellow>");

        if (Math.random() < 0.2) {
          player.say("<red>A spike grazes your back!</red>");
          player.mutateAttribute('health', -1);
        } else {
          player.say("<green>You make it through without injury.</green>");
        }
        return true;
      }

      // SENSORY INTERACTIONS
      if (!target) return false;
      const key = Object.keys(nouns).find(k => target.includes(k));
      if (!key) return false;

      switch (commandName) {
        case 'taste':
          player.say("<white>You taste dust and metal. Not wise to taste anything here.</white>");
          return true;
        default:
          player.say(`<white>${nouns[key]}</white>`);
          return true;
      }
    }
  }
};
