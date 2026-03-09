/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * REVERSE: A horrific offensive spell that turns the subject's own
 * life-fluid into water. This causes massive internal trauma and 
 * profound physical weakness.
 */
module.exports = {
  id: 'transmute_blood_to_water',
  name: 'Transmute Blood to Water',
  level: 5,
  school: 'transmutation',
  subschool: null,
  descriptors: ['water', 'death'], 
  source: '& Magazine | Issue 2 | p.63',

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { id: 'drop_of_water', quantity: 1, consumed: true }
  ],

  range: 'touch', 
  target: 'one living creature with red blood',
  area: null,
  duration: 'instantaneous', 
  savingThrow: 'none',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    // 1. Perform Melee Touch Attack
    // (Assuming engine handles touch vs. standard AC)
    const touchHit = true; // Placeholder for attack roll result

    if (!touchHit) {
      return caster.say("Your hand misses the target, the magic dissipating harmlessly.");
    }

    const cl = caster.getMeta('level') || 1;
    const size = target.getMeta('size') || 'M';
    let dieCount = cl;
    let flatBonus = 0;

    // Scale damage by size
    if (size === 'S') flatBonus = 3 * cl;
    else if (size === 'M') flatBonus = 2 * cl;
    else flatBonus = 1 * cl;

    const damage = (Math.floor(Math.random() * 8) + 1) * dieCount + flatBonus;
    
    // Apply Damage (Direct to Health)
    target.setAttribute('health', target.getAttribute('health') - damage);

    // Perspective: Target
    target.say("<blue>As ${caster.name} touches you, a freezing wave of nausea washes through your veins. You feel your very life-force thinning, turning into nothing but cold water.</blue>");
    
    // Check for Weakness (Half HP threshold)
    if (damage > (target.getMaxAttribute('health') / 2)) {
      const weakness = state.EffectFactory.create('blood_thinning_weakness', { duration: 3600000 });
      target.addEffect(weakness);
    }
  }
};
