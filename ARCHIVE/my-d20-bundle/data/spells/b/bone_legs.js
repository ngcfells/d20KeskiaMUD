/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Bone Legs
 * Source: Adamant Entertainment | Dread Codex p.97
 * 
 * Animates a specific set of lower skeletal remains to serve as a tireless 
 * pack animal or a morbid, bipedal mount. Unlike a floating disk, this 
 * entity can jump and move independently within range.
 */
const D20Utils = require('../d20/d20Utils');

module.exports = {
  id: 'bone_legs',
  name: 'Bone Legs',
  level: 1,
  school: 'necromancy',
  subschool: null,
  descriptors: [],
  source: 'Adamant Entertainment | Dread Codex p.97',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 1
   * - Cleric: 1
   * - Death Domain: 1
   */

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    {
      id: 'skeletal_lower_assembly',
      quantity: 1,
      consumed: false, // Acts as the focus/body for the spell
      notes: 'A matching set of humanoid hip and leg bones.'
    }
  ],

  range: 'touch',
  target: 'one skeletal lower assembly',
  area: null,
  duration: '1 hour/level', 
  savingThrow: 'none',
  spellResistance: false,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const duration = cl * 3600000; // 1 hour per level

    // Logic: The "Bone Legs" inherit a scaling Strength based on Caster Level
    const strengthScore = 10 + cl;
    const carryCapacity = strengthScore * 10; // Simple d20 carry math

    const legsEffect = state.EffectFactory.create('bone_legs_active', {
      duration: duration,
      state: { 
        casterId: caster.id,
        strength: strengthScore,
        capacity: carryCapacity
      }
    });

    if (target.addEffect(legsEffect)) {
      // Perspective: Caster
      caster.say("<magenta>Negative energy pulses from your fingertips into the pelvis. The joints snap into place, and the legs stand upright, awaiting your burden.</magenta>");
      
      // Perspective: Room
      caster.room.broadcastExcept(caster, `<magenta>${caster.name} murmurs a dark incantation over a set of hips and legs. The bones click-clack as they rise and trot into a following position.</magenta>`);

      // Register Hook: Movement
      // Ensure the legs move when the caster moves (if within 'close' range)
      caster.addHook('onMove', (room) => {
        if (target.room !== room) {
          target.moveTo(room);
          state.Broadcast.sayAt(room, "A pair of skeletal legs trots in, following closely behind.");
        }
      });
    }
  },

  onEnd(state, caster, effect) {
    const target = effect.target;
    if (target) {
      caster.removeHook('onMove');
      state.Broadcast.sayAt(target.room, "The necrotic spark leaves the bone legs; they collapse into a heap of inert calcium.");
    }
  }
};
