'use strict';

/**
 * Antiplant Shell Effect
 * ----------------------
 * Prevents plant creatures from entering the 10ft radius.
 * Collapses if the caster moves into a space occupied by a plant.
 */
module.exports = {
  config: {
    name: "Antiplant Shell",
    description: "An invisible barrier prevents plant-life from nearing you.",
    type: "spell_effect",
    unique: true,
    isMagical: true
  },
  state: {
    radius: 10
  },
  listeners: {
    effectActivated() {
      // Activated messaging handled by spell onCast
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<yellow>The forest-scented aura around you dissipates; the green barrier is gone.</yellow>");
      player.room.broadcastExcept(player, `<yellow>The faint green shimmer surrounding ${player.name} flickers and vanishes.</yellow>`);
    },

    /**
     * Prevent plants from entering the room
     */
    onCreatureEntry: state => function (creature) {
      const caster = this.target;
      const isPlant = creature.getMeta('creatureType') === 'plant';

      if (!isPlant) return;

      creature.say("<red>A wall of absolute, sterile silence slams into you. Your vines and fibers seize; you cannot force yourself closer to the source of the aura.</red>");
      caster.say(`<green>The shell hums with a vibrant green frequency as it denies entry to ${creature.name}.</green>`);
      
      // Stop movement via movementCancelled event
      creature.emit('movementCancelled', { reason: 'antiplant_barrier' });
    },

    /**
     * Bulldoze Check: If caster moves into a room with plants, the spell breaks.
     */
    preMove: state => function (moveRequest) {
      const nextRoom = moveRequest.nextRoom;

      // Scan for animate plants in the target room
      const hasPlants = nextRoom.npcs.some(npc => npc.getMeta('creatureType') === 'plant') || 
                        nextRoom.players.some(pc => pc.getMeta('creatureType') === 'plant');

      if (hasPlants) {
        moveRequest.allowed = false;
        moveRequest.collapseBarrier = true;
        
        // Per 3.5 Rules: Forcing the barrier against creatures it keeps at bay ends the spell.
        this.remove();
      }
    }
  }
};
