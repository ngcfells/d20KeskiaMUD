'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Instantly restores one animated skeleton or zombie per caster level (max 20)
 * to their maximum hit points. Does not affect destroyed (0 HP) undead.
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'heal_undead',
  name: 'Heal Undead',
  level: 4,
  school: 'necromancy',
  subschool: null,
  descriptors: [],
  source: 'Dread Codex | OGL',

  /**
   * SPELL LISTS:
   * - Cleric: 3
   * - Sorcerer/Wizard: 4
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
  range: 'touch',
  target: 'one or more skeletons or zombies touched',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'will-negates (harmless, object)',
  spellResistance: true, // (harmless, object)

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
    const targets = Array.isArray(ctx.targets) ? ctx.targets : [target];
    const maxTargets = Math.min(caster.level || 1, 20);
    let healedCount = 0;

    targets.slice(0, maxTargets).forEach(undead => {
      // Validation: Must be a Skeleton or Zombie NPC
      const type = undead.getMeta('undead_type');
      const isValidType = ['skeleton', 'zombie'].includes(type);
      
      // Must be currently "alive" (animated) and damaged
      const currentHP = undead.getAttribute('health');
      const maxHP = undead.getMaxAttribute('health');

      if (isValidType && currentHP > 0 && currentHP < maxHP) {
        undead.setAttributeBase('health', maxHP);
        healedCount++;
        
        undead.say("<magenta>Negative energy knits your necrotic fibers back together, restoring you to full vitality.</magenta>");
        caster.say(`<cyan>You touch ${undead.name}, sealing its fractures and tears with a dark pulse.</cyan>`);
      }
    });

    if (healedCount === 0) {
      caster.say("<yellow>No suitable targets were found to heal.</yellow>");
    } else {
      caster.room.broadcastExcept(caster, `<magenta>${caster.name} channels a wave of dark mending into their undead thralls.</magenta>`);
    }
  }
};
