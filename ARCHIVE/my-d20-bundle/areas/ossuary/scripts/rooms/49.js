// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/49.js
'use strict';

module.exports = {
  listeners: {

    updateTick: state => room => {
      if (!room || room.players.size === 0) return;

      // Wild magic surge
      if (Math.random() < 0.06) {
        room.broadcast("<cyan>The air crackles with unstable magic, sending sparks dancing across the obsidian spire.</cyan>");
        room.players.forEach(p => {
          if (Math.random() < 0.2) {
            p.say("<magenta>Your thoughts blur for a moment as wild magic brushes your mind.</magenta>");
            p.mutateAttribute('sanity', -1);
          }
        });
      }

      // Negative energy pulse
      if (Math.random() < 0.05) {
        room.broadcast("<red>A cold wave of despair radiates from the throne.</red>");
        room.players.forEach(p => {
          p.mutateAttribute('sanity', -1);
        });
      }

      // Fallen Saint movement
      if (Math.random() < 0.04) {
        room.broadcast("<white>The fallen figure shifts slightly, as though waking from a long dream.</white>");
      }
    },

    playerEnter: state => player => {
      player.say("<white>The oppressive aura of the sanctum presses against your chest.</white>");
      player.mutateAttribute('sanity', -1);

      // Boss aggro if corruption is high
      const corruption = player.getAttribute('corruption') || 0;
      const room = player.room;
      const saint = [...room.npcs].find(n => n.id.includes('fallen_saint_valerius'));

      if (saint && corruption > 5) {
        room.broadcast("<red>The fallen saint rises, shadow mantle flaring with violent energy!</red>");
        saint.initiateCombat && saint.initiateCombat(player);
      }
    },

    command: state => (player, commandName, args) => {
      const room = player.room;
      const target = (args || '').toLowerCase().trim();

      const senseVerbs = [
        'examine','look','touch','feel','smell','sniff','taste','listen','search','kneel','pray','sit'
      ];
      if (!senseVerbs.includes(commandName)) return false;

      const nouns = {
        spire: "The obsidian spire thrusts upward like a black fang, polished to a mirror sheen.",
        throne: "The throne is made of fused dragon-bone, its curves forming a cruel, regal silhouette.",
        bones: "The dragon-bones are massive, etched with faint, burned-in sigils.",
        figure: "The fallen figure sits slumped yet imposing, wrapped in a cloak of shadow and crackling magic.",
        mantle: "The mantle of shadow shifts and writhes, never settling into a fixed shape.",
        power: "The air vibrates with conflicting forces—blessing and blight locked in uneasy balance."
      };

      // LISTEN
      if (commandName === 'listen') {
        player.say("<white>You hear the faint crackle of wild magic and the slow, rasping breath of the fallen saint.</white>");
        return true;
      }

      // SMELL
      if (commandName === 'smell' || commandName === 'sniff') {
        player.say("<white>The air smells of scorched bone and cold incense.</white>");
        return true;
      }

      // TASTE
      if (commandName === 'taste') {
        player.say("<white>The air tastes sharp and bitter, like burnt metal.</white>");
        return true;
      }

      // SEARCH — find relic fragment
      if (commandName === 'search') {
        const perception = player.getSkill?.('perception') || 0;
        const roll = Math.floor(Math.random() * 20) + 1 + perception;
        const dc = 17;

        player.say("<yellow>You search the base of the spire and the edges of the throne...</yellow>");

        if (roll >= dc && !room.getMeta('saint_relic_found')) {
          room.setMeta('saint_relic_found', true);
          player.say("<green>You find a small fragment of sanctified bone lodged between the throne’s base.</green>");
          const relic = state.ItemManager.create(room.area, 'ossuary:saint_bone_fragment');
          relic && relic.moveTo(player);
        } else {
          player.say("<white>You find nothing but cold stone and shifting shadows.</white>");
        }
        return true;
      }

      // KNEEL / PRAY — possible blessing or backlash
      if ((commandName === 'kneel' || commandName === 'pray') &&
          (target.includes('throne') || target.includes('saint') || !target)) {

        const will = player.getAttribute?.('will') || 0;
        const roll = Math.floor(Math.random() * 20) + 1 + will;
        const dc = 16;

        player.say("<yellow>You kneel before the fallen saint, offering a quiet plea...</yellow>");

        if (roll >= dc) {
          player.say("<cyan>A faint warmth touches your mind, as if a distant memory of holiness stirs.</cyan>");
          player.mutateAttribute('sanity', 2);
        } else {
          player.say("<red>A surge of corrupted divinity lashes your thoughts!</red>");
          player.mutateAttribute('sanity', -3);
        }
        return true;
      }

      // SIT on throne — triggers backlash
      if (commandName === 'sit' && target.includes('throne')) {
        player.say("<red>You attempt to sit on the dragon-bone throne...</red>");
        player.say("<red>A violent surge of wild magic hurls you backward!</red>");
        player.mutateAttribute('health', -5);
        player.mutateAttribute('sanity', -3);
        return true;
      }

      // TOUCH — shadow mantle hazard
      if ((commandName === 'touch' || commandName === 'feel') &&
          (target.includes('figure') || target.includes('mantle'))) {

        player.say("<red>Your hand nears the shadow mantle. A blast of corrupted energy scorches your skin!</red>");
        player.mutateAttribute('health', -4);
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
