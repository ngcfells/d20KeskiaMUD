/**
 * PATH: bundles/my-d20-bundle/lib/managers/AreaEffectManager.js
 */

'use strict';

class AreaEffectManager {
  constructor(state) {
    this.state = state;
    this.effects = new Set();
  }

  create({ id, caster, room, duration, tick, onEnter }) {
    const effect = {
      id,
      caster,
      room,
      duration,
      remaining: duration,
      tick,
      onEnter
    };

    this.effects.add(effect);

    if (onEnter) {
      room.on('entityEnter', entity => onEnter(this.state, room, entity));
    }
  }

  update() {
    for (const effect of this.effects) {
      effect.remaining -= 1;

      if (effect.tick) {
        effect.tick(this.state, effect.room);
      }

      if (effect.remaining <= 0) {
        effect.room.say(`<cyan>The ${effect.id.replace('_', ' ')} dissipates.</cyan>`);
        this.effects.delete(effect);
      }
    }
  }
}

module.exports = AreaEffectManager;
