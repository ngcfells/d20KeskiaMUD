'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Deals 3 permanent Wisdom damage per 4 caster levels (Will negates).
 * Damage becomes incurable if not healed within 24 hours.
 */
module.exports = {
  id: 'instill_foolishness',
  name: 'Instill Foolishness',
  level: 6,
  school: 'necromancy',
  subschool: null,
  descriptors: [],
  source: 'Dread Codex | OGL',

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { id: 'skull_bone_fragment', quantity: 1, consumed: true },
    { id: 'live_maggot', quantity: 1, consumed: true }
  ],

  range: 'touch',
  target: 'one creature touched',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'will-negates',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  onCast(state, caster, target, ctx) {
    // 1. Touch Attack Check
    const hitCheck = caster.rollAttack('melee_touch', target);
    if (!hitCheck.success) {
      return caster.say("<yellow>Your hand sweeps through empty air; the curse fails to take root.</yellow>");
    }

    // 2. Saving Throw
    const saveResult = target.rollSave('will', ctx.saveDC);
    if (saveResult.success) {
      return caster.say(`<white>${target.name} recoils, their mind shielding itself from the rot.</white>`);
    }

    // 3. Wisdom Damage Calculation: 3 per 4 levels
    const damageAmount = Math.floor(caster.level / 4) * 3;
    if (damageAmount <= 0) return;

    caster.say(`<magenta>You press the writhing maggot against ${target.name}'s temple. Their eyes glaze over with a sudden, vacant stare.</magenta>`);

    // Apply permanent attribute damage
    target.addModifier({ 
      stat: 'wisdom', 
      value: -damageAmount, 
      type: 'permanent_damage',
      sourceId: this.id 
    });

    // 4. Timer logic for "Incurable" status (24 hours)
    const incurableEffect = state.EffectFactory.create('foolishness_decay_timer', target, {
      duration: 86400000, // 24 hours
      state: { damageAmount, sourceId: this.id }
    });
    target.addEffect(incurableEffect);
  }
};
