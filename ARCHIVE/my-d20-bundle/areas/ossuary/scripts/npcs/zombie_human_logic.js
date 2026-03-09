// path: bundles/my-d20-bundle/areas/ossuary/scripts/npcs/zombie_human_logic.js
'use strict';

module.exports = {
  listeners: {

    combatStart: state => function (target) {
      if (target.isPlayer) {
        target.say("<red>The waterlogged zombie gurgles as black water spills from its jaws!</red>");
      }
    },

    hit: state => function (damage, target, attacker) {
      const zombie = this;

      if (attacker !== zombie) return;
      if (!target.isPlayer) return;

      // 20% chance to inflict "waterlogged lungs" debuff
      if (Math.random() < 0.20 && state.EffectFactory.has('waterlogged_lungs')) {
        target.say("<blue>You inhale foul water from the zombie's rotting body!</blue>");
        const effect = state.EffectFactory.create('waterlogged_lungs', {});
        target.addEffect(effect);
      }
    }
  }
};
