/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Continual Wounds
 * Source: Adamant Entertainment | Dread Codex p.97
 * 
 * A supreme necromantic curse that severs the target's connection to 
 * positive energy and natural recovery. For the duration, no magic, 
 * skill, or innate ability can close the target's wounds.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'continual_wounds',
  name: 'Continual Wounds',
  level: 8,
  school: 'necromancy',
  subschool: null,
  descriptors: ['curse', 'evil'], 
  source: 'Adamant Entertainment | Dread Codex p.97',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 8
   * - Druid: 8
   * - Death Domain: 8
   * - Pestilence Domain: 8
   */

  castingTime: 'full-round',
  components: ['V', 'S', 'DF'], // DF = Divine Focus (Unrefined for Druids)
  
  materialComponents: [],

  range: 'medium', // 100 ft. + 10 ft./level
  target: 'one creature',
  area: null,
  duration: '1 day/level', 
  savingThrow: 'will negates',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    // Standard MUD duration: 1 day = 24 hours. 
    // For gameplay, we might scale this to 1 game-day or 24 real hours.
    const duration = cl * 86400000; 

    // Save check via engine context
    if (ctx.savePassed) {
      caster.say(`<yellow>${target.name}’s soul flares with a bright light, repelling your dark threads.</yellow>`);
      return;
    }

    const curseEffect = state.EffectFactory.create('continual_wounds_curse', {
      duration: duration,
      state: { casterId: caster.id }
    });

    if (target.addEffect(curseEffect)) {
      // Perspective: Caster
      caster.say(`<red>You weave a shroud of absolute entropy around ${target.name}. Their life-force is now a vessel that can only leak, never fill.</red>`);
      
      // Perspective: Target
      target.say("<bold><red>A cold, grey numbness settles into your very marrow. You feel your body's ability to knit itself back together wither away.</red></bold>");
      
      // Perspective: Room
      caster.room.broadcastExcept(caster, `<red>${caster.name} points a finger at ${target.name}, and a visible shadow of decay clings to the victim's wounds.</red>`, target);
    }
  }
};
