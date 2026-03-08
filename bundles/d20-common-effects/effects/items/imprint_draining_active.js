'use strict';

/**
 * Imprint Draining Effect (Item-Side)
 * -----------------------------------
 * Hooks into the weapon's hit logic to grant temporary HP to the wielder.
 */
module.exports = {
  config: {
    name: "Vampiric Imprint",
    description: "This weapon siphons life from the living to bolster its wielder.",
    type: "buff",
    family: "necromancy",
    tier: 1,
    maxTier: 1
  },
  listeners: {
    /**
     * Triggered when the weapon strikes a target
     */
    onWeaponHit: state => function (damageData) {
      const wielder = damageData.attacker;
      const victim = damageData.target;

      // Logic: Must be a living opponent
      if (victim.hasBehavior('living')) {
        const drainAmount = Math.floor(damageData.amount / 2);
        
        if (drainAmount > 0) {
          // Grant Temporary HP (lasting 1 hour)
          const tempHPEffect = state.EffectFactory.create('vampiric_temp_hp', wielder, {
            duration: 3600000, // 1 hour in MS
            state: { amount: drainAmount }
          });
          
          wielder.addEffect(tempHPEffect);
          wielder.say(`<red>You feel a rush of stolen vitality as ${damageData.weapon.name} bites deep!</red>`);
        }
      }
    }
  }
};
