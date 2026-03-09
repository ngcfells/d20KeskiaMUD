'use strict';

/**
 * Effect: Abyssal Might
 * Enhances physical stats, natural armor, and [Evil] spell DCs.
 */
module.exports = {
  config: {
    name: 'Abyssal Might',
    description: 'Demonic energy surges through your veins, hardening your skin and swelling your muscles.',
    type: 'spell.buff',
    unique: true,
    persists: true,
  },
  state: {
    dcBonus: 2
  },
  modifiers: {
    attributes: {
      strength: (current) => current + 2,
      dexterity: (current) => current + 2,
      constitution: (current) => current + 2,
      naturalArmor: (current) => current + 2
    }
  },
  listeners: {
    /**
     * Hook into the SpellResolver/Manager to boost [Evil] DCs.
     */
    onBeforeSpellCast: function (state) {
      return (subject, castCtx) => {
        const spell = castCtx.spell;
        if (spell.descriptors && spell.descriptors.includes('evil')) {
          // This bonus is picked up by your SpellResolver.js
          castCtx.dcBonus = (castCtx.dcBonus || 0) + this.state.dcBonus;
        }
      };
    }
  }
};
