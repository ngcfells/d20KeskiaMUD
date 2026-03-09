/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Accelerate/Reverse Animal Growth
 * Source: WotC | Chronomancer (2E) p.24 | 3.5 Conversion
 * 
 * Logic:
 * - Target: One creature of animal intelligence (Int 1-2).
 * - Aging: Ages or de-ages the target by 1 month per CL.
 * - System Shock: Target must pass a Fortitude save or die within 1d4 rounds.
 * - Transition: During the process, the animal is 'Staggered' and penalized.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'accelerate_animal_growth',
  name: 'Accelerate Animal Growth',
  level: 5,
  school: 'transmutation',
  subschool: 'chronomancy',
  descriptors: ['aging', 'time'],
  source: 'Chronomancer (2E) p.24',

  /**
   * SPELL LISTS:
   * - Chronomancer: 5
   * - Druid: 6
   * - Time Domain: 5
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: '2 rounds',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'animal_biomatter', 
      quantity: 1, 
      consumed: true,
      notes: 'Fur, feather, or scale from the species being affected. Not required if touched.' 
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'medium', // 100 ft. + 10 ft./level
  target: 'one creature of animal intelligence',
  duration: 'instantaneous',
  savingThrow: 'fortitude negates',
  spellResistance: true,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    // 1. ANIMAL INTELLIGENCE CHECK (d20 standard: Int 1 or 2)
    const targetInt = target.getAttribute('intelligence') || 10;
    if (targetInt > 2) {
      return B.sayAt(caster, "<yellow>This chronomancy only functions on creatures of simple animal instinct.</yellow>");
    }

    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const dc = ctx.dc || 20;

    B.sayAt(caster, `<bold><cyan>You begin to warp the temporal flow surrounding ${target.name}, forcing years of growth into a mere moment.</cyan></bold>`);
    B.sayAtExcept(caster.room, `<cyan>${caster.name} chants a rhythmic, ticking incantation as ${target.name} begins to flicker between youth and maturity.</cyan>`, [caster, target]);

    // 2. SYSTEM SHOCK (Fortitude Save)
    // 2E System Shock was roughly 85% + 1% per HD. 
    // In 3.5e, we map this to a DC 15 + HD Fort Save.
    const targetHD = target.getMeta('hitDice') || 1;
    const systemShockDC = 15 + targetHD;
    const savePassed = state.SpellcastingManager._savingThrow(state, target, 'fortitude', systemShockDC);

    if (!savePassed) {
      B.sayAt(target, "<bold><red>Your heart rhythm falters as time ravages your physical form too quickly!</red></bold>");
      
      // Delayed Death (1d4 rounds)
      const deathEffect = state.EffectFactory.create('chronal_collapse', {
        duration: state.Dice.roll('1d4') * 6000
      });
      target.addEffect(deathEffect);
      return;
    }

    // 3. APPLY AGING TRANSITION (Debuff)
    const agingEffect = state.EffectFactory.create('aging_transition', {
      duration: 60000, // 1 minute transition
      state: { months: cl }
    });
    target.addEffect(agingEffect);

    target.say("<yellow>Your body stretches and hardens as months of growth compress into seconds.</yellow>");
  }
};
