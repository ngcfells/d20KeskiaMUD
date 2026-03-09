/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * A specialized version of Magic Missile that channels positive energy.
 * It is hyper-effective against undead but entirely harmless to the living.
 */
const D20Utils = require('../d20/d20Utils');
const DamageTypes = require('../combat/damage-types');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'disruption_missiles',
  name: 'Disruption Missiles',
  level: 2,
  school: 'evocation',
  subschool: null,
  descriptors: ['positive-energy'],
  source: 'Dread Codex | p. 14',

  /**
   * SPELL LISTS:
   * - Sorcerer/Wizard: 2
   * - Deathless Domain: 2
   * - Sun Domain: 2
   * - Rarity: Uncommon (Common in Ravenloft or Undead-heavy campaigns)
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
  range: 'medium', // 100 ft + 10 ft/level
  target: 'creature',
  area: 'up to 5 creatures, no two more than 15 ft. apart',
  duration: 'instantaneous',
  savingThrow: 'none',
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
  onCast(state, caster, targets, ctx) {
    const casterLevel = caster.getMeta('level') || 1;
    
    // Calculate number of missiles: 1 at 3rd, +1 every 2 levels thereafter
    // 3-4: 1, 5-6: 2, 7-8: 3, 9-10: 4, 11+: 5 (max)
    let numMissiles = 1;
    if (casterLevel >= 5) {
      numMissiles = Math.min(5, 1 + Math.floor((casterLevel - 3) / 2));
    }

    // Handle single vs multiple target arrays
    const targetList = Array.isArray(targets) ? targets : [targets];
    
    // Distribution logic (Assuming engine passes distribution or hits primary)
    // For this implementation, we distribute evenly or stack on the primary.
    
    for (let i = 0; i < numMissiles; i++) {
      const target = targetList[i % targetList.length];
      
      // Narrative/Emote perspectives
      const isUndead = target.getMeta('isUndead') || false;

      if (!isUndead) {
        // Living target logic
        caster.say(`<yellow>The pale blue bolt passes harmlessly through ${target.name}, leaving only a faint scent of ozone.</yellow>`);
        target.say(`<white>A streak of light zips through your chest, but you feel only a momentary, bracing warmth.</white>`);
        target.room.broadcastExcept(caster, `<white>A missile of light passes through ${target.name} without leaving a mark.</white>`, target);
        continue;
      }

      // Roll Damage: 2d4 + 2
      const roll1 = Math.floor(Math.random() * 4) + 1;
      const roll2 = Math.floor(Math.random() * 4) + 1;
      const totalDamage = roll1 + roll2 + 2;

      // Emotes for Undead impact
      caster.say(`<cyan>Your palm erupts with a streak of searing white light that slams into ${target.name}!</cyan>`);
      target.say(`<red>A bolt of agonizing purity tears into your necrotic form, scorching your very essence!</red>`);
      target.room.broadcastExcept([caster, target], `<cyan>A bolt of brilliant positive energy darts from ${caster.name}'s hand, striking ${target.name} with a resonant crack!</cyan>`);

      // Apply Damage (Positive energy vs Undead)
      if (typeof target.takeDamage === 'function') {
        target.takeDamage(totalDamage, DamageTypes.ENERGY, caster);
      }
    }
  }
};
