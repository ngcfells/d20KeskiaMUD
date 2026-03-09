// lib/magic/scrolls.js
'use strict';

/**
 * Scroll casting and scribing helpers.
 */

function canUseScroll(state, caster, scrollObj) {
  // Scrolls are meant to be usable; check class list, level, etc.
  // Placeholder: assume LibraryManager handles deciphering if needed.
  const library = state.LibraryManager;
  if (scrollObj.magical && !library.isDeciphered(caster, scrollObj.id)) {
    // Read Magic or deciphering could mark it deciphered.
    return false;
  }
  return true;
}

function castFromScroll(state, caster, scrollObj, spellId = null) {
  if (!canUseScroll(state, caster, scrollObj)) {
    caster.say('You cannot make sense of the scroll’s magic.');
    return false;
  }

  const spells = scrollObj.scrollData?.spells || scrollObj.spells || [];
  if (spells.length === 0) {
    caster.say('This scroll appears to be blank.');
    return false;
  }

  let chosenSpell = spellId;
  if (!chosenSpell) {
    chosenSpell = spells[0]; // default to first spell
  }

  if (!spells.includes(chosenSpell)) {
    caster.say('That spell is not inscribed on this scroll.');
    return false;
  }

  const clMap = scrollObj.scrollData?.casterLevels || {};
  const casterLevel = clMap[chosenSpell] || scrollObj.casterLevel || caster.level;

  state.SpellManager.castFromScroll(caster, chosenSpell, casterLevel, scrollObj);

  // Scroll is consumed on use
  state.ItemManager.destroy(scrollObj);
  caster.say(`You invoke the magic of the scroll and it crumbles to dust.`);
  return true;
}

module.exports = {
  canUseScroll,
  castFromScroll
};
