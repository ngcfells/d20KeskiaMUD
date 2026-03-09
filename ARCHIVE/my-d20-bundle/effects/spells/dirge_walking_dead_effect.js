// path: ./bundles/my-d20-bundle/effects/spells/dirge_walking_dead_effect.js
'use strict';

module.exports = {
  config: {
    name: "Dirge of the Walking Dead",
    description: "You can act normally at 0 HP or below. Dies instantly at -10 HP.",
    type: "buff",
    family: "necromancy",
    tier: 2
  },

  state: {
    casterId: null
  },

  listeners: {
    effectActivated() {
      const target = this.target;
      target.addTag('ignore_unconsciousness');
      target.addTag('ignore_disabled');
    },

    /**
     * Logic: Intercept the death/unconscious check.
     */
    onHealthChange(data) {
      const target = this.target;
      const currentHp = target.getAttribute('health');

      // If they hit -10, they die regardless of the spell
      if (currentHp <= -10) {
        target.say("<red><bold>Even the dirge cannot hold back a wound this deep. Your soul is torn away.</bold></red>");
        this.remove();
        return;
      }

      // If they are between 0 and -9, suppress the 'unconscious' state
      if (currentHp <= 0) {
        target.say("<cyan>You should be dead, but the melody keeps your heart beating.</cyan>");
      }
    },

    effectDeactivated() {
      const target = this.target;
      target.removeTag('ignore_unconsciousness');
      target.removeTag('ignore_disabled');

      // Check immediate state upon cessation
      const currentHp = target.getAttribute('health');
      if (currentHp <= 0 && currentHp > -10) {
        target.say("<red>The melody ends. Reality rushes back as you collapse into unconsciousness.</red>");
        target.addEffect(this.state.EffectFactory.create('unconscious'));
      }
    }
  }
};
