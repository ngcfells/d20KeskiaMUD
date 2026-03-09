/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Implementation: Amanuensis
 * Source: WotC | Spell Compendium p.9
 * 
 * Logic:
 * - Copying: 1 page of non-magical text per Caster Level (CL).
 * - Target: One source (book/scroll) and one blank destination (parchment/wall).
 * - Optional: Can choose to erase the original text during the process.
 * - Restriction: Cannot copy magical writing (Scrolls, Spellbooks).
 */

const { Broadcast } = require('ranvier');

module.exports = {
  id: 'amanuensis',
  name: 'Amanuensis',
  level: 1,
  school: 'transmutation',
  descriptors: [],
  source: 'WotC | Spell Compendium p.9',

  castingTime: 'standard',
  components: ['V', 'S'],
  range: 'touch',
  target: 'writing and a blank surface',
  duration: 'instantaneous',
  savingThrow: 'none',
  spellResistance: false,

  onCast(state, caster, targets, ctx) {
    const cl = caster.getSpellCasterLevel();
    
    // Logic: In a MUD, usage: cast amanuensis <source_item> <dest_item> [erase]
    const args = ctx.args ? ctx.args.split(' ') : [];
    const source = caster.inventory.findItem(args[0]);
    const destination = caster.inventory.findItem(args[1]);
    const shouldErase = args.includes('erase');

    // 1. VALIDATION
    if (!source || !destination) {
      return Broadcast.sayAt(caster, "<cyan>Usage: cast 'amanuensis' <source> <destination> [erase]</cyan>");
    }

    if (source.getMeta('isMagical') || source.hasTag('spellbook') || source.hasTag('scroll')) {
      return Broadcast.sayAt(caster, "<red>The magic protecting the writing resists your spell. Amanuensis only works on non-magical text.</red>");
    }

    const sourceText = source.getMeta('text');
    if (!sourceText) {
      return Broadcast.sayAt(caster, `<red>${source.name} contains no writing to copy.</red>`);
    }

    // 2. COPY LOGIC (1 page per level)
    // For MUDs, we treat 'pages' as segments of a string or separate meta-fields.
    const pages = sourceText.split('\n\n'); // Assuming double newline denotes a page
    const copyAmount = Math.min(pages.length, cl);
    const textToCopy = pages.slice(0, copyAmount).join('\n\n');

    destination.setMeta('text', textToCopy);
    destination.setMeta('is_copy', true);

    if (shouldErase) {
      source.setMeta('text', "");
      Broadcast.sayAt(caster, `<yellow>You transcribe the text to ${destination.name} and the original ink vanishes from ${source.name}!</yellow>`);
    } else {
      Broadcast.sayAt(caster, `<cyan>You successfully transcribe ${copyAmount} pages of text to ${destination.name}.</cyan>`);
    }

    // 3. ROOM EMOTE
    Broadcast.sayAtExcept(caster.room, `<white>${caster.name} touches ${source.name} and ${destination.name}; ink ripples across the air as the words are flawlessly duplicated.</white>`, [caster]);
  }
};
