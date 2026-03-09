/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Dirge of the Walking Dead
 * Source: Adamant Entertainment | Dread Codex p.101
 * 
 * Through a haunting sea shanty or a rhythmic funeral prayer, the caster 
 * anchors a soul to its body, allowing the subject to fight on past 
 * the point of physical collapse. 
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'dirge_of_the_walking_dead',
  name: 'Dirge of the Walking Dead',
  level: 3,
  school: 'necromancy',
  subschool: null,
  descriptors: ['sonic'], 
  source: 'Adamant Entertainment | Dread Codex p.101',

  /**
   * SPELL LISTS:
   * - Bard: 2 (Sea Shanty/Dirge)
   * - Cleric: 3
   * - Death Domain: 3
   */
  castingTime: 'standard',
  components: ['V'], // Purely vocal/performance based
  materialComponents: [],

  range: 'medium', // 100 ft. + 10 ft./level
  target: 'one living creature',
  area: null,
  duration: 'concentration, up to 1 round/level (D)',
  savingThrow: 'will negates (harmless)',
  spellResistance: true,

  requiresConcentration: true,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 6000; // 1 round (6s) per level

    const dirgeEffect = state.EffectFactory.create('dirge_walking_dead_effect', {
      duration: duration,
      state: { casterId: caster.id }
    });

    if (target.addEffect(dirgeEffect)) {
      // Perspective: Caster
      if (caster.getMeta('class') === 'bard') {
        caster.say("<cyan>You begin a low, vibrating dirge that thrums in the air, knitting the target's spirit to their failing flesh.</cyan>");
      } else {
        caster.say("<cyan>You intone a rhythmic prayer of the grave, commanding the target's soul to ignore the body's cries for rest.</cyan>");
      }
      
      // Perspective: Target
      target.say("<cyan>A haunting melody fills your ears, numbing your pain and keeping your vision clear even as your blood spills.</cyan>");
      
      // Perspective: Room
      caster.room.broadcastExcept(caster, `<cyan>${caster.name} begins a rhythmic, mournful chant that seems to hold the very air still around ${target.name}.</cyan>`, target);
    }
  },

  onTick(state, caster, effect) {
    // If the caster is silenced, stunned, or stops concentrating, the spell fails
    if (caster.hasTag('silenced') || !caster.getMeta('isConcentrating')) {
      caster.say("<red>Your dirge falters!</red>");
      effect.remove();
    }
  }
};
