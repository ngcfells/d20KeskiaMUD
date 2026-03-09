'use strict';

/**
 * Canonical Spell Definition: Axani's Command
 * -----------------------------------
 * Source: Spell Compendium (p. 21)
 * A variant of 'Command' specifically targeting Lawful outsiders/creatures.
 * The caster utters a single word to a lawful creature, which must obey.
 */

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  id: 'axani_s_command',
  name: "Axani's Command",
  level: 1,
  school: 'enchantment',
  subschool: 'compulsion',
  descriptors: ['law', 'language-dependent', 'mind-affecting'],
  source: 'Spell Compendium p. 21',

  // ─────────────────────────────────────────────────────────────
  // SPELL LISTS (Availability Registry)
  // ─────────────────────────────────────────────────────────────
  spellLists: {
    cleric: 1,
    paladin: 1,
    high_paladin: 1,
    adept: 1,
    shugenja: 1, // (Order of the All-Knowing)
    cleric_domains: { 'Tyranny': 1, 'Dictum': 1, 'Inquisition': 1 },
    prestige_classes: { 'church_inquisitor': 1 }
  },

  // ─────────────────────────────────────────────────────────────
  // MULTIVERSAL RARITY REGISTRY
  // ─────────────────────────────────────────────────────────────
  rarity: {
    toril: { faerun: 'Common', kara_tur: 'Common', maztica: 'Rare', hordelands: 'Uncommon', zakhara: 'Uncommon', evermeet: 'Rare' },
    oerth: { flaness: 'Common', oerik: 'Common', hepmonaland: 'Rare' },
    krynn: { ansalon: 'Common', taladas: 'Uncommon', adlatum: 'Rare' },
    eberron: { khorvaire: 'Common', xen_drik: 'Uncommon', sarlona: 'Common (Riedra)', argonnessen: 'Rare' },
    athas: 'Very Rare (Templar only)',
    sigil: 'Common',
    ravenloft: { barovia: 'Uncommon', falkovnia: 'Common', hazlan: 'Uncommon', har-akir: 'Rare' },
    mystara: 'Common',
    kalamar: 'Common',
    d20_modern: 'Rare (Shadow Chasers)',
    pathfinder: 'Common',
    starfinder: 'Common (AbadarCorp focus)',
    shadowrun: 'Uncommon (Command spirit variant)',
    warhammer: 'Rare (Order of Sigmar)',
    rifts: 'Common (Coalition/Cyber-Knight)'
  },

  // ─────────────────────────────────────────────────────────────
  // CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  castingTime: 'standard',
  components: ['V'],
  materialComponents: [], // Verbal only

  // ─────────────────────────────────────────────────────────────
  // TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  range: 'close', // 25 ft. + 5 ft./2 levels
  target: 'one creature with the lawful subtype',
  area: null,
  duration: '1 round',
  savingThrow: 'will',
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
    const subtypes = target.getMeta('subtypes') || [];
    if (!subtypes.includes('lawful')) {
      caster.say(`<yellow>The magic slides off ${target.name}—they lack the rigid celestial or infernal order required for this command.</yellow>`);
      return false;
    }

    // Saving Throw check handled by spellcasting engine; ctx.savePassed is provided.
    if (ctx.savePassed) {
      caster.say(`<cyan>${target.name} stiffens for a moment, then shakes off your mental grip with a defiant glare.</cyan>`);
      target.say(`<blue>An external will tries to seize your mind, but your own conviction holds firm.</blue>`);
      return;
    }

    // Choice logic (This would be prompted or provided via command argument)
    const validCommands = ['approach', 'drop', 'fall', 'flee', 'halt'];
    const command = ctx.commandWord || 'halt'; 

    caster.say(`<magenta>You speak a word of absolute authority: "${command.toUpperCase()}!"</magenta>`);
    
    // Narratives for the target
    target.say(`<red>The word "${command.toUpperCase()}" resonates in your soul. Your body begins to move of its own accord!</red>`);
    target.room.broadcastExcept(target, `<yellow>${caster.name} barks a command at ${target.name}, whose eyes glaze over in sudden obedience.</yellow>`, caster);

    // Apply specific logic based on command word
    switch (command) {
      case 'approach':
        // Move toward caster on next turn
        target.setMeta('forcedMoveTarget', caster.id);
        break;
      case 'drop':
        // Instantaneous drop of held items
        for (const [slot, item] of target.equipment) {
          if (['weapon', 'held'].includes(slot)) {
            target.unequip(slot);
            item.moveTo(target.room);
            target.say(`<white>Your fingers go limp, and your ${item.name} clatters to the ground.</white>`);
          }
        }
        break;
      case 'fall':
        // Leverage existing common effect: prone.js
        const proneEffect = state.EffectFactory.create('prone');
        target.addEffect(proneEffect);
        break;
      case 'flee':
        // Move away from caster on next turn
        target.setMeta('forcedFleeFrom', caster.id);
        break;
      case 'halt':
        // Daze equivalent for 1 round
        const haltEffect = state.EffectFactory.create('dazed', {
          config: { duration: 6000, description: "Halted by divine command." }
        });
        target.addEffect(haltEffect);
        break;
    }
  },

  onTick(state, caster, effect) {
    // Check if target was harmed; if so, break the compulsion (PHB/SC rule)
    if (effect.target.getMeta('tookDamageThisRound')) {
      effect.remove();
    }
  },

  onEnd(state, caster, effect) {
    effect.target.say("<cyan>The weight of the command lifts, and your mind is your own again.</cyan>");
  }
};
