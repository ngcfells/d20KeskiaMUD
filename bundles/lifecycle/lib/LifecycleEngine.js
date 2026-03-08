'use strict';

const aging = require('./resolvers/agingResolver');
const hunger = require('./resolvers/hungerResolver');
const sleep = require('./resolvers/sleepResolver');
const regen = require('./resolvers/regenResolver');

class LifecycleEngine {
  constructor(state) {
    this.state = state;
  }

  process(entity) {
    this.applyAging(entity);
    this.applyHunger(entity);
    this.applySleep(entity);
    this.applyRegen(entity);
    this.applyItemModifiers(entity);
    this.applyRoomModifiers(entity);
  }

  applyAging(entity) {
    const rate = aging.getAgingRate(entity);
    if (rate === 0) return;

    const age = entity.getMeta('age') || 0;
    entity.setMeta('age', age + rate);
  }

  applyHunger(entity) {
    const mode = hunger.getHungerMode(entity);
    if (mode === 'none') return;

    const hungerVal = entity.getMeta('hunger') || 0;
    entity.setMeta('hunger', hungerVal + 1);
  }

  applySleep(entity) {
    const mode = sleep.getSleepMode(entity);
    entity.setMeta('sleepMode', mode);
  }

  applyRegen(entity) {
    const rate = regen.getRegenRate(entity);
    if (rate === 0) return;

    const hp = entity.getAttribute('health') || 0;
    entity.setAttribute('health', hp + rate);
  }

  applyItemModifiers(entity) {
    const mods = entity.getMeta('lifecycle') || {};
    if (mods.agingModifier !== undefined) {
      const age = entity.getMeta('age') || 0;
      entity.setMeta('age', age + mods.agingModifier);
    }
    if (mods.hungerModifier !== undefined) {
      const hunger = entity.getMeta('hunger') || 0;
      entity.setMeta('hunger', hunger + mods.hungerModifier);
    }
    if (mods.regenModifier !== undefined) {
      const hp = entity.getAttribute('health') || 0;
      entity.setAttribute('health', hp + mods.regenModifier);
    }
    if (mods.sleepModifier !== undefined) {
      entity.setMeta('sleepMode', mods.sleepModifier);
    }
  }

  applyRoomModifiers(entity) {
    const room = entity.room;
    if (!room) return;
    const mods = room.getMeta('lifecycle') || {};
    // Aging
    if (mods.agingModifier !== undefined) {
      const age = entity.getMeta('age') || 0;
      entity.setMeta('age', age + mods.agingModifier);
    }
    // Hunger
    if (mods.hungerModifier !== undefined) {
      const hunger = entity.getMeta('hunger') || 0;
      entity.setMeta('hunger', hunger + mods.hungerModifier);
    }
    // Regeneration
    if (mods.regenModifier !== undefined) {
      const hp = entity.getAttribute('health') || 0;
      entity.setAttribute('health', hp + mods.regenModifier);
    }
    // Sleep mode override
    if (mods.sleepModifier !== undefined) {
      entity.setMeta('sleepMode', mods.sleepModifier);
    }
  }
}

module.exports = LifecycleEngine;
