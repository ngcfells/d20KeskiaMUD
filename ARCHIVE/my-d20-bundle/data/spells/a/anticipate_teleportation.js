/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * All spells in my-d20-bundle must follow this structure.
 */

module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'anticipate_teleportation',
  name: 'Anticipate Teleportation',
  level: 3,                       // Sorcerer/Wizard 3
  school: 'abjuration',
  subschool: null,
  descriptors: [],

  //
  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  //
  castingTime: 'standard',
  components: ['V', 'S', 'F'],

  focus: {
    requiredTag: 'teleportation_anchor',
    minValue: 500,
    notes: 'A rare yellow diamond or chrysoberyl worth at least 500 gp.'
  },

  materialComponents: [],

  //
  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  //
  range: 'touch',
  target: 'creature touched',
  area: '5-ft./level radius emanation centered on the touched creature',
  duration: '24 hours',
  savingThrow: 'none',            // No save for the recipient; affects incoming travelers
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
    /**
     * Logic (Spell Compendium pg. 13):
     * 1. Creates an invisible aura that anticipates teleportation into the area.
     * 2. Recipient is instantly aware of:
     *    - Exact arrival location
     *    - Size of the creature(s)
     *    - Number of arriving creatures
     * 3. Delays arrival by 1 round.
     */
    const casterLevel = caster.getEffectiveCasterLevel();
    const radius = 5 * casterLevel;

    const effect = {
      id: 'anticipate_teleportation_aura',
      source: 'anticipate_teleportation',
      radius: radius,
      delayRounds: 1,
      type: 'abjuration_emanation'
    };

    target.addEffect(effect);

    // Engine hook: Intercept teleportation events targeting a location within the radius
    state.addHook('onTeleportArrival', (teleportEvent) => {
      const distance = state.utils.getDistance(teleportEvent.destination, target.position);
      
      if (distance <= effect.radius) {
        // 1. Notify the recipient
        state.notify(target, {
          title: "Teleportation Anticipated!",
          message: `Location: ${teleportEvent.destination}, Size: ${teleportEvent.creatureSize}, Count: ${teleportEvent.passengerCount}`,
          type: 'detection'
        });

        // 2. Delay the arrival
        teleportEvent.delay(effect.delayRounds);
        
        // Visual indicator for the "landing zone"
        state.visuals.spawnEffect('teleport_delay_shimmer', teleportEvent.destination, {
          duration: '1_round'
        });
      }
    });
  },

  onTick(state, caster, effect) {
    // Aura moves with the recipient
  },

  onEnd(state, caster, effect) {
    state.removeHook('onTeleportArrival');
  }
};
