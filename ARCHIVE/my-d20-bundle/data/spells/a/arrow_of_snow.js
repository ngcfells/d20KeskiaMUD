/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * All spells in my-d20-bundle must follow this structure.
 */

module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'arrow_of_snow',
  name: 'Arrow of Snow',
  level: 2,                       // Sorcerer/Wizard 2, Druid 2, Ranger 2
  school: 'transmutation',
  subschool: null,
  descriptors: ['cold'],

  //
  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  //
  castingTime: 'standard',
  components: ['V', 'S', 'M'],

  materialComponents: [
    {
      id: 'arrow_or_bolt',
      quantity: 1,
      consumed: true,
      notes: 'A wooden arrow or crossbow bolt.'
    },
    {
      id: 'snow_or_ice',
      quantity: 1,
      consumed: true,
      notes: 'A pinch of snow or a chip of ice.'
    }
  ],

  //
  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  //
  range: 'touch',
  target: 'one wooden arrow or bolt touched',
  area: null,
  duration: '1 round/level',      // or until discharged
  savingThrow: 'fortitude',       // Fortitude partial (see text)
  spellResistance: true,          // Yes

  //
  // ─────────────────────────────────────────────────────────────
  //  ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  //
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  //
  // ─────────────────────────────────────────────────────────────
  //  SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  //
  onCast(state, caster, target, ctx) {
    /**
     * Logic (Spell Compendium pg. 16):
     * 1. Target projectile transforms into ice.
     * 2. It deals normal damage, but the damage is converted to Cold.
     * 3. It deals +2d6 extra Cold damage.
     * 4. Target must make a Fortitude save or be Blinded for 1 round.
     */
    const effect = {
      id: 'arrow_of_snow_active',
      source: 'arrow_of_snow',
      bonusDamage: '2d6',
      saveDC: ctx.saveDC
    };

    target.addEffect(effect);

    // Hook: Resolve the cold and blindness upon impact
    target.addHook('onProjectileHit', (impactData) => {
      const victim = impactData.target;
      
      // Convert base weapon damage to cold
      impactData.damageType = 'cold';
      
      // Add bonus cold damage
      const extraCold = state.dice.roll(effect.bonusDamage).total;
      victim.applyDamage(extraCold, 'cold', { source: caster.id });

      // Blindness Check
      if (victim.checkSpellResistance(caster, this.id)) {
        const saveResult = victim.rollSave('fortitude', effect.saveDC);
        if (!saveResult.success) {
          victim.addStatus('blinded', { duration: '1 round' });
          state.visuals.spawnEffect('ice_burst_eyes', victim.position);
        }
      }

      // Projectile melts/shatters after one use
      target.destroy();
      caster.removeEffect(effect.id);
    });
  },

  onTick(state, caster, effect) {
    // If not fired within the duration, the arrow melts
  },

  onEnd(state, caster, effect) {
    const arrow = state.getEntity(effect.targetId);
    if (arrow) arrow.removeHook('onProjectileHit');
  }
};
