/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Achnost’s Fiery Hand
 * Source: WotC | Wizard's Spell Compendium Vol 1, p.275
 * 
 * Logic:
 * - Conjures a 1-foot tall flaming hand.
 * - Effect: Touches for 1d3 fire damage + 1/level (max +10).
 * - Utility: Can ignite flammable objects (candles, oil, parchment).
 */
const { FIRE } = require('../../lib/combat/damage-types');
const { Broadcast } = require('ranvier');

module.exports = {
  id: 'achnosts_fiery_hand',
  name: 'Achnost’s Fiery Hand',
  level: 1,
  school: 'evocation',
  subschool: null,
  descriptors: [FIRE],
  source: "Wizard's Spell Compendium Vol 1, p.275",

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 1
   * - Sha'ir: 1
   * - Fire Domain: 1
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { id: 'piece_of_coal', quantity: 1, consumed: true, notes: 'A small piece of coal.' }
  ],

  range: 'touch',
  target: 'creature or object touched',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    const bonus = Math.min(cl, 10);
    const damageRoll = state.Dice.roll('1d3') + bonus;

    Broadcast.sayAt(caster, "<bold><red>You touch a piece of coal to your palm, and a small, flickering hand of fire leaps forth to strike!</red></bold>");
    Broadcast.sayAtExcept(caster.room, `<red>${caster.name} conjures a miniature hand of flame that darts toward ${target.name}.</red>`, [caster, target]);

    state.Damage.apply({
      amount: damageRoll,
      type: FIRE,
      attacker: caster,
      target: target,
      source: this.name
    });

    if (target.isObject) {
       Broadcast.sayAt(caster.room, `<red>${target.name} begins to smolder and catch fire!</red>`);
    }
  }
};
