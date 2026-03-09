'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Forces an incorporeal creature to become substantial.
 * Targets inside objects are shunted to the nearest open space, taking 1d6 damage per 5ft.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'force_corporealness',
  name: 'Force Corporealness',
  level: 2,
  school: 'abjuration',
  subschool: null,
  descriptors: [],
  source: 'Dread Codex | OGL',

  /**
   * SPELL LISTS:
   * - Cleric: 2
   * - Paladin: 2
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  // Standard Casting for Close Range: 25ft + 5ft/2 levels
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'close',
  target: 'one creature',
  area: null,
  duration: '1 round/level',
  savingThrow: 'will-negates',
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    // 1. Save Check
    const saveResult = target.rollSave('will', ctx.saveDC);
    if (saveResult.success) {
      return caster.say(`<white>${target.name} flickers but remains translucent, resisting your command of form.</white>`);
    }

    caster.say(`<cyan>You present your holy symbol and command the ethereal to yield! ${target.name} suddenly gains weight and texture.</cyan>`);

    // 2. Phasing/Shunt Logic: If the creature is inside an object/wall (checked via metadata)
    if (target.getMeta('isPhased')) {
      const distToOpen = target.getMeta('depthInObject') || 5; 
      const diceCount = Math.ceil(distToOpen / 5);
      const shuntDamage = state.Dice.roll(`${diceCount}d6`).total;
      
      target.applyDamage(shuntDamage, 'force', { source: caster.id });
      target.say("<red>The sudden transition to flesh while inside matter tears at your essence!</red>");
      target.setMeta('isPhased', false); // Force them out of the 'wall'
    }

    // 3. Apply the Substantial Condition
    const effect = state.EffectFactory.create('force_corporealness_active', target, {
      duration: (1 * 6000) * caster.level // 1 round per level
    });

    target.addEffect(effect);
  }
};
