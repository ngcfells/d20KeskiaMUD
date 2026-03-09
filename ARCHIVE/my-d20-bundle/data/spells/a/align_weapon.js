/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Align Weapon
 * Source: WotC | Player's Handbook p.197
 * 
 * Aligns a weapon to a specific moral or ethical axis. This allows the 
 * wielder to bypass the specialized damage reduction of outsiders and 
 * aligned entities.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'align_weapon',
  name: 'Align Weapon',
  level: 2,
  school: 'transmutation',
  subschool: null,
  descriptors: ['good', 'evil', 'lawful', 'chaotic'], 
  source: 'WotC | Player\'s Handbook p.197',

  /**
   * SPELL LISTS:
   * - Cleric: 2
   * - Paladin: 2
   */

  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  materialComponents: [],

  range: 'touch',
  target: 'one weapon or 50 projectiles',
  area: null,
  duration: '1 min./level', 
  savingThrow: 'will negates (harmless, object)',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    // 1. Target Validation
    if (!target.hasTag('weapon') && !target.hasTag('ammunition')) {
      return caster.say("This magic only binds to instruments of war.");
    }

    const cl = caster.getMeta('level') || 1;
    const duration = cl * 60000;

    // 2. Alignment Choice via arguments
    const choice = (ctx.args || 'good').toLowerCase();
    const valid = ['good', 'evil', 'lawful', 'chaotic'];
    
    if (!valid.includes(choice)) {
      return caster.say("Usage: cast 'align weapon' <good|evil|lawful|chaotic> <item>");
    }

    // Alignment restriction check (Neutral casters can choose any)
    const casterAlign = caster.getAttribute('alignment') || 0;
    if ((choice === 'evil' && casterAlign > 25) || (choice === 'good' && casterAlign < -25)) {
      return caster.say("<red>Your soul recoils from manifesting an essence so foreign to your nature.</red>");
    }

    const alignEffect = state.EffectFactory.create('align_weapon_active', {
      duration: duration,
      state: { alignment: choice, casterId: caster.id }
    });

    if (target.addEffect(alignEffect)) {
      const colors = { good: 'white', evil: 'magenta', lawful: 'blue', chaotic: 'yellow' };
      const color = colors[choice];
      
      // Perspective: Caster
      caster.say(`<${color}>You touch ${target.name}, imbuing it with the cold, absolute essence of ${choice.toUpperCase()}.</${color}>`);
      
      // Perspective: Wielder (if different)
      const wielder = target.equippedBy || target.carriedBy;
      if (wielder && wielder !== caster) {
        wielder.say(`<bold><${color}>Your ${target.name} shimmers with ${choice} energy!</${color}></bold>`);
      }

      // Perspective: Room
      caster.room.broadcastExcept(caster, `<${color}>${caster.name} touches ${target.name}, which begins to hum with a pulsing ${color} resonance.</${color}>`, wielder);
    }
  }
};
