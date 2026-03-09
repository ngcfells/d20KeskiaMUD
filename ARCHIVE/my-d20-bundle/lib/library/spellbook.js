// lib/magic/spellbook.js
'use strict';

function spellPageCost(level, rng = Math.random) {
  if (level === 0) return 1;
  return (Math.floor(rng() * 3) + 1) + level;
}

function getSpellbookCapacity(obj) {
  const sb = obj.spellbookData || {};
  if (sb.isInfiniteSpellbook) return Infinity;
  if (sb.isBlessedBook) return sb.blessedBookCapacity || 1000;
  return sb.capacity || 100;
}

function canScribeSpell(obj, spellLevel, pagesNeeded) {
  const sb = obj.spellbookData || {};
  const capacity = getSpellbookCapacity(obj);
  const used = sb.pagesUsed || 0;
  return used + pagesNeeded <= capacity;
}

function scribeSpellIntoSpellbook(obj, spellId, spellLevel, rng) {
  const sb = obj.spellbookData || {};
  const pages = spellPageCost(spellLevel, rng);
  if (!canScribeSpell(obj, spellLevel, pages)) {
    return false;
  }

  sb.spells = sb.spells || [];
  sb.spells.push({ id: spellId, pages });
  sb.pagesUsed = (sb.pagesUsed || 0) + pages;
  obj.spellbookData = sb;
  return true;
}

function castFromSpellbook(state, caster, obj, spellId) {
  const sb = obj.spellbookData || {};
  const entryIndex = (sb.spells || []).findIndex(s => s.id === spellId);
  if (entryIndex === -1) {
    caster.say('That spell is not inscribed in this spellbook.');
    return false;
  }

  // Check deciphered
  const library = state.LibraryManager;
  if (!library.isDeciphered(caster, obj.id)) {
    caster.say('You cannot cast from a spell you cannot read.');
    return false;
  }

  // Full-round action, etc. handled by command layer.
  // Here we just trigger the spell and erase it.
  state.SpellManager.castFromBook(caster, spellId, obj);

  const entry = sb.spells[entryIndex];
  sb.pagesUsed = Math.max(0, (sb.pagesUsed || 0) - (entry.pages || 0));
  sb.spells.splice(entryIndex, 1);
  obj.spellbookData = sb;

  caster.say(`You cast ${spellId} directly from the spellbook, erasing it from the pages.`);
  return true;
}

module.exports = {
  spellPageCost,
  getSpellbookCapacity,
  canScribeSpell,
  scribeSpellIntoSpellbook,
  castFromSpellbook
};
