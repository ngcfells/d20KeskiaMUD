/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Imbues an object or location with a powerful repelling aura.
 * Those affected feel a profound, visceral urge to be elsewhere.
 */
const D20Utils = require('../../lib/combat/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'antipathy',
  name: 'Antipathy',
  level: 8,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['mind-affecting'],
  source: 'PHB | p. 200',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 8
   * - Druid: 9
   * - Mind Domain: 8
   * - Rarity: Rare
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: '1 hour',
  components: ['V', 'S', 'M/DF'],
  
  materialComponents: [
    { 
      id: 'alum_soaked_vinegar', 
      quantity: 1, 
      consumed: true, 
      notes: 'A lump of alum soaked in vinegar.' 
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'close', 
  target: 'object or location',
  area: 'up to 10-ft. cube/level',
  duration: '2 hours/level',
  savingThrow: 'will', 
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC & EMOTES
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const casterLevel = caster.getMeta('level') || 1;
    const durationMs = (2 * casterLevel) * 60 * 60 * 1000;
    const repelledType = ctx.repelledType || 'humanoid'; 

    // EMOTES: SUCCESSFUL CASTING
    caster.say(`<magenta>As the hour draws to a close, you crush the pungent, vinegar-soaked alum over ${target.name}. A sour, psychic dissonance begins to thrum from the object, vibrating against your teeth.</magenta>`);
    
    target.room.broadcastExcept(caster, `<magenta>${caster.name} finishes a long, rhythmic incantation, shattering a mineral lump over ${target.name}. A faint, oily ripple distorts the air around it for a moment.</magenta>`);

    const effect = state.EffectFactory.create('antipathy_aura', {
      config: { 
        name: "Antipathy Field",
        duration: durationMs 
      },
      state: {
        repelledType: repelledType,
        dc: 10 + 8 + D20Utils.getModifier(caster.getAttribute('intelligence') || 10)
      }
    });

    target.addEffect(effect);
  },

  // Perspective Emotes for interactions (called by the effect listener)
  emotes: {
    approachAffected: (creature, target) => {
      creature.say(`<red>As you draw near ${target.name}, a wave of inexplicable revulsion washes over you. The very sight of it makes your skin crawl with a greasy, loathsome heat.</red>`);
    },
    failSave: (creature) => {
      creature.say(`<red>The mental pressure becomes an absolute physical rejection. Every instinct in your body screams that staying here is a violation of your soul. You must leave!</red>`);
    },
    passSave: (creature) => {
      creature.say(`<yellow>A foul, psychic weight tries to shove you away, but you grit your teeth and force yourself through the mental static.</yellow>`);
    },
    observer: (target, observer) => {
      observer.say(`<white>The air around ${target.name} feels thin and sharp, though you cannot place why others seem to turn away from it in disgust.</white>`);
    }
  }
};
