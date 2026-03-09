/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Align Fang
 * Source: WotC | Spell Compendium p.9
 * 
 * Aligns the natural weapons of a creature (claws, fangs, etc.) to 
 * a specific moral or ethical axis. This allows the subject to 
 * bypass the specialized damage reduction of outsiders and 
 * aligned entities.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'align_fang',
  name: 'Align Fang',
  level: 2,
  school: 'transmutation',
  subschool: null,
  descriptors: ['good', 'evil', 'lawful', 'chaotic'], 
  source: 'WotC | Spell Compendium p.9',

  /**
   * SPELL LISTS:
   * - Druid: 2
   * - Ranger: 2
   */

  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  materialComponents: [],

  range: 'touch',
  target: 'one living creature',
  area: null,
  duration: '1 min./level', 
  savingThrow: 'will negates (harmless)',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 60000;

    // Logic: Choice via 'cast align_fang <alignment>'
    const choice = (ctx.args && ctx.args[0] || 'good').toLowerCase();
    const valid = ['good', 'evil', 'lawful', 'chaotic'];
    
    if (!valid.includes(choice)) {
      return caster.say("You must manifest: good, evil, lawful, or chaotic.");
    }

    // Alignment restriction check
    const casterAlign = caster.getAttribute('alignment') || 0;
    if ((choice === 'evil' && casterAlign > 25) || (choice === 'good' && casterAlign < -25)) {
      return caster.say("<red>Your soul rebels against manifesting an essence so foreign to your nature.</red>");
    }

    const fangEffect = state.EffectFactory.create('align_fang_active', {
      duration: duration,
      state: { alignment: choice }
    });

    if (target.addEffect(fangEffect)) {
      const color = { good: 'white', evil: 'magenta', lawful: 'blue', chaotic: 'yellow' }[choice];
      
      // Perspective: Target
      target.say(`<bold><${color}>Your claws and fangs shimmer with ${choice} energy, humming with the power to rend the unaligned!</${color}></bold>`);
      
      // Perspective: Room
      caster.room.broadcastExcept(caster, `<${color}>${caster.name} touches ${target.name}, whose natural weapons take on a faint, pulsing ${color} glow.</${color}>`, target);
    }
  }
};
