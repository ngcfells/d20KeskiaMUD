/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Accelerate Erosion
 * Source: WotC | Priest's Spell Compendium Vol 1, p.11 (Reverse of Sands of Time)
 * 
 * Logic:
 * - Target: Nonliving material object.
 * - Effect: Speeds up the erosion and decay process significantly.
 * - Examples: Turning papyrus to dust, wood to splinters, or stone maps to rubble.
 * - Limitation: No effect on living matter or magical artifacts.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // // ─────────────────────────────────────────────────────────────
  id: 'accelerate_erosion',
  name: 'Accelerate Erosion',
  level: 5,
  school: 'transmutation',
  subschool: 'chronomancy',
  descriptors: ['time', 'decay'],
  source: "Priest's Spell Compendium Vol 1, p.11",

  /**
   * SPELL LISTS:
   * - Cleric: 5 (Time Sphere)
   * - Druid: 5 (Plant/Earth Sphere)
   * - Athasian Priest: 5 (Cosmic)
   */

  // // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'tiny_hourglass', 
      quantity: 1, 
      consumed: false,
      notes: 'A tiny hourglass where the sands run upward during casting.' 
    }
  ],

  // // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // // ─────────────────────────────────────────────────────────────
  range: '10 yards',
  target: 'one nonliving object',
  duration: '1 round',
  savingThrow: 'negates',
  spellResistance: true,

  // // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    if (target.isLiving) {
      return B.sayAt(caster, "<yellow>The sands of time refuse to gnaw at living flesh through this rite.</yellow>");
    }

    const cl = state.SpellcastingManager.getCasterLevel(caster);
    
    B.sayAt(caster, `<bold><magenta>You invert your hourglass, and the air around ${target.name} begins to shimmer with the weight of passing centuries.</magenta></bold>`);
    B.sayAtExcept(caster.room, `<magenta>${caster.name} holds a small hourglass as the sands inside defy gravity, flowing upward in a blur of temporal energy.</magenta>`, [caster]);

    // Save Logic for Objects (Non-magical items usually fail)
    const isMagical = target.getMeta('isMagical');
    const savePassed = isMagical ? state.SpellcastingManager._savingThrow(state, target, 'will', ctx.dc) : false;

    if (savePassed) {
      B.sayAt(caster, `<yellow>${target.name} resists the ravages of time.</yellow>`);
      return;
    }

    // Apply the "Eroding" Item Effect
    const erosionEffect = state.EffectFactory.create('corroded', {
      duration: 0, // Permanent decay
      tier: Math.min(5, Math.floor(cl / 3)) 
    });
    
    target.addEffect(erosionEffect);

    // PERSPECTIVE EMOTES
    if (target.name.toLowerCase().includes('wood') || target.name.toLowerCase().includes('staff')) {
      B.sayAt(caster.room, `<red>${target.name} splinters and crumbles into a pile of dry, weathered mulch.</red>`);
    } else if (target.name.toLowerCase().includes('stone') || target.name.toLowerCase().includes('wall')) {
      B.sayAt(caster.room, `<red>The surface of ${target.name} pits and flakes away, turning to fine silt before your eyes.</red>`);
    } else {
      B.sayAt(caster.room, `<red>${target.name} rapidly loses its form, decaying into useless refuse.</red>`);
    }
  }
};
