'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
  config: {
    name: "Adoration Aura",
    description: "An emanation that converts fear into charm.",
    type: "buff.aura",
    family: "charm",
    tier: 3,
    duration: 6000
  },

  state: {
    dc: 15,
    charmedUuids: null
  },

  listeners: {
    effectActivated() {
      this.state.charmedUuids = new Set();
    },

    /**
     * Heartbeat: Scan room for feared enemies to charm
     */
    updateTick() {
      const caster = this.target;
      const state = this.gameState;
      const { dc, charmedUuids } = this.state;

      for (const unit of caster.room.characters) {
        if (unit === caster) continue;

        // Check for fear effects originating from this caster
        const fearEffect = Array.from(unit.effects.effects).find(e => 
          ['shaken', 'frightened', 'panicked', 'cowering'].includes(e.config.name.toLowerCase()) && 
          e.state.casterUuid === caster.uuid
        );

        if (fearEffect && !charmedUuids.has(unit.uuid)) {
          const savePassed = state.SpellcastingManager._savingThrow(state, unit, 'will', dc);
          
          if (!savePassed) {
            charmedUuids.add(unit.uuid);
            
            const charmOverride = state.EffectFactory.create('adoration_charm_override', {
              duration: this.remaining,
              state: { 
                casterUuid: caster.uuid,
                suppressedEffectId: fearEffect.id 
              }
            });
            
            unit.addEffect(charmOverride);
            // Assuming your effect engine supports pausing/resuming
            if (fearEffect.pause) fearEffect.pause(); 

            B.sayAt(unit, "<bold><white>The screams in your mind fall silent, replaced by an overwhelming desire to serve the one you once feared.</white></bold>");
            B.sayAtExcept(unit.room, `<magenta>${unit.name} stops trembling and gazes at ${caster.name} with sudden, wide-eyed adoration.</magenta>`, [unit, caster]);
          }
        }
      }
    },

    /**
     * Break logic: If the caster attacks a charmed subject
     */
    onAttack(attack) {
      if (this.state.charmedUuids.has(attack.target.uuid)) {
        B.sayAt(attack.target, "<red>The sting of your master's betrayal shatters the illusion! Your terror returns!</red>");
        this.state.charmedUuids.delete(attack.target.uuid);
        attack.target.removeEffect('adoration_charm_override');
      }
    }
  }
};
