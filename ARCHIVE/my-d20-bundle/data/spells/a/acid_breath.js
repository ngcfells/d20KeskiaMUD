'use strict';

const { Broadcast } = require('ranvier');
const DamageTypes = require('../../../lib/combat/damage-types');
const D20Utils = require('../../../lib/d20/d20Utils');

/**
 * Implementation: Acid Breath
 * Source: WotC | Spell Compendium p.7
 * 
 * Logic:
 * - 15-ft cone (Room-wide burst for MUD targets in combat).
 * - 1d6 acid damage per level (max 10d6).
 * - Reflex save for half.
 */
module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'acid_breath',
  name: 'Acid Breath',
  level: 3,
  school: 'conjuration',
  subschool: 'creation',
  descriptors: ['acid'],
  source: 'WotC | Spell Compendium p.7',
  
  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 3
   * - Wu Jen: 3 (Water)
   * - Caustic Domain: 3
   */

  //
  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  //
  castingTime: 'standard',
  components: ['V', 'S', 'M'],

  materialComponents: [
    {
      id: 'fire_ants',
      quantity: 1,
      consumed: true,
      notes: 'A handful of fire ants, crushed during the somatic gesture.'
    }
  ],

  //
  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  //
  range: '15 ft.',
  target: 'area', 
  area: 'cone',
  duration: 'instantaneous',
  savingThrow: 'reflex half',
  spellResistance: true,

  //
  // ─────────────────────────────────────────────────────────────
  //  ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  //
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: false,

  //
  // ─────────────────────────────────────────────────────────────
  //  SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  //
  onCast(state, caster, target, ctx) {
    const castingAbility = caster.getMeta('spellcastingAbility') || 'intelligence';
    const abilityMod = D20Utils.getModifier(caster.getAttribute(castingAbility) || 10);
    const dc = 10 + this.level + abilityMod;
    
    // Damage: 1d6 per level (max 10d6)
    const cl = caster.getAttribute('intelligence') || 1; // Base CL logic
    const diceCount = Math.min(cl, 10);
    const damageRoll = state.Dice.roll(`${diceCount}d6`);

    // EMOTES
    Broadcast.sayAt(caster, `<bold><green>You crush the fire ants and exhale a roiling cloud of corrosive acid!</green></bold>`);
    Broadcast.sayAtExcept(caster.room, `<bold><green>${caster.name} exhales a wide cone of hissing, emerald acid!</green></bold>`, [caster]);

    // Iterate through targets in the room
    const roomTargets = [...caster.room.characters];

    for (const unit of roomTargets) {
      if (unit === caster) continue;
      
      // Filter: In a MUD, area spells usually only hit those in combat or hostile
      const isValidTarget = unit.isInCombat() || unit.hasTag('hostile');
      if (!isValidTarget) continue;

      // 1. Spell Resistance (SR) Check
      const sr = unit.getAttribute('spellResistance') || 0;
      if (sr > 0) {
        const srRoll = Math.floor(Math.random() * 20) + 1 + cl;
        if (srRoll < sr) {
          Broadcast.sayAt(unit, "<cyan>The acid splatters against a shimmering magical barrier and slides off harmlessly.</cyan>");
          continue;
        }
      }

      // 2. Reflex Save via SpellResolver
      const saveResult = state.SpellResolver.resolveSave(unit, 'ref', dc);
      let finalDamage = saveResult.success ? Math.floor(damageRoll / 2) : damageRoll;

      // 3. Evasion Check
      if (saveResult.success && unit.hasTag('evasion')) {
        finalDamage = 0;
        Broadcast.sayAt(unit, "<cyan>You nimbly dive beneath the corrosive spray!</cyan>");
      }

      // 4. Apply Damage
      if (finalDamage > 0) {
        unit.receiveDamage({
          metadata: {
            amount: finalDamage,
            type: DamageTypes.ACID,
            source: this.name,
            attacker: caster
          }
        }, caster);

        Broadcast.sayAt(unit, `<red>The acid sears your flesh for ${finalDamage} damage!</red>`);
        Broadcast.sayAtExcept(unit.room, `<green>The acid hisses as it eats into ${unit.name}'s form!</green>`, [unit, caster]);
      } else if (finalDamage === 0 && !saveResult.success) {
        // Handle Immunity (handled by receiveDamage typically, but good for feedback)
        Broadcast.sayAt(unit, "<yellow>The acid washes over you but finds no purchase on your skin.</yellow>");
      }
    }
  }
};
