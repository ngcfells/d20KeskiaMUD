/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * A cruel necromancy that accelerates the biological clock of the victim.
 * Years pass in months, and months in days, as the body withers prematurely.
 */
const D20Utils = require('../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'double_aging',
  name: 'Double Aging',
  level: 5,
  school: 'necromancy',
  subschool: null,
  descriptors: [],
  source: 'Dread Codex | p. 15',

  /**
   * SPELL LISTS:
   * - Cleric: 5
   * - Sorcerer/Wizard: 5
   * - Time Domain: 5
   * - Rarity: Rare / Forbidden
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'quicksilver_vial', 
      quantity: 1, 
      consumed: true, 
      notes: 'A small vial of quicksilver (mercury).' 
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'living creature touched',
  area: null,
  duration: 'permanent',
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
    if (ctx.savePassed) {
      caster.say(`<white>You press the quicksilver to ${target.name}'s skin, but their constitution rejects the temporal corruption.</white>`);
      target.say(`<cyan>A momentary chill as cold as the grave touches your skin, then vanishes, leaving only a faint metallic scent.</cyan>`);
      return;
    }

    // EMOTES: SUCCESSFUL CASTING
    caster.say(`<magenta>You smear the quicksilver across ${target.name}'s flesh. The liquid mercury sinks into their pores like a parasite, and you feel the weight of decades settle upon them.</magenta>`);
    
    target.say(`<red>A sickening, heavy heat spreads from where ${caster.name} touched you. Your joints creak with a sudden, phantom ache, and your breath grows inexplicably shallow.</red>`);
    
    target.room.broadcastExcept([caster, target], `<magenta>${caster.name} touches ${target.name} with a shimmering silver liquid. For a heartbeat, ${target.name}'s features seem to blur and wither, as if viewed through a lens of passing centuries.</magenta>`);

    const effect = state.EffectFactory.create('double_aging_effect', {
      config: { 
        name: "Double Aging",
        duration: -1 // Permanent
      }
    });

    target.addEffect(effect);
  },

  emotes: {
    deterioration: (target) => {
      target.say(`<red>Your hair thins and your skin loses its elasticity. The world seems faster, more exhausting, as your body fails to keep pace with the passing moments.</red>`);
    }
  }
};
