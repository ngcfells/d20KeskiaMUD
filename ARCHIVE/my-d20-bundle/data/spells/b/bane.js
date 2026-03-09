'use strict';

/**
 * Canonical Spell Definition: Bane
 * -----------------------------------
 * Source: PHB p.203
 * School: Enchantment (Compulsion) [Fear, Mind-Affecting]
 * Description: Fills enemies with fear and doubt.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'bane',
  name: 'Bane',
  level: 1,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['fear', 'mind-affecting'],
  source: 'PHB p.203',

  // ─────────────────────────────────────────────────────────────
  // SPELL LISTS (Availability Registry)
  // ─────────────────────────────────────────────────────────────
  // ─────────────────────────────────────────────────────────────
  // SPELL LISTS (Availability Registry)
  // ─────────────────────────────────────────────────────────────
  spellLists: {
    cleric: 1,
    antipaladin: 1,
    adept: 1,
    shaman_oa: 1,
    spirit_shaman: 1,
    shugenja: 1,
    sohei: 1,
    witch: 1,
    maho_tsukai: 1,
    savant: 1,
    cleric_domains: { 'hate': 1, 'tyranny': 1, 'fear': 1, 'destruction': 1 },
    shaman_domains: { 'war': 1 },
    prestige_classes: { 'assassin': 1, 'blackguard': 1 }
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Common', kara_tur: 'Common', maztica: 'Uncommon', hordelands: 'Common', zakhara: 'Common', evermeet: 'Rare' },
    oerth: { flaness: 'Common (Iuz/Hextor)', oerik: 'Common', hepmonaland: 'Uncommon' },
    krynn: { ansalon: 'Common', taladas: 'Common', adlatum: 'Common' },
    eberron: { khorvaire: 'Common (Blood of Vol)', xen_drik: 'Uncommon', sarlona: 'Common', argonnessen: 'Uncommon' },
    athas: 'Common (Templar Authority)',
    sigil: 'Common',
    ravenloft: { barovia: 'Common', darkon: 'Common', falkovnia: 'Common', har-akir: 'Common' },
    mystara: 'Common',
    kalamar: 'Common',
    hyboria: 'Uncommon (Stygian Curses)',
    d20_modern: 'Uncommon',
    d20_cthulhu: 'Very Rare (The Gaze of It)',
    pathfinder: 'Common',
    starfinder: 'Common',
    warhammer: 'Common (Lore of Hashut/Nurgle)',
    rifts: 'Common (Shifter/Witch)',
    shadowrun: 'Common (Willpower Debuff variant)'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  materialComponents: [], // Uses Divine Focus (DF)

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: '50 ft.', 
  target: 'all enemies within area',
  area: '50-ft.-radius burst centered on caster',
  duration: '1 min/level',
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
    const cl = caster.getMeta('level') || 1;
    const durationMs = cl * 60000;

    B.sayAt(caster, "<red>You call upon the darker aspects of the divine to sap the courage of your foes.</red>");
    B.sayAtExcept(caster.room, `<magenta>${caster.name} utters a low, rhythmic curse that seems to darken the very air.</magenta>`, [caster]);

    // Find all enemies in the room
    const enemies = Array.from(caster.room.characters).filter(char => 
      char !== caster && char.isEnemy(caster)
    );

    enemies.forEach(enemy => {
      // SR and Saving Throw check
      const srPassed = state.SpellcastingManager.checkSR(caster, enemy);
      if (!srPassed) return;

      const dc = state.SpellcastingManager.calculateSpellDC(caster, this.level);
      const savePassed = state.SpellcastingManager._savingThrow(state, enemy, 'will', dc);

      if (savePassed) {
        enemy.say("<cyan>You feel a momentary chill, but your conviction burns it away.</cyan>");
        return;
      }

      // Apply the Morale Penalty
      const baneEffect = state.EffectFactory.create('morale_penalty', {
        duration: durationMs,
      }, {
        penalty: -1,
        source: 'bane'
      });

      if (enemy.addEffect(baneEffect)) {
        B.sayAtExcept(caster.room, `<grey>${enemy.name} falters, their movements becoming heavy and uncertain.</grey>`, [caster, enemy]);
      }
    });
  },

  onTick(state, caster, effect) {
    if (Math.random() > 0.95) {
      B.sayAt(caster.room, "<grey>A faint, unsettling shadow seems to cling to the caster's enemies.</grey>");
    }
  }
};
