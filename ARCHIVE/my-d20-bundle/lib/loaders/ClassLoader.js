'use strict';

class TraitResolver {
  /**
   * Apply all traits currently on the player.
   * Call this after RaceResolver.apply and after you’ve added any class/feat traits.
   */
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
    const { skillBonuses, attributeBonuses, specialAbilities, weaponProficiencies } = trait;

    // Skill bonuses: e.g. skilled_ride_stealth
    if (skillBonuses) {
      const skills = player.getMeta('skillBonuses') || {};
      for (const [skillId, bonus] of Object.entries(skillBonuses)) {
        skills[skillId] = (skills[skillId] || 0) + bonus;
      }
      player.setMeta('skillBonuses', skills);
    }

    // Attribute bonuses (beyond race)
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

    // Special abilities
    if (specialAbilities) {
      const specials = player.getMeta('specialAbilities') || [];
      player.setMeta('specialAbilities', Array.from(new Set([...specials, ...specialAbilities])));
    }

    // Weapon proficiencies
    if (weaponProficiencies) {
      const profs = player.getMeta('weaponProficiencies') || [];
      player.setMeta('weaponProficiencies', Array.from(new Set([...profs, ...weaponProficiencies])));
    }
  }

  static reapply(state, character) {
    // same caveat as RaceResolver.reapply
  }
}

module.exports = TraitResolver;
