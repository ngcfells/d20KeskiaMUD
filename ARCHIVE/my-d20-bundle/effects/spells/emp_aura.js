'use strict';

/**
 * Antitech Field / EMP Aura
 * -------------------------
 * 1. Disables all items with the 'tech' or 'electronic' flag.
 * 2. Penalties to characters with high 'cyberTolerance' usage.
 * 3. Bulldoze logic: Collapses if forced into a "High-Voltage Static" zone.
 */
module.exports = {
  config: {
    name: "Antitech Field",
    description: "Technology and cybernetics are suppressed in a 10ft radius.",
    type: "spell_effect",
    unique: true,
    isMagical: true
  },
  state: {
    radius: 10
  },
  modifiers: {
    attributes: {
      // Direct penalty to physical stats if the target has heavy cybernetics
      // Logic handled via listeners for dynamic scaling.
    }
  },
  listeners: {
    effectActivated() {
      this.emit('updateTechSuppression');
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>The static-charged air around you clears. Nearby machines begin to reboot with a chorus of chirps.</cyan>");
      
      this.target.room.players.concat(this.target.room.npcs).forEach(entity => {
          entity.removeMeta('isTechSuppressed');
          entity.say("<yellow>Your technological systems flicker back to life as the EMP dissipates.</yellow>");
      });
    },

    /**
     * Movement Interceptor (Bulldoze)
     */
    preMove: state => function (moveRequest) {
      const nextRoom = moveRequest.nextRoom;
      
      // Collapses if it hits a "Shielded Hardened Tech" zone or a "Plasma Core"
      if (nextRoom.getMeta('hardened_tech_zone')) {
        moveRequest.allowed = false;
        moveRequest.collapseBarrier = true;
        this.target.say("<red>The Antitech Field buckles against the hardened shielding of the area ahead and snaps!</red>");
        this.remove();
      }
    },

    onCreatureEntry: state => function (creature) {
      const spellDef = state.SpellManager.get('antitech_field');
      const cyberLoad = creature.getAttribute('cyberTolerance') || 0;

      creature.setMeta('isTechSuppressed', true);
      
      if (cyberLoad > 0 && spellDef.emotes.techFail) {
        spellDef.emotes.techFail(creature);
        // Apply 'Stunned' or 'Staggered' if cybernetics are vital
      } else {
        creature.say("<white>Your electronic devices go dark as you enter the field.</white>");
      }
    },

    updateTechSuppression: state => function () {
      const room = this.target.room;
      room.players.concat(room.npcs).forEach(entity => {
        entity.setMeta('isTechSuppressed', true);
      });
    }
  }
};
