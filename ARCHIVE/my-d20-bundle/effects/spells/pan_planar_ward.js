'use strict';

/**
 * Pan-Planar Ward Effect
 * ---------------------
 * 1. Blocks all teleportation (In/Out).
 * 2. Blocks all Planar travel (Ethereal, Astral, Plane Shift).
 * 3. Blocks Scrying and remote sensors (Arcane Eye).
 */
module.exports = {
  config: {
    name: "Pan-Planar Anchor",
    description: "This area is anchored across all planes. Dimensional travel is impossible.",
    type: "spell_effect",
    unique: true,
    isMagical: true
  },
  state: {
    casterId: null
  },
  listeners: {
    /**
     * Intercept Teleportation/Planar events
     */
    onTeleport: state => function (event, result) {
      const spellDef = state.SpellManager.get('liang_s_pan_planar_anchor');
      if (spellDef.emotes.teleportBlocked) spellDef.emotes.teleportBlocked(event.target);
      result.cancel = true;
    },

    /**
     * Intercept Scrying/Remote Vision
     */
    onScryAttempt: state => function (scryer, result) {
      const spellDef = state.SpellManager.get('liang_s_pan_planar_anchor');
      if (spellDef.emotes.scryBlocked) spellDef.emotes.scryBlocked(scryer);
      result.cancel = true;
    }
  }
};
