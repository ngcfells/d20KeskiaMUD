/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Your hand becomes a vector of virulent plague. Unlike the lesser version, 
 * this spell empowers your touch for a duration, allowing you to seed 
 * multiple infections with a single casting.
 */
const Defense = require('../../lib/combat/defense');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'greater_contagion',
  name: 'Greater Contagion',
  level: 5, // Cleric/Druid 5, Wiz 6
  school: 'necromancy',
  subschool: null,
  descriptors: ['evil', 'disease'],
  source: 'Dread Codex | p. 97',

  /**
   * SPELL LISTS:
   * - Cleric: 5
   * - Druid: 5
   * - Sorcerer/Wizard: 6
   * - Pestilence Domain: 5
   * - Rarity: Uncommon
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'putrid_flesh', 
      quantity: 1, 
      consumed: true, 
      notes: 'A piece of putrid flesh and a drop of blood.' 
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'living creatures touched',
  area: null,
  duration: '1 min./level',
  savingThrow: 'fortitude-negates',
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC & EMOTES
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const casterLevel = caster.getMeta('level') || 1;
    const durationMs = casterLevel * 60 * 1000;

    caster.say("<red>You swallow the putrid flesh as your veins turn a sickly, bruised purple. Your touch is now a carrier of rot.</red>");
    caster.room.broadcastExcept(caster, `<red>${caster.name}'s skin turns a pale, necrotic grey, and a faint smell of decay begins to waft from their fingertips.</red>`);

    const plagueTouch = state.EffectFactory.create('greater_contagion_touch', {
      config: { 
        name: "Plague Touch",
        duration: durationMs 
      },
      state: {
          dc: 10 + 5 + Math.floor(((caster.getAttribute('intelligence') || caster.getAttribute('wisdom') || 10) - 10) / 2),
          diseaseType: ctx.diseaseType || 'slimy_doom' // Default disease if none chosen
      }
    });

    caster.addEffect(plagueTouch);
  },

  emotes: {
    infectionImpact: (target, diseaseName) => {
      target.say(`<red>A sudden, violent fever spikes in your blood. Your skin breaks out in weeping sores as ${diseaseName} takes hold instantly!</red>`);
    },
    observer: (caster, target) => {
        target.room.broadcastExcept([caster, target], `<red>${caster.name} brushes against ${target.name}, leaving behind a trail of blackening veins on the victim's skin.</red>`);
    }
  }
};
