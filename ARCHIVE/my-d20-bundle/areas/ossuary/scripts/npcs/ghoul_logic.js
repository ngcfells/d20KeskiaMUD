// path: bundles\my-d20-bundle\areas\ossuary\scripts\npcs\ghoul_logic.js

'use strict';

module.exports = {
  listeners: {
    hit: state => function (damage, target, attacker) {
      const npc = this;

      // Only apply paralysis when the ghoul hits the player
      if (attacker !== npc) return;

      // 3.5E Ghoul Paralysis (20% chance)
      if (Math.random() < 0.2 && !target.hasEffect('paralyzed')) {
        const dc = 12;
        const fortSave = target.getAttribute('fortitude') || 0;
        const roll = Math.floor(Math.random() * 20) + 1;

        if (roll + fortSave < dc) {
          target.say("<red>The ghoul's claws carry a numbing toxin! Your limbs lock up!</red>");

          if (state.EffectFactory.has('paralyzed')) {
            const effect = state.EffectFactory.create('paralyzed', {
              duration: 4000,
              name: 'Paralyzed',
              description: 'You cannot move or act!'
            });
            target.addEffect(effect);
          }
        }
      }
    },

    updateTick: state => function () {
      const npc = this;

      if (npc.isInCombat()) return;

      // 5% chance to emote
      if (Math.random() < 0.05) {
        npc.room.broadcast("The ghoul's long tongue licks a dark stain off the stone slab with a wet, rasping sound.");
      }
    }
  }
};
