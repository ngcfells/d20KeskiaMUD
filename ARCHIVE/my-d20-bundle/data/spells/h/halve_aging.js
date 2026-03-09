'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Reduces natural aging to half the normal rate. 
 * Provides a buffer against magical aging effects.
 */
module.exports = {
  id: 'halve_aging',
  name: 'Halve Aging',
  level: 5,
  school: 'necromancy',
  subschool: null,
  descriptors: [],
  source: 'Dread Codex | OGL',

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { id: 'molasses_drop', quantity: 1, consumed: true, notes: 'A drop of molasses.' }
  ],

  range: 'touch',
  target: 'living creature touched',
  area: null,
  duration: 'permanent',
  savingThrow: 'fortitude-negates (harmless)',
  spellResistance: true, // (harmless)

  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    // 1. Validation: Living Check
    if (!target.hasBehavior('living')) {
      return caster.say("<yellow>The timeless dead cannot have their aging halved.</yellow>");
    }

    caster.say(`<cyan>You touch ${target.name} with a sticky residue of molasses, whispering a dirge of slowed time. Their biological rhythm slows to a crawl.</cyan>`);

    const effect = state.EffectFactory.create('halve_aging_active', target);
    target.addEffect(effect);
  }
};
