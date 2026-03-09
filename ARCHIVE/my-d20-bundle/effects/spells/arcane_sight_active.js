'use strict';

/**
 * Arcane Sight Effect
 * -------------------
 * Provides automatic detection of magical auras on objects and creatures.
 */
module.exports = {
  config: {
    name: "Arcane Sight",
    description: "Your eyes glow blue, revealing the presence and school of magical auras.",
    type: "spell_effect",
    unique: true,
    isMagical: true
  },
  state: {},
  listeners: {
    /**
     * Triggered when the caster enters a new room or looks at an object.
     */
    onExamine: state => function (observer, target, description) {
      const spellDef = state.SpellManager.get('arcane_sight');
      
      // Determine Aura Strength based on Caster Level or Item Level
      const auraLevel = target.getMeta('casterLevel') || 0;
      let strength = 'faint';
      if (auraLevel >= 21) strength = 'overwhelming';
      else if (auraLevel >= 12) strength = 'strong';
      else if (auraLevel >= 6) strength = 'moderate';

      const school = target.getMeta('magicSchool') || 'universal';
      const hasMagic = target.effects.some(e => e.config.isMagical) || target.getMeta('isMagicItem');

      if (hasMagic) {
        if (spellDef.emotes.auraDetected) {
            spellDef.emotes.auraDetected(this.target, target, school, strength);
        }
      } else {
        if (spellDef.emotes.noAura) {
            spellDef.emotes.noAura(this.target, target);
        }
      }
      
      return description;
    },

    effectDeactivated() {
      const player = this.target;
      player.say("<yellow>The blue fire in your vision flickers and dies. The world returns to its mundane, heavy state.</yellow>");
      player.room.broadcastExcept(player, `<yellow>The blue glow in ${player.name}'s eyes fades away.</yellow>`);
    }
  }
};
