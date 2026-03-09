/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Reverse Animal Growth
 * Source: WotC | Chronomancer (2E) p.24 | 3.5 Conversion
 * 
 * Logic:
 * - Target: One creature of animal intelligence (Int 1-2).
 * - Reversal: Reduces age by 1 month per CL (Min. 1 month old).
 * - System Shock: Target must pass a Fortitude save or die within 1d4 rounds.
 * - Transition: De-aging occurs at half speed (one month every two turns).
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'reverse_animal_growth',
  name: 'Reverse Animal Growth',
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
      notes: 'Fur, feather, or scale from the species. Not required if touched.' 
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'medium',
  target: 'one creature of animal intelligence',
  duration: 'instantaneous',
  savingThrow: 'fortitude negates',
  spellResistance: true,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const targetInt = target.getAttribute('intelligence') || 10;
    if (targetInt > 2) {
      return B.sayAt(caster, "<yellow>The threads of time only yield to this spell when woven into animal instinct.</yellow>");
    }

    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    // Narrative: Caster & Room
    B.sayAt(caster, `<bold><cyan>You chant the reverse-cadence of growth, drawing the vital years back out of ${target.name}.</cyan></bold>`);
    B.sayAtExcept(caster.room, `<cyan>${caster.name} begins a slow, backwards chant. ${target.name} starts to shrink and soften, its features becoming youthful.</cyan>`, [caster, target]);

    // SYSTEM SHOCK (Fortitude Save)
    const targetHD = target.getMeta('hitDice') || 1;
    const systemShockDC = 15 + targetHD;
    const savePassed = state.SpellcastingManager._savingThrow(state, target, 'fortitude', systemShockDC);

    if (!savePassed) {
      B.sayAt(target, "<bold><red>Your biology recoils from the violent reversal of time!</red></bold>");
      const deathEffect = state.EffectFactory.create('chronal_collapse', {
        duration: state.Dice.roll('1d4') * 6000
      });
      target.addEffect(deathEffect);
      return;
    }

    // APPLY AGING TRANSITION (Double duration for reversal per 2E text)
    const agingEffect = state.EffectFactory.create('aging_transition', {
      duration: 120000, // 2 minutes for de-aging
      state: { 
        months: cl * -1,
        isReversal: true 
      }
    });
    target.addEffect(agingEffect);

    target.say("<cyan>A strange, cool sensation washes over you as your muscles lose their mass and your coat softens.</cyan>");
  }
};
