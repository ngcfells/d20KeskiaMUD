/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Reduces the physical dimensions of a willing animal by one size category.
 * Useful for bringing Large or Huge companions into cramped subterranean 
 * environments. The change significantly alters the creature's combat 
 * profile, trading raw power and toughness for nimbleness.
 */
module.exports = {
  id: 'animal_reduction',
  name: 'Animal Reduction',
  level: 2,
  school: 'transmutation',
  subschool: null,
  descriptors: [], 
  source: 'WotC | 3.5e Standard (Animal Companion utility)',

  /**
   * SPELL LISTS:
   * - Druid: 2
   * - Ranger: 3
   * - Animal Domain: 2
   */

  castingTime: 'standard',
  components: ['V', 'S'],
  
  materialComponents: [],

  range: 'touch',
  target: 'one willing animal (Small to Huge)',
  area: null,
  duration: '1 hour/level', 
  savingThrow: 'will negates (harmless)',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    if (!target.hasTag('animal')) {
      return caster.say("This magic only resonates with the simple spirits of the animal kingdom.");
    }

    const currentSize = target.getMeta('size') || 'M';
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 3600000; // 1 hour per level

    // Determine specific modifiers based on transition
    let modifiers = {};
    let newSize = '';

    switch (currentSize) {
      case 'Huge':
        newSize = 'Large';
        modifiers = { strength: -8, constitution: -4, naturalArmor: -3, dexterity: 2 };
        break;
      case 'Large':
        newSize = 'Medium';
        modifiers = { strength: -8, constitution: -4, naturalArmor: -2, dexterity: 2 };
        break;
      case 'Medium':
        newSize = 'Small';
        modifiers = { strength: -4, constitution: -2, dexterity: 2 };
        break;
      case 'Small':
        newSize = 'Tiny';
        modifiers = { strength: -4, dexterity: 2 };
        break;
      default:
        return caster.say("The animal is already too small or too large for this specific transmutation.");
    }

    const reductionEffect = state.EffectFactory.create('animal_reduction_effect', {
      duration: duration,
      state: { 
        originalSize: currentSize,
        newSize: newSize,
        mods: modifiers
      }
    });

    if (target.addEffect(reductionEffect)) {
      caster.say(`<green>You chant softly and touch ${target.name}. Their frame begins to compress, bones shifting and fur bunching as they shrink into a smaller form.</green>`);
      target.say(`<cyan>Your perspective of the world shifts upward as you grow smaller. You feel less powerful, but your limbs move with sudden, light speed.</cyan>`);
      caster.room.broadcastExcept(caster, `<green>${caster.name} touches ${target.name}, who visibly shrinks before your eyes into a ${newSize} version of themselves.</green>`, target);
    }
  }
};
