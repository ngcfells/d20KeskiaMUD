'use strict';

class LanguageResolver {
  static apply(state, player) {
    const langs = player.getMeta('languages') || [];
    const pool = player.getMeta('bonusLanguagePool') || [];

    // For now, just ensure they’re valid IDs; later you can add INT-based bonus picks, UI, etc.
    const validLangs = langs.filter(id => state.LanguageManager.has(id));
    const validPool = pool.filter(id => state.LanguageManager.has(id));

    player.setMeta('languages', validLangs);
    player.setMeta('bonusLanguagePool', validPool);
  }

  static reapply(state, character) {
    // same pattern if you need it on load
  }
}

module.exports = LanguageResolver;
