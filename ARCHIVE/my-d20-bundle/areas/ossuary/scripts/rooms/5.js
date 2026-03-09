// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/5.js
'use strict';

module.exports = {
  listeners: {

    updateTick: state => function () {
      const room = this;
      if (room.players.size === 0) return;

      // Whispering effect (environmental, non-prescriptive)
      if (Math.random() < 0.06) {
        room.broadcast("<white>A faint whisper threads through the reliquary, too soft to form words.</white>");
      }

      // Relic shimmer effect
      if (Math.random() < 0.04) {
        room.broadcast("<yellow>One of the relics emits a brief shimmer, then settles into stillness.</yellow>");
      }
    },

    playerEnter: state => function (player) {
      const waterStatus = this.getMeta('water_state') || 'brackish';

      // Atmospheric description
      player.say("<white>Four carved priests stand around a stone basin, each frozen in a distinct gesture.</white>");

      // Water-state dependent description
      if (waterStatus === 'blessed') {
        player.say("<cyan>The basin glows with a soft radiance, its surface smooth as polished glass.</cyan>");
      } else if (waterStatus === 'cursed') {
        player.say("<red>The water is black as ink, its surface absorbing light rather than reflecting it.</red>");
      } else if (waterStatus === 'poisoned') {
        player.say("<green>The water swirls with a sickly translucence, faint vapors drifting upward.</green>");
      }

      // Force-sensitive hook (FS-2 threshold)
      if (player.getMeta('is_force_sensitive') === true) {
        player.say("<cyan>The Force gathers in faint spirals around the basin, as though attentive to the ritual echoes embedded here.</cyan>");
      }

      // Psionic empath hook
      if (player.getMeta('is_psionic_empath') === true) {
        player.say("<magenta>A layered emotional residue lingers — devotion, regret, and something like unresolved intent.</magenta>");
      }
    },

    command: state => function (commandName, args, player) {
      const room = this;
      const verb = commandName.toLowerCase();
      const target = (args || '').toLowerCase().trim();

      // Valid ritual verbs
      const ritualVerbs = ['pray','touch','kneel','dip'];
      const senseVerbs = ['look','examine','touch','feel','smell','sniff','taste','listen','search','sense'];

      const waterState = room.getMeta('water_state') || 'brackish';

      // --- Sensory Nouns ---
      const nouns = {
        basin: "A circular stone basin sits at the center, its water shifting with subtle currents.",
        priests: "Four stone priests encircle the basin, each carved in a distinct ritual posture.",
        palms: "The first priest extends open palms toward the basin, as if offering purification.",
        finger: "The second priest raises a single finger, invoking a blessing.",
        head: "The third priest bows deeply, its posture heavy with sorrow.",
        fists: "The fourth priest clenches both fists, its stance rigid with aggression.",
        water: "The water reflects the current ritual state — brackish, cleansed, blessed, cursed, or poisoned.",
        relics: "Small reliquaries line the walls, each containing fragments of forgotten devotion.",
        shelves: "Stone shelves support the reliquaries, etched with faint devotional patterns.",
        glass: "The glass panes are slightly fogged, as though touched by unseen breath."
      };

      // --- Sensory Verbs ---
      if (senseVerbs.includes(verb)) {

        // LISTEN
        if (verb === 'listen') {
          player.say("<white>A faint whisper drifts through the chamber, its source impossible to pinpoint.</white>");
          return true;
        }

        // SMELL
        if (verb === 'smell' || verb === 'sniff') {
          player.say("<white>The air carries the scent of old stone, cold water, and distant incense.</white>");
          return true;
        }

        // TASTE
        if (verb === 'taste') {
          player.say("<white>The air tastes mineral‑sharp, with a hint of ancient dust.</white>");
          return true;
        }

        // SEARCH — Hidden relic + mythos relic
        if (verb === 'search') {
          const perception = player.getSkill?.('perception') || 0;
          const roll = Math.floor(Math.random() * 20) + 1 + perception;

          player.say("<yellow>You search the reliquaries and the shadows beneath the shelves...</yellow>");

          // Hidden relic (easy)
          if (roll >= 12 && !room.getMeta('minor_relic_found')) {
            room.setMeta('minor_relic_found', true);
            player.say("<green>You find a small devotional charm tucked behind a cracked reliquary.</green>");
            const charm = state.ItemManager.create(room.area, 'ossuary:devotional_charm');
            charm && charm.moveTo(player);
            return true;
          }

          // Mythos relic (hard)
          if (roll >= 18 && !room.getMeta('mythos_relic_found')) {
            room.setMeta('mythos_relic_found', true);
            player.say("<red>You uncover a shard of bone etched with impossible geometry.</red>");

            // Mythos sanity check
            const will = player.getAttribute('will') || 0;
            const saveRoll = Math.floor(Math.random() * 20) + 1 + will;
            const dc = 20;

            player.say(`<white>[ Will Save: ${saveRoll} vs DC ${dc} ]</white>`);

            if (saveRoll < dc) {
              player.say("<magenta>A sharp pressure spikes behind your eyes as the patterns twist in on themselves.</magenta>");
              player.mutateAttribute('sanity', -5);
            }

            const shard = state.ItemManager.create(room.area, 'ossuary:forbidden_bone_shard');
            shard && shard.moveTo(player);
            return true;
          }

          player.say("<white>You find nothing else hidden among the reliquaries.</white>");
          return true;
        }

        // PSIONIC EMPATH
        if (verb === 'sense' && player.getMeta('is_psionic_empath') === true) {
          player.say("<magenta>A quiet emotional echo lingers — devotion layered with regret, as though the rituals once performed here carried heavy intent.</magenta>");
          return true;
        }

        // SENSORY INTERACTIONS FOR NOUNS
        const nounKey = Object.keys(nouns).find(k => target.includes(k));
        if (nounKey) {
          player.say(`<white>${nouns[nounKey]}</white>`);
          return true;
        }

        return false;
      }

      // --- Ritual Logic ---
      if (!ritualVerbs.includes(verb)) return false;

      // DIP GEM
      if (verb === 'dip' && target.includes('eye')) {
        const gem = player.inventory.find(i => i.id.includes('pilgrim_eye_gem'));
        if (!gem) return player.say("You don't have a gem to dip.");

        player.say(`<cyan>You submerge the hematite gem into the ${waterState} water...</cyan>`);

        switch (waterState) {
          case 'blessed':
            player.say("<white>The gem flares with radiant light, purging the darkness within.</white>");
            gem.setMeta('eye_state', 'cleansed');
            gem.setMeta('corruption_value', 0);
            if (player.getAttribute('corruption') > 0) {
              player.mutateAttribute('corruption', -1);
            }
            break;

          case 'cursed':
            player.say("<red>The ink‑black water seeps into the gem’s cracks, pulsing with hungry intent.</red>");
            gem.setMeta('eye_state', 'cursed');
            gem.setMeta('corruption_value', 5);
            player.mutateAttribute('corruption', 2);
            player.mutateAttribute('sanity', -2);
            break;

          case 'poisoned':
            player.say("<green>The sickly water stains the gem, releasing a faint toxic vapor.</green>");
            gem.setMeta('eye_state', 'poisoned');
            break;

          case 'cleansed':
            player.say("<white>The purified water washes over the gem, leaving it unchanged.</white>");
            gem.setMeta('eye_state', 'cleansed');
            break;

          default:
            player.say("<white>The brackish water cleans the surface but alters nothing deeper.</white>");
            gem.setMeta('eye_state', 'brackish');
        }
        return true;
      }

      // CLEANSING — Open Palms
      if (target.includes('palms')) {
        player.say("<white>You mirror the priest’s open‑palm gesture. A soft vibration stirs the basin.</white>");
        if (waterState === 'brackish') {
          room.setMeta('water_state', 'cleansed');
          room.broadcast("<cyan>The cloudiness settles, leaving the water clear and still.</cyan>");
        } else {
          player.say("<white>The water resists further cleansing.</white>");
        }
        return true;
      }

      // BLESSING — Raised Finger
      if (target.includes('finger')) {
        player.say("<white>You kneel before the priest with the raised finger, invoking a quiet blessing.</white>");
        if (waterState === 'cleansed') {
          room.setMeta('water_state', 'blessed');
          room.broadcast("<cyan>A soft radiance blooms within the basin.</cyan>");
        } else if (waterState === 'blessed') {
          player.say("<white>The water is already blessed.</white>");
        } else {
          player.say("<white>The water must be purified first.</white>");
        }
        return true;
      }

      // CURSING — Bowed Head
      if (target.includes('head')) {
        player.say("<white>You bow your head in imitation of the sorrowful priest.</white>");
        room.setMeta('water_state', 'cursed');
        room.broadcast("<red>The water darkens to ink, absorbing the chamber’s light.</red>");
        return true;
      }

      // POISONING — Clenched Fists
      if (target.includes('fists')) {
        player.say("<white>You touch the priest with clenched fists.</white>");
        room.setMeta('water_state', 'poisoned');
        room.broadcast("<green>The water bubbles violently, settling into a sickly green hue.</green>");
        return true;
      }

      return false;
    }
  }
};
