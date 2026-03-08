'use strict';

/**
 * Canonical D20 Effect Categories
 *
 * These categories determine stacking rules.
 * Effects with the same category generally do NOT stack unless noted.
 *
 * Each category entry defines:
 *   - stacks: whether multiple effects of this category stack
 *   - priority: higher priority wins when replacing effects
 *   - description: for debugging and help files
 */

module.exports = {
  // Enhancement bonuses never stack with themselves
  enhancement: {
    stacks: false,
    priority: 50,
    description: 'Enhancement bonuses to stats, AC, attack, etc.'
  },

  // Morale bonuses do not stack
  morale: {
    stacks: false,
    priority: 40,
    description: 'Morale bonuses from courage, heroism, etc.'
  },

  // Competence bonuses do not stack
  competence: {
    stacks: false,
    priority: 40,
    description: 'Competence bonuses from training or skill boosts.'
  },

  // Insight bonuses do not stack
  insight: {
    stacks: false,
    priority: 40,
    description: 'Insight bonuses from precognition or intuition.'
  },

  // Luck bonuses do not stack
  luck: {
    stacks: false,
    priority: 40,
    description: 'Luck bonuses from fate, fortune, or divine favor.'
  },

  // Sacred bonuses do not stack
  sacred: {
    stacks: false,
    priority: 60,
    description: 'Holy or divine purity bonuses.'
  },

  // Profane bonuses do not stack
  profane: {
    stacks: false,
    priority: 60,
    description: 'Unholy or infernal corruption bonuses.'
  },

  // Dodge bonuses ALWAYS stack
  dodge: {
    stacks: true,
    priority: 30,
    description: 'Dodge bonuses to AC; always stack.'
  },

  // Deflection bonuses do not stack
  deflection: {
    stacks: false,
    priority: 50,
    description: 'Deflection bonuses to AC from magical force.'
  },

  // Natural armor does not stack unless enhancement
  natural_armor: {
    stacks: false,
    priority: 50,
    description: 'Natural armor bonuses from hide, scales, etc.'
  },

  // Alchemical bonuses do not stack
  alchemical: {
    stacks: false,
    priority: 35,
    description: 'Alchemical bonuses from potions or reagents.'
  },

  // Racial bonuses do not stack
  racial: {
    stacks: false,
    priority: 20,
    description: 'Racial bonuses from inherent physiology.'
  },

  // Trait bonuses do not stack
  trait: {
    stacks: false,
    priority: 20,
    description: 'Trait bonuses from background or upbringing.'
  },

  // Circumstance bonuses DO stack
  circumstance: {
    stacks: true,
    priority: 10,
    description: 'Circumstance bonuses from environment or situation.'
  },

  // Penalties ALWAYS stack
  penalty: {
    stacks: true,
    priority: 5,
    description: 'Penalties from conditions, wounds, or debuffs.'
  },

  // Untyped bonuses stack unless the effect overrides stacking
  untyped: {
    stacks: true,
    priority: 1,
    description: 'Untyped bonuses; stack unless effect says otherwise.'
  },

  // Conditions (fear, charm, poison, etc.) always stack
  condition: {
    stacks: true,
    priority: 1,
    description: 'Status conditions; stack unless explicitly exclusive.'
  },

  // Psionic resonance effects
  psionic: {
    stacks: false,
    priority: 45,
    description: 'Psionic bonuses or penalties.'
  },

  // Eldritch / cosmic effects
  eldritch: {
    stacks: false,
    priority: 55,
    description: 'Eldritch or cosmic influence bonuses.'
  },

  // Tech / cybernetic effects
  tech: {
    stacks: false,
    priority: 45,
    description: 'Cybernetic or technological bonuses.'
  },

  // Environmental effects (heat, cold, radiation)
  environmental: {
    stacks: true,
    priority: 15,
    description: 'Environmental modifiers from terrain or hazards.'
  }
};
