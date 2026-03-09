'use strict';

/**
 * Canonical Spell Definition: Bless
 * -----------------------------------
 * Source: PHB p.205
 * School: Enchantment (Compulsion) [Mind-Affecting]
 * Description: Bolsters allies with divine favor.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'bless',
  name: 'Bless',
  level: 1,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['mind-affecting'],
  source: 'PHB p.205',

  // ─────────────────────────────────────────────────────────────
  // SPELL LISTS (Availability Registry)
  // ─────────────────────────────────────────────────────────────
  spellLists: {
    cleric: 1,
    paladin: 1,
    high_paladin: 1,
    adept: 1,
    shaman_oa: 1,
    spirit_shaman: 1,
    shugenja: 1,
    sohei: 1,
    healer_mini: 1,
    arcane_artificer: 1,
    cleric_domains: { 'war': 1, 'community': 1, 'glory': 1, 'good': 1 },
    shaman_domains: { 'heroism': 1 },
    prestige_classes: { 'church_inquisitor': 1, 'hospitaler': 1 }
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Common', kara_tur: 'Common', maztica: 'Rare', hordelands: 'Uncommon', zakhara: 'Common', evermeet: 'Common' },
    oerth: { flaness: 'Common (Pelor/Heironeous)', oerik: 'Common', hepmonaland: 'Uncommon' },
    krynn: { ansalon: 'Common', taladas: 'Common', adlatum: 'Common' },
    eberron: { khorvaire: 'Common (Sovereign Host)', xen_drik: 'Uncommon', sarlona: 'Rare', argonnessen: 'Common' },
    athas: 'Rare (Elemental Priests)',
    sigil: 'Common',
    ravenloft: { barovia: 'Uncommon', darkon: 'Common', dementlieu: 'Common', har-akir: 'Rare' },
    mystara: 'Common',
    kalamar: 'Common',
    hyboria: 'Rare (Mitraic Rituals)',
    d20_modern: 'Uncommon',
    pathfinder: 'Common',
    starfinder: 'Common',
    warhammer: 'Common (Lore of Light/Sigmar)',
    rifts: 'Common (Cyber-Knight/Burster)',
    shadowrun: 'Common (Increase Attribute: Willpower variant)'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],
  materialComponents: [], // Uses Divine Focus (Holy Symbol)

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: '50 ft.',
  target: 'allies within area',
  area: '50-ft.-radius burst centered on caster',
  duration: '1 min/level',
  savingThrow: 'none', 
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
    const durationMs = cl * 60000;

    B.sayAt(caster, "<white>You raise your holy symbol, calling down a shimmering mantle of grace upon your companions.</white>");
    B.sayAtExcept(caster.room, `<cyan>${caster.name} chants a stirring prayer; a soft, golden light ripples outward from them.</cyan>`, [caster]);

    // Target logic: All allies in the room
    const allies = Array.from(caster.room.players).filter(player => 
      player === caster || player.isAlly(caster)
    );

    allies.forEach(ally => {
      // 3.5e Rule: Spell Resistance applies even to harmless spells unless the target waives it.
      const srPassed = state.SpellcastingManager.checkSR(caster, ally);
      if (!srPassed) return;

      const blessEffect = state.EffectFactory.create('morale_bonus', {
        duration: durationMs,
      }, {
        bonus: 1,
        source: 'bless'
      });

      if (ally.addEffect(blessEffect)) {
        B.sayAtExcept(caster.room, `<white>A faint golden aura settles over ${ally.name}'s shoulders.</white>`, [caster, ally]);
      }
    });
  },

  onTick(state, caster, effect) {
    // Visual ambiance for the duration
    if (Math.random() > 0.96) {
      B.sayAt(caster.room, "<white>Small motes of golden light drift through the air, buoying the spirits of those present.</white>");
    }
  }
};
