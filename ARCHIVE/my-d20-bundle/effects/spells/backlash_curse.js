'use strict';

/**
 * Effect: Backlash (Magical Feedback)
 * Implementation of the volatile aura that punishes spellcasting.
 * Reusable for any effect that triggers damage based on spell level cast.
 */
module.exports = {
  config: {
    name: "Backlash",
    description: "Your magical aura is unstable; casting will cause painful feedback.",
    type: "curse",
    family: "feedback",
    tier: 1,
    maxTier: 1,
  },
  state: {
    casterId: null,
    dischargeOnCast: true
  },
  listeners: {
    effectActivated() {
      this.target.say("<red>A jagged, static-like energy crawls across your skin, smelling of ozone and burnt copper.</red>");
    },
    effectDeactivated() {
      this.target.say("<cyan>The volatile pressure in your magical aura dissipates.</cyan>");
    },
    /**
     * Intercepts the spellcasting event.
     * @param {Object} castCtx Contains the spell object and metadata.
     */
    onBeforeSpellCast(castCtx) {
      const target = this.target;
      const spell = castCtx.spell;
      const spellLevel = spell.level || 0;
      
      // If 0-level spells/cantrips don't trigger damage, add check here.
      if (spellLevel === 0) return;

      // 1d6 damage per level of the spell being attempted
      let totalDamage = 0;
      for (let i = 0; i < spellLevel; i++) {
        totalDamage += Math.floor(Math.random() * 6) + 1;
      }

      // Narrative: The feedback occurs as they gather power
      target.say(`<bold><red>As you weave the strands of ${spell.name}, the mana turns jagged and bites back!</red></bold>`);
      target.room.broadcastExcept(target, `<magenta>Arcane sparks leap from ${target.name}'s hands, searing them as they attempt to cast!</magenta>`);

      // Apply damage (Force or Untyped/Magical is most appropriate for feedback)
      target.emit('damage', {
        amount: totalDamage,
        type: 'force', 
        attacker: this.state.caster,
        source: this,
        metadata: { feedback: true }
      });

      // Per Spell Compendium: The effect is discharged after the next spell cast
      if (this.state.dischargeOnCast) {
        this.remove();
      }
    }
  }
};
