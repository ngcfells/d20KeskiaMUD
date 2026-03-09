'use strict';

/**
 * Sepia Snake Trap Effect
 * ----------------------
 * Detonates upon reading. On a failed Reflex save, the victim is 
 * placed in 'Suspended Animation'.
 */
module.exports = {
  config: {
    name: "Sepia Snake Trap",
    type: "spell_effect",
    unique: true
  },
  state: {
    casterId: null,
    dc: 15
  },
  listeners: {
    onRead: state => function (reader, result) {
      if (reader.id === this.state.casterId) return;

      const spellDef = state.SpellManager.get('sepia_snake_sigil');
      if (spellDef.emotes.trigger) spellDef.emotes.trigger(reader);

      // Reflex Save
      const roll = Math.floor(Math.random() * 20) + 1;
      const refSave = (reader.getAttribute('reflex') || 0) + roll;

      if (refSave < this.state.dc) {
        if (spellDef.emotes.success) spellDef.emotes.success(reader);
        
        // Apply Amber Cocoon (Suspended Animation)
        const duration = (1 * 60 * 60 * 1000) + (Math.floor(Math.random() * 4 + 1) * 60 * 60 * 1000); // 1d4 + 1 hours
        const cocoon = state.EffectFactory.create('amber_cocoon', {
            config: { duration: duration }
        });
        reader.addEffect(cocoon);
      } else {
        reader.say("<cyan>You recoil just in time! The amber serpent strikes the air where your throat was a second ago and dissipates into a cloud of brown dust.</cyan>");
      }

      this.remove(); // Trap is discharged
      result.cancel = true;
    }
  }
};
