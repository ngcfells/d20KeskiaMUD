/**
 * BUNDLE: my-d20-bundle
 * PATH: bundles/my-d20-bundle/data/feats/combat/a/advanced_mobility.js
 */

module.exports = {
  id: "advanced_mobility",
  name: "Advanced Mobility",
  category: "combat",
  type: "feat",
  description: "Your advanced training improves your ability to move through threatened areas and difficult terrain without penalty.",
  
  prerequisites: {
    baseAttackBonus: 3,
    abilityScores: { dexterity: 15 },
    skills: { tumble: 6 },
    feats: ["dodge", "mobility"],
    classFeatures: [],
    race: null,
    alignment: null
  },

  stanceEffects: {
    base: { acVsOpportunityAttacks: 2 },
    aggressive: { speedBonus: 5, acPenalty: 2 },
    defensive: { acVsOpportunityAttacks: 4 },
    perceptive: { ignoreTerrain: true }
  },

  hooks: {
    /**
     * Standard d20 Stance Restriction:
     * Advanced movement techniques are neutralized by restrictive conditions.
     */
    validateStance(character) {
      const restrictions = ['prone', 'grappled', 'entangled', 'pinned', 'paralyzed'];
      
      for (const condition of restrictions) {
        if (character.hasEffect(condition)) {
          return { 
            valid: false, 
            reason: `You cannot maintain Advanced Mobility while ${condition}.` 
          };
        }
      }
      return { valid: true };
    },

    onStanceToggle(character, newStance) {
      const effectId = `feat_${this.id}_ignore_terrain`;
      
      // First, check physical restrictions
      const status = this.validateStance(character);
      if (!status.valid && newStance !== 'none') {
        character.say(status.reason);
        // Logic to force stance to 'none' or 'base' would go here
        return;
      }

      if (newStance === 'perceptive') {
        character.addEffect({
          id: effectId,
          type: 'BOOLEAN_OVERRIDE',
          key: 'ignoreTerrain',
          value: true,
          source: this.id
        });
      } else {
        character.removeEffect(effectId);
      }
    },

    /**
     * Heartbeat check: If the character becomes prone/grappled while 
     * already in the stance, strip the benefits.
     */
    onEffectAdded(character, effect) {
      const restrictions = ['prone', 'grappled', 'entangled', 'pinned'];
      if (restrictions.includes(effect.id)) {
        const currentStance = character.getEffectValue('activeStance');
        if (currentStance === 'perceptive') {
          character.say("Your movement is restricted; you lose the benefits of Advanced Mobility!");
          character.removeEffect(`feat_${this.id}_ignore_terrain`);
        }
      }
    }
  }
};
