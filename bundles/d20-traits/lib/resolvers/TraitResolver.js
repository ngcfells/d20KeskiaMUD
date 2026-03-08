// path: bundles/d20-traits/lib/resolvers/TraitResolver.js
'use strict';

class TraitResolver {
  static apply(state, player) {
    const traitIds = player.getMeta('traits') || [];
    if (!traitIds.length) return;

    for (const traitId of traitIds) {
      const trait = state.TraitManager.get(traitId);
      if (!trait) continue;
      this._applySingleTrait(state, player, trait);
    }
  }

  static _applySingleTrait(state, player, trait) {
    const effects = trait.effects || {};
    const {
      skillBonuses,
      attributeBonuses,
      specialAbilities,
      weaponProficiencies,
      baseSpeed,
    } = effects;

    if (skillBonuses) {
      const skills = player.getMeta('skillBonuses') || {};
      for (const [skillId, bonus] of Object.entries(skillBonuses)) {
        skills[skillId] = (skills[skillId] || 0) + bonus;
      }
      player.setMeta('skillBonuses', skills);
    }

    if (attributeBonuses) {
      for (const [attr, mod] of Object.entries(attributeBonuses)) {
        if (!player.hasAttribute(attr)) {
          player.addAttribute(state.AttributeFactory.create(attr, mod, 0));
        } else {
          const base = player.getBaseAttribute(attr) || 0;
          player.setAttributeBase(attr, base + mod);
        }
      }
    }

    if (specialAbilities) {
      const specials = player.getMeta('specialAbilities') || [];
      player.setMeta('specialAbilities', Array.from(new Set([...specials, ...specialAbilities])));
    }

    if (weaponProficiencies) {
      const profs = player.getMeta('weaponProficiencies') || [];
      player.setMeta('weaponProficiencies', Array.from(new Set([...profs, ...weaponProficiencies])));
    }

    if (typeof baseSpeed === 'number') {
      player.setMeta('baseSpeed', baseSpeed);
    }

    const stateBlock = trait.state || {};
    const modifiers = trait.modifiers || {};

    for (const [key, value] of Object.entries(stateBlock)) {
      player.setMeta(key, value);
    }

    if (modifiers.attributes) {
      const current = player.getAttributes();
      const updates = modifiers.attributes(current, stateBlock) || {};

      for (const [attr, value] of Object.entries(updates)) {
        if (!player.hasAttribute(attr)) {
          player.addAttribute(state.AttributeFactory.create(attr, value, 0));
        } else {
          const base = player.getBaseAttribute(attr) || 0;
          player.setAttributeBase(attr, base + value);
        }
      }
    }
  }

  static reapply(state, character) {}
}

module.exports = TraitResolver;
