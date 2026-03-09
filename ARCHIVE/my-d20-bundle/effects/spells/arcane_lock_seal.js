'use strict';

/**
 * Arcane Lock Seal Effect
 * ----------------------
 * Applied to Items (Chests) or Room Exits (Doors/Portals).
 * Enhances the DC of all bypass attempts.
 */
module.exports = {
  config: {
    name: "Arcane Lock",
    description: "This object is magically sealed.",
    type: "spell_effect",
    unique: true,
    isMagical: true
  },
  state: {
    ownerId: null,
    dcBonus: 10
  },
  listeners: {
    /**
     * Intercept 'open' or 'pick' commands
     */
    onTryOpen: state => function (creature, result) {
      const spellDef = state.SpellManager.get('arcane_lock');
      
      // The caster passes their own lock automatically
      if (creature.id === this.state.ownerId) {
        if (spellDef.emotes.ownerPass) spellDef.emotes.ownerPass(creature, this.target);
        return; 
      }

      // Block standard opening
      if (spellDef.emotes.denied) spellDef.emotes.denied(creature, this.target);
      result.allowed = false;
    },

    /**
     * Increase the DC for Lockpicking and Strength checks
     */
    onGetBypassDC: state => function (data) {
      data.dc += this.state.dcBonus;
    },

    /**
     * Interaction with 'Knock' spell
     */
    onKnockSpell: state => function (knockEffect) {
      // Knock suppresses Arcane Lock for 10 minutes in 3.5e
      this.pause(600000); 
      this.target.room.broadcast("<yellow>The blue sigil on the lock flickers and turns grey, its power temporarily suppressed.</yellow>");
    }
  }
};
