'use strict';

/**
 * Canonical Spell Definition: Baleful Polymorph
 * -----------------------------------
 * Source: WotC | PHB p.202 / Spell Compendium
 * Implementation: A lethal transmutation that permanently transforms a 
 * creature into a small, harmless animal (typically a toad).
 */

const polymorph = require('../../../lib/d20/polymorph');
const forms = require('../../../lib/d20/polymorph-forms');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'baleful_polymorph',
  name: 'Baleful Polymorph',
  level: 5,
  school: 'transmutation',
  subschool: 'polymorph',
  descriptors: [],
  source: 'PHB p.202',

  // ─────────────────────────────────────────────────────────────
  // SPELL LISTS (Availability Registry)
  // ─────────────────────────────────────────────────────────────
  spellLists: {
    wizard: 5,
    sorcerer: 5,
    druid: 5,
    adept: 5,
    witch: 5,
    wu_jen: 5,
    shugenja: 5, //(Order of the Ineffable Mystery)
    maho_tsukai: 5,
    cleric_domains: { 'animal': 5, 'transformation': 5 },
    prestige_classes: { 'nature_s_warrior': 4 }
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY (Subset)
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Common', kara_tur: 'Common', maztica: 'Rare' },
    oerth: { flaness: 'Common', oerik: 'Uncommon' },
    athas: 'Rare (Preserver) / Very Rare (Defiler)',
    sigil: 'Common',
    ravenloft: { barovia: 'Uncommon', hazlan: 'Common' },
    shadowrun: 'Common (Baleful transformation variant)',
    warhammer: 'Rare (Lore of Beasts / Amber Order)'
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
  range: 'close',                 // 25 ft. + 5 ft./2 levels
  target: 'one creature',
  area: null,
  duration: 'permanent',
  savingThrow: 'fort/will',       // Fortitude negates (transform), then Will (mind)
  spellResistance: true,

  // ─────────────────────────────────────────────────────────────
  // ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  requiresConcentration: false,
  dismissible: false,             // Usually requires Dispel Magic or Break Enchantment
  ongoingEffect: true,

  // ─────────────────────────────────────────────────────────────
  // SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  onCast(state, caster, target, ctx) {
    /**
     * Logic:
     * 1. Fortitude Save: Failure means physical transformation.
     * 2. Will Save: Failure means the target loses its mental identity (handled via polymorph lib).
     */
    if (!ctx.savePassed) {
      const form = forms.animals['toad'];

      // PERSPECTIVE EMOTES
      caster.say(`<magenta>You twist the threads of reality around ${target.name}, collapsing their physical form into something small and insignificant.</magenta>`);
      target.say("<red>Your bones soften and shrink, your skin turns cold and clammy, and the world suddenly towers above you!</red>");
      target.room.broadcastExcept([caster, target], `<yellow>With a wet, popping sound, ${target.name} shrinks and warps, leaving a small, blinking toad in their place.</yellow>`);

      polymorph.startPolymorph(state, target, 'polymorph', {
        formName: 'toad',
        formCategory: 'animal',
        tier: 0,
        size: form.size,
        bonuses: form.bonuses
      });

      caster.say(`You transform ${target.name} into a harmless toad!`);
      target.say(`You feel your body shrink and warp into a toad!`);
    } else {
      // If the save was passed
      caster.say(`<cyan>${target.name} resists the surge of mutagenic energy, their form flickering but remaining whole.</cyan>`);
    }
  },

  onTick(state, caster, effect) {
    // Environmental flavor for the permanent toad
    if (Math.random() > 0.98) {
      const target = effect.target;
      target.room.broadcast(`<green>The small toad that was once ${target.name} lets out a mournful croak.</green>`);
    }
  },

  onEnd(state, caster, target) {
    polymorph.endPolymorph(state, target, 'polymorph');
    
    // PERSPECTIVE EMOTES
    target.say("<cyan>Your ribs expand and your limbs lengthen as the curse breaks, returning you to your true form.</cyan>");
    target.room.broadcastExcept(target, `<white>The toad swells and twists, expanding rapidly back into the shape of ${target.name}.</white>`);
    
    target.say(`You return to your normal form.`);
  }
};
