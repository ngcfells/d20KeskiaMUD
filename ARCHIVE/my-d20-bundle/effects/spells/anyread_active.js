'use strict';

/**
 * Anyread Effect
 * --------------
 * Bypasses language barriers for non-magical text.
 */
module.exports = {
  config: {
    name: "Anyread",
    description: "You can read any nonmagical writing through your prism.",
    type: "spell_effect",
    unique: true,
    isMagical: true
  },
  state: {},
  listeners: {
    effectActivated() {
      const player = this.target;
      // Register the hook for the duration of the effect
      player.addHook('onReadCheck', this.onReadCheck.bind(this));
    },

    effectDeactivated() {
      const player = this.target;
      player.removeHook('onReadCheck');
      player.say("<yellow>The prism's clarity fades, and the text before you returns to an indecipherable jumble of ink.</yellow>");
    },

    /**
     * Hook logic to intercept the Language Manager/Read system
     */
    onReadCheck: state => function (readEvent) {
      const caster = this.target;
      const spellDef = state.SpellManager.get('anyread');

      if (readEvent.isMagical) {
        if (spellDef.emotes.magicalBlock) {
          spellDef.emotes.magicalBlock(caster, readEvent.document);
        }
        return; // Logic proceeds to standard failed read
      }

      // Success: Bypass language check
      if (spellDef.emotes.reading) {
        spellDef.emotes.reading(caster, readEvent.document);
      }
      
      readEvent.setSuccess(true);
      readEvent.addNote('Deciphered via Anyread');
    }
  }
};
