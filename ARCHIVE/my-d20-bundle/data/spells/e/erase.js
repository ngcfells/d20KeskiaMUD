/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Removes writings of either magical or mundane nature. 
 * Specifically designed to negate Arcane Mark, Explosive Runes, 
 * Sepia Snake Sigil, and Illusory Script.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'erase',
  name: 'Erase',
  level: 1,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'PHB | p. 227',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 1
   * - Bard: 1
   * - Rarity: Common
   */

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'close', // 25 ft + 5 ft/2 levels
  target: 'one scroll, book, or object',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'will-negates (object)',
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    /**
     * Logic (3.5 SRD):
     * 1. Automatically removes nonmagical writing.
     * 2. Removes magical writing (Arcane Mark) with a Caster Level Check (DC 15).
     * 3. For dangerous runes (Explosive Runes), a failure may trigger them.
     */
    const casterLevel = caster.getMeta('level') || 1;
    const clCheckRoll = Math.floor(Math.random() * 20) + 1;
    const clTotal = clCheckRoll + casterLevel;
    const dc = 15;

    // EMOTES: CASTING
    caster.say(`<cyan>You gesture broadly toward ${target.name}, speaking a word of unmaking. A scouring wind seems to whip around the object's surface.</cyan>`);
    target.room.broadcastExcept(caster, `<cyan>${caster.name} points at ${target.name} and utters a sharp, dissonant syllable. The air around the object ripples with a corrective force.</cyan>`);

    // 1. Check for 'Arcane Mark' specifically
    const arcaneMark = target.effects.getByType('arcane_mark_effect');
    if (arcaneMark) {
      if (clTotal >= dc) {
        caster.say(`<yellow>The shimmering sigil on ${target.name} flickers, loses its luster, and then dissolves into a fine mist of blue sparks.</yellow>`);
        arcaneMark.remove();
      } else {
        caster.say(`<red>The arcane mark on ${target.name} flares stubbornly, resisting your attempt to unbind it.</red>`);
      }
      return;
    }

    // 2. Interaction with Mundane Writing / Descriptions
    // This allows the spell to clear "scribbled" notes or temporary ink meta
    if (target.getMeta('mundane_writing')) {
      target.removeMeta('mundane_writing');
      caster.say(`<white>The mundane ink on ${target.name} lifts from the surface and vanishes into the air.</white>`);
      return;
    }

    // 3. Dangerous Runes Hook (Explosive Runes, etc)
    const trapEffect = target.effects.getByType('explosive_runes_effect');
    if (trapEffect) {
       if (clTotal >= dc) {
         caster.say("<yellow>You safely unravel the volatile script.</yellow>");
         trapEffect.remove();
       } else {
         // Failure triggers the trap!
         caster.say("<red>Your unmaking is clumsy! The runes react violently!</red>");
         trapEffect.emit('trigger', { triggerer: caster });
       }
    }
  }
};
