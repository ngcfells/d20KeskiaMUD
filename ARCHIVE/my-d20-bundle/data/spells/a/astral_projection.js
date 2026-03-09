'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Projects an astral copy of the target into the Astral Plane. 
 * The physical body remains in stasis, tethered by a 'Silver Cord'.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'astral_projection',
  name: 'Astral Projection',
  level: 9,
  school: 'necromancy',
  subschool: null,
  descriptors: [],
  source: 'PHB p. 202',

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: '30 minutes',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { id: 'jacinth', quantity: 1, minValue: 1000, consumed: true },
    { id: 'silver_bar', quantity: 1, minValue: 5, consumed: true }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'creature touched',
  area: null,
  duration: 'special', // Ends when cord is cut, or target returns
  savingThrow: 'none',
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    caster.say("<cyan>You begin the grueling 30-minute ritual, tracing the silver ley-lines around your physical form.</cyan>");
    
    // Application: Astral Body Condition
    const effect = state.EffectFactory.create('astral_body_condition', target, {
      state: {
        physicalBodyRoom: target.room.id,
        silverCordActive: true
      }
    });

    target.addEffect(effect);
    
    target.say("<white>Your spirit detaches from your flesh with a resonant snap. You are now a being of pure thought, tethered only by a shimmering silver cord.</white>");
    
    // Logic: Transport to the Astral Plane entry point
    const astralPlane = state.RoomManager.getRoom('astral_entry_way');
    if (astralPlane) {
      target.moveTo(astralPlane);
    }
  }
};
