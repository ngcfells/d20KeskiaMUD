// path: bundles/my-d20-bundle/areas/ossuary/scripts/rooms/4.js
'use strict';

module.exports = {
  listeners: {

    updateTick: state => function () {
      const room = this;
      if (room.players.size === 0) return;

      // Lantern flicker (atmospheric)
      if (Math.random() < 0.07) {
        room.broadcast("<yellow>The lantern flames gutter in unison, casting long, wavering silhouettes across the walls.</yellow>");
      }

      // Emotional residue (environmental, not prescriptive)
      if (Math.random() < 0.04) {
        room.broadcast("<magenta>A quiet tension lingers in the chamber, subtle as a held breath.");
      }
    },

    playerEnter: state => function (player) {
      player.say("<white>Lanterns line the walls, their flames swaying in slow, deliberate arcs.</white>");

      // Force‑sensitive hook (FS‑2 threshold)
      if (player.getMeta('is_force_sensitive') === true) {
        player.say("<cyan>The Force gathers faintly around the central lantern, as though acknowledging its long vigil.</cyan>");
      }

      // Psionic empath hook
      if (player.getMeta('is_psionic_empath') === true) {
        player.say("<magenta>A soft emotional residue clings to the lanterns — patience, endurance, and something like quiet watchfulness.</magenta>");
      }
    },

    command: state => function (commandName, args, player) {
      const room = this;
      const verb = commandName.toLowerCase();
      const target = (args || '').toLowerCase().trim();

      const senseVerbs = ['look','examine','touch','feel','smell','sniff','taste','listen','search','sense'];
      if (!senseVerbs.includes(verb)) return false;

      const nouns = {
        lanterns: "Iron lanterns hang from hooks along the walls, their flames steady despite the still air.",
        flame: "The flame dances in slow spirals, its light bending in curious patterns.",
        walls: "The walls are etched with faint grooves, as though tools once scraped symbols now lost.",
        hooks: "Simple iron hooks hold the lanterns aloft, worn smooth by long use.",
        soot: "A thin layer of soot clings to the ceiling, marking years of quiet illumination."
      };

      // LISTEN
      if (verb === 'listen') {
        player.say("<white>The lanterns emit a faint, rhythmic crackle, soft as distant rain.</white>");
        return true;
      }

      // SMELL
      if (verb === 'smell' || verb === 'sniff') {
        player.say("<white>The air carries the scent of warm oil and old soot.</white>");
        return true;
      }

      // TASTE
      if (verb === 'taste') {
        player.say("<white>The air tastes faintly of burnt oil.</white>");
        return true;
      }

      // SEARCH
      if (verb === 'search') {
        player.say("<yellow>You inspect the lanterns and the grooves along the walls...</yellow>");
        player.say("<white>No hidden mechanisms reveal themselves.</white>");
        return true;
      }

      // PSIONIC EMPATH
      if (verb === 'sense' && player.getMeta('is_psionic_empath') === true) {
        player.say("<magenta>A lingering impression of patience rests here, steady and enduring.</magenta>");
        return true;
      }

      // TOUCH flame
      if ((verb === 'touch' || verb === 'feel') && target.includes('flame')) {
        player.say("<yellow>Your hand nears the flame. It radiates warmth, steady and calm.</yellow>");
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
  }
};
