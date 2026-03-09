/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Draining Mist
 * Source: Adamant Entertainment | Dread Codex p.102
 * 
 * You create a 20-ft. radius mist of pale, swirling vapors. The mist 
 * saps the heat and energy from living bodies, funneling that stolen 
 * life into the caster's chosen focus.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'draining_mist',
  name: 'Draining Mist',
  level: 2,
  school: 'necromancy',
  subschool: null,
  descriptors: ['cold', 'evil'], 
  source: 'Adamant Entertainment | Dread Codex p.102',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 2
   * - Cleric: 2
   * - Death Domain: 2
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'sentient_ash_pinch', 
      quantity: 1, 
      consumed: true, 
      notes: 'Ash from the body of a sentient creature consumed by fire.' 
    }
  ],

  range: 'medium', 
  target: 'area',
  area: '20-ft. radius spread',
  duration: '1 round/level', 
  savingThrow: 'fortitude negates',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 6000;

    const mistEffect = state.EffectFactory.create('draining_mist_aura', {
      duration: duration,
      state: { casterId: caster.id, cl: cl }
    });

    if (caster.room.addEffect(mistEffect)) {
      caster.say("<magenta>You scatter the fine, grey ash of the burned. A pale, freezing mist boils out of the ground, hungrily seeking the warmth of the living.</magenta>");
      caster.room.broadcastExcept(caster, `<magenta>A thick, bone-chilling mist surges into the area, swirling around ${caster.name} as it begins to drain the vitality from the air.</magenta>`);
    }
  }
};
