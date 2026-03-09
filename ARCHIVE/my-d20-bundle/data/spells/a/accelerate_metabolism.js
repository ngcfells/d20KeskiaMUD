/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Accelerate Metabolism
 * Source: WotC | Chronomancer (2E) p.25 / Dragon Magazine
 * 
 * Logic:
 * - Healing: Target heals 1 HP per minute (MUD turn), plus Con bonuses.
 * - Requirement: Target must consume 1 day's rations/water every minute.
 * - Risk: Starvation/Exhaustion if resources aren't met; ages 1 week per 28 mins.
 * - Anchor: Tied to a 'double_ended_candle' material component.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'accelerate_metabolism',
  name: 'Accelerate Metabolism',
  level: 6,
  school: 'transmutation',
  subschool: 'chronomancy',
  descriptors: ['healing', 'time'],
  source: 'Chronomancer (2E) p.25',

  /**
   * SPELL LISTS:
   * - Chronomancer: 6
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: '6 rounds',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'double_ended_candle', 
      quantity: 1, 
      consumed: true,
      notes: 'A candle lit at both ends; must burn for the duration.' 
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one living creature',
  duration: '1 turn/level + 1d6 turns',
  savingThrow: 'will negates (harmless)',
  spellResistance: true,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const bonusTurns = state.Dice.roll('1d6');
    const totalDurationMs = (cl + bonusTurns) * 60000; // 1 min per 2E Turn

    B.sayAt(caster, `<cyan>You light both ends of a wax taper and touch ${target.name}. Their breath quickens to a frantic pace as their internal clock begins to race.</cyan>`);
    B.sayAt(target, `<bold><white>Your heart hammers against your ribs like a trapped bird. You feel a ravenous, hollow hunger gnawing at your vitals immediately.</white></bold>`);

    const metabolismEffect = state.EffectFactory.create('metabolic_acceleration', {
      duration: totalDurationMs,
      state: {
        casterUuid: caster.uuid,
        candleId: 'double_ended_candle',
        ticksActive: 0
      }
    });

    target.addEffect(metabolismEffect);
  }
};
