/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Alarm
 * Source: WotC | Player's Handbook p.197
 * 
 * Sets a ward over a single area (room). The caster chooses between 
 * a mental ping or a loud audible ringing. It ignores ethereal 
 * creatures but detects invisible ones, alerting the caster to 
 * any non-whitelisted intruders.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'alarm',
  name: 'Alarm',
  level: 1,
  school: 'abjuration',
  subschool: null,
  descriptors: [], 
  source: 'WotC | Player\'s Handbook p.197',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 1
   * - Bard: 1
   * - Ranger: 1
   */

  castingTime: 'standard',
  components: ['V', 'S', 'F'],
  
  focusComponents: [
    { 
      id: 'silver_bell', 
      quantity: 1, 
      notes: 'A tiny silver bell and a piece of very fine silver wire.' 
    }
  ],

  range: 'close', 
  target: 'area',
  area: 'one MUD room (20-ft. radius)',
  duration: '2 hours/level', 
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = (cl * 2) * 3600000; // 2 hours per level

    // Usage: 'cast alarm audible' or 'cast alarm mental' (default)
    const mode = (ctx.args && ctx.args.toLowerCase() === 'audible') ? 'audible' : 'mental';

    const alarmEffect = state.EffectFactory.create('alarm_ward_effect', {
      duration: duration,
      state: { 
        casterId: caster.id,
        mode: mode,
        whitelist: [caster.id, ...caster.getPartyMemberIds()]
      }
    });

    // Apply the effect to the room itself
    if (caster.room.addEffect(alarmEffect)) {
      caster.say(`<yellow>You string the silver wire and chime the bell. A ward of ${mode} alertness now guards this space.</yellow>`);
      caster.room.broadcastExcept(caster, `<grey>${caster.name} carefully strings a nearly invisible silver wire across the entrances of the room.</grey>`);
    }
  }
};
