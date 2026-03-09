/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Temporarily ignores the effects of fatigue, hunger, and thirst.
 * Source: AD&D 2E Tome of Magic | 3.5 Conversion
 */
module.exports = {
  id: 'able_bodied',
  name: 'Able-bodied',
  level: 2,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'AD&D 2E Tome of Magic',

  /**
   * SPELL LISTS:
   * - Druid: 2
   * - Ranger: 2
   * - Paladin: 2
   */

  castingTime: '1 minute',
  components: ['V', 'S', 'M'],
  materialComponents: [
    { id: 'dried_meat', quantity: 1, consumed: true, notes: 'A small piece of dried meat or hardtack.' }
  ],

  range: 'touch',
  target: 'creature touched',
  duration: '24 hours',
  savingThrow: 'will negates (harmless)',
  spellResistance: true,

  onCast(state, caster, target, ctx) {
    caster.say(`<cyan>You press a piece of rations to ${target.name}'s forehead, chanting a prayer of endurance.</cyan>`);
    
    const ableEffect = state.EffectFactory.create('able_bodied_buff', {
      duration: 86400000 // 24 hours
    });
    
    target.addEffect(ableEffect);
    target.say("<white>A surge of unnatural vitality fills you. The gnawing of hunger and the weight of exhaustion vanish.</white>");
  }
};
