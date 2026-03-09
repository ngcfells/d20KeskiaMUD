/**
 * AI Behavior: Berserk Nearest
 * ----------------------------
 * Used for uncontrolled summons (Animate Legion).
 * Logic: Every tick, if not in combat, find the nearest living creature 
 * (including the owner) and attack.
 */
module.exports = {
  listeners: {
    updateTick: state => function () {
      if (this.isInCombat()) {
        return;
      }

      // Find all living entities in the room (Players and NPCs)
      const potentialTargets = [...this.room.players, ...this.room.npcs]
        .filter(target => {
          return target !== this && 
                 target.getAttribute('health') > 0 &&
                 !target.hasBehavior('undead_traits'); // Don't attack fellow undead
        });

      if (potentialTargets.length > 0) {
        // Pick the closest or a random one
        const target = potentialTargets[Math.floor(Math.random() * potentialTargets.length)];
        
        state.Broadcast.sayAt(this.room, `The ${this.name} lunges at ${target.name} with a mindless snarl!`);
        this.initiateCombat(target);
      }
    }
  }
};
