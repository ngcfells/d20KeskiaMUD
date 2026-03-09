'use strict';

/**
 * Bone Plate Aura (Armor of Zagus)
 * -------------------------------
 * 1. Grants DR 5/Magic.
 * 2. Any creature hitting the caster in melee must make a Will save 
 *    or become 'Shaken' for 1 round.
 */
module.exports = {
  config: {
    name: "Armor of Zagus",
    description: "You are encased in jagged bone. You have DR 5/magic and cause fear on contact.",
    type: "spell_effect",
    unique: true,
    isMagical: true
  },
  state: {
    dc: 15
  },
  listeners: {
    /**
     * Damage Reduction Logic (DR 5/Magic)
     */
    onIncomingDamage: state => function (damage, result) {
      // DR only applies to physical types (Kinetic/Ballistic)
      const physicalTypes = ['kinetic', 'ballistic', 'slashing', 'piercing', 'bludgeoning'];
      
      if (physicalTypes.includes(damage.type)) {
        // Check if the weapon is magical
        const isMagicWeapon = damage.sourceItem && damage.sourceItem.getMeta('enhancementBonus') > 0;
        
        if (!isMagicWeapon) {
          const reduction = 5;
          damage.amount = Math.max(0, damage.amount - reduction);
          
          const spellDef = state.SpellManager.get('armor_of_zagus');
          if (spellDef.emotes.drTrigger) {
            spellDef.emotes.drTrigger(this.target, damage.attacker);
          }
        }
      }
    },

    /**
     * Fear logic triggered on being hit
     */
    onHit: state => function (attacker) {
      const spellDef = state.SpellManager.get('armor_of_zagus');
      
      // Saving Throw against Shaken (Fear)
      const roll = Math.floor(Math.random() * 20) + 1;
      const willSave = (attacker.getAttribute('will') || 0) + roll;

      if (willSave < this.state.dc) {
        if (spellDef.emotes.fearTrigger) spellDef.emotes.fearTrigger(attacker);
        
        // Leverage tiered Fear: stage 2 (Shaken)
        const shaken = state.EffectFactory.create('shaken', {
          config: { duration: 6000 } // 1 round (6s)
        });
        attacker.addEffect(shaken);
      }
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<yellow>The spectral bone-plate shatters into dust, leaving your skin cold and sensitive.</yellow>");
      player.room.broadcastExcept(player, `<yellow>The grisly bone armor surrounding ${player.name} crumbles and dissolves into a fine grey mist.</yellow>`);
    }
  }
};
