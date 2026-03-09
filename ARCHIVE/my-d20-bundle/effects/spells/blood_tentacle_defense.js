// path: ./bundles/my-d20-bundle/effects/spells/blood_tentacle_defense.js
// ties to the corpse defense spell
'use strict';

module.exports = {
  config: {
    name: "Blood Tentacle",
    description: "A tethered tentacle of gore attacking enemies in the room.",
    type: "environmental",
    family: "necromancy",
    tier: 4
  },

  state: {
    hp: 5,
    strength: 19,
    grappling: null
  },

  listeners: {
    /**
     * Periodic combat logic for the tentacle
     */
    updateTick() {
      const room = this.target; // Room effect
      const caster = room.findPlayerById(this.state.casterId);
      if (!caster) return;

      if (this.state.grappling) {
        this.processDrowning(this.state.grappling);
        return;
      }

      // Find a foe of the caster in the room
      const foe = room.npcs.find(n => n.getMeta('aggroTarget') === caster.id) ||
                  room.players.find(p => p.id !== caster.id && p.getMeta('is_hostile'));

      if (foe) {
        this.attemptSlam(foe);
      }
    },

    attemptSlam(target) {
      const roll = Math.floor(Math.random() * 20) + 1 + 5; // +5 baseline attack
      target.say("<red>A tentacle of clotted blood lashes out at you!</red>");
      
      if (roll >= 15) { // vs AC 15 or target AC
        target.receiveDamage('kinetic', Math.floor(Math.random() * 6) + 1);
        this.attemptGrapple(target);
      }
    },

    attemptGrapple(target) {
      target.say("<red>The bloody coil wraps around your throat!</red>");
      this.state.grappling = target.id;
      target.addTag('grappled');
    },

    processDrowning(targetId) {
      const room = this.target;
      const target = room.findPlayerById(targetId) || room.findNpcById(targetId);
      if (!target) { this.state.grappling = null; return; }

      target.say("<blue><bold>The thick, black blood forces itself into your mouth and lungs! You are drowning!</bold></blue>");
      
      // Use the SRD Drowning rules: Constitution checks or holding breath
      const con = target.getAttribute('constitution') || 10;
      target.emit('drowningTick', { roundsHeld: 1, limit: con * 2 });
    },

    incomingDamage(damage) {
      this.state.hp -= damage.amount;
      if (this.state.hp <= 0) {
        this.target.broadcast("<yellow>A blood tentacle is hacked apart, dissolving into a harmless puddle.</yellow>");
        this.remove();
      }
    }
  }
};
