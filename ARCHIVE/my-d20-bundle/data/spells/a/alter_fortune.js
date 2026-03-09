'use strict';

const { Broadcast } = require('ranvier');
const D20Utils = require('../../../lib/d20/d20Utils');

/**
 * Implementation: Alter Fortune
 * Source: WotC | Player's Handbook II p.101
 * 
 * Logic:
 * - Casting Time: Immediate Action.
 * - Targets: One creature (self or other).
 * - Effect: Forces the target to reroll their last d20 roll. 
 * - Cost: 200 XP (Experience points).
 */
module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'alter_fortune',
  name: 'Alter Fortune',
  level: 3,
  school: 'divination',
  subschool: null,
  descriptors: [],
  source: 'WotC | Player's Handbook II p.101',
  
  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 3
   * - Bard: 3
   * - Cleric: 3
   * - Druid: 3
   * - Luck Domain: 3
   */

  //
  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  //
  castingTime: 'immediate', // Bypasses standard GCD; uses Swift/Immediate slot
  components: ['V', 'XP'],

  materialComponents: [],
  xpCost: 200,

  //
  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  //
  range: 'close', 
  target: 'one creature',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

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
    // 1. XP COST VALIDATION
    const currentXp = caster.getMeta('experience') || 0;
    if (currentXp < this.xpCost) {
      return Broadcast.sayAt(caster, `<red>You do not have enough experience (200 XP) to weave the threads of fate.</red>`);
    }

    // 2. IMMEDIATE ACTION CHECK
    // Check if the caster has already used a swift/immediate action this round
    if (caster.hasTag('used_immediate_action')) {
      return Broadcast.sayAt(caster, "You have already exhausted your focus for this round.");
    }

    // 3. TARGETING VALIDATION
    if (!target) {
      return Broadcast.sayAt(caster, "Whose fortune do you wish to alter?");
    }

    // 4. APPLY COSTS
    caster.setMeta('experience', currentXp - this.xpCost);
    
    // Set tag to prevent multiple swift/immediate actions per round
    const immediateCooldown = state.EffectFactory.create('global_cooldown', { 
      duration: 6000 // Lasts until their next turn (1 round)
    });
    immediateCooldown.addTag('used_immediate_action');
    caster.addEffect(immediateCooldown);

    // 5. REROLL LOGIC
    // This looks at the target's metadata to find the result of their last d20 check
    const lastRoll = target.getMeta('lastD20Roll');
    if (!lastRoll) {
      return Broadcast.sayAt(caster, `${target.name} hasn't made a recent roll to alter.`);
    }

    // Force a new roll
    const newRoll = Math.floor(Math.random() * 20) + 1;
    target.setMeta('lastD20Roll', newRoll);

    // 6. EMOTES
    Broadcast.sayAt(caster, `<bold><cyan>You speak a word of power, snatching 200 XP from your soul to twist the path of fate!</cyan></bold>`);
    Broadcast.sayAt(target, `<bold><yellow>The world ripples around you! Your previous action is undone and refitted to a new reality.</yellow></bold>`);
    Broadcast.sayAtExcept(caster.room, `<cyan>Time seems to skip a beat around ${target.name} as ${caster.name} utters a sharp, crystalline command.</cyan>`, [caster, target]);

    // 7. ENGINE NOTIFICATION
    // Notify the combat/skill engine that a reroll has occurred so it can re-resolve damage or success.
    state.SpellResolver.resolve(state, this, caster, target, {
      isReroll: true,
      oldRoll: lastRoll,
      newRoll: newRoll
    });
  }
};
