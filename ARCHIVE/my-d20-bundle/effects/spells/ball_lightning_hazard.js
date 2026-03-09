'use strict';

/**
 * Effect: Ball Lightning Hazard (Static Spasm)
 * A globe of lightning occupies the target's space, dealing 
 * recurring damage and slowing movement via muscle spasms.
 */
module.exports = {
  config: {
    name: "Ball Lightning Hazard",
    description: "A crackling globe of electricity occupies your space, shocking you and causing spasms.",
    type: "hazard",
    family: "electricity",
    tier: 1,
    maxTier: 1
  },
  state: {
    dc: 15,
    diceCount: 1,
    caster: null,
    isImmune: false
  },
  modifiers: {
    attributes: {
      // 25% Speed penalty due to involuntary muscle contractions
      speed: function(current) {
        return this.state.isImmune ? current : Math.floor(current * 0.75);
      }
    }
  },
  listeners: {
    effectActivated() {
      if (!this.state.isImmune) {
        this.target.say("<red>The intense electrical field makes your muscles twitch uncontrollably!</red>");
      }
    },
    /**
     * Recurring Damage Logic
     * Triggered every round (pulse) by the effect engine.
     */
    onTick() {
      const target = this.target;
      const { dc, diceCount, caster } = this.state;

      // 1d6 per level (capped by spell definition/diceCount)
      let damageRoll = 0;
      for (let i = 0; i < diceCount; i++) {
        damageRoll += Math.floor(Math.random() * 6) + 1;
      }

      // Reflex Save for half
      const saveRoll = Math.floor(Math.random() * 20) + 1;
      const targetRef = target.getAttribute('reflex') || 0;
      
      let finalDamage = damageRoll;
      if ((saveRoll + targetRef) >= dc) {
        finalDamage = Math.floor(damageRoll / 2);
        target.say("<cyan>You twist away from the core of the globe, taking only a partial shock.</cyan>");
      }

      target.emit('damage', {
        amount: finalDamage,
        type: 'electricity',
        attacker: caster,
        source: this
      });

      // Perspective Emotes
      target.say("<bold><blue>The sphere of lightning orbiting you erupts in a violent discharge!</blue></bold>");
      target.room.broadcastExcept(target, `<blue>Arcs of electricity leap from the globe into ${target.name}'s body!</blue>`);
    }
  }
};
