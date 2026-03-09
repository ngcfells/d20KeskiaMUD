'use strict';

/**
 * Canonical Spell Definition: Battle Hymn
 * -----------------------------------
 * Source: Spell Compendium p. 25
 * School: Enchantment (Compulsion) [Mind-Affecting, Sonic]
 * Description: Allies in range can reroll one Will save per round.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'battle_hymn',
  name: 'Battle Hymn',
  level: 2,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['mind-affecting', 'sonic'],
  source: 'Spell Compendium p. 25',

  /**
   * SPELL LISTS:
   * - Bard: 2
   * - Paladin: 2
   * - War Domain: 2
   * Rarity: Common among military chaplains and battle-skalds.
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
  range: '30 ft.',
  target: 'allies within 30 ft.',
  area: '30-ft.-radius burst centered on caster',
  duration: '1 round/level',
  savingThrow: 'will negates (harmless)', 
  spellResistance: true, // (Harmless)

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const durationMs = cl * 6000; // 1 round (6s) per level

    B.sayAt(caster, "<white>You begin a deep, rhythmic chant, your voice booming with percussive power.</white>");
    caster.room.broadcastExcept(caster, `<cyan>${caster.name} begins a resonant battle hymn that vibrates in your chest.</cyan>`);

    // Target logic: All allies in the room/range
    const allies = Array.from(caster.room.players).filter(player => 
      player === caster || player.isAlly(caster)
    );

    allies.forEach(ally => {
      // SR check (harmless)
      const srPassed = state.SpellcastingManager.checkSR(caster, ally);
      if (!srPassed) return;

      const hymnEffect = state.EffectFactory.create('battle_hymn_reroll', {
        duration: durationMs,
      }, {
        caster: caster
      });

      if (ally.addEffect(hymnEffect)) {
        B.sayAtExcept(caster.room, `<white>${ally.name} nods in time with the cadence, their eyes clear and focused.</white>`, [caster, ally]);
      }
    });
  },

  onTick(state, caster, effect) {
    // Auditory flavor
    if (Math.random() > 0.7) {
      B.sayAt(caster.room, `<blue>The air pulses with the rhythmic "Thump-Thump" of ${caster.name}'s hymn.</blue>`);
    }
  }
};
