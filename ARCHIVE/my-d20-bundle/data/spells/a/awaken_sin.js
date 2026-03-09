'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Forces a creature to relive its past evil acts. 
 * Deals 1d6 damage per level (max 10d6). 
 * Damage is nonlethal unless the target is Evil.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'awaken_sin',
  name: 'Awaken Sin',
  level: 3,
  school: 'necromancy',
  subschool: null,
  descriptors: ['fear', 'mind-affecting', 'evil'],
  source: 'Standard',

  /**
   * SPELL LISTS:
   * - Cleric: 3
   * - Paladin: 2
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'close',
  target: 'one living creature',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'will',
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    // 1. Validation: Living and Sentient (Int 3+)
    if (!target.hasBehavior('living') || (target.getAttribute('intelligence') || 0) < 3) {
      return caster.say("<yellow>The target has no conscience to awaken.</yellow>");
    }

    // 2. Saving Throw
    const saveResult = target.rollSave('will', ctx.saveDC);
    if (saveResult.success) {
      caster.say(`<white>${target.name} remains unmoved by the weight of their past.</white>`);
      target.say("<cyan>A momentary chill passes through your soul, but your resolve holds.</cyan>");
      return;
    }

    // 3. Damage Calculation (1d6 per CL, Max 10d6)
    const diceCount = Math.min(caster.level || 1, 10);
    const damageRoll = state.Dice.roll(`${diceCount}d6`).total;

    // 4. Alignment Check: Lethal vs Nonlethal
    // Checks the 'corruption' attribute or 'alignment' metadata
    const isEvil = target.getMeta('alignment') === 'evil' || (target.getAttribute('corruption') || 0) > 10;
    const damageType = isEvil ? 'psychic' : 'nonlethal';

    target.applyDamage(damageRoll, damageType, { 
      source: caster.id,
      descriptors: ['mind-affecting', 'sin']
    });

    // 5. Secondary Effect: Stunned for 1 round on failed save
    const stunnedEffect = state.EffectFactory.create('stunned', target, {
      duration: 6000 // 1 round
    });
    target.addEffect(stunnedEffect);

    // Emotes
    target.say("<red>Your past transgressions flash before your eyes in an agonizing, visceral loop!</red>");
    caster.room.broadcastExcept([caster, target], `<magenta>${target.name} gasps and recoils, eyes wide with a sudden, localized horror.</magenta>`);
  }
};
