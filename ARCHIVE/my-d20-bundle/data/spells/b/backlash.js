'use strict';

/**
 * Canonical Spell Definition: Backlash
 * -----------------------------------
 * Source: Spell Compendium p. 23
 * School: Abjuration
 * Description: Wreathes a spellcaster in a field of unstable energy. 
 * Their next spell cast deals 1d6 damage per spell level to themselves.
 */

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'backlash',
  name: 'Backlash',
  level: 4,
  school: 'abjuration',
  subschool: null,
  descriptors: [],
  source: 'Spell Compendium p.23',

  // ─────────────────────────────────────────────────────────────
  // SPELL LISTS (Availability Registry)
  // ─────────────────────────────────────────────────────────────
  spellLists: {
    wizard: 4,
    sorcerer: 4,
    bard: 4,
    witch: 4,
    arcane_artificer: 4,
    savant: 4,
    sha_ir: 4,
    cleric_domains: { 'spell': 4, 'inquisition': 4, 'magic': 4 },
    prestige_classes: { 'spellbreaker': 4, 'mage_hunter': 4 }
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Common', kara_tur: 'Uncommon', maztica: 'Rare', zakhara: 'Common', evermeet: 'Uncommon' },
    oerth: { flaness: 'Common', oerik: 'Uncommon', hepmonaland: 'Rare' },
    krynn: { ansalon: 'Common', taladas: 'Uncommon', adlatum: 'Rare' },
    eberron: { khorvaire: 'Common', xen_drik: 'Uncommon', sarlona: 'Rare', argonnessen: 'Uncommon' },
    athas: 'Rare (Preserver)',
    sigil: 'Common',
    ravenloft: { barovia: 'Uncommon', darkon: 'Common', hazlan: 'Common', dementlieu: 'Uncommon' },
    mystara: 'Common',
    kalamar: 'Common',
    d20_modern: 'Rare',
    d20_cthulhu: 'Very Rare (Arcane Static)',
    pathfinder: 'Common',
    starfinder: 'Common',
    warhammer: 'Rare (Lore of Metal/Tzeentch Punish)',
    rifts: 'Common',
    shadowrun: 'Common (Mana Static variant)'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [], 

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'close', 
  target: 'one spellcaster',
  area: null,
  duration: '1 round/level',
  savingThrow: 'will negates',
  spellResistance: true,

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
    // 1. Identify if target has spellcasting capability (Slots or known spells)
    const canCast = target.getMeta('spellSlots') || target.getMeta('spells');
    if (!canCast) {
      caster.say(`<yellow>${target.name} does not possess the spark of magic; the backlash has nothing to latch onto.</yellow>`);
      return false;
    }

    // 2. Resolve SR and Saving Throw via casting engine
    if (ctx.savePassed) {
      caster.say(`<cyan>${target.name} grounds the static charge through their willpower, neutralizing the spell.</cyan>`);
      return;
    }

    // 3. Apply the Backlash Effect
    const cl = caster.getMeta('level') || 1;
    const durationMs = cl * 6000; // 1 round per level

    const effect = state.EffectFactory.create('backlash_curse', {
      duration: durationMs,
    }, {
      caster: caster,
      dischargeOnCast: true
    });

    if (target.addEffect(effect)) {
      caster.say(`<magenta>You snap your fingers, sending a jolt of dissonant energy into ${target.name}'s aura.</magenta>`);
      target.room.broadcastExcept([caster, target], `<magenta>${caster.name} flings a coruscating bolt of violet energy that sinks into ${target.name}'s chest.</magenta>`);
      return true;
    }
  },

  onTick(state, caster, effect) {
    // Visual feedback of the curse
    if (Math.random() > 0.8) {
      effect.target.room.broadcastExcept(effect.target, `<blue>Tiny violet arcs of electricity dance across ${effect.target.name}'s fingertips.</blue>`);
    }
  },

  onEnd(state, caster, effect) {
    // Handled by effect helper
  }
};
