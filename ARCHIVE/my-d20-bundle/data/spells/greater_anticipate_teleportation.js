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
  id: 'greater_anticipate_teleportation',
  name: 'Greater Anticipate Teleportation',
  level: 6,                       // Sorcerer/Wizard 6
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
    id: 'rare_gem_greater',
    value: 1000,
    notes: 'A rare yellow diamond or chrysoberyl worth at least 1,000 gp.'
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
  savingThrow: 'none',            // Affects incoming travelers, no save
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
     * 1. Functions like Anticipate Teleportation, but with a longer delay.
     * 2. Arrival is delayed by 3 rounds.
     * 3. Provides exact arrival location, number of creatures, and size.
     */
    const casterLevel = caster.getEffectiveCasterLevel();
    const radius = 5 * casterLevel;

    const effect = {
      id: 'greater_anticipate_teleportation_aura',
      source: 'greater_anticipate_teleportation',
      radius: radius,
      delayRounds: 3,             // Increased from 1 round
      type: 'abjuration_emanation'
    };

    target.addEffect(effect);

    // Engine hook: Intercept teleportation events
    state.addHook('onTeleportArrival', (teleportEvent) => {
      const distance = state.utils.getDistance(teleportEvent.destination, target.position);
      
      if (distance <= effect.radius) {
        // 1. Precise Tactical Data
        state.notify(target, {
          title: "Greater Anticipation Triggered!",
          message: `ETA: 3 Rounds. Location: ${teleportEvent.destination}. Passengers: ${teleportEvent.passengerCount} (${teleportEvent.creatureSize}).`,
          type: 'tactical_alert'
        });

        // 2. Significant Delay
        teleportEvent.delay(effect.delayRounds);
        
        // 3. Visual "Landing Zone" for the duration of the delay
        state.visuals.spawnEffect('teleport_arrival_beacon', teleportEvent.destination, {
          duration: '3_rounds',
          color: 'gold'
        });
      }
    });
  },

  onTick(state, caster, effect) {
    // Moves with the touched creature
  },

  onEnd(state, caster, effect) {
    state.removeHook('onTeleportArrival');
  }
};
