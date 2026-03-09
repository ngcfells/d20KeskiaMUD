/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * A magical arrow of acid springs from your hand and speeds to its target.
 * Source: PHB p.253
 */
module.exports = {
  id: 'melf_s_acid_arrow',
  name: "Melf's Acid Arrow",
  level: 2,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: [ACID],
  source: 'PHB p.253',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 2
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M', 'F'],
  materialComponents: [
    { id: 'rhubarb_leaf', quantity: 1, consumed: true, notes: 'A powdered leaf of rhubarb.' },
    { id: 'adder_stomach', quantity: 1, consumed: true, notes: 'The dried stomach of an adder.' }
  ],
  focus: { id: 'dart', name: 'A silver dart', consumed: false },

  range: 'long',
  target: 'one creature',
  duration: '1 round + 1 round per 3 levels',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("<bold><green>A shimmering arrow of caustic emerald fluid forms and streaks toward your foe!</green></bold>");
    
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const initialDamage = state.Dice.roll('2d4');
    
    state.Damage.apply({ amount: initialDamage, type: ACID, attacker: caster, target: target, source: this.name });

    // Ongoing damage effect
    const arrowEffect = state.EffectFactory.create('acidic', {
      duration: (1 + Math.floor(cl / 3)) * 6000,
      state: { damagePerTick: '2d4', attacker: caster }
    });
    target.addEffect(arrowEffect);
  }
};
