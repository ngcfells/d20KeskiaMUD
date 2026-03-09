/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * All spells in my-d20-bundle must follow this structure.
 */

module.exports = {
  //
  // ─────────────────────────────────────────────────────────────
  //  CORE IDENTIFIERS
  // ─────────────────────────────────────────────────────────────
  //
  id: 'greater_antidragon_aura',
  name: 'Greater Antidragon Aura',
  level: 8,                       // Cleric 8
  school: 'abjuration',
  subschool: null,
  descriptors: [],

  //
  // ─────────────────────────────────────────────────────────────
  //  CASTING PARAMETERS
  // ─────────────────────────────────────────────────────────────
  //
  castingTime: 'standard',
  components: ['V', 'S', 'DF'],

  materialComponents: [],

  //
  // ─────────────────────────────────────────────────────────────
  //  TARGETING & RANGE
  // ─────────────────────────────────────────────────────────────
  //
  range: 'close',                 // 25 ft. + 5 ft./2 levels
  target: 'one creature/2 levels, no two of which can be more than 30 ft. apart',
  area: null,
  duration: '1 round/level',      // (D)
  savingThrow: 'will',            // Will negates (harmless)
  spellResistance: true,          // Yes (harmless)

  //
  // ─────────────────────────────────────────────────────────────
  //  ENGINE FLAGS
  // ─────────────────────────────────────────────────────────────
  //
  requiresConcentration: false,
  dismissible: true,
  ongoingEffect: true,

  //
  // ─────────────────────────────────────────────────────────────
  //  SPELL LOGIC
  // ─────────────────────────────────────────────────────────────
  //
  onCast(state, caster, targets, ctx) {
    /**
     * Logic (Spell Compendium pg. 14):
     * 1. Grants a +4 luck bonus to AC and all saving throws.
     * 2. Resistance 10 against all energy types (acid, cold, elec, fire, sonic).
     * 3. Immunity to 'Frightful Presence' of dragons.
     * 4. Dragon Retaliation: If a dragon hits the subject with a natural 
     *    weapon, the dragon must make a Fort save or take 1d6 Strength damage.
     */
    const effect = {
      id: 'greater_antidragon_aura_active',
      source: 'greater_antidragon_aura',
      luckBonus: 4,
      energyResist: 10,
      immunities: ['frightful_presence'],
      strDamageToDragons: '1d6'
    };

    const targetList = Array.isArray(targets) ? targets : [targets];

    targetList.forEach(unit => {
      unit.addEffect(effect);

      // Hook 1: Luck Bonus to AC and Saves
      unit.addHook('onCalculateAC', (acData) => acData.addBonus(effect.luckBonus, 'luck'));
      unit.addHook('onCalculateSave', (saveData) => saveData.addBonus(effect.luckBonus, 'luck'));

      // Hook 2: Energy Resistance
      unit.addHook('onIncomingDamage', (damageData) => {
        if (['acid', 'cold', 'electricity', 'fire', 'sonic'].includes(damageData.type)) {
          damageData.reduce(effect.energyResist);
        }
      });

      // Hook 3: Retaliatory Strength Damage
      unit.addHook('onBeingHit', (attacker, weapon) => {
        if (attacker.type === 'dragon' && weapon.isNatural) {
          const save = attacker.rollSave('fortitude', ctx.saveDC);
          if (!save.success) {
            const strDamage = state.dice.roll(effect.strDamageToDragons).total;
            attacker.applyAbilityDamage('strength', strDamage);
          }
        }
      });
    });

    state.visuals.spawnEffect('phosphorescent_green_aura', caster.position);
  },

  onTick(state, caster, effect) {},

  onEnd(state, caster, effect) {
    // Cleanup of hooks handled by engine when effect expires
  }
};
