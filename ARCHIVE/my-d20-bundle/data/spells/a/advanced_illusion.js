/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Creates a complex, scripted illusion with visual, auditory, olfactory,
 * and thermal components. Unlike lesser figments, this "advanced"
 * program follows a predetermined script and does not require
 * active concentration once set in motion.
 */
module.exports = {
  id: 'advanced_illusion',
  name: 'Advanced Illusion',
  level: 5,
  school: 'illusion',
  subschool: 'figment',
  descriptors: [],
  source: 'PHB 2E (Modified for 3.5e) | Persistent Image Equivalent',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 5
   * - Bard: 5
   * - Trickery Domain: 5
   */

  castingTime: 'standard', // Converted from 1 round to 3.5e standard
  components: ['V', 'S', 'M'],

  materialComponents: [
    { id: 'bit_of_fleece', quantity: 1, consumed: true },
    { id: 'grains_of_sand', quantity: 3, consumed: true }
  ],

  range: 'long', // 400 ft. + 40 ft./level
  target: 'figment that cannot extend beyond area',
  area: 'one 10-ft. cube + one 10-ft. cube/level (S)',
  duration: '1 min./level',
  savingThrow: 'will disbelief',
  spellResistance: false,

  requiresConcentration: false, // Key feature: scripted automation
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 60000;

    const illusionEffect = state.EffectFactory.create('advanced_illusion_effect', {
      duration: duration,
      state: {
        casterLevel: cl,
        dc: 15 + D20Utils.getModifier(caster.getAttribute('intelligence'))
      }
    });

    // The "Program" is defined here and applied to the room
    caster.room.addEffect(illusionEffect);

    caster.say("<magenta>You weave a complex tapestry of light, sound, and scent, binding the program into the very air.</magenta>");
    caster.room.broadcastExcept(caster, `<magenta>${caster.name} gestures rhythmically, and the environment begins to warp as a scripted reality takes hold.</magenta>`);
  }
};
