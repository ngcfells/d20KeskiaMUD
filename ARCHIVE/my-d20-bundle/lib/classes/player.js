// bundles/my-d20-bundle/lib/classes/player.js
'use strict';

module.exports = srcPath => {
  const src = require(srcPath);
  const Player = src.Player;

  return class ClassPlayer extends Player {
    constructor(data) {
      super(data);

      // Ability registry
      this.abilities = new Set();

      // Feat registry
      this.feats = new Set();
    }

    /*
     * ────────────────────────────────────────────────
     *  ABILITIES
     * ────────────────────────────────────────────────
     */

    addAbility(abilityId) {
      this.abilities.add(abilityId);
    }

    hasAbility(abilityId) {
      return this.abilities.has(abilityId);
    }

    useAbility(state, abilityId, args = '') {
      if (!this.hasAbility(abilityId)) {
        return this.say(`You do not know the ability '${abilityId}'.`);
      }

      const ability = state.AbilityManager.get(abilityId);
      if (!ability) {
        return this.say(`Ability '${abilityId}' is not implemented.`);
      }

      ability.run(state, this, args);
    }

    /*
     * ────────────────────────────────────────────────
     *  FEATS
     * ────────────────────────────────────────────────
     */

    addFeat(featId) {
      this.feats.add(featId);
    }

    hasFeat(featId) {
      return this.feats.has(featId);
    }

    getFeats() {
      return [...this.feats];
    }

    /*
     * ────────────────────────────────────────────────
     *  CLASS + SPELLCASTING HELPERS
     * ────────────────────────────────────────────────
     */

    getClass(state) {
      const classId = this.getMeta('class');
      return state.ClassManager.get(classId);
    }

    getSpellcasting(state) {
      const klass = this.getClass(state);
      return klass?.config?.spellcasting || null;
    }
  };
};
