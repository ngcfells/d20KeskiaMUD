/**
 * Implementation: Acid Fog
 * Source: WotC | Spell Compendium p.7 / PHB p.196
 */

'use strict';

const { Broadcast } = require('ranvier');
module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'acid_fog',
  name: 'Acid Fog',
  level: 6,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: ['acid'],
  source: 'WotC | Spell Compendium p.7 / PHB p.196',
  
  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 6
   * - Water Domain: 6
   * - Abyssal Specialist: 6 (If descriptor is Evil)
   */

  //
  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  //
  castingTime: 'standard',
  components: ['V', 'S', 'M', 'DF'],
  
  materialComponents: [
    {
      id: 'dust',
      quantity: 1,
      consumed: true,
      notes: 'A single pinch of dust taken from a component pouch.'
    }
  ],

  //
  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  //
  range: 'medium',
  target: 'area',
  area: '20-ft radius spread',
  duration: '1 round/level',
  savingThrow: 'none',
  spellResistance: false,

  //
  // ─────────────────────────────────────────────────────────────
  //  ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  //
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  //
  // ─────────────────────────────────────────────────────────────
  //  SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  //
  onCast(state, caster, target, ctx) {
    const cl = caster.getAttribute('intelligence') || 1;
    const durationMs = cl * 6000;

    // IMMERSIVE FEEDBACK
    Broadcast.sayAt(caster, `<yellow>You untie your small leather pouch and reach in, pulling out a precise pinch of fine dust. As you blow it across your palm, the grains expand into a roiling, acrid cloud!</yellow>`);
    Broadcast.sayAt(caster, "<bold><yellow>A billowing mass of acrid, pea-green vapors erupts from your hand!</yellow></bold>");
    
    Broadcast.sayAtExcept(caster.room, `<bold><yellow>${caster.name} pinches a bit of dust from a small pouch and exhales; a thick, corrosive fog bank rolls into the area!</yellow></bold>`, [caster]);

    // TARGET APPLICATION
    const targets = [...caster.room.characters];
    for (const unit of targets) {
      if (unit === caster) continue;

      const fogEffect = state.EffectFactory.create('acid_fog_active', {
        duration: durationMs,
      }, {
        caster: caster
      });

      if (unit.addEffect(fogEffect)) {
        Broadcast.sayAt(unit, "<green>The thick, green fog hisses as it eats away at your surroundings!</green>");
      }
    }
  },

  onTick(state, caster, effect) {
    // Round-by-round logic is managed by acid_fog_active.js
  },

  onEnd(state, caster, effect) {
    Broadcast.sayAt(caster.room, "<cyan>The heavy acidic vapors finally dissipate, leaving behind scorched surfaces.</cyan>");
  }
};
