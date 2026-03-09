'use strict';

/**
 * Canonical Spell Definition: Babau Slime
 * -----------------------------------
 * Source: Spell Compendium p.22
 */
module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'babau_slime',
  name: 'Babau Slime',
  level: 1,
  school: 'transmutation',
  subschool: null,
  descriptors: ['acid'],
  source: 'Spell Compendium p.22',

  // ─────────────────────────────────────────────────────────────
  // SPELL LISTS (Availability Registry)
  // ─────────────────────────────────────────────────────────────
  spellLists: {
    wizard: 1,
    sorcerer: 1,
    wu_jen: 1, //(Water)
    witch: 1,
    maho: 1,
    arcane_artificer: 1,
    cleric_domains: { 'demon': 1, 'vile_darkness': 1 },
    prestige_classes: { 'malconvoker': 1, 'thrall_to_demogorgon': 1 }
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Uncommon', kara_tur: 'Rare', maztica: 'Very Rare', evermeet: 'Non-Existent' },
    oerth: { flaness: 'Uncommon (Iuz/Horned Society)', oerik: 'Rare' },
    krynn: { ansalon: 'Rare', taladas: 'Very Rare' },
    eberron: { khorvaire: 'Uncommon', xen_drik: 'Uncommon' },
    athas: 'Very Rare (Defiler)',
    sigil: 'Common',
    ravenloft: { barovia: 'Rare', hazlan: 'Uncommon', darkon: 'Uncommon' },
    d20_modern: 'Rare (Urban Arcana)',
    d20_cthulhu: 'Uncommon (Ichor of Shoggoth variant)',
    pathfinder: 'Common',
    shadowrun: 'Rare (Toxic Shaman variant)',
    warhammer: 'Rare (Nurgle-adjacent lore)',
    rifts: 'Common (Bio-Wizardry/Shifter)'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],

  materialComponents: [
    {
      id: 'babau_slime_drop',
      quantity: 1,
      consumed: true,
      notes: 'A drop of slime from a babau.'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'personal',
  target: 'self',
  area: null,
  duration: '1 min/level', 
  savingThrow: 'fortitude half', 
  spellResistance: false,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    const cl = caster.getMeta('level') || 1;
    const ability = caster.getMeta('spellcastingAbility') || 'intelligence';
    const score = caster.getAttribute(ability) || 10;
    const mod = Math.floor((score - 10) / 2);
    
    const dc = 10 + this.level + mod;
    const durationMs = cl * 60000; // 1 minute per level

    const babauEffect = state.EffectFactory.create('babau_slime', {
      duration: durationMs,
    }, {
      saveDC: dc,
      casterLevel: cl
    });

    if (caster.addEffect(babauEffect)) {
      // The effectActivated listener in babau_slime.js handles the primary emotes.
      return true;
    }
    return false;
  },

  onTick(state, caster, effect) {
    // Subtle environmental flavor
    if (Math.random() > 0.9) {
      caster.say("<green>The acrid scent of the slime fills your nostrils as it bubbles slightly.</green>");
      caster.room.broadcastExcept(caster, `<green>A faint hissing sound comes from ${caster.name}'s slime-covered form.</green>`);
    }
  },

  onEnd(state, caster, effect) {
    // Handled by effectDeactivated in helper file.
  }
};
