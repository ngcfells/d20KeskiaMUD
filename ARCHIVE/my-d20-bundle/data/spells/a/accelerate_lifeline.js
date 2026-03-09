/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Accelerate Lifeline
 * Source: WotC | Chronomancer (2E) p.25 | 3.5 Conversion
 * 
 * Logic:
 * - Target: Intelligence 2 or greater (Humanoids, Monsters, etc.).
 * - Aging: Ages the target by 1 year per CL.
 * - System Shock: Target must pass a Fortitude save (DC 15 + HD) or die.
 * - Transition: During aging, target is 'Staggered' and acts at half-ability.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'accelerate_lifeline',
  name: 'Accelerate Lifeline',
  level: 8,
  school: 'transmutation',
  subschool: 'chronomancy',
  descriptors: ['aging', 'time', 'death'],
  source: 'Chronomancer (2E) p.25',

  /**
   * SPELL LISTS:
   * - Chronomancer: 8
   * - Time Domain: 8
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: '1 round',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'polished_amber', 
      quantity: 1, 
      consumed: true,
      notes: 'A small piece of polished amber.' 
    },
    {
      id: 'tether_beast_ichor',
      quantity: 1, // 1 ounce
      consumed: true,
      notes: 'The viscous ichor of a planar tether beast.'
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one creature of Intelligence 2+',
  duration: 'instantaneous',
  savingThrow: 'fortitude negates',
  spellResistance: true,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const targetInt = target.getAttribute('intelligence') || 0;
    if (targetInt < 2) {
      return B.sayAt(caster, "<yellow>This spell requires a complex mind to anchor the chronal lifeline.</yellow>");
    }

    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    B.sayAt(caster, `<bold><magenta>You touch ${target.name}, and the amber in your hand glows with a blinding, sun-like intensity as you force their lifeline to unravel!</magenta></bold>`);
    B.sayAtExcept(caster.room, `<magenta>${caster.name} touches ${target.name}. A golden haze surrounds them as the years begin to visibly peel away from the target's future.</magenta>`, [caster, target]);

    // SYSTEM SHOCK: DC 15 + Target Hit Dice (3.5e Translation)
    const targetHD = target.getMeta('hitDice') || 1;
    const systemShockDC = 15 + targetHD;
    const savePassed = state.SpellcastingManager._savingThrow(state, target, 'fortitude', systemShockDC);

    if (!savePassed) {
      B.sayAt(target, "<bold><red>Your biology screams in agony as decades of wear hit your heart in a single pulse!</red></bold>");
      const deathEffect = state.EffectFactory.create('chronal_collapse', {
        duration: state.Dice.roll('1d4') * 6000
      });
      target.addEffect(deathEffect);
      return;
    }

    // APPLY AGING TRANSITION (Debuff)
    const transitionEffect = state.EffectFactory.create('aging_transition', {
      duration: 60000 * 2, // 2 minutes (Scaling with 2E 'Turns')
      state: { years: cl }
    });
    target.addEffect(transitionEffect);

    target.say("<red>Your skin wrinkles and your joints stiffen as your body is forced through a lifetime of labor in seconds.</red>");
  }
};
