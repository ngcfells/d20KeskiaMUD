/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Cloak of Light
 * Author: Andrew Hamilton
 * Source: & Magazine Issue 2, p.62
 * 
 * Logic:
 * - Defense: Grants a +2 Save vs Death (Fortitude) against Energy Drain.
 * - Turning: +2 bonus to Turning checks.
 * - Light: Illuminates 40ft (4") and suppresses magical darkness in 15ft.
 * - Combat: +1 to hit/dmg vs Undead; Undead take -1 hit/dmg/init in melee.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'cloak_of_light',
  name: 'Cloak of Light',
  level: 4,
  school: 'conjuration', // Clerical Conjuring of Holy Light
  subschool: 'summoning',
  descriptors: ['light', 'holy', 'abjuration'],
  source: '& Magazine Issue 2, p.62',

  /**
   * SPELL LISTS:
   * - Cleric: 4
   * - Paladin: 4
   * - Sun Domain: 4
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: '6 segments',
  components: ['V', 'S', 'DF'],
  materialComponents: [],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one person',
  duration: '1 round / level',
  savingThrow: 'none',
  spellResistance: false,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    B.sayAt(caster, `<bold><white>You call upon the heavens, and a mantle of brilliant, pulsating white light drapes itself over ${target === caster ? 'your' : target.name + "'s"} shoulders.</white></bold>`);
    B.sayAtExcept(caster.room, `<white>A blindingly bright cloak of pure radiance forms around ${target.name}, pushing back the shadows of the room.</white>`, [caster, target]);

    const cloakEffect = state.EffectFactory.create('cloak_of_light_active', {
      duration: cl * 6000,
      state: { casterUuid: caster.uuid }
    });

    target.addEffect(cloakEffect);
  }
};
