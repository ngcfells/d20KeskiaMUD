/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Forces a non-corporeal or gaseous undead creature into a physical, 
 * tangible state. This severs their planar displacement, making them 
 * vulnerable to mundane weaponry and stripping them of supernatural 
 * drainage abilities.
 */
module.exports = {
  id: 'corporeality',
  name: 'Corporeality',
  level: 4,
  school: 'abjuration',
  subschool: null,
  descriptors: ['force'], 
  source: '& Magazine | Issue 2 | p.62',

  /**
   * SPELL LISTS:
   * - Cleric: 4
   * - Paladin: 4
   * - Exorcism Domain: 4
   */

  castingTime: 'standard',
  components: ['V', 'S', 'DF'], // DF = Divine Focus (Holy Symbol)
  
  materialComponents: [], // Uses Divine Focus instead

  range: 'close', // Converted from 4"
  target: 'one undead creature',
  area: null,
  duration: '1 round/level', 
  savingThrow: 'will negates', // Standard 3.5e save for this type of effect
  spellResistance: true,

  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    if (!target.hasTag('undead')) {
      return caster.say("This spell only affects the restless dead.");
    }

    // Custom DC scaling: -1 penalty to target save per 4 levels 
    // Translated to: +1 to Spell DC per 4 levels of caster
    const cl = caster.getMeta('level') || 1;
    const bonusDC = Math.floor(cl / 4);
    
    // In your engine, dc is calculated in spellcasting.js; 
    // we assume the engine handles the base, we just check success here.
    if (ctx.savePassed) {
      caster.say(`<yellow>The light from your symbol washes over ${target.name}, but they flicker and remain ethereal.</yellow>`);
      return;
    }

    const duration = cl * 6000; // 1 round (6s) per level in ms
    const corpEffect = state.EffectFactory.create('corporeality_effect', {
      duration: duration
    });

    if (target.addEffect(corpEffect)) {
      // Perspective: Caster
      caster.say(`<cyan>You thrust your holy symbol forward! A tether of pure force latches onto ${target.name}, dragging their translucent form into the physical world with a sickening thud.</cyan>`);
      
      // Perspective: Target
      target.say("<red>The world suddenly feels heavy and cold. Your ethereal essence hardens into wretched, vulnerable matter!</red>");

      // Perspective: Room
      caster.room.broadcastExcept(caster, `<cyan>${caster.name} brandishes a holy symbol, emitting a hum of divine power that solidifies the ghostly form of ${target.name}.</cyan>`, target);
    }
  }
};
