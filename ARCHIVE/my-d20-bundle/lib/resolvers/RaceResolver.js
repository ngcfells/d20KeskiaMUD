'use strict';

class RaceResolver {
  static apply(state, player) {
    const raceId = player.getMeta('race');
    if (!raceId) return;

    const race = state.RaceManager.get(raceId);
    if (!race) return;

    // 1) Racial attribute modifiers
    if (race.attributes) {
      for (const [attr, mod] of Object.entries(race.attributes)) {
        if (!player.hasAttribute(attr)) {
          const base = mod; // or 10 + mod if you store full scores
          player.addAttribute(state.AttributeFactory.create(attr, base, 0));
        } else {
          const base = player.getBaseAttribute(attr) || 0;
          player.setAttributeBase(attr, base + mod);
        }
      }
    }

    // 2) Metadata (speed, size, vision, subtype, etc.)
    const meta = race.metadata || {};
    for (const [key, value] of Object.entries(meta)) {
      if (key === 'traits' || key === 'startingLanguages' || key === 'bonusLanguagePool' || key === 'favoredClasses') {
        continue;
      }
      player.setMeta(key, value);
    }

    // 3) Traits
    if (meta.traits) {
      const existing = player.getMeta('traits') || [];
      player.setMeta('traits', Array.from(new Set([...existing, ...meta.traits])));
    }

    // 4) Languages
    if (meta.startingLanguages) {
      const langs = player.getMeta('languages') || [];
      player.setMeta('languages', Array.from(new Set([...langs, ...meta.startingLanguages])));
    }

    if (meta.bonusLanguagePool) {
      player.setMeta('bonusLanguagePool', meta.bonusLanguagePool);
    }

    // 5) Favored classes
    if (meta.favoredClasses) {
      player.setMeta('favoredClasses', meta.favoredClasses);
    }
  }

  static reapply(state, character) {
    // optional: if you decide race effects are derived instead of baked into base
  }
}

module.exports = RaceResolver;
