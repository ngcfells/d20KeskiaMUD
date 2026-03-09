'use strict';

module.exports = {
  config: {
    name: "Ink-Lung",
    description: "Your very breath is being converted into narrative ink.",
    type: "condition",
    family: "sickness",
    tier: 1,
    isMagical: true
  },
  listeners: {
    onTick: state => function () {
      if (Math.random() > 0.8) {
        this.target.say("<red>You cough, and a spray of black ink stains your hands. Your lungs feel heavy, like wet parchment.</red>");
        this.target.room.broadcastExcept(this.target, `<grey>${this.target.name}'s breathing has become a rhythmic, scratching sound, like a quill moving at high speed.</grey>`);
      }
    }
  }
};
