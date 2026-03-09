'use strict';

/**
 * Liquid Effects Registry
 * Pack 1 + Pack 2
 *
 * Maps liquid defaultEffects IDs → effect + duration.
 */

module.exports = {
  // =========================================================
  // PACK 1 — CORE
  // =========================================================

  // HYDRATION / NOURISHMENT
  hydrate_minor: {
    effect: 'hydrate-minor',
    duration: 300000,
  },

  nourish_minor: {
    effect: 'nourish-minor',
    duration: 300000,
  },

  nourish_small_heal: {
    effect: 'nourish-small-heal',
    duration: 1,
  },

  refresh_minor: {
    effect: 'refresh-minor',
    duration: 180000,
  },

  // MOOD / MORALE
  morale_minor: {
    effect: 'morale-minor',
    duration: 600000,
  },

  // CAFFEINE / CALM
  jitter_minor: {
    effect: 'jitter-minor',
    duration: 300000,
  },

  jitter_medium: {
    effect: 'jitter-medium',
    duration: 600000,
  },

  calm_minor: {
    effect: 'calm-minor',
    duration: 300000,
  },

  // ALCOHOL
  alcohol_light: {
    effect: 'alcohol-light',
    duration: 600000,
  },

  alcohol_medium: {
    effect: 'alcohol-medium',
    duration: 900000,
  },

  alcohol_strong: {
    effect: 'alcohol-strong',
    duration: 1200000,
  },

  // PLANAR / ALIGNMENT
  holy_water_splash: {
    effect: 'holy-water-splash',
    duration: 1,
  },

  unholy_water_splash: {
    effect: 'unholy-water-splash',
    duration: 1,
  },

  axiomatic_alignment_shift: {
    effect: 'axiomatic-shift',
    duration: 1,
  },

  anarchic_alignment_shift: {
    effect: 'anarchic-shift',
    duration: 1,
  },

  styx_memory_loss: {
    effect: 'styx-memory-loss',
    duration: 1,
  },

  lethe_forgetfulness: {
    effect: 'lethe-forgetfulness',
    duration: 1,
  },

  phlegethos_fire_burn: {
    effect: 'phlegethos-burn',
    duration: 1,
  },

  celestial_minor_heal: {
    effect: 'celestial-minor-heal',
    duration: 1,
  },

  shadowfell_chill: {
    effect: 'shadowfell-chill',
    duration: 300000,
  },

  // =========================================================
  // PACK 2 — ADVANCED
  // =========================================================

  // SUGAR / ENERGY
  sugar_rush: {
    effect: 'sugar-rush',
    duration: 300000,
  },

  sugar_crash: {
    effect: 'sugar-crash',
    duration: 300000,
  },

  energy_surge: {
    effect: 'energy-surge',
    duration: 300000,
  },

  // TEMPERATURE
  warmth_minor: {
    effect: 'warmth-minor',
    duration: 600000,
  },

  warmth_greater: {
    effect: 'warmth-greater',
    duration: 900000,
  },

  chill_minor: {
    effect: 'chill-minor',
    duration: 600000,
  },

  // PURITY / POISON / RADIANCE / SHADOW
  poison_dilution: {
    effect: 'poison-dilution',
    duration: 1,
  },

  radiant_cleansing: {
    effect: 'radiant-cleansing',
    duration: 1,
  },

  shadow_taint: {
    effect: 'shadow-taint',
    duration: 900000,
  },

  // TOLERANCE / DEPENDENCY
  alcohol_tolerance: {
    effect: 'alcohol-tolerance',
    duration: 3600000,
  },

  caffeine_dependency: {
    effect: 'caffeine-dependency',
    duration: 3600000,
  },

  // HYDRATION STATES
  hydration_overload: {
    effect: 'hydration-overload',
    duration: 600000,
  },

  dehydration_mild: {
    effect: 'dehydration-mild',
    duration: 900000,
  },

  dehydration_severe: {
    effect: 'dehydration-severe',
    duration: 900000,
  },

  // PLANAR RESONANCE
  planar_resonance_good: {
    effect: 'planar-resonance-good',
    duration: 600000,
  },

  planar_resonance_evil: {
    effect: 'planar-resonance-evil',
    duration: 600000,
  },

  planar_resonance_law: {
    effect: 'planar-resonance-law',
    duration: 600000,
  },

  planar_resonance_chaos: {
    effect: 'planar-resonance-chaos',
    duration: 600000,
  },
  // =========================================================
  // PACK 3 — EXOTIC & ADVANCED
  // =========================================================

  // PLANAR FUSION / REACTIONS
  planar_fusion_stable: {
    effect: 'planar-fusion-stable',
    duration: 600000,
  },

  planar_fusion_volatile: {
    effect: 'planar-fusion-volatile',
    duration: 1,
  },

  planar_fusion_unstable: {
    effect: 'planar-fusion-unstable',
    duration: 300000,
  },

  // ALCHEMICAL VOLATILITY / TOXICITY
  alchemical_volatility_minor: {
    effect: 'alchemical-volatility-minor',
    duration: 300000,
  },

  alchemical_volatility_major: {
    effect: 'alchemical-volatility-major',
    duration: 300000,
  },

  toxicity_buildup_minor: {
    effect: 'toxicity-buildup-minor',
    duration: 900000,
  },

  toxicity_buildup_major: {
    effect: 'toxicity-buildup-major',
    duration: 900000,
  },

  // FERMENTATION / AGING / SPOILAGE
  fermentation_active: {
    effect: 'fermentation-active',
    duration: 3600000,
  },

  fermentation_perfected: {
    effect: 'fermentation-perfected',
    duration: 3600000,
  },

  spoilage_minor: {
    effect: 'spoilage-minor',
    duration: 600000,
  },

  spoilage_severe: {
    effect: 'spoilage-severe',
    duration: 600000,
  },

  // HEAT / COLD SCALING
  heat_scaling_minor: {
    effect: 'heat-scaling-minor',
    duration: 600000,
  },

  heat_scaling_major: {
    effect: 'heat-scaling-major',
    duration: 600000,
  },

  cold_scaling_minor: {
    effect: 'cold-scaling-minor',
    duration: 600000,
  },

  cold_scaling_major: {
    effect: 'cold-scaling-major',
    duration: 600000,
  },

  // MAGICAL INFUSION
  arcane_infusion_minor: {
    effect: 'arcane-infusion-minor',
    duration: 600000,
  },

  arcane_infusion_major: {
    effect: 'arcane-infusion-major',
    duration: 600000,
  },

  divine_infusion_minor: {
    effect: 'divine-infusion-minor',
    duration: 600000,
  },

  divine_infusion_major: {
    effect: 'divine-infusion-major',
    duration: 600000,
  },
};
