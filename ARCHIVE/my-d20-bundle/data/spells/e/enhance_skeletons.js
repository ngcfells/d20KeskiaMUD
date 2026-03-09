'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * Grants skeletons DR 10/magic and halves incoming piercing/slashing damage 
 * before DR is even applied.
 */
module.exports = {
  id: 'enhance_skeletons',
  name: 'Enhance Skeletons',
  level: 4,
  school: 'necromancy',
  subschool: null,
  descriptors: [],
  source: 'Dread Codex | OGL',

  castingTime: 'standard',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { id: 'iron_ingot_1lb', quantity: 1, consumed: true, notes: '1lb of iron per skeleton.' }
  ],

  range: 'close',
  target: 'skeletons with total HD equal to 1 HD/level',
  area: null,
  duration: '1 hour/level',
  savingThrow: 'will-negates (harmless, object)',
  spellResistance: true,

  requiresConcentration: false,
  dismissible: false,
  ongoingEffect: true,

  onCast(state, caster, target, ctx) {
    const targets = Array.isArray(ctx.targets) ? ctx.targets : [target];
    let currentHDCount = 0;
    const maxHD = caster.level;

    targets.forEach(skeleton => {
      // Validation: Must be a skeleton (Check race_type or specific metadata)
      if (skeleton.getMeta('undead_type') !== 'skeleton') return;
      
      const skeletonHD = skeleton.getMeta('hitDice') || 1;
      if (currentHDCount + skeletonHD > maxHD) return;

      currentHDCount += skeletonHD;

      const effect = state.EffectFactory.create('enhance_skeletons_active', skeleton, {
        duration: (1 * 3600000) * caster.level // 1 hour per level
      });

      skeleton.addEffect(effect);
      caster.say(`<magenta>The bones of ${skeleton.name} turn a dark, metallic grey as they are reinforced.</magenta>`);
    });
  }
};
