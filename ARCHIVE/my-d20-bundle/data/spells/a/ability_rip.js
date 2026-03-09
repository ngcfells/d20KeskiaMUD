'use strict';

const { Broadcast } = require('ranvier');
const D20Utils = require('../../../lib/d20/d20Utils');

/**
 * Implementation: Ability Rip
 * Source: WotC | Serpent Kingdoms p.155
 * 
 * Logic:
 * - Tears a Supernatural (Su) ability from a donor and grafts it to a recipient.
 * - Caster Cost: 1 point of Constitution DRAIN (Permanent).
 * - Component: Demon Ichor (Material) + 1,000 XP (Experience).
 */
module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'ability_rip',
  name: 'Ability Rip',
  level: 7,
  school: 'transmutation',
  subschool: null,
  descriptors: ['evil'],
  source: 'WotC | Serpent Kingdoms p.155',
  
  spellLists: {
    cleric: null,
    wizard: 7,
    sorcerer: 7,
    druid: null,
    paladin: null,
    ranger: null,
    bard: null,
    adept: null,
    shugenja: null,
    wu_jen: 7, // Fits the "transmutation of essence" theme

    // CUSTOM/EXTENDED CLASSES
    maho: 7,      // Extremely appropriate for "ripping" spirits/essence
    arcane_artificer: 7, // Modification of "living components"
    savant: 7,           // Ultimate forbidden research
    witch: 7,            // High-level "stealing" of gifts or traits

    cleric_domains: { 'transformation': 7, 'greed': 7, 'serpent': 7 },
    prestige_classes: { 'archmage': 7, 'nar_demonbinder': 7 },
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Rare', kara_tur: 'Very Rare', maztica: 'Non-Existent', hordelands: 'Non-Existent', zakhara: 'Rare', evermeet: 'Uncommon' },
    oerth: { flaness: 'Rare', oerik: 'Very Rare', hepmonaland: 'Rare' },
    krynn: { ansalon: 'Rare', taladas: 'Very Rare', adlatum: 'Rare' },
    eberron: { khorvaire: 'Rare', xen_drik: 'Uncommon', sarlona: 'Very Rare', argonnessen: 'Uncommon' },
    athas: 'Very Rare', // Preservers fear it; Defilers hoard it
    sigil: 'Common',    // The center of multiversal "trading" of powers
    ravenloft: { barovia: 'Rare', darkon: 'Uncommon', lamordia: 'Uncommon', falkovnia: 'Rare', dementlieu: 'Rare', hazlan: 'Common', har-akir: 'Rare' },
    mystara: 'Rare',
    kalamar: 'Rare',
    hyboria: 'Non-Existent',
    d20_modern: 'Very Rare',
    d20_cyber: 'Non-Existent',
    d20_future: 'Rare', // Bio-engineering "spells"
    d20_cthulhu: 'Uncommon', // Eldritch theft of traits
    pathfinder: 'Rare',
    starfinder: 'Rare',
    earthdawn: 'Very Rare',
    shadowrun: 'Rare', // Essence-based theft
    traveller: 'Non-Existent',
    twenty_three_hundred_ad: 'Non-Existent',
    twilight_2000: 'Non-Existent',
    warhammer: 'Uncommon', // Chaos-aligned essence stealing
    palladium: 'Rare',
    rifts: 'Uncommon',
    scarn: 'Rare',
    trollworld: 'Rare'
  },
  
  //
  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  //
  castingTime: '1 hour', // Ritual length
  components: ['V', 'S', 'M', 'XP'],

  materialComponents: [
    {
      id: 'demon_ichor',
      quantity: 1,
      consumed: true,
      notes: 'Acts as a planar lubricant to prevent the essence from shattering.'
    }
  ],

  //
  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  //
  range: 'touch',
  target: 'two living creatures',
  area: null,
  duration: '24 hours',
  savingThrow: 'fortitude negates',
  spellResistance: true,

  //
  // ─────────────────────────────────────────────────────────────
  //  ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  //
  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  //
  // ─────────────────────────────────────────────────────────────
  //  SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  //
  onCast(state, caster, targets, ctx) {
    // 1. ARGUMENT PARSING
    const args = ctx.args ? ctx.args.split(' ') : [];
    if (args.length < 2) {
      return Broadcast.sayAt(caster, "Usage: cast 'ability rip' <donor> <recipient>");
    }

    const donorName = args[0];
    const recipientName = args[1];

    const donor = caster.room.findCharacter(donorName);
    const recipient = caster.room.findCharacter(recipientName);

    if (!donor || !recipient) {
      return Broadcast.sayAt(caster, "Both the donor and the recipient must be present in the ritual circle.");
    }

    if (donor === recipient) {
      return Broadcast.sayAt(caster, "The essence cannot be ripped and grafted to the same soul.");
    }

    // 2. SUPERNATURAL ABILITY DETECTION
    // In our d20 bundle, Su abilities are behaviors prefixed with 'su_'
    const suAbilities = Array.from(donor.behaviors.keys()).filter(b => b.startsWith('su_'));
    
    if (suAbilities.length === 0) {
      return Broadcast.sayAt(caster, `${donor.name} possesses no supernatural (Su) abilities to harvest.`);
    }

    // For simplicity, we rip the most prominent (first) Su ability
    const abilityToRip = suAbilities[0];
    const behaviorConfig = donor.behaviors.get(abilityToRip);

    // 3. COSTS: XP & CONSTITUTION DRAIN
    const xpCost = 1000;
    const currentXp = caster.getMeta('experience') || 0;
    if (currentXp < xpCost) {
      return Broadcast.sayAt(caster, "You do not have enough spiritual essence (XP) to fuel this theft.");
    }

    const currentCon = caster.getAttribute('constitution');
    if (currentCon <= 1) {
      return Broadcast.sayAt(caster, "Your physical form is too frail to survive the backlash of this spell.");
    }

    // Apply Costs
    caster.setMeta('experience', currentXp - xpCost);
    caster.setAttribute('constitution', currentCon - 1);
    Broadcast.sayAt(caster, "<bold><red>Your body withers as 1,000 XP and 1 point of Constitution are sacrificed to the Abyss.</red></bold>");

    // 4. RESOLUTION: SAVING THROW (Donor)
    const castingAbility = caster.getMeta('spellcastingAbility') || 'intelligence';
    const abilityMod = D20Utils.getModifier(caster.getAttribute(castingAbility) || 10);
    const dc = 10 + this.level + abilityMod;

    const save = state.SpellResolver.resolveSave(donor, 'fort', dc);
    if (save.success) {
      Broadcast.sayAt(caster, `<yellow>${donor.name}'s constitution holds; the essence refuses to tear.</yellow>`);
      Broadcast.sayAt(donor, "<cyan>You feel a sharp tugging at your soul, but your willpower anchors your essence.</cyan>");
      return;
    }

    // 5. THE GRAFT
    const effect = state.EffectFactory.create('ability_rip_active', {
      duration: 86400000, // 24 Hours
    }, {
      stolenAbility: abilityToRip,
      abilityConfig: behaviorConfig,
      donorUuid: donor.uuid,
      recipientUuid: recipient.uuid
    });

    // Transfer Behavior
    donor.removeBehavior(abilityToRip);
    recipient.addBehavior(abilityToRip, behaviorConfig);

    // 6. FEEDBACK
    Broadcast.sayAt(caster, `<magenta>You wrench the ${abilityToRip.replace('su_', '')} from ${donor.name} and sear it into ${recipient.name}'s spirit!</magenta>`);
    Broadcast.sayAt(donor, `<bold><red>Your ${abilityToRip.replace('su_', '')} ability has been RIPPED away!</red></bold>`);
    Broadcast.sayAt(recipient, `<bold><cyan>You have gained the ${abilityToRip.replace('su_', '')} ability!</cyan></bold>`);
    Broadcast.sayAtExcept(caster.room, `<magenta>${caster.name} performs a horrific soul-surgery, moving a glowing essence from ${donor.name} to ${recipient.name}.</magenta>`, [caster, donor, recipient]);

    recipient.addEffect(effect);
  },

  onEnd(state, caster, effect) {
    const { stolenAbility, abilityConfig, donorUuid, recipientUuid } = effect.state;
    const donor = state.MobManager.getMob(donorUuid) || state.PlayerManager.getPlayerByUuid(donorUuid);
    const recipient = state.MobManager.getMob(recipientUuid) || state.PlayerManager.getPlayerByUuid(recipientUuid);

    if (recipient) {
      recipient.removeBehavior(stolenAbility);
      Broadcast.sayAt(recipient, `<yellow>The stolen ${stolenAbility.replace('su_', '')} essence fades away.</yellow>`);
    }

    if (donor) {
      donor.addBehavior(stolenAbility, abilityConfig);
      Broadcast.sayAt(donor, `<cyan>Your natural ${stolenAbility.replace('su_', '')} ability returns as the graft expires.</cyan>`);
    }
  }
};
