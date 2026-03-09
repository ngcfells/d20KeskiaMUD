/** 
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Enhances a creature's existing flight capabilities. The air becomes 
 * more buoyant and responsive, granting supernatural speed and 
 * incredible aerial maneuverability.
 */
module.exports = {
  id: 'aerial_alacrity',
  name: 'Aerial Alacrity',
  level: 4,
  school: 'transmutation',
  subschool: null,
  descriptors: ['air'], 
  source: 'Spell Compendium | Wizards of the Coast | p.8',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 4
   * - Air Domain: 4
   * - Sky Domain: 4
   */

  castingTime: 'swift',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'hawk_feather', 
      quantity: 1, 
      consumed: true, 
      notes: 'A feather from a bird of prey.' 
    }
  ],

  range: 'touch',
  target: 'willing flying creature touched',
  area: null,
  duration: '1 min./level', 
  savingThrow: 'will (harmless)',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    // 1. Requirement Check: Must have a fly speed
    // Check against your attributes.js 'speed' or a specific 'flySpeed' attribute
    if (!target.hasTag('can_fly') && (target.getAttribute('speed_fly') || 0) <= 0) {
      return caster.say("The spell flickers and dies; the target has no wings or magic to uplift.");
    }

    const cl = caster.getMeta('level') || 1;
    const duration = cl * 60000; // 1 minute per level

    // 2. Create and Add the Effect
    const alacrityEffect = state.EffectFactory.create('aerial_alacrity_active', {
      duration: duration,
      state: { 
        casterLevel: cl,
        speedBonus: 30,
        dodgeBonus: 1
      }
    });

    if (target.addEffect(alacrityEffect)) {
      // Perspective: Caster
      caster.say(`<cyan>You touch ${target.name}, and the wind itself seems to gather beneath them, eager to carry them higher.</cyan>`);
      
      // Perspective: Target
      target.say("<cyan>As the feather dissolves in the caster's hand, you feel a sudden, exhilarating lightness. The air is no longer an obstacle; it is your plaything.</cyan>");
      
      // Perspective: Room
      caster.room.broadcastExcept(caster, `<cyan>Glistening currents of air spiral around ${target.name}, lifting them slightly and smoothing their silhouette for flight.</cyan>`, target);

      // 3. Register Hooks for the Duration
      // These link into your defense.js and movement.js logic
      target.addHook('calculateFlySpeed', (speedData) => {
        speedData.bonus += 30;
        speedData.type = 'enhancement';
        // Logic for maneuverability would increment a meta-tier here
        const currentManeuver = target.getMeta('maneuverability') || 1;
        target.setMeta('temp_maneuverability', Math.min(5, currentManeuver + 1));
      });

      target.addHook('onCalculateAC', (acData, attacker, context) => {
        if (context.isAttackOfOpportunity) {
          acData.addBonus(1, 'dodge');
        }
      });
    }
  },

  onEnd(state, caster, effect) {
    const target = effect.target;
    if (target) {
      target.removeHook('calculateFlySpeed');
      target.removeHook('onCalculateAC');
      target.setMeta('temp_maneuverability', null);
    }
  }
};
