/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Baleful Blink (Enhanced Edition)
 * Source: WotC | Spell Compendium p.22
 * 
 * Logic: Forces a target to flicker between the Material and Ethereal planes.
 * - 50% Fail: Attacks, Spells, Item Use, Item Pickup.
 * - 25% Miss: Incoming attacks (except [Force] or Ghost Touch).
 * - Speed: 75% of normal.
 */

const { Broadcast } = require('ranvier');

module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'baleful_blink',
  name: 'Baleful Blink',
  level: 4,
  school: 'transmutation',
  subschool: null,
  descriptors: [],
  source: 'WotC | Spell Compendium p.22',

  // ─────────────────────────────────────────────────────────────
  // SPELL LISTS (Availability Registry)
  // ─────────────────────────────────────────────────────────────
  spellLists: {
    wizard: 4,
    sorcerer: 4,
    bard: 4,
    witch: 4,
    sha_ir: 4,
    wu_jen: 4,
    arcane_artificer: 4,
    cleric_domains: { 'chaos': 4, 'trickery': 4, 'planar': 4 },
    prestige_classes: { 'horizon_walker': 4, 'void_disciple': 4 }
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Common', kara_tur: 'Rare', maztica: 'Very Rare', zakhara: 'Uncommon', evermeet: 'Uncommon' },
    oerth: { flaness: 'Common', oerik: 'Uncommon', hepmonaland: 'Rare' },
    krynn: { ansalon: 'Uncommon', taladas: 'Rare' },
    eberron: { khorvaire: 'Common', xen_drik: 'Uncommon', sarlona: 'Rare' },
    athas: 'Very Rare (Defiler)',
    sigil: 'Common (Very Common)',
    ravenloft: { barovia: 'Rare', darkon: 'Uncommon', hazlan: 'Uncommon' },
    mystara: 'Common',
    kalamar: 'Common',
    d20_modern: 'Rare',
    d20_cthulhu: 'Very Rare (Dimension Crawl)',
    pathfinder: 'Common',
    starfinder: 'Common',
    shadowrun: 'Uncommon (Astral Shifting variant)',
    warhammer: 'Rare (Lore of Shadow/Tzeentch)',
    rifts: 'Common (Shifter/Phase World)'
  },

  //
  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  //
  castingTime: 'standard',
  components: ['V', 'S'],
  materialComponents: [],

  //
  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  //
  range: 'close',
  target: 'one creature',
  area: null,
  duration: '1 round/level',
  savingThrow: 'fortitude negates',
  spellResistance: true,

  //
  // ─────────────────────────────────────────────────────────────
  //  ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  //
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  //
  // ─────────────────────────────────────────────────────────────
  //  SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  //
  onCast(state, caster, target, ctx) {
    const dc = 14 + caster.getAbilityModifier(caster.primaryStat || 'intelligence');
    
    if (target.savingThrow('fortitude', dc)) {
        Broadcast.sayAt(caster, `${target.name} resists the flickering energy!`);
        return;
    }

    const durationInRounds = caster.getSpellCasterLevel();
    const effect = state.EffectFactory.create('baleful_blink_curse', {
      duration: durationInRounds * 6000,
    });

    /**
     * VISUAL FEEDBACK UTILITY
     */
    const roomNotify = (subject, messageToSubject, messageToRoom) => {
      Broadcast.sayAt(subject, `<yellow>${messageToSubject}</yellow>`);
      Broadcast.sayAtExcept(subject.room, `<grey>${messageToRoom}</grey>`, [subject]);
    };

    /**
     * OFFENSIVE & INTERACTION SABOTAGE (50% Chance)
     */
    const sabotageCheck = (actor, actionType, roomMsg) => {
      if (Math.random() < 0.5) {
        roomNotify(actor, `You blink into the Ethereal Plane mid-${actionType} and fail!`, roomMsg);
        return true; 
      }
      return false;
    };

    effect.addTrigger('onBeforeAttack', (attacker, defender, attackData) => {
      if (sabotageCheck(attacker, 'swing', `${attacker.name} turns translucent and their strike passes through ${defender.name}.`)) {
        attackData.cancelled = true;
      }
    });

    effect.addTrigger('onBeforeSpellCast', (spellcaster, castCtx) => {
      if (castCtx.target !== spellcaster) {
        if (sabotageCheck(spellcaster, 'casting', `${spellcaster.name} flickers away; the spell's energy dissipates into the void.`)) {
          castCtx.cancelled = true;
        }
      }
    });

    effect.addTrigger('onBeforeItemUse', (user, item, itemCtx) => {
      if (sabotageCheck(user, 'use', `${user.name}'s hands pass right through ${item.name}.`)) {
        itemCtx.cancelled = true;
      }
    });

    effect.addTrigger('onBeforeItemPickup', (picker, item, pickupCtx) => {
      if (sabotageCheck(picker, 'grab', `${picker.name} reaches for ${item.name} but catches only air.`)) {
        pickupCtx.cancelled = true;
      }
    });

    /**
     * DEFENSIVE DISPLACEMENT (25% Chance)
     * Includes [Force] and Ghost Touch bypass logic.
     */
    effect.addTrigger('onIncomingAttack', (attacker, subject, attackData) => {
      const isForce = attackData.descriptors?.includes('force');
      const isGhostTouch = attackData.weapon?.hasProperty('ghost_touch');

      if (!isForce && !isGhostTouch && Math.random() < 0.25) {
        attackData.cancelled = true;
        Broadcast.sayAt(attacker, `<cyan>Your blow passes through ${subject.name} as they momentarily vanish into a grey mist!</cyan>`);
        Broadcast.sayAt(subject, "<yellow>You shimmer out of phase, feeling a weapon whistle through your empty space.</yellow>");
        Broadcast.sayAtExcept(subject.room, `<grey>${subject.name} flickers like a dying candle, and the attack misses.</grey>`, [subject, attacker]);
      }
    });

    // Movement is restricted due to rapid flickering (75% speed)
    effect.addModifier('speed', (current) => Math.floor(current * 0.75));

    target.addEffect(effect);
    Broadcast.sayAt(caster, `You trap ${target.name} in an unstable loop of planar flickering.`);
    Broadcast.sayAt(target, "<magenta>Your body begins to vibrate and flicker in and out of existence!</magenta>");
  },

  onTick(state, caster, effect) {
    const subject = effect.target;
    if (Math.random() > 0.7) {
      Broadcast.sayAt(subject, "<white>The world around you turns grey and insubstantial for a split second.</white>");
      Broadcast.sayAtExcept(subject.room, `<grey>${subject.name} flickers in and out of sight, looking momentarily transparent.</grey>`, [subject]);
    }
  },

  onEnd(state, caster, effect) {
    const subject = effect.target;
    Broadcast.sayAt(subject, "<green>Your molecules settle. You are fully material once more.</green>");
    Broadcast.sayAtExcept(subject.room, `${subject.name} stabilizes and stops flickering.`, [subject]);
  }
};
