'use strict';

/**
 * Canonical Spell Definition Contract
 * -----------------------------------
 * An advanced version of Enhance Skeletons. 
 * Grants DR 20/magic and halves incoming piercing/slashing damage.
 */
module.exports = {
  id: 'greater_enhance_skeletons',
  name: 'Greater Enhance Skeletons',
  level: 6,
  school: 'necromancy',
  subschool: null,
  descriptors: [],
  source: 'Dread Codex | OGL',

  castingTime: 'full-round',
  components: ['V', 'S', 'M'],
  
  materialComponents: [
    { id: 'adamantine_ingot_1lb', quantity: 1, consumed: true, notes: '1lb of adamantine per skeleton.' }
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
      if (skeleton.getMeta('undead_type') !== 'skeleton') return;
      
      const skeletonHD = skeleton.getMeta('hitDice') || 1;
      if (currentHDCount + skeletonHD > maxHD) return;

      currentHDCount += skeletonHD;

      // Removes the lesser version if it exists
      if (skeleton.effects.has('enhance_skeletons_active')) {
        skeleton.removeEffect('enhance_skeletons_active');
      }

      const effect = state.EffectFactory.create('greater_enhance_skeletons_active', skeleton, {
        duration: (1 * 3600000) * caster.level 
      });

      skeleton.addEffect(effect);
      caster.say(`<magenta>The bones of ${skeleton.name} turn a deep, lustrous black as they are infused with adamantine.</magenta>`);
    });
  }
};
