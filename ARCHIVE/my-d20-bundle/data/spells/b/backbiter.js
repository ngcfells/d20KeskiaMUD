'use strict';

/**
 * Canonical Spell Definition: Backbiter
 * -----------------------------------
 * Source: Spell Compendium p.22
 * School: Necromancy
 * Description: Curse a melee weapon so that its next strike 
 * redirects toward the wielder instead of the intended target.
 */

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'backbiter',
  name: 'Backbiter',
  level: 1,
  school: 'necromancy',
  subschool: null,
  descriptors: [],
  source: 'Spell Compendium p.22',

  // ─────────────────────────────────────────────────────────────
  // SPELL LISTS (Availability Registry)
  // ─────────────────────────────────────────────────────────────
  spellLists: {
    wizard: 1,
    sorcerer: 1,
    bard: 1,
    witch: 1,
    antipaladin: 1,
    savant: 1,
    maho_tsukai: 1,
    sha_ir: 1,
    cleric_domains: { 'hatred': 1, 'luck': 1 /*(inverted)*/ },
    prestige_classes: { 'Assassin': 1 }
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Common', kara_tur: 'Common', maztica: 'Uncommon', zakhara: 'Common' },
    oerth: { flaness: 'Common', oerik: 'Common' },
    krynn: { ansalon: 'Common', taladas: 'Common' },
    eberron: { khorvaire: 'Common', xen_drik: 'Uncommon' },
    athas: 'Uncommon',
    sigil: 'Common',
    ravenloft: { barovia: 'Common', darkon: 'Common', falkovnia: 'Common' },
    d20_modern: 'Uncommon',
    pathfinder: 'Common',
    starfinder: 'Common',
    shadowrun: 'Common (Cursed weapon logic)',
    warhammer: 'Uncommon (Lore of Shadow)',
    rifts: 'Common'
  },
  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V', 'S', 'F'],
  focus: {
    id: 'wooden_mallet',
    quantity: 1
  },

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'close', 
  target: 'one melee weapon',
  area: null,
  duration: '1 round/level or until discharged',
  savingThrow: 'will negates (object)', 
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
    // 1. Resolve Target (Creature vs Item)
    let weapon = target;
    let wielder = null;

    if (target.modelType === 'character') {
      wielder = target;
      // Assume getEquippedWeapon helper returns the primary melee item
      weapon = wielder.getEquippedWeapon(); 
    }

    if (!weapon || !weapon.getMeta('isMelee')) {
      caster.say("You can only cast this upon a melee weapon.");
      return false;
    }

    // 2. Resolve Save (Only magic weapons get a save)
    if (weapon.getMeta('isMagical')) {
      // Use spellcasting engine's DC calculation
      const cl = caster.getMeta('level') || 1;
      const ability = caster.getMeta('spellcastingAbility') || 'intelligence';
      const mod = Math.floor(((caster.getAttribute(ability) || 10) - 10) / 2);
      const dc = 10 + this.level + mod;

      // Object save vs Will
      const saveRoll = Math.floor(Math.random() * 20) + 1;
      const weaponWill = weapon.getMeta('willSave') || 0; // Usually based on CL

      if ((saveRoll + weaponWill) >= dc) {
        caster.say(`<cyan>${weapon.name} hums with a protective aura, resisting your curse.</cyan>`);
        return;
      }
    }

    // 3. Apply the Curse Effect
    const durationRounds = caster.getMeta('level') || 1;
    
    // We keep this as an item-effect. It listens for the 'strike' event from the weapon.
    const backbiterCurse = state.EffectFactory.create('backbiter_curse', {
      duration: durationRounds * 6000,
    });

    // Injected Logic for the Curse
    backbiterCurse.addHook('onWeaponStrike', (attacker, target, strikeData) => {
      // The weapon "curves" back. 
      // Perspective Emotes
      attacker.say(`<red>As you swing, your ${weapon.name} twists unnaturally in your grip, snapping back toward your own chest!</red>`);
      attacker.room.broadcastExcept(attacker, `<yellow>${attacker.name}'s ${weapon.name} bends like a living thing, striking back at its wielder!</yellow>`);

      // Redirect attack roll to the attacker themselves
      strikeData.target = attacker;

      // The spell is discharged after one attack
      backbiterCurse.remove();
    });

    if (weapon.addEffect(backbiterCurse)) {
      caster.say(`<magenta>You tap your mallet against the air; a jagged purple spark leaps from it and sinks into ${weapon.name}.</magenta>`);
      return true;
    }
  },

  onTick(state, caster, effect) {
    // Subtle visual for a cursed weapon
    if (Math.random() > 0.95) {
      const weapon = effect.target;
      weapon.room.broadcast(`<blue>A faint, sickly purple light ripples along the edge of ${weapon.name}.</blue>`);
    }
  },

  onEnd(state, caster, effect) {
    const weapon = effect.target;
    if (weapon.room) {
      weapon.room.broadcast(`<white>The hateful energy clinging to ${weapon.name} dissipates.</white>`);
    }
  }
};
