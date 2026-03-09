/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * You point a finger at the subject and release a burst of disruptive 
 * energy. This energy not only unravels existing magic but strikes 
 * at the very source of the caster's power, causing them to lose 
 * their most potent spells.
 */
const D20Utils = require('../../lib/d20/d20Utils');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'arcane_turmoil',
  name: 'Arcane Turmoil',
  level: 2,
  school: 'abjuration',
  subschool: null,
  descriptors: [],
  source: 'Spell Compendium | p. 15',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 2
   * - Spell Domain: 2
   * - Rarity: Common
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { 
      id: 'broken_crystal_egg', 
      quantity: 1, 
      consumed: true, 
      notes: 'A small dollop of honey and a miniature broken eggshell.' 
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'close', // 25 ft. + 5 ft./2 levels
  target: 'one creature or object',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'will-partial', // Will save prevents spell slot loss, not dispel
  spellResistance: false,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC & EMOTES
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const casterLevel = caster.getMeta('level') || 1;
    const clBonus = Math.min(casterLevel, 10);
    const dispelRoll = Math.floor(Math.random() * 20) + 1;
    const totalDispel = dispelRoll + clBonus;

    // EMOTES: CASTING
    caster.say(`<cyan>You crush the delicate eggshell in a sticky smear of honey, pointing a finger at ${target.name}. A jagged, invisible tether of static energy lances forth.</cyan>`);
    target.room.broadcastExcept(caster, `<cyan>${caster.name} shatters a tiny eggshell, and a ripple of distorted, violet air slams into ${target.name} with a sharp, electric pop.</cyan>`);

    // 1. DISPEL LOGIC
    // We scan for the highest caster-level magical effect currently on the target.
    const activeEffects = target.effects.filter(e => e.config.isMagical);
    if (activeEffects.length > 0) {
      const targetEffect = activeEffects.sort((a, b) => (b.state.cl || 0) - (a.state.cl || 0))[0];
      const dispelDC = 11 + (targetEffect.state.cl || 10);

      if (totalDispel >= dispelDC) {
        this.emotes.dispelSuccess(caster, target, targetEffect.config.name);
        targetEffect.remove();
      } else {
        this.emotes.dispelFail(caster, target);
      }
    }

    // 2. SPELLCASTER TURMOIL (Will Save vs Spell Slot Loss)
    const isSpellcaster = target.getMeta('spellSlots') || target.getMeta('powerPoints');
    if (isSpellcaster) {
      const dc = 10 + 2 + D20Utils.getModifier(caster.getAttribute('intelligence') || 10);
      const roll = Math.floor(Math.random() * 20) + 1;
      const willSave = (target.getAttribute('will') || 0) + roll;

      if (willSave < dc) {
        // Lose highest level spell slot
        const slots = target.getMeta('spellSlots') || {};
        const levels = Object.keys(slots).sort((a, b) => b - a);
        
        for (const lvl of levels) {
          if (slots[lvl] > 0) {
            slots[lvl] -= 1;
            target.setMeta('spellSlots', slots);
            this.emotes.slotLoss(target, lvl);
            break;
          }
        }
      } else {
        target.say("<yellow>Your mind recoils from the arcane shock, but you shield your inner reserves from the drain.</yellow>");
      }
    }
  },

  emotes: {
    dispelSuccess: (caster, target, effectName) => {
      caster.say(`<yellow>The threads of ${effectName} surrounding ${target.name} unravel and dissolve under your touch.</yellow>`);
      target.say(`<red>You feel a sudden, hollow void as the magic of ${effectName} is ripped away from you!</red>`);
    },
    dispelFail: (caster, target) => {
      caster.say(`<white>The magic surrounding ${target.name} is too resilient; your turmoil washes over it without purchase.</white>`);
    },
    slotLoss: (target, level) => {
      target.say(`<red>A spike of psychic agony pierces your thoughts! The memory of your level ${level} magic is burned away in a flash of violet light.</red>`);
      target.room.broadcastExcept(target, `<magenta>Arcane sparks erupt from ${target.name}'s head as their magical focus is violently disrupted.</magenta>`);
    }
  }
};
