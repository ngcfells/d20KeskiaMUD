/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * A high-tier Netherese Chronomancy rite. The caster locks their 
 * biological clock to a specific temporal anchor, effectively 
 * halting the aging process and removing existing physical 
 * penalties of old age.
 */
module.exports = {
  id: 'netherese_age_suppression',
  name: "Netherese Age Suppression",
  level: 8,
  school: 'transmutation',
  subschool: null,
  descriptors: ['temporal'],
  source: 'Netheril: Empire of Magic',

  castingTime: '1 hour',
  components: ['V', 'S', 'M', 'XP'],
  xpCost: 500,
  materialComponents: [
    { id: 'quicksilver_vial', quantity: 5, consumed: true }
  ],

  range: 'personal',
  target: 'self',
  duration: 'permanent',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    caster.say("<cyan>You weave the quicksilver into a temporal web, anchoring your cells to a moment of perfection.</cyan>");
    
    // Remove aging effects
    const agingEffect = caster.effects.getByType('double_aging_effect');
    if (agingEffect) agingEffect.remove();

    // Set Eternal Meta
    caster.setMeta('isAgeless', true);
    caster.setMeta('physicalAge', 28); // Liang Chou's chosen physical anchor

    const effect = state.EffectFactory.create('age_suppression_active', {
      config: { duration: -1 }
    });
    caster.addEffect(effect);
  }
};
