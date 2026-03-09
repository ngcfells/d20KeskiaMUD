/**
 * Implementation: Accelerated Movement
 * Source: WotC | Spell Compendium p.7
 */
'use strict';

const { Broadcast } = require('ranvier');
module.exports = {
  id: 'accelerated_movement',
  name: 'Accelerated Movement',
  level: 1,
  school: 'transmutation',
  descriptors: [],
  source: 'WotC | Spell Compendium p.7',

  castingTime: 'swift',
  components: ['V', 'S', 'M'],
  materialComponents: [
    {
      id: 'dead_cockroach',
      quantity: 1,
      consumed: true,
      notes: 'A dead cockroach, crushed during the somatic gesture.'
    }
  ],

  range: 'personal',
  target: 'self',
  area: null,
  duration: '1 min/level',
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getAttribute('intelligence') || 1;
    const durationMs = cl * 60000; // 1 minute per level

    // Create the unified effect with Skill Negation
    const effect = state.EffectFactory.create('accelerated_state', {
      duration: durationMs,
    }, {
      speedBonus: 0,
      dodgeBonus: 0,
      negatedSkills: ['balance', 'climb', 'hide', 'move_silently']
    });

    // Swift Action: 500ms Global Cooldown
    const swiftGcd = state.EffectFactory.create('global_cooldown', { duration: 500 });
    caster.addEffect(swiftGcd);

    // EMOTES
    Broadcast.sayAt(caster, "<bold><cyan>You crush the cockroach and feel a sudden, skittering agility take hold of your limbs!</cyan></bold>");
    Broadcast.sayAtExcept(caster.room, `<cyan>${caster.name}'s movements become unnervingly fluid and efficient, like an insect scuttling across a wall.</cyan>`, [caster]);

    caster.addEffect(effect);
  },

  onTick(state, caster, effect) {
    if (Math.random() > 0.95) {
      Broadcast.sayAt(caster, "<white>Your feet find purchase with impossible ease as you maintain your pace.</white>");
    }
  },

  onEnd(state, caster, effect) {
    Broadcast.sayAt(caster, "<grey>Your movements feel sluggish and heavy as the spell's agility fades.</grey>");
    Broadcast.sayAtExcept(caster.room, `<grey>${caster.name} no longer moves with such preternatural grace.</grey>`, [caster]);
  }
};
