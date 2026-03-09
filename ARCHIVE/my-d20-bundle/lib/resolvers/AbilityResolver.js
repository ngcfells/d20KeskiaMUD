/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/lib/resolvers/AbilityResolver.js
 * PURPOSE: Grants abilities from race, traits, class, feats, and other sources.
 */

'use strict';

class AbilityResolver {
  /**
   * Apply all abilities granted by race, traits, class, feats, etc.
   * This should be called AFTER RaceResolver, TraitResolver, ClassResolver.
   */
  static apply(state, player) {
    const abilityIds = new Set();

    //
    // 1) RACE ABILITIES
    //
    const raceId = player.getMeta('race');
    if (raceId && state.RaceManager.has(raceId)) {
      const race = state.RaceManager.get(raceId);
      const raceAbilities = race.metadata?.abilities || [];
      raceAbilities.forEach(id => abilityIds.add(id));
    }

    //
    // 2) TRAIT ABILITIES
    //
    const traitIds = player.getMeta('traits') || [];
    for (const traitId of traitIds) {
      const trait = state.TraitManager.get(traitId);
      if (trait?.effects?.specialAbilities) {
        trait.effects.specialAbilities.forEach(id => abilityIds.add(id));
      }
    }

    //
    // 3) CLASS ABILITIES (LEVEL-GATED)
    //
    const classId = player.getMeta('class');
    if (classId && state.ClassManager.has(classId)) {
      const klass = state.ClassManager.get(classId);
      const abilityTable = klass.abilities || {};

      for (const [level, abilities] of Object.entries(abilityTable)) {
        if (player.level >= Number(level)) {
          abilities.forEach(id => abilityIds.add(id));
        }
      }
    }

    //
    // 4) FEAT ABILITIES
    //
    const feats = player.getMeta('feats') || [];
    for (const featId of feats) {
      const feat = state.FeatManager.get(featId);
      if (feat?.effects?.abilities) {
        feat.effects.abilities.forEach(id => abilityIds.add(id));
      }
    }

    //
    // 5) APPLY ABILITIES TO PLAYER
    //
    const existing = new Set(player.getMeta('abilities') || []);

    for (const abilityId of abilityIds) {
      if (!state.AbilityManager.has(abilityId)) continue;

      // Avoid duplicates
      if (!existing.has(abilityId)) {
        existing.add(abilityId);

        // Ability hook: onAcquire
        const ability = state.AbilityManager.get(abilityId);
        if (ability?.onAcquire) {
          ability.onAcquire(state, player);
        }
      }
    }

    player.setMeta('abilities', Array.from(existing));
  }

  static reapply(state, character) {
    // Optional: same logic on load if abilities are derived
  }
}

module.exports = AbilityResolver;
