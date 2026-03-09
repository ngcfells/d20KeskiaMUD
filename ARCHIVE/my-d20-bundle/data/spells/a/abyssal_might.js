/**
 * Implementation: Abyssal Might (The Dark Metamorphosis)
 * Source: WotC | Spell Compendium p.7
 */

'use strict';

const { Broadcast } = require('ranvier');

module.exports = {
  id: 'abyssal_might',
  name: 'Abyssal Might',
  level: 3,
  school: 'conjuration',
  subschool: 'calling',
  descriptors: ['evil'],
  source: 'WotC | Spell Compendium p.7',

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    {
      id: 'demon_ichor',
      quantity: 1,
      consumed: true,
      notes: 'A single drop of distilled demon blood.'
    }
  ],

  range: 'personal',
  target: 'self',
  duration: '10 min/level',
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster) {
    // 1. COMPONENT CHECK (Abstracted to your Spellcasting lib)
    // 2. CALCULATE DURATION
    const cl = caster.getAttribute('intelligence'); // Or logic from Spellcasting.js
    const durationMs = cl * 600000;

    // 3. CREATE EFFECT
    const effect = state.EffectFactory.create('abyssal_might_buff', {
      duration: durationMs,
    });

    // 4. TRANSFORMATIONAL FEEDBACK
    Broadcast.sayAt(caster, "<bold><red>You swallow the ichor. Your muscles bulge and your skin thickens into a leathery hide!</red></bold>");
    Broadcast.sayAtExcept(caster.room, `<bold><red>${caster.name}'s body contorts as their muscles swell unnaturally. Their skin turns a stony grey.</red></bold>`, [caster]);

    caster.addEffect(effect);
  },

  onTick(state, caster, effect) {
    if (Math.random() > 0.95) {
      Broadcast.sayAt(caster, "<magenta>Dark energy pulses beneath your thickened skin.</magenta>");
    }
  },

  onEnd(state, caster, effect) {
    Broadcast.sayAt(caster, "<grey>The demonic power recedes, leaving you sore and mortal once more.</grey>");
    Broadcast.sayAtExcept(caster.room, `<grey>${caster.name}'s monstrous features subside.</grey>`, [caster]);
  }
};
