
// path: bundles/my-d20-bundle/areas/ossuary/scripts/npcs/giant_centipede_logic.js
'use strict';

module.exports = {
  listeners: {

    hit: state => function (damage, target, attacker) {
      const cent = this;

      if (attacker !== cent) return;
      if (!target.isPlayer) return;

      // 25% chance to inflict poison
      if (Math.random() < 0.25 && state.EffectFactory.has('centipede_poison')) {
        target.say("<red>The centipede's mandibles inject burning venom!</red>");
        const effect = state.EffectFactory.create('centipede_poison', {});
        target.addEffect(effect);
      }
    }
  }
};
