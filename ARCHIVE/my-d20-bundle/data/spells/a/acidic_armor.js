/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Acidic Armor
 * Source: Tome of Alchemy | 3.5 Conversion
 */
const { ACID } = require('../../lib/combat/damage-types');

module.exports = {
  id: 'acidic_armor',
  name: 'Acidic Armor',
  level: 1,
  school: 'abjuration',
  subschool: null,
  descriptors: [ACID],
  source: 'Tome of Alchemy',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 1
   * - Druid: 1
   * - Arcane Artificer: 1
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { id: 'flask_of_acid', quantity: 1, consumed: true }
  ],

  range: 'personal',
  target: 'self',
  duration: '1 min./level',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, target, ctx) {
    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    caster.say("<green>You douse your gear in acid, which binds to the surface in a glowing green lattice.</green>");
    caster.room.emitExcept(caster, `<green>${caster.name}'s equipment begins to smoke and glow with a sickly green radiance.</green>`);

    const armorEffect = state.EffectFactory.create('acidic_armor_active', {
      duration: cl * 60000,
      state: { casterLevel: cl }
    });
    
    caster.addEffect(armorEffect);
  }
};
