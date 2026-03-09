'use strict';

/**
 * Antimagic Field Effect
 * ---------------------
 * Suppresses all magical effects, items, and casting within its radius.
 * Now includes "Bulldoze" logic: per d20 rules, forcing a barrier against 
 * a creature it excludes (or in this case, forcing the field into an area 
 * that would collapse it, or moving into a restricted zone) terminates the spell.
 */
module.exports = {
  config: {
    name: "Antimagic Field",
    description: "Magic is suppressed in a 10ft radius around you.",
    type: "spell_effect",
    unique: true,
    isMagical: true
  },
  state: {
    radius: 10,
    suppressedEffects: new Map() 
  },
  listeners: {
    effectActivated() {
      const player = this.target;
      player.say("<white>A heavy, hollow silence falls over the area as the weave of magic simply... ceases.</white>");
      player.room.broadcastExcept(player, `<white>The air around ${player.name} ripples once and then becomes eerily still, as if a great weight has settled upon the local reality.</white>`);
      
      // Perform initial suppression sweep in the current room
      this.emit('updateSuppression');
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<cyan>The pressure in your ears snaps as the invisible sphere dissipates. Magic rushes back into the world.</cyan>");
      player.room.broadcastExcept(player, `<cyan>The unnatural stillness surrounding ${player.name} shatters, and the familiar hum of the arcane returns.</cyan>`);
      
      // Restore all suppressed effects tracked by this field
      for (const [entity, effects] of this.state.suppressedEffects) {
        effects.forEach(eff => {
          if (typeof eff.resume === 'function') eff.resume();
        });
      }
      this.state.suppressedEffects.clear();
    },

    /**
     * Intercept the 'cast' command for the caster
     */
    onCommand: state => function (command, args) {
      if (command === 'cast') {
        this.target.say("<red>You reach for the arcane threads, but they are cold and inert. The Antimagic Field denies you.</red>");
        // Throwing an error or returning false depends on your Command Manager's intercept logic
        throw new Error("Magic suppressed."); 
      }
    },

    /**
     * Bulldoze Check: Intercept movement.
     * While AMF doesn't "block" creatures like Antilife, it collapses if 
     * it overlaps with powerful localized artifacts or specific 'Dead Magic' zones 
     * that create a feedback loop (Campaign/DM dependent, but standardizing for MUD).
     */
    preMove: state => function (moveRequest) {
      const nextRoom = moveRequest.nextRoom;

      // Logic: If the next room has a 'Primal Magic' or 'Artifact' signature that 
      // is hard-coded to collapse AMFs, we trigger the collapse here.
      const isAntiFieldZone = nextRoom.getMeta('collapsesAntimagic');

      if (isAntiFieldZone) {
        moveRequest.allowed = false;
        moveRequest.collapseBarrier = true;
        this.target.say("<red>The void within your field screams as it touches the concentrated essence of the destination. The spell shatters!</red>");
        this.remove();
      }
    },

    /**
     * Update suppression for all entities in the room
     */
    updateSuppression: state => function () {
      const caster = this.target;
      const room = caster.room;

      // Scan all entities in the room
      const entities = [...room.players, ...room.npcs];

      for (const entity of entities) {
        entity.effects.forEach(effect => {
          // If the effect is marked as magical and isn't already suppressed
          if (effect.config.isMagical && !effect.isSuppressed) {
            if (typeof effect.suppress === 'function') {
              effect.suppress();
              
              // Track for restoration later
              if (!this.state.suppressedEffects.has(entity)) {
                this.state.suppressedEffects.set(entity, []);
              }
              this.state.suppressedEffects.get(entity).push(effect);
            }
          }
        });

        // Toggle the global suppression meta for the Defense Resolver
        entity.setMeta('isAntimagicSuppressed', true);
      }
    },

    /**
     * When someone enters the room with the caster
     */
    onCreatureEntry: state => function (creature) {
      creature.say("<white>You step into a zone of absolute magical silence. Your enchanted gear grows heavy and dull.</white>");
      this.emit('updateSuppression');
    },

    /**
     * When someone leaves the caster's room
     */
    onCreatureLeave: state => function (creature) {
      creature.removeMeta('isAntimagicSuppressed');
      creature.say("<cyan>The weight of the dead-magic field lifts; your connection to the weave snaps back into focus.</cyan>");
    }
  }
};
