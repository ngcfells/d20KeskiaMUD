'use strict';

const { Broadcast } = require('ranvier');

/**
 * Implementation: Mestil's Acid Sheath
 * Source: WotC | Spell Compendium p.7
 */
module.exports = {
  id: 'mestil_s_acid_sheath',
  name: 'Mestil\'s Acid Sheath',
  level: 5,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: ['acid'],
  source: 'WotC | Spell Compendium p.7',

  castingTime: 'standard',
  components: ['V', 'S', 'M', 'F'],

  materialComponents: [
    {
      id: 'fire_ants',
      quantity: 1,
      consumed: true,
      notes: 'Crushed against the glass focus.'
    }
  ],
  focus: {
    id: 'humanoid_glass_sculpture',
    value: 50,
    notes: 'A glass sculpture of a humanoid worth 50 gp.'
  },

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
    // 1. CALCULATE DAMAGE (2 per CL, Max 30)
    const cl = caster.getAttribute('intelligence') || 1; // Base CL logic
    const sheathDamage = Math.min(cl * 2, 30);
    const durationMs = cl * 6000; // 1 round (6s) per level

    // 2. CREATE EFFECT
    const effect = state.EffectFactory.create('acid_sheath_active', {
      duration: durationMs,
    }, { 
      damage: sheathDamage 
    });

    // 3. EMOTES
    Broadcast.sayAt(caster, "<bold><green>A thick, translucent film of emerald acid erupts over your skin and gear!</green></bold>");
    Broadcast.sayAtExcept(caster.room, `<bold><green>A shimmering layer of caustic green fluid covers ${caster.name}, dripping and hissing as it touches the floor.</green></bold>`, [caster]);

    caster.addEffect(effect);
  },

  onTick(state, caster, effect) {
    if (Math.random() > 0.85) {
      Broadcast.sayAt(caster.room, `<green>The acid covering ${caster.name} lets off a thin, acrid smoke.</green>`);
    }
  },

  onEnd(state, caster, effect) {
    Broadcast.sayAt(caster, "<grey>The corrosive sheath finally dries up and flakes away.</grey>");
    Broadcast.sayAtExcept(caster.room, `<grey>The bubbling acid coating ${caster.name} vanishes.</grey>`, [caster]);
  }
};
