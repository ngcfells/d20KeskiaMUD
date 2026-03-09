// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/42.js
'use strict';

module.exports = {
  listeners: {

    updateTick: state => room => {
      if (!room || room.players.size === 0) return;

      // Portal pulse
      if (Math.random() < 0.06) {
        room.broadcast("<red>The crimson portal pulses, warping the air with a wave of necrotic heat.</red>");
      }

      // Negative energy sanity drain
      if (Math.random() < 0.05) {
        room.players.forEach(p => {
          p.say("<magenta>A whisper brushes the edge of your thoughts, promising power for a price.</magenta>");
          p.mutateAttribute && p.mutateAttribute('sanity', -1);
        });
      }
    },

    playerEnter: state => player => {
      player.say("<red>The air here feels wrong, as if the room itself resents your presence.</red>");
    },

    command: state => (player, commandName, args) => {
      const room = player.room;
      const target = (args || '').toLowerCase().trim();

      const senseVerbs = [
        'examine','look','touch','feel','smell','sniff','taste','listen','search','pray','kneel'
      ];
      if (!senseVerbs.includes(commandName)) return false;

      const nouns = {
        blood: "The black blood is still tacky, arranged in spirals and sigils that hurt to look at too long.",
        patterns: "The profane patterns twist in on themselves, forming symbols that seem to shift when not directly observed.",
        altar: "The altar is a grotesque construction of fused skulls, each one locked in a silent scream.",
        skulls: "The skulls are fused together seamlessly, as if melted into a single blasphemous mass.",
        portal: "The crimson portal churns like liquid fire, radiating a suffocating necrotic heat.",
        heat: "The heat from the portal presses against your skin and thoughts alike."
      };

      // LISTEN
      if (commandName === 'listen') {
        player.say("<white>You hear faint, overlapping whispers in a language you do not know—and do not want to.</white>");
        return true;
      }

      // SMELL
      if (commandName === 'smell' || commandName === 'sniff') {
        player.say("<white>The air reeks of copper, ash, and something like burned incense turned sour.</white>");
        return true;
      }

      // TASTE (ill-advised)
      if (commandName === 'taste' && target.includes('blood')) {
        player.say("<red>The blood is bitter and cold. A spike of nausea twists your gut.</red>");
        player.mutateAttribute('health', -2);
        player.mutateAttribute('sanity', -2);
        return true;
      }

      // SEARCH — find a corrupted charm
      if (commandName === 'search') {
        const perception = player.getSkill?.('perception') || 0;
        const roll = Math.floor(Math.random() * 20) + 1 + perception;
        const dc = 17;

        player.say("<yellow>You carefully search around the altar, avoiding the worst of the blood sigils...</yellow>");

        if (roll >= dc && !room.getMeta('blasphemous_charm_found')) {
          room.setMeta('blasphemous_charm_found', true);
          player.say("<green>You find a small bone charm half-buried in the congealed blood.</green>");
          const charm = state.ItemManager.create(room.area, 'ossuary:blasphemous_charm');
          charm && charm.moveTo(player);
        } else {
          player.say("<white>Your hands come away sticky with dried blood and nothing else.</white>");
        }
        return true;
      }

      // PRAY / KNEEL — sanity check, possible boon or backlash
      if ((commandName === 'pray' || commandName === 'kneel') &&
          (target.includes('altar') || !target)) {

        const will = player.getAttribute?.('will') || 0;
        const roll = Math.floor(Math.random() * 20) + 1 + will;
        const dc = 16;

        player.say("<yellow>You kneel before the blasphemous altar, forcing your thoughts into a prayerful shape...</yellow>");

        if (roll >= dc) {
          player.say("<green>You feel a distant, disapproving light brush against you, shielding your mind for a moment.</green>");
          player.mutateAttribute && player.mutateAttribute('sanity', 3);
        } else {
          player.say("<red>The portal’s presence floods your thoughts with intrusive, violent images.</red>");
          player.mutateAttribute && player.mutateAttribute('sanity', -3);
        }
        return true;
      }

      // SENSORY INTERACTIONS
      if (!target) return false;
      const key = Object.keys(nouns).find(k => target.includes(k));
      if (!key) return false;

      switch (commandName) {
        case 'touch':
        case 'feel':
          if (key === 'portal') {
            player.say("<red>Your hand nears the portal and a blast of necrotic heat forces you back.</red>");
            player.mutateAttribute('health', -3);
          } else {
            player.say(`<yellow>Your fingers brush the ${key}. ${nouns[key]}</yellow>`);
          }
          return true;
        default:
          player.say(`<white>${nouns[key]}</white>`);
          return true;
      }
    }
  }
};
