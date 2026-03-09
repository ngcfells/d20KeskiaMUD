'use strict';

/**
 * Canonical Spell Definition: Beauty's Caress
 * -----------------------------------
 * Source: Book of Erotic Fantasy p.142
 * School: Transmutation
 * Description: Enhances the target's physical beauty, providing 
 * a 1d4/2 levels (5d4 max) enhancement bonus to Appearance
 * and Charisma.
 */

const { Broadcast: B } = require('ranvier');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'beauty_s_caress',
  name: "Beauty's Caress",
  level: 4,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'Book of Erotic Fantasy p.142',

  spellLists: {
    bard: 4,
    sorcerer: 4,
    wizard: 4,
    witch: 4,
    sha_ir: 4,
    cleric_domains: { 'charm': 4, 'passion': 4, 'lust_boef': 4, 'pleasure': 4 },
    prestige_classes: { 'celebrant_of_sharess': 4 }
  }

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Uncommon (Sune/Sharess)', kara_tur: 'Rare', maztica: 'Very Rare' },
    oerth: { flaness: 'Uncommon (Myhriss)', oerik: 'Rare' },
    krynn: { ansalon: 'Rare (Sirrion)', taladas: 'Very Rare' },
    eberron: { khorvaire: 'Uncommon (House Phiarlan)', sarlona: 'Rare' },
    athas: 'Very Rare (Noble/High Templar luxury)',
    sigil: 'Uncommon (Society of Sensation favorite)',
    ravenloft: { dementlieu: 'Common (Social warfare)', barovia: 'Non-Existent' },
    hyboria: 'Rare (Ophirian/Zamorian sorcery)',
    d20_modern: 'Rare (High-end celebrity FX)',
    pathfinder: 'Uncommon (Shelyn)',
    shadowrun: 'Common (Physical Mask variant)',
    cthulhu: 'Very Rare (Used by cults to mask decay)'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  materialComponents: [
    {
      id: 'rose_petal_crushed',
      quantity: 1,
      consumed: true,
      notes: 'A handful of crushed rose petals.'
    }
  ],

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'touch',
  target: 'one living creature',
  duration: '1 hour/level',
  savingThrow: 'will negates (harmless)',
  spellResistance: true,

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
    const durationMs = cl * 3600000; // 1 hour per level

    // BoEF Scaling: 1d4 per two caster levels (max 5d4)
    const numDice = Math.min(5, Math.max(1, Math.floor(cl / 2)));
    let rolledBonus = 0;
    
    for (let i = 0; i < numDice; i++) {
      rolledBonus += Math.floor(Math.random() * 4) + 1;
    }

    // Define the shared state for the two attributes
    const effectConfig = { duration: durationMs };
    const effectState = { 
      bonus: rolledBonus, 
      name: "Beauty's Caress",
      source: 'beauty_s_caress'
    };

    // Apply to Charisma
    const chaEffect = state.EffectFactory.create('ability_enhancement', 
      effectConfig, 
      { ...effectState, attribute: 'charisma' }
    );

    // Apply to Appearance
    const appEffect = state.EffectFactory.create('ability_enhancement', 
      effectConfig, 
      { ...effectState, attribute: 'appearance' }
    );

    const chaApplied = target.addEffect(chaEffect);
    const appApplied = target.addEffect(appEffect);

    if (chaApplied || appApplied) {
      B.sayAt(caster, `<magenta>You trace a gentle line down ${target.name}'s jaw; their presence swells with a magnetic, divine allure.</magenta>`);
      target.say(`<bold><magenta>As ${caster.name}'s finger brushes your skin, you feel a radiant heat reshape your features into an exquisite ideal.</magenta></bold>`);
      target.room.broadcastExcept([caster, target], `<magenta>${caster.name} touches ${target.name}, whose form blossoms with such breathtaking beauty that it becomes difficult to look away.</magenta>`);
      
      // Log the specific roll for transparency in d20 mechanics
      B.sayAt(caster, `<grey>[System: Beauty's Caress rolled ${numDice}d4 for a total bonus of +${rolledBonus}]</grey>`);
      
      return true;
    }
    return false;
  }
};
