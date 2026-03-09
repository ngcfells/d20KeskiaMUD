/**
 * Implementation: Accelerate
 * Source: WotC | Spell Compendium p.7
 */
'use strict';

const { Broadcast } = require('ranvier');
module.exports = {
  id: 'accelerate',
  name: 'Accelerate',
  level: 2,
  school: 'transmutation',
  descriptors: [],
  source: 'WotC | Spell Compendium p.7',

  castingTime: 'swift', 
  components: ['V', 'S'],
  materialComponents: [],

  range: 'personal',
  target: 'self',
  area: null,
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getAttribute('intelligence') || 1;
    const durationMs = cl * 6000; // 6 seconds per level

    // Create the unified effect with Speed and Dodge bonuses
    const effect = state.EffectFactory.create('accelerated_state', {
      duration: durationMs,
    }, {
      speedBonus: 30,
      dodgeBonus: 1,
      negatedSkills: []
    });

    // Swift Action: 500ms Global Cooldown
    const swiftGcd = state.EffectFactory.create('global_cooldown', { duration: 500 });
    caster.addEffect(swiftGcd);

    // EMOTES
    Broadcast.sayAt(caster, "<bold><cyan>Time seems to slow down as your limbs begin to move with blurring speed!</cyan></bold>");
    Broadcast.sayAtExcept(caster.room, `<bold><cyan>${caster.name} suddenly begins to vibrate with energy, their movements becoming a rapid blur.</cyan></bold>`, [caster]);

    caster.addEffect(effect);
  },

  onTick(state, caster, effect) {
    if (Math.random() > 0.9) {
      Broadcast.sayAt(caster, "<white>The wind whistles past your ears as you maintain your frantic pace.</white>");
    }
  },

  onEnd(state, caster, effect) {
    Broadcast.sayAt(caster, "<grey>The world speeds back up to its normal, sluggish pace.</grey>");
    Broadcast.sayAtExcept(caster.room, `<grey>${caster.name}'s movements return to normal speed.</grey>`, [caster]);
  }
};
