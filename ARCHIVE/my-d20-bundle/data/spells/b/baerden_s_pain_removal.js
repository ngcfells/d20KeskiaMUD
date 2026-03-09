'use strict';

/**
 * Canonical Spell Definition: Baerden’s Pain Removal
 * -----------------------------------
 * Source: & Magazine Issue 2, p.61
 * Implementation: A specialized abjuration that targets the nervous system
 * to neutralize magical and physical agony.
 */

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'baerden_s_pain_removal',
  name: "Baerden's Pain Removal",
  level: 3,
  school: 'abjuration',
  subschool: null,
  descriptors: ['healing', 'relief'],
  source: '& Magazine Issue 2, p.61',

  // ─────────────────────────────────────────────────────────────
  // SPELL LISTS (Availability Registry)
  // ─────────────────────────────────────────────────────────────
  spellLists: {
    cleric: 3,
    paladin: 3,
    high_paladin: 3,
    adept: 3,
    shaman_oa: 3,
    spirit_shaman: 3,
    shugenja: 3,
    sohei: 3,
    healer_mini: 3,
    cleric_domains: { 'renewal': 3, 'healing': 3, 'endurance': 3, 'mercy': 3 },
    prestige_classes: { 'hospitaler': 3, 'combat_medic': 3 }
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Uncommon', kara_tur: 'Uncommon', maztica: 'Rare', zakhara: 'Common', evermeet: 'Common' },
    oerth: { flaness: 'Common (Pelor/Rao)', oerik: 'Uncommon', hepmonaland: 'Rare' },
    krynn: { ansalon: 'Common (Mishakal)', taladas: 'Uncommon' },
    eberron: { khorvaire: 'Common (House Jorasco)', sarlona: 'Rare', argonnessen: 'Rare' },
    athas: 'Very Rare (Life-shaping only)',
    sigil: 'Common',
    ravenloft: { barovia: 'Rare', darkon: 'Uncommon', har-akir: 'Rare' },
    mystara: 'Common',
    kalamar: 'Common',
    d20_modern: 'Rare (Shadow Chasers)',
    d20_cthulhu: 'Very Rare',
    pathfinder: 'Common',
    starfinder: 'Common',
    shadowrun: 'Common (Stabilize variant)',
    warhammer: 'Rare (Lore of Life/Shallya)'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard', // Mapping '3 segments' to a standard action for MUD timing
  components: ['V', 'S'],
  materialComponents: [], 

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'self plus 1 creature/3 levels',
  area: null,
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

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
    const cl = caster.getMeta('level') || 1;
    const maxExtraTargets = Math.floor(cl / 3);
    
    // Resolve targets: Caster + nearby allies up to the limit
    const potentialTargets = [caster];
    if (caster.room) {
      const allies = Array.from(caster.room.players).filter(p => p !== caster);
      potentialTargets.push(...allies.slice(0, maxExtraTargets));
    }

    caster.say("<cyan>You weave a soothing melody of silver light, your touch cooling the fevered nerves of those around you.</cyan>");
    caster.room.broadcastExcept(caster, `<cyan>${caster.name} chants a litany of mercy, a soft white radiance flowing from their hands into their companions.</cyan>`);

    potentialTargets.forEach(unit => {
      // 1. Scan for effects in the 'pain' family or with 'pain' in the name
      const activeEffects = unit.effects.effects || [];
      const painEffects = Array.from(activeEffects).filter(e => 
        (e.config && e.config.family === 'pain') || 
        e.id.includes('pain') || 
        e.id === 'aching_pain'
      );

      if (painEffects.length > 0) {
        let totalHpToRestore = 0;

        painEffects.forEach(effect => {
          // If the effect tracked damage (like 'wrack' or 'aching_pain'), we recover it
          if (effect.state && effect.state.damageDealt) {
            totalHpToRestore += effect.state.damageDealt;
          }
          
          // Narrative for removal
          unit.say(`<white>The jagged, white-hot needles of ${effect.name} dissolve into a cool, numbing mist.</white>`);
          effect.remove();
        });

        // 2. HP Restoration (Restores damage dealt specifically by the pain effects)
        if (totalHpToRestore > 0) {
          const currentHealth = unit.getAttribute('health');
          const maxHealth = unit.getMaxAttribute('health');
          const finalHeal = Math.min(maxHealth - currentHealth, totalHpToRestore);
          
          unit.setAttribute('health', currentHealth + finalHeal);
          unit.say(`<bold><cyan>Your body mends as the phantom trauma vanishes, restoring ${finalHeal} health.</cyan></bold>`);
        } else {
          unit.say("<cyan>A profound sense of physical peace washes over you, leaving your mind clear.</cyan>");
        }

        // Perspective for onlookers
        caster.room.broadcastExcept(unit, `<white>The lines of agony etched into ${unit.name}'s face vanish, replaced by a look of immense relief.</white>`, caster);
      } else {
        // If targeted but no pain found
        if (unit === caster) {
          unit.say("<yellow>The spell searches your spirit, but finds no knots of agony to unbind.</yellow>");
        } else {
          unit.say("<yellow>You feel a pleasant warmth, though you were not suffering from magical pain.</yellow>");
        }
      }
    });
  }
};
